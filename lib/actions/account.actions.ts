"use server"

import { connectToDB } from "../mongoose"
import User, { IUser } from "../models/user.models";
import Payment from "../models/payment.models";
import Emergency from "../models/emergency.models";

export async function calculateTotalAmount(): Promise<number> {
    let totalAmount = 0;
    await connectToDB();

    try {
        // Fetch all users from the database
        const users: IUser[] = await User.find({ carStatus: true }).lean();

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

export async function calculateOverallAmount() {
    await connectToDB();
    try {
        // Fetch overall amount from payments
        const overall = await Payment.findOne();
        const overallMoney = overall?.amount || 0;

        // Fetch emergency amount
        const cashEmergency = await Emergency.findOne();
        const emergencyMoney = cashEmergency?.amount || 0;

        // Count members with carStatus true
        const memberWithCarstatus = await User.countDocuments({ carStatus: true });

        // Calculate total amount
        let totalAmount = overallMoney * memberWithCarstatus;

        // Add emergency money if it exists
        if (emergencyMoney > 0) {
            totalAmount += emergencyMoney;
        }

        return totalAmount;

    } catch (error) {
        console.error("Error calculating total amount:", error);
        throw error;
    }
}



export async function losses(){
    await connectToDB();
    try {
        
    } catch (error) {
        
    }
}
