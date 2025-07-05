'use client';

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { ArrowLeft, Zap } from "lucide-react";
import PurpleIcon from "@/components/ui/ReusableComponents/PurpleIcon";
import CreateWebinarButton from "../CreateWebinarButton";

type Props = {
    user: User
}

// TODO: Stripe integration, Assistant
const Header = ( {user}: Props ) => {
    const pathname = usePathname();
    const router = useRouter();

    return(
        <div className="w-full px-4 pt-10 sticky top-0 z-10 bg-background gap-4 flex flex-wrap items-center justify-between">
            {
                pathname.includes('pipeline') ? (
                    <Button
                        className="bg-primary/10 border border-border rounded-xl"
                        variant={'outline'}
                        onClick={() => router.push('/webinar')}
                    >
                        <ArrowLeft/> Back to Webinar
                    </Button>
                ) : (
                    <div className="px-4 py-2 flex justify-center text-bold items-center rounded-xl bg-background border border-border text-primary capitalize">
                        {pathname.split('/')[1]}
                    </div>
                )
            }

            {/* TODO: Stripe integration and create webinar button */}

            <div className="flex gap-6 items-center flex-wrap">
                <PurpleIcon>
                    <Zap/>
                </PurpleIcon>

                <CreateWebinarButton/>
            </div>
        </div>
    )
}

export default Header;