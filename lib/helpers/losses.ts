import { calculateOverallAmount, calculateTotalAmount } from "../actions/account.actions";

function calculateLoss(initialAmount: number, finalAmount: number): number {
    // Calculate the difference between the final amount and the initial amount
    const difference = finalAmount - initialAmount;

    // Return the negative difference (loss)
    return Math.min(0, difference);
}

export async function losses(): Promise<number> {
    try {
        const atHand = await calculateTotalAmount();
        const totalAmount = await calculateOverallAmount();
        
        return calculateLoss(totalAmount,atHand);
    } catch (error) {
        console.error("Error calculating losses:", error);
        throw error;
    }
}