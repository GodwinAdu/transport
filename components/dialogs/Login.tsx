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
import { LoginForm } from "./LoginForm"
import Link from "next/link"
import { cn } from "@/lib/utils"

const Login = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button size="sm" variant="ghost" >Sign In</Button>
    </DialogTrigger>
    <DialogContent className="w-[96%] max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Sign In</DialogTitle>
        <DialogDescription>
          Sign In with the provide Username and password !!!.
        </DialogDescription>
      </DialogHeader>
      <div className="">
        <LoginForm />
      </div>
      <div className="text-center py-4">
        <p>If your not admin, Please continue as User!</p>
        <p className="flex gap-4 justify-center items-center py-2"><span className="text-red-500">Click below</span> <ArrowDown className="mr-2 w-4 h-4 font-bold" /></p>
        <Link href="/user" className={cn(buttonVariants({ size:"sm"}),"w-full py-3")}>
            Main <User className="w-4 h-4 ml-2" />
          </Link>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default Login
