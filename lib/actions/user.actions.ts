"use server"

import { revalidatePath } from "next/cache";
import User, { IUser } from "../models/user.models";
import { connectToDB } from "../mongoose";
import Payment from "../models/payment.models";
import History from "../models/history.models";

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

        const newHistory = new History({
            title: `New user was created`,
            content: `A User called ${name} with the phone number ${phone} was created`
        })

        await member.save();
        await newHistory.save();


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
    try {
        // Connect to the database
        await connectToDB(); // Assuming this function connects to the database

        // Fetch the total payment amount
        const overall = await Payment.find();
        const overallMoney = overall[0]?.amount || 0;

        // Find all users with carStatus set to true
        let members = await User.find({ carStatus: true }).lean();

        if (!members) {
            return [];
        }

        // Filter out users without a cardNumber and add a default value to them
        members = members.map((member) => ({
            ...member,
            cardNumber: member.cardNumber || Number.MAX_SAFE_INTEGER, // Assign a large number to users without a cardNumber
        }));

        // Sort users based on cardNumber
        members.sort((a, b) => a.cardNumber - b.cardNumber);

        // Map card numbers starting from 1
        const usersWithCardNumbers = members.map((member, index) => ({
            ...member,
            cardNumber: index + 1,
            totalAmount: overallMoney // Add the total amount to each user's data
        }));

        // Return the data as JSON
        return JSON.parse(JSON.stringify(usersWithCardNumbers));
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
    await connectToDB();
    try {
        // Find the user by their ID
        const user: IUser | null = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const cards = await User.find({ carStatus: true })

        console.log(cards)

        const cardArray = cards.map(card => {
            return card.cardNumber;
        });

        console.log(cardArray)

        const maxCard = Math.max(...cardArray);

        console.log(maxCard, "max card")


        const overall = await Payment.find({});

        const overallMoney = overall[0].amount as number || 0;

        if (overallMoney <= 0) {
            throw new Error("Overall Money shouldnt be zero")
        }

        // checking for balance

        const totalAmount = user.amount + amountToAdd
        const balanceLeft = totalAmount - overallMoney;

        const newHistory = new History({
            title: `${user.name}  make payment`,
            content: `Payment of Gh${amountToAdd} was made by ${user.name}, ${totalAmount > overallMoney ? `and a balance of Gh${balanceLeft} will be given to` : "Dept cleared"} `
        })

        // Add the new amount to the existing amount
        user.amount += amountToAdd;
        user.cardNumber += maxCard + 1;

        if (balanceLeft > 0) {
            user.balance += balanceLeft;
        }


        // Set the payed field to true
        user.payed = true;

        // Save the updated user object to the database
        await user.save();
        await newHistory.save();

        console.log("Amount added successfully for user:", user.name);
    } catch (error) {
        console.error("Error adding amount to user:", error);
        throw error;
    }
}



export async function payUserBalance(userId: string, amountToAdd: number): Promise<void> {
    await connectToDB();
    try {
        // Find the user by their ID
        const user: IUser | null = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }
        const newHistory = new History({
            title: `Balance provided to ${user.name} `,
            content: `Balance of Gh${amountToAdd} was pay to ${user.name}, debt cleared`
        })

        user.amount -= amountToAdd;
        user.balance -= amountToAdd;

        await user.save()
        await newHistory.save();
        console.log("Balance Payed successfully for user:", user.name);

    } catch (error) {
        console.error("Error adding amount to user:", error);
        throw error;
    }

}


export async function resetUser(userId: string): Promise<void> {
    await connectToDB();
    try {
        // Find the user by their ID
        const user: IUser | null = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        // Return the amount,balance and card number to default values
        user.amount = 0;
        user.balance = 0;
        user.cardNumber = 0;

        // Set the payed field and carStatus field to false as defualt values
        user.payed = false;
        user.carStatus = false;

        // Save the updated user object to the database
        await user.save();

        console.log("User was reset sucessfully:", user.name);
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
