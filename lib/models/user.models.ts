import { Document, model } from "mongoose";
import { Schema, models } from "mongoose";

export interface IUser extends Document{
    _id:string;
    name:string;
    phone:string;
    carStatus:boolean;
    payed:boolean;
    amount:number;
    balance:number;
    cardNumber:number;
    createdAt:Date;
    totalAmount?:Number;
    updatedAt:Date;
}

 const UserSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    carStatus:{
        type:Boolean,
        default:false
    },
    payed:{
        type:Boolean,
        default:false
    },
    amount:{
        type:Number,
        default:0
    },
    balance:{
        type:Number,
        default:0
    },
    cardNumber:{
        type:Number,
        default:0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
})


const User = models.User || model("User", UserSchema);

export default User;