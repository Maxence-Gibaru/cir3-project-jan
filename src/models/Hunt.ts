import mongoose, { Model, Schema } from 'mongoose';
import { z } from 'zod';
import { MarkerSchema, MarkerZodSchema } from './Marker';
import { TeamSchema, TeamZodSchema } from './Team';

export const HuntZodSchema = z.object({
    _id: z.string().optional(),
    name: z.string(), // Nom de la chasse
    teams: z.array(TeamZodSchema).default([]),
    markers: z.array(MarkerZodSchema), // Un marker (en 0 c'est le trésor)
    stories: z.array(z.string()),
    organizer_id: z.string(),
    code: z.string(),
    status: z.enum(['closed', 'opened', 'started', 'ended']).default('closed'),
    max_guests: z.number(),
    max_teams: z.number(),
    map: z.object({
        lat: z.number(),
        lng: z.number(),
        zoom: z.number()
    }),
    started_at: z.date().optional(),
    created: z.date().default(new Date())
});

export type HuntZodType = z.infer<typeof HuntZodSchema>;
export interface Hunt extends Document, HuntZodType { }

const HuntSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    teams: {
        type: [TeamSchema],
        required: true
    },
    markers: {
        type: [MarkerSchema],
        required: true
    },
    stories: {
        type: [String],
        required: true
    },
    organizer_id: {
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
        enum: ['closed', 'opened', 'started', 'ended'],
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
    map: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        },
        zoom: {
            type: Number,
            required: true
        }
    },
    started_at: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false
})

export const HuntModel: Model<Hunt> = mongoose.models.Hunt || mongoose.model<Hunt>('Hunt', HuntSchema, 'hunts');
