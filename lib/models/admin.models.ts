import { Document } from "mongoose";
import { model, models } from "mongoose";
import { Schema } from "mongoose";

export interface IAdmin extends Document{
    _id:string;
    username:string
}

const AdminSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    }
});

const Admin = models.Admin || model("Admin",AdminSchema);

export default Admin