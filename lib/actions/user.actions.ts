"use server"

import { revalidatePath } from "next/cache";
import User, { IUser } from "../models/user.models";
import { connectToDB } from "../mongoose";

interface CreateUserProps {
    name: string;
    phone: string;
    carStatus?: boolean | undefined;
}

export async function createUser({ name, phone }: CreateUserProps) {
    await connectToDB();
    try {
        const existingMember = await User.findOne({
            name,
            phone
        });

        if (existingMember) throw new Error("User already exist");

        const member = new User({
            name,
            phone
        });

        await member.save();

    } catch (error) {
        console.log("something went wrong", error)
        throw error
    }
}

export async function fetchUsers() {
    await connectToDB();
    try {
        const members = await User.find({}).lean();
        if (!members) {
            return [];
        }

        return JSON.parse(JSON.stringify(members));

    } catch (error) {
        console.log("something went wrong", error);
        throw error;
    }
}

// fetch all members who will join the transport 
export async function fetchUsersWithCar() {
    await connectToDB(); // Assuming this function connects to the database

    try {
        // Find all users with carStatus set to true
        const members = await User.find({ carStatus: true }).lean();

        if (!members) {
            return [];
        }

        return JSON.parse(JSON.stringify(members));
    } catch (error) {
        console.log("Something went wrong", error);
        throw error;
    }
}

export async function updateUser(userId: string, values: Partial<CreateUserProps>, path?: string) {
    await connectToDB();

    try {
        const updatedMember = await User.findByIdAndUpdate(
            userId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updatedMember) {
            console.log("Member not found");
            return null;
        }

        console.log("Update successful");
        if (path) {

            revalidatePath(path)
        }



        return JSON.parse(JSON.stringify(updatedMember));
    } catch (error) {
        console.error("Error updating Member:", error);
        throw error;
    }
}

export async function addToUserAmount(userId: string, amountToAdd: number): Promise<void> {
    try {
        // Find the user by their ID
        const user: IUser | null = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        // Add the new amount to the existing amount
        user.amount += amountToAdd;


        // Set the payed field to true
        user.payed = true;

        // Save the updated user object to the database
        await user.save();

        console.log("Amount added successfully for user:", user.name);
    } catch (error) {
        console.error("Error adding amount to user:", error);
        throw error;
    }
}

export async function deleteUser({ id }: { id: string }) {
    await connectToDB();
    try {
        const user = await User.findByIdAndDelete({
            _id: id
        })
        if (!user) {
            console.log("user don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete sucessfully")

        return user;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}
