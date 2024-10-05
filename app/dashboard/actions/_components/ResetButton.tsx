"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { reset } from "@/lib/actions/reset.actions"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ResetButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleReset = async () => {
    try {
      setIsLoading(true)
      await reset()
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      toast({
        title: "Reset Successful",
        description: "All users details and all datas in the application have been reset to default.",
      }),
      window.location.reload()
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" >Reset</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently reset all users details and all datas in the application to default.
            Proceed if is your action to do so.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel >Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleReset}>
            {isLoading ? "please wait..." : "Continue"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ResetButton
