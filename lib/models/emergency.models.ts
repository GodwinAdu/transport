
import { Schema, model, models,Document } from "mongoose";

export interface IEmergency extends Document {
    _id:string;
    amount:number;
}


const EmergencySchema = new Schema({
    amount:{
        type:Number,
        default:0,
        require:true
    },
});

const Emergency = models.Emergency || model("Emergency",EmergencySchema);

export default Emergency