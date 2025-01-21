import { Schema } from "mongoose";

const GuestSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export const TeamSchema = new Schema({
    hints_order: {
        type: [Number],
        default: []
    },
    current_hint_index: {
        type: Number,
        default: 0
    },
    guests: {
        type: [GuestSchema],
        default: []
    },
    created: {
        type: Date,
        default: Date.now
    }
});

