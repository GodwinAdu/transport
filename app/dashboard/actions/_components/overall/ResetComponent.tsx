"use client"

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { resetPayment } from "@/lib/actions/payment.actions";
import { IPayment } from "@/lib/models/payment.models";
import { TimerReset } from "lucide-react";
import { useRouter } from "next/navigation";

interface ResetProps {
    data: IPayment
}

const ResetComponent = ({ data }: ResetProps) => {
    const router = useRouter()

    const handlePaymentReset = async (id: string) => {
        try {
            await resetPayment(id)
            toast({
                title: "Payment Reset to default",
                description: "Payment was reset successfully...",

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
            <Button onClick={() => handlePaymentReset(data?._id)} variant="destructive" size="icon"><TimerReset className="w-4 h-4" /></Button>
        </>
    )
}

export default ResetComponent
