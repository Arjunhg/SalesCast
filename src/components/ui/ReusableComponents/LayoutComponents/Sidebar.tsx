'use client';

import { Triangle } from "lucide-react";
import { sidebarData } from "@/lib/data";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

type Props = {

}

const Sidebar = (props: Props) => {

    const pathname = usePathname();

    return (
        <div
            className="w-18 sm:w-28 h-screen sticky top-0 py-10 px-2 sm:px-6 border bg-background border-border flex flex-col items-center justify-start gap-10"
        >

            <div className="cursor-pointer w-fit h-fit flex items-center justify-center rounded-full bg-white/10 p-2">
                <Triangle/>
            </div>

            <div className="w-full h-full justify-between items-center flex flex-col">

                <div
                    className="w-full h-fit  flex flex-col items-center justify-start gap-4"
                >
                    {
                    sidebarData.map((item) => (
                            <TooltipProvider key={item.id}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link 
                                            href={item.link}
                                            className={`flex hover:bg-white/10 items-center gap-2 cursor-pointer rounded-lg p-2 ${pathname.includes(item.link) ? 'iconBackground' : ''}`}
                                        >
                                            <item.icon
                                                className={`w-6 h-6  ${pathname.includes(item.link) ? '' : 'opacity-80'}`}
                                            />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side='right'>
                                        <span className="text-sm">{item.title}</span>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))
                    }
                </div>

                <UserButton/>
            </div>
        </div>
    )
}


export default Sidebar;