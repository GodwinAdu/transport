"use server"

import Admin from "../models/admin.models";
import { connectToDB } from "../mongoose";
import bcryptjs from "bcryptjs";
interface FetchAdminProps {
    id: string;
}

export async function fetchAdmin({ id }: FetchAdminProps) {
    await connectToDB();
    try {
        const user = await Admin.findById({ _id: id });

        if (!user) {
            console.log("user doesnt exist")
            return null
        }

        // Exclude sensitive information like password
        const { password, ...userWithoutPassword } = user.toObject();
        return JSON.parse(JSON.stringify(userWithoutPassword));

    } catch (error: any) {
        console.log("Unable to fetch user", error)
    }
}



export async function createAdmin(username: string, password: string) {
    try {
        await connectToDB();

        const hashed = await bcryptjs.hash(password, 12);

        const user = new Admin({
            username,
            password: hashed
        })

        await user.save();

    } catch (error) {
        console.log("Unable to create admin", error)
    }
}