"use client"
 
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowDown,  User } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CreateForm } from "./CreateForm"

const CreateUser = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button >Create</Button>
    </DialogTrigger>
    <DialogContent className="w-[96%] max-w-[425px]">
      <DialogHeader>
        <DialogTitle>New Member</DialogTitle>
        <DialogDescription>
          Create new Member.
        </DialogDescription>
      </DialogHeader>
      <div className="">
        <CreateForm />
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default CreateUser
