import { Schema, model, models } from "mongoose";

const PeriodSchema =  new Schema({
    date:{
        type:String,
        require:true
    }
})

const Period = models.Period || model("Period",PeriodSchema);

export default Period;