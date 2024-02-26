"use client"

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { resetEmergency } from "@/lib/actions/emergency.actions";
import { IEmergency } from "@/lib/models/emergency.models";
import { TimerReset } from "lucide-react";
import { useRouter } from "next/navigation";

interface ResetProps {
    data: IEmergency
}

const ResetEmergency = ({ data }: ResetProps) => {
    const router = useRouter()

    const handleEmergencyReset = async (id: string) => {
        try {
            await resetEmergency(id)
            toast({
                title: "Emergency Reset to default",
                description: "Emergency was reset successfully...",

            });
            router.refresh();
        } catch (error) {
            toast({
                title: "Something Went Wrong",
                description: "Please try again later",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <Button onClick={() => handleEmergencyReset(data?._id)} variant="destructive" size="icon"><TimerReset className="w-4 h-4" /></Button>
        </>
    )
}

export default ResetEmergency
