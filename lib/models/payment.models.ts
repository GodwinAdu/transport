
import { Schema, model, models,Document } from "mongoose";

export interface IPayment extends Document {
    _id:string;
    amount:number;
}


const PaymentSchema = new Schema({
    amount:{
        type:Number,
        default:0,
        require:true
    },
});

const Payment = models.Payment || model("Payment",PaymentSchema);

export default Payment