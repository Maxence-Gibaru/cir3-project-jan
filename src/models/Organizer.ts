import mongoose, { Model, Schema } from 'mongoose';
import { z } from 'zod';

export const OrganizerZodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  isAdmin: z.boolean().default(false),
  event_ids: z.array(z.string()).optional(),
  created: z.date().default(() => new Date())
});

export type OrganizerZodType = z.infer<typeof OrganizerZodSchema>;
export interface Organizer extends Document, OrganizerZodType {}

const OrganizerSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  event_ids: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }],
  created: {
    type: Date,
    default: Date.now
  }
}, {
  // Ceci permettra d'avoir un _id par défaut généré par MongoDB
  timestamps: false
})
export const OrganizerModel: Model<Organizer> = mongoose.models.Organizer || mongoose.model<Organizer>('Organizer', OrganizerSchema, 'organizers');