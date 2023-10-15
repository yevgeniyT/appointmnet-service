import mongoose from "mongoose";

export interface IUrl extends Document {
    originalUrl: string;
    shortCode: string;
    createdAt?: Date;
}
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UrlModel = mongoose.model<IUrl>("Url", urlSchema);

export default UrlModel;
