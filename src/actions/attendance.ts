'use server';

import { prismaClient } from "@/lib/prismaClient";
import { AttendanceData } from "@/lib/types";
import { AttendedTypeEnum, CtaTypeEnum } from "@prisma/client";

const getWebinarAttendance = async (
    webinarId: string,
    options: {
        includedUsers?: boolean;
        userLimit?: number;
    } = { includedUsers: true, userLimit: 10 }
) => {
    try {
        const webinar = await prismaClient.webinar.findUnique({
            where: {
                id: webinarId  
            },
            select: {
                id: true,
                ctaType: true,
                tags: true,
                _count: {
                    select: {
                        attendances: true
                    }
                }
            }
        })

        if(!webinar){
            return {
                success: false,
                status: 400,
                error: 'Webinar not found',
            }
        }

        const attendanceCounts = await prismaClient.attendance.groupBy({
            by: ['attendedType'],
            where: {
                webinarId,
            },
            _count: {
                attendedType: true
            }
        })

        const result: Record<AttendedTypeEnum, AttendanceData> = {} as Record<AttendedTypeEnum, AttendanceData>;

        for (const type of Object.values(AttendedTypeEnum)){
            if(type===AttendedTypeEnum.ADDED_TO_CART && webinar.ctaType===CtaTypeEnum.BOOK_A_CALL){
                continue;
            }

            if(type===AttendedTypeEnum.BREAKOUT_ROOM && webinar.ctaType!==CtaTypeEnum.BOOK_A_CALL){
                continue;
            }

            const countItem = attendanceCounts.find((item) => {
                if(webinar.ctaType===CtaTypeEnum.BOOK_A_CALL && type===AttendedTypeEnum.BREAKOUT_ROOM && item.attendedType===AttendedTypeEnum.ADDED_TO_CART){
                    return true;
                }
                return item.attendedType === type;
            })

            result[type] = {
                count: countItem ? countItem._count.attendedType : 0,
                users: [],
            }
        }

        if(options.includedUsers){
            for(const attendanceType of Object.values(AttendedTypeEnum)){
                if((attendanceType===AttendedTypeEnum.ADDED_TO_CART && webinar.ctaType===CtaTypeEnum.BOOK_A_CALL) || 
                   (attendanceType===AttendedTypeEnum.BREAKOUT_ROOM && webinar.ctaType!==CtaTypeEnum.BOOK_A_CALL)){
                    continue;
                }

                const queryType = webinar.ctaType===CtaTypeEnum.BOOK_A_CALL && attendanceType===AttendedTypeEnum.BREAKOUT_ROOM ? 
                    AttendedTypeEnum.ADDED_TO_CART : attendanceType;

                if(result[attendanceType] && result[attendanceType].count > 0){
                    const attendances = await prismaClient.attendance.findMany({
                        where: {
                            webinarId,
                            attendedType: queryType,
                        },
                        include: {
                            user: true,
                        },
                        take: options.userLimit,
                        orderBy: {
                            joinedAt: 'desc',
                        }
                    })

                    result[attendanceType].users = attendances.map((attendance) => ({
                        id: attendance.user.id,
                        name: attendance.user.name,
                        email: attendance.user.email,
                        createdAt: attendance.user.createdAt,
                        updatedAt: attendance.user.updatedAt,
                        callStatus: attendance.user.callStatus,
                    }))
                }
            }
        }

        return {
            success: true,
            data: result,
            ctaType: webinar.ctaType,
            webinarTags: webinar.tags || [],
        }
    } catch (error) {
        console.error('Error fetching webinar attendance:', error);
        return {
            success: false,
            status: 500,
            error: 'Failed to fetch webinar attendance',
        }
    }
}

export { getWebinarAttendance };