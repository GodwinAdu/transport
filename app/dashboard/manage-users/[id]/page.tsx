import Heading from '@/components/Heading'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = ({ params }: { params: { id: string } }) => {

    const pathId = params?.id

    return (
        <div className="max-w-7xl px-2 mx-auto py-4">
            <div className="flex justify-between items-center">
                <Heading title="Member Details" description="View members details here" />
                <div className="flex gap-4">
                    <Link href={`/dashboard/manage-users/${pathId}`} className={cn(buttonVariants())}> <ArrowLeft className="mr-2 w-4 h-4" /> Back</Link>
                    {/* <Link href="/dashboard/manage-users" className={cn(buttonVariants())}> Users <ArrowRight className="ml-2 w-4 h-4" /></Link> */}
                </div>
            </div>
            <Separator />
        </div>
    )
}

export default page
