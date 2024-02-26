"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { EmergencyAmountForm } from "./EmergencyAmountForm"


const EmergencyAmountButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
            <Button size="icon"><PlusCircle className="w-4 h-4" /></Button>
            </DialogTrigger>
            <DialogContent className="w-[96%] max-w-[425px] ">
                <DialogHeader>
                    <DialogTitle>Enter Amount to pay</DialogTitle>
                    <DialogDescription>
                        {`Enter Amount to pay by`}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <EmergencyAmountForm />
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default EmergencyAmountButton
