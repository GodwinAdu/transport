"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addToUserAmount, createUser } from "@/lib/actions/user.actions"
import { usePathname, useRouter } from "next/navigation"
import { getCurrentDateAsString } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  amount: z.coerce.number(),
})

interface AmountInputProps{
    initialAmount:number;
    id:string;
}



export function AmountInput({initialAmount,id}:AmountInputProps){
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:  {
      amount: initialAmount,
    },
  })
  
  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        await addToUserAmount(id,values.amount)
        router.refresh();
        form.reset();
      toast({
        title: "payment add successfully",
        description: getCurrentDateAsString(),
      })
    } catch (error: any) {
      console.log("something went wrong", error)
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant:"destructive"
      })

    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Enter Amount</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} placeholder="Enter Amount given" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
        <Button className="w-full py-4" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Paying": "Pay"}
        </Button>
      </form>
    </Form>
  )
}
