import { Schema, model, models } from "mongoose";

const HistorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    }
})

const History = models.History || model("History", HistorySchema);

export default History;