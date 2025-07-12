'use client';

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { User } from "@prisma/client";
import { User } from "@prisma/client"
import { ArrowLeft, Zap, Sparkles } from "lucide-react";
import PurpleIcon from "@/components/ui/ReusableComponents/PurpleIcon";
import CreateWebinarButton from "../CreateWebinarButton";
import { Assistant } from "@vapi-ai/server-sdk/api";

type Props = {
    user: User
    assistants: Assistant[] | []
}

// TODO: Stripe integration, Assistant
const Header = ( {user, assistants}: Props ) => {
    const pathname = usePathname();
    const router = useRouter();

    return(
        <div className="w-full px-6 pt-8 sticky top-0 z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 gap-6 flex flex-wrap items-center justify-between">
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

            {/* TODO: Stripe integration and create webinar button */}

            <div className="flex gap-4 items-center flex-wrap">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/20 hover:scale-105 transition-all duration-300 hover:shadow-lg backdrop-blur-sm">
                    <PurpleIcon>
                        <Zap className="w-5 h-5"/>
                    </PurpleIcon>
                </div>

                <CreateWebinarButton assistants={assistants}/>
            </div>
        </div>
    )
}

export default Header;