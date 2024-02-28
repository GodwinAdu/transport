
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Delete, Edit, PlusCircle, Trash } from "lucide-react"


const Topic = () => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Topic</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="">
                    .

                    <div className="flex  gap-1">
                        <Button size="icon"><PlusCircle className="w-4 h-4" /></Button>
                        <Button variant="secondary" size="icon"><Edit className="w-4 h-4" /></Button>
                        <Button variant="destructive" size="icon"><Trash className="w-4 h-4" /></Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Topic
