"use server"

import { connectToDB } from "../mongoose"
import User, { IUser } from "../models/user.models";

export async function calculateTotalAmount(): Promise<number> {
    let totalAmount = 0;
    await connectToDB();

    try {
        // Fetch all users from the database
        const users: IUser[] = await User.find({carStatus:true}).lean();

        // Sum up the amount for each user
        for (const user of users) {
            totalAmount += user.amount;
        }

        return totalAmount;

    } catch (error) {
        console.error("Error calculating total amount:", error);
        throw error;
    }
}
