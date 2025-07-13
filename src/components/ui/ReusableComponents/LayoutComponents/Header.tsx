'use client';

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { User } from "@prisma/client";
import { User } from "@prisma/client"
import { ArrowLeft, Sparkles } from "lucide-react";
import CreateWebinarButton from "../CreateWebinarButton";
import { Assistant } from "@vapi-ai/server-sdk/api";

type Props = {
    user: User
    assistants: Assistant[] | []
}

const Header = ( {assistants}: Props ) => {
    const pathname = usePathname();
    const router = useRouter();

    return(
        <div className="w-full px-6 pt-8 sticky top-0 z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 gap-6 flex flex-wrap items-center justify-between p-1">
            {
                pathname.includes('pipeline') ? (
                    <Button
                        className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/20 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
                        variant={'outline'}
                        onClick={() => router.push('/webinar')}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2"/> Back to Webinar
                    </Button>
                ) : (
                    <div className="px-6 py-3 flex justify-center text-bold items-center rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/20 text-gray-800 dark:text-gray-200 capitalize backdrop-blur-sm shadow-lg">
                        <Sparkles className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400"/>
                        {pathname.split('/')[1]}
                    </div>
                )
            }

            <div className="flex gap-4 items-center flex-wrap">
                <CreateWebinarButton assistants={assistants}/>
            </div>
        </div>
    )
}

export default Header;