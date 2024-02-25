"use server"

import Admin, { IAdmin } from "../models/admin.models";
import { connectToDB } from "../mongoose"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { IUser } from "../models/user.models";


interface loginProps {
    username: string;
    password: string;
}
export async function loginAdmin({ username, password }: loginProps) {
    await connectToDB();
    const cookieStore = cookies();
    try {
        const user:IAdmin | null  = await Admin.findOne({ username })
        if (!user) {
            console.log("User doesnt exist")
            return null
        };

        const tokenData = {
            id: user?._id,
            username: user?.username,    
        };

        const isPasswordValid = await Admin.findOne({password});

        if (!isPasswordValid) {
            console.log("password is invalid");
            return
        } else {
            console.log("user is login")
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        cookieStore.set("token", token,
            {
                httpOnly: true,
                // maxAge: 60 ,
            }
        );


        return JSON.parse(JSON.stringify(user));

    } catch (error: any) {
        console.log("Unable to login admin", error);
        throw error
    }
}
