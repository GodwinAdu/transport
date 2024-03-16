
import xlsx, { IJsonSheet } from "json-as-xlsx"
import { fetchUsersWithCar } from "./actions/user.actions"
import { IUser } from "./models/user.models";

interface DownloadProps{
    members:IUser[]
}
export async function downTransportMembers({members}:DownloadProps) {
 

    let columns: IJsonSheet[] = [
        {
            sheet: "Transport Members",
            columns: [
                { label: "Card Number", value: "cardNumber" },
                { label: "Full Name", value: "name" },
                { label: "Phone Number", value: "phone" },
                { label: "Paid Status", value: "payed" },
                { label: "Amount Paid", value: "amount" },
                { label: "Balance ", value: "balance" },
            ],
            content:members
        }
    ];

    let settings = {
        fileName: 'Suame Congregation Transport Members Excel'
    };

    xlsx(columns, settings )
}