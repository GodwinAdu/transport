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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BalanceInput } from "./BalanceInput"

interface BalanceProps {
    id: string;
    member: string;
    amount: number;
}
const BalanceForm = ({ id, member, amount }: BalanceProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="destructive" >Enter</Button>
            </DialogTrigger>
            <DialogContent className="w-[96%] max-w-[425px] ">
                <DialogHeader>
                    <DialogTitle>Enter Balance</DialogTitle>
                    <DialogDescription>
                        {`Enter Balance for ${member}`}
                    </DialogDescription>
                </DialogHeader>
                <div className=" py-2">
                    <BalanceInput initialAmount={amount} id={id}  />

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default BalanceForm
