
import Heading from "@/components/Heading"
import { DataTable } from "@/components/table/data-table"
import { Separator } from "@/components/ui/separator"
import { columns } from "./_components/column"
import ReportIssue from "@/components/dialogs/ReportIssue"
import { fetchUsers } from "@/lib/actions/user.actions"
import { IUser } from "@/lib/models/user.models"


const page = async () => {
    const data:IUser[] = (await fetchUsers())||[];
    return (
        <div className="max-w-7xl px-2 mx-auto py-4">
            <div className="flex justify-between items-center">
                <Heading title="Welcome" description="Use the search to find members" />
                <ReportIssue />
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
        </div>
    )
}

export default page
