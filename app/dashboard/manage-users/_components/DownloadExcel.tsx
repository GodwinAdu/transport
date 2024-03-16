"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { IUser } from "@/lib/models/user.models"
import { downTransportMembers } from "@/lib/xlsx"


interface ExcelProps{
    members:IUser[]
}
const DownloadExcel =  ({ members }:ExcelProps) => {
 

    const download = async() => {
        try {
            
            await downTransportMembers({members})
            toast({
                title: "Download to Excel",
                description: "Documents was downloaded to Excel",
            })

        } catch (error) {
            console.log(error,"error")
            toast({
                title: "Something went wrong",
                description: "Please try again later",
                variant: "destructive"
            })
        }
    }

    return (
        <>
            <Button onClick={() => download()} className="bg-green-500">Excel</Button>
        </>
    )
}

export default DownloadExcel
