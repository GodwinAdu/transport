"use server"


import Emergency, { IEmergency } from "../models/emergency.models";
import { connectToDB } from "../mongoose";

export async function createEmergency(amount: number): Promise<void> {
    await connectToDB()
    try {
        // Create a new Emergency document
        const newEmergency: IEmergency = await Emergency.create({ amount });

        console.log("New Emergency saved successfully:", newEmergency);


    } catch (error) {
        console.error("Error adding amount to user:", error);
        throw error;
    }
}

export async function fetchEmergencys(): Promise<IEmergency[]> {
    try {
        // Fetch all Emergency documents from the database
        const Emergencys: IEmergency[] = await Emergency.find();

        console.log("Emergencys fetched successfully:", Emergencys);

        return JSON.parse(JSON.stringify(Emergencys));
    } catch (error) {
        console.error("Error fetching Emergencys:", error);
        throw error;
    }
}

export async function resetEmergency(userId: string): Promise<void> {
    await connectToDB();
    try {
        // Find the user by their ID
        const result: IEmergency | null = await Emergency.findByIdAndDelete({
            _id: userId
        })
        if (!result) {
            console.log("Emergency not found");
            // Optionally, you can throw an error here if you want to handle it differently
        } else {
            console.log("Emergency deleted successfully");
        }
    } catch (error) {
        console.error("Error adding amount to result:", error);
        throw error;
    }
}