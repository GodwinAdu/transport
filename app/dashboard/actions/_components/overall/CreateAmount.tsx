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
import { CreateAmountForm } from "./CreateAmountForm"
import { PlusCircle } from "lucide-react"


const CreateAmount = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
            <Button size="icon"><PlusCircle className="w-4 h-4" /></Button>
            </DialogTrigger>
            <DialogContent className="w-[96%] max-w-[425px] ">
                <DialogHeader>
                    <DialogTitle>Overall Amount</DialogTitle>
                    <DialogDescription>
                        {`Enter Amount to pay by a single member`}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-2">
                    <CreateAmountForm />
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default CreateAmount
