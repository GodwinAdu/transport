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
import { AmountInput } from "./AmountInput"

interface AmountProps{
    id:string;
    member:string;
    amount:number;
}

const AmountForm = ({id,member,amount}:AmountProps) => {
  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button size="sm"  >Enter</Button>
    </DialogTrigger>
    <DialogContent className="w-[96%] max-w-[425px] ">
      <DialogHeader>
        <DialogTitle>Enter Amount to pay</DialogTitle>
        <DialogDescription>
          {`Enter Amount to pay by ${member}` }
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
       <AmountInput initialAmount={amount} id={id} />
      </div>
      
    </DialogContent>
  </Dialog>
  )
}

export default AmountForm
