
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Delete, Edit, PlusCircle, Trash } from "lucide-react"
import EmergencyAmountButton from "./emergency/EmergencyAmount"
import { IEmergency } from "@/lib/models/emergency.models"
import ResetEmergency from "./emergency/ResetEmergency"

interface EmergencyProps {
    data: IEmergency
}

const EmergencyAmount = ({ data }: EmergencyProps) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Emergency Amount</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center gap-2">
                    <div className="">
                        <h1 className="font-semibold text-2xl text-red-500">{`GH ${data?.amount || 0}`}</h1>
                    </div>
                    <div className="flex flex-col gap-1">
                        {data?.amount > 0 ? (
                            <ResetEmergency data={data} />
                        ) : (
                            <EmergencyAmountButton />
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default EmergencyAmount
