import Heading from '@/components/Heading'
import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ArrowLeft, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import OverallAmount from './_components/OverallAmount'
import EmergencyAmount from './_components/EmergencyAmount'
import Topic from './_components/Topic'
import { fetchPayments } from '@/lib/actions/payment.actions'
import { currentProfile } from '@/lib/helpers/current-profile'
import { notFound } from 'next/navigation'
import { fetchEmergencys } from '@/lib/actions/emergency.actions'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const page = async () => {

    const profile = await currentProfile();
    if (!profile) { notFound() }


    const result = await fetchPayments();

    const emergency = await fetchEmergencys();

    return (
        <div className="max-w-7xl px-2 mx-auto py-4">
            <div className="flex justify-between items-center">
                <Heading title="Action Page" description="Here, you can oversee, modify, update, and regulate the entire application." />
                <div className="flex gap-4">
                    <Link href="/dashboard" className={cn(buttonVariants())}><ArrowLeft className="mr-2 w-4 h-4" /> Back</Link>
                    <Link href="/dashboard/manage-users" className={cn(buttonVariants())}> Manage <Users className="ml-2 w-4 h-4" /></Link>
                </div>
            </div>
            <Separator />
            <div className="py-4 flex justify-between items-center px-4 ">
                <div className="flex gap-4">
                    <Link href="/dashboard/members" className={cn(buttonVariants())}>All Members</Link>
                    <Button variant="destructive" >Reset</Button>
                </div>
                {/* <DateTimeComponent /> */}
            </div>
            <Separator />
            <div className="flex justify-center items-center">
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 px-2 py-4 mx-auto">
                    <div className="text-white">
                        <OverallAmount data={result[0]} />
                    </div>
                    <div className="text-white">
                        <EmergencyAmount data={emergency[0]} />
                    </div>

                </div>
            </div>
            <Separator />
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Overall Amount</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center gap-4">
                        <div className="">
                            <h1 className="font-semibold text-2xl text-green-500"></h1>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

export default page
