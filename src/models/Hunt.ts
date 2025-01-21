import mongoose, { Model, Schema } from 'mongoose';
import { z } from 'zod';
import { MarkerSchema } from './Marker';
import { TeamSchema, TeamZodSchema } from './Team';

export const HuntZodSchema = z.object({
    _id: z.string().optional(),
    name: z.string().optional(), // Nom de la chasse
    teams: z.array(TeamZodSchema).default([]),
    markers: z.array(z.object({ // Un marker
        id: z.string(), // Identifiant unique pour le qr_code
        position: z.object({ // Position sur la map
            lat: z.number(),
            lng: z.number()
        }),
        hint: z.string(), // Indice pour arriver à la position
    })).default([]),
    stories: z.array(z.string()).default([]),
    user_id: z.string(),
    code: z.string(),
    status: z.enum(['closed', 'opened', 'started']).default('closed'),
    max_guests: z.number(),
    max_teams: z.number(),
    map: z.object({
        lat: z.number(),
        lng: z.number(),
        zoom: z.number()
    }),
    created: z.date().optional()
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
        default: []
    },
    markers: {
        type: [MarkerSchema],
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
