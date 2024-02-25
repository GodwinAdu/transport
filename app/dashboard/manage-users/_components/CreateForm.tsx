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
import { createUser } from "@/lib/actions/user.actions"
import { usePathname, useRouter } from "next/navigation"
import { getCurrentDateAsString } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Password is required.",
  }),
})

export function CreateForm() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: ""
    },
  })
  
  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createUser({
        name: values.name,
        phone: values.phone,
      }),
        router.refresh();
        form.reset();
      toast({
        title: "New member was added",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Full Name</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} placeholder="Eg. Godwin Adu Jr" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Phone Number</FormLabel>
              <FormControl>
                <Input type="phone" disabled={isSubmitting} placeholder="Eg. 0123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full py-4" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Creating": "Create"}
        </Button>
      </form>
    </Form>
  )
}
