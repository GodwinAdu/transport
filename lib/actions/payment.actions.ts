"use server"

import Payment, { IPayment } from "../models/payment.models";
import { connectToDB } from "../mongoose";

export async function createOverallAmount(amount: number): Promise<void> {
    await connectToDB()
    try {
        // Create a new payment document
        const newPayment: IPayment = await Payment.create({ amount });

        console.log("New payment saved successfully:", newPayment);


    } catch (error) {
        console.error("Error adding amount to user:", error);
        throw error;
    }
}

export async function fetchPayments(): Promise<IPayment[]> {
    try {
        // Fetch all payment documents from the database
        const payments: IPayment[] = await Payment.find();

        console.log("Payments fetched successfully:", payments);

        return JSON.parse(JSON.stringify(payments));
    } catch (error) {
        console.error("Error fetching payments:", error);
        throw error;
    }
}

export async function resetPayment(userId: string): Promise<void> {
    await connectToDB();
    try {
        // Find the user by their ID
        const result: IPayment | null = await Payment.findByIdAndDelete({
            _id: userId
        })
        if (!result) {
            console.log("Payment not found");
            // Optionally, you can throw an error here if you want to handle it differently
        } else {
            console.log("Payment deleted successfully");
        }
    } catch (error) {
        console.error("Error adding amount to result:", error);
        throw error;
    }
}