import Heading from '@/components/Heading'
import { Separator } from '@/components/ui/separator'
import { fetchAllHistory } from '@/lib/actions/history.actions'
import React from 'react'
import HistoryCard from './_components/HistoryCard'
import { Rabbit } from 'lucide-react'
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
                 <div className='w-full mt-24 flex justify-center text-white/90'>
                 <div className='flex flex-col items-center gap-2'>
                   <Rabbit className='h-24 w-24 ' />
                   <h3 className='font-semibold text-xl'>
                     No history yet
                   </h3>
                   <p>We track and save only the transaction that goes on in this application.</p>
                 </div>
               </div>
            )}
            {data.map((value) => (
                <HistoryCard key={value._id} title={value?.title} content={value?.content} />
            ))}
        </div>
    )
}

export default page
