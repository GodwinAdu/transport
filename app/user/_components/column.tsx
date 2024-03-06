"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, BadgeAlert, CheckSquare } from "lucide-react";
import { IUser } from "@/lib/models/user.models";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast";
import { updateUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  carStatus: z.boolean().default(false).optional(),
})




export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize text-white/80">{row.getValue("name")}</div>
    )
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-white/80">{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "payed",
    header: "Paid",
    cell: ({ row }) => (
      <div>{row.getValue("payed") ? <CheckSquare className="h-4 w-4 text-green-500" /> : <BadgeAlert className="h-4 w-4 text-red-500" />}</div>
    )
  },
  {
    accessorKey: "amount",
    header: "Amount paid",
    cell: ({ row }) => (
      <div className="capitalize text-white/80">{row.getValue("amount")}</div>
    )
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => (
      <div className="capitalize text-white/80">{row.getValue("balance")}</div>
    )
  },
  {
    accessorKey: "cardNumber",
    header: "card",
    cell: ({ row }) => (
      <div className="capitalize text-white/80">{row.getValue("cardNumber")}</div>
    )
  },
  {
    accessorKey: "carStatus",
    header: "Join Car",
    cell: ({ row }) => {

      const id = row.original._id;
      const card = row.original.cardNumber;
      console.log(card,"card")
      const initialCarstatus = row.original.carStatus;
      const router = useRouter();


      const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          carStatus: initialCarstatus,
        },
      })

      async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {

          await updateUser(id, data)
          router.refresh()

          toast({
            title: "Youve join car cues",
            description: "Please contact transport overseer for any misunderstanding",
          })

        } catch (error: any) {
          toast({
            title: "Something went wrong",
            description: "Please try again later",
          })
        }
      }

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="carStatus"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      disabled={initialCarstatus}
                      onCheckedChange={(value) => {
                        field.onChange(value);
                        if (value) {
                          // Trigger form submission when the checkbox is checked
                          form.handleSubmit(onSubmit)();
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      );
    },
  },
];
