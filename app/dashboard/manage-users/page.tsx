import Heading from '@/components/Heading'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CreateUser from './_components/CreateUser'
import { columns } from './_components/column'
import { DataTable } from '@/components/table/data-table'
import { IUser } from '@/lib/models/user.models'
import { fetchUsersWithCar } from '@/lib/actions/user.actions'
import { currentProfile } from '@/lib/helpers/current-profile'
import { notFound } from 'next/navigation'

const page = async () => {

    const profile = await currentProfile();
    if (!profile) { notFound() }

    const data: IUser[] = (await fetchUsersWithCar()) || [];
    return (
        <div className="max-w-7xl px-2 mx-auto py-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <Heading title="Manage Members" description="Manage,Edit and oversees all members actions." />
                <div className="flex gap-4">
                    <Link href="/dashboard" className={cn(buttonVariants())}><ArrowLeft className="mr-2 w-4 h-4" /> Back</Link>
                    <CreateUser />
                </div>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
        </div>
    )
}

export default page
