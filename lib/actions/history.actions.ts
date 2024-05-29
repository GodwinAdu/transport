"use server"

import History from "../models/history.models";
import { connectToDB } from "../mongoose"

export async function fetchAllHistory() {
    try {
        await connectToDB();
        const history = await History.find({});
        if (!history) {
            return [];
        }

        return JSON.parse(JSON.stringify(history))
    } catch (error) {
        console.log("Unable to fetch the history", error);
        throw error;
    }
}