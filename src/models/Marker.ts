import { Schema } from "mongoose";
import { z } from "zod";

export const MarkerZodSchema = z.object({
    id: z.string(), // Identifiant unique pour le qr_code
    position: z.object({ // Position sur la map
        lat: z.number(),
        lng: z.number()
    }),
    hint: z.string(), // Indice pour arriver à la position
});

export const MarkerSchema = new Schema({
    id: {
        type: String,
        required: true
    },
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