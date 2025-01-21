import mongoose, { Model, Schema } from 'mongoose';
import { z } from 'zod';
import { TeamSchema } from './Team';

const HintSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
});

export const HuntZodSchema = z.object({
    _id: z.string().optional(),
    name: z.string().optional(),
    teams: z.array(z.object({
        hints_order: z.array(z.number()).default([]),
        current_hint_index: z.number().default(0),
        guests: z.array(z.object({
            id: z.string(),
            created: z.date().optional()
        })).default([]),
        created: z.date().optional()
    })).default([]),
    markers: z.array(z.object({
        id: z.string(),
        position: z.object({
            lat: z.number(),
            lng: z.number()
        }),
        next_hint: z.number(),
    })).default([]),
    stories: z.array(z.string()).default([]),
    user_id: z.string(),
    code: z.string(),
    status: z.enum(['closed', 'opened', 'started']).default('closed'),
    max_guests: z.number(),
    max_teams: z.number(),
    created: z.date().optional()
});

export type HuntZodType = z.infer<typeof HuntZodSchema>;
export interface Hunt extends Document, HuntZodType { }

const HuntSchema = new Schema({
    teams: {
        type: [TeamSchema],
        default: []
    },
    hints: {
        type: [HintSchema],
        default: []
    },
    stories: {
        type: [String],
        default: []
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Organizer',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['closed', 'opened', 'started'],
        default: 'closed'
    },
    max_guests: {
        type: Number,
        required: true
    },
    max_teams: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false
})

export const HuntModel: Model<Hunt> = mongoose.models.Hunt || mongoose.model<Hunt>('Hunt', HuntSchema, 'hunts');
