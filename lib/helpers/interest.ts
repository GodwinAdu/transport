import { calculateOverallAmount, calculateTotalAmount } from "../actions/account.actions";


function calculateGain(initialAmount: number, finalAmount: number): number {
    // Calculate the difference between the final amount and the initial amount
    const difference = finalAmount - initialAmount;

    // Return the positive difference (gain)
    return Math.max(0, difference);
}


export async function interest(): Promise<number> {
    try {
        const atHand = await calculateTotalAmount();
        const totalAmount = await calculateOverallAmount();


        return calculateGain(totalAmount,atHand)
    } catch (error) {
        console.error("Error calculating interest:", error);
        throw error;
    }
}