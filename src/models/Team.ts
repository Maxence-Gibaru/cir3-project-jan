import mongoose, { Model, Schema } from "mongoose";
import { z } from "zod";

export const GuestZodSchema = z.object({
    id: z.string(),
    created: z.date().optional()
});

const GuestSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export const TeamZodSchema = z.object({
    hints_order: z.array(z.number()).default([]),
    current_hint_index: z.number().default(0), // Indice actuel (celui qu'on cherche)
    guests: z.array(GuestZodSchema).default([]),
    win_at: z.date().optional()
});

export type TeamZodType = z.infer<typeof TeamZodSchema>;
export interface Team extends Document, TeamZodType { }

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
    win_at: {
        type: Date,
        default: null
    }
});

export const TeamModel: Model<Team> = mongoose.models.Team || mongoose.model("Team", TeamSchema);