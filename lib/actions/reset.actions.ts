"use server"

import Emergency from "../models/emergency.models";
import History from "../models/history.models";
import Payment from "../models/payment.models";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";
export async function reset() {
    try {
      // Establish database connection
      await connectToDB();
  
      // Delete documents from related collections
      await Promise.all([
        Payment.deleteMany({}),
        Emergency.deleteMany({}),
        History.deleteMany({}),
      ]);
  
      // Find all users
      const users = await User.find({});
  
      // Update each user's status and save
      await Promise.all(users.map(async (user) => {
        user.carStatus = false;
        user.payed = false;
        user.amount = 0;
        user.balance = 0;
        user.cardNumber = 0;
        await user.save(); // Await saving for each user
      }));
  
      console.log("Reset operation completed successfully.");
    } catch (error) {
      console.error("Error during reset operation", error);
      throw error;
    }
  }
  