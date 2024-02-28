
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {  TimerReset } from "lucide-react"
import CreateAmount from "./overall/CreateAmount"
import { IPayment } from "@/lib/models/payment.models"
import ResetComponent from "./overall/ResetComponent"

interface OverallAmountProps {
    data: IPayment
}
const OverallAmount = ({ data }: OverallAmountProps) => {
    console.log(data, "data")
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Overall Amount</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center gap-2">
                    <div className="">
                        <h1 className="font-semibold text-2xl text-green-500">{`GH ${data?.amount || 0}`}</h1>
                    </div>
                    <div className="flex flex-col gap-1">
                        {data?.amount > 0 ? (
                           <ResetComponent data={data} />
                        ) : (

                            <CreateAmount />
                        )}

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default OverallAmount
