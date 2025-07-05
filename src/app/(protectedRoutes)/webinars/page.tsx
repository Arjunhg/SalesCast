import { onAuthenticateUser } from '@/actions/auth'
import { getWebinarByPresenterId } from '@/actions/webinar'
import PageHeader from '@/components/ui/ReusableComponents/PageHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HomeIcon, Webcam } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import WebinarCard from './_components/WebinarCard'
import { Webinar } from '@prisma/client'

const page = async () => {

    const checkUser = await onAuthenticateUser();
    if(!checkUser || !checkUser.user?.id){
        redirect('/');
    }


    const webinars = await getWebinarByPresenterId(checkUser.user.id);

  return (
    <Tabs
        defaultValue="all"
        className='w-full flex flex-col gap-8'
    >
        <PageHeader
            leftIcon={<HomeIcon className='w-3 h-3'/>}
            mainIcon={<Webcam className='w-12 h-12'/>}
            rightIcon={<HomeIcon className='w-3 h-3'/>}
            heading="The home of webinars"
            placeholder="Search webinars..."

        >
            <TabsList className='bg-transparent space-x-3'>
                <TabsTrigger
                    value='all'
                    className='bg-secondary opacity-50 data-[state-action]:opacity-100 px-8 py-4'
                >
                    All
                </TabsTrigger>
                <TabsTrigger
                    value='upcoming'
                    className='bg-secondary px-8 py-4'
                >
                    Upcoming
                </TabsTrigger>
                <TabsTrigger
                    value='ended'
                    className='bg-secondary px-8 py-4'
                >
                    Ended
                </TabsTrigger>
            </TabsList>

            <TabsContent
                value='all'
                className='w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 place-items-start place-content-start gap-x-6 gap-y-10'
            >
                {
                    webinars?.length > 0 ? (
                        webinars.map((webinar: Webinar, index: number) => (
                            <WebinarCard
                                key={index}
                                webinar={webinar}
                            />
                        )
                    )):(
                        <div className='w-full h-[200px] flex justify-center items-center text-primary font-semibold text-2xl col-span-12'>
                            No Webinar Found
                        </div>
                    )
                }
            </TabsContent>
            
        </PageHeader>
    </Tabs>
  )
}

export default page
