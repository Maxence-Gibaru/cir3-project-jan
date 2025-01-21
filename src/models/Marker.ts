import { Schema } from "mongoose";

export const MarkerSchema = new Schema({
    position: {
        type: {
            lat: Number,
            lng: Number
        },
        required: true
    },
    hint: {
        type: String,
        required: true
    }
});