import Heading from '@/components/Heading'
import { Separator } from '@/components/ui/separator'
import { fetchAllHistory } from '@/lib/actions/history.actions'
import React from 'react'
import HistoryCard from './_components/HistoryCard'
type HistoryProps = {
    _id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
const page = async () => {
    const data: HistoryProps[] = (await fetchAllHistory()) || []
    return (
        <div className="max-w-7xl px-2 mx-auto py-4">
            <div className="">
                <Heading title="History" description="" />
            </div>
            <Separator />
            {data.length === 0 && (
                <p className="font-bold text-xl"> No history yet</p>
            )}
            {data.map((value) => (
                <HistoryCard key={value._id} title={value?.title} content={value?.content} />
            ))}
        </div>
    )
}

export default page
