"use server"

import User from "../models/user.models";
import { connectToDB } from "../mongoose";

export async function countAllUsers(): Promise<number> {
    await connectToDB();
    try {
      // Count the total number of documents in the User collection
      const totalUsers: number = await User.countDocuments();
  
      console.log("Total number of users:", totalUsers);
  
      return totalUsers;
    } catch (error) {
      console.error("Error counting users:", error);
      throw error;
    }
  }
  
  export async function countUsersWithCarStatus(): Promise<number> {
    await connectToDB();
    try {
      // Count the total number of documents where carStatus is true
      const totalUsersWithCarStatusTrue: number = await User.countDocuments({ carStatus: true });
  
      console.log("Total number of users with carStatus true:", totalUsersWithCarStatusTrue);
  
      return totalUsersWithCarStatusTrue;
    } catch (error) {
      console.error("Error counting users with carStatus true:", error);
      throw error;
    }
  }

  export async function countUsersWithPayed(): Promise<number> {
    await connectToDB();
    try {
      // Count the total number of documents where carStatus is true
      const totalUsersWithPayed: number = await User.countDocuments({ carStatus: true, payed:true });
  
      console.log("Total number of users with carStatus true:", totalUsersWithPayed);
  
      return totalUsersWithPayed;
    } catch (error) {
      console.error("Error counting users with carStatus true:", error);
      throw error;
    }
  }

  export async function countUsersWithUnpaid(): Promise<number> {
    await connectToDB();
    try {
      // Count the total number of documents where carStatus is true
      const totalUsersWithUnpaid: number = await User.countDocuments({ carStatus: true, payed:false });
  
      console.log("Total number of users with carStatus true:", totalUsersWithUnpaid);
  
      return totalUsersWithUnpaid;
    } catch (error) {
      console.error("Error counting users with carStatus true:", error);
      throw error;
    }
  }