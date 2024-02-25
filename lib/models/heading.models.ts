import { Schema, model, models } from "mongoose";

const HeadingSchema = new Schema({
    heading:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
});

const Heading = models.Heading || model("Heading",HeadingSchema);

export default Heading;
