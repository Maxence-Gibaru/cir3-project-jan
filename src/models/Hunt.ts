import mongoose, { Model, Schema } from 'mongoose';
import { z } from 'zod';

const GuestSchema = new Schema({
  uuid: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const TeamSchema = new Schema({
  guests: {
    type: [GuestSchema],
    default: []
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const HintSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  qr_code: {
    type: String,
    required: true
  }
});

export const HuntZodSchema = z.object({
  _id: z.string().optional(),
  teams: z.array(z.object({
    guests: z.array(z.object({
      uuid: z.string(),
      created: z.date().optional()
    })).default([]),
    created: z.date().optional()
  })).default([]),
  hints: z.array(z.object({
    content: z.string(),
    qr_code: z.string()
  })).default([]),
  story: z.array(z.string()).default([]),
  user_id: z.string(),
  code: z.string().optional(),
  status: z.enum(['closed', 'opened', 'started']).default('closed'),
  max_guests: z.number(),
  max_teams: z.number(),
  created: z.date().optional()
});

export type HuntZodType = z.infer<typeof HuntZodSchema>;
export interface Hunt extends Document, HuntZodType {}

const HuntSchema = new Schema({
  teams: {
    type: [TeamSchema],
    default: []
  },
  hints: {
    type: [HintSchema],
    default: []
  },
  story: {
    type: [String],
    default: []
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

HuntSchema.pre('save', function (next) {
  const event = this as unknown as Hunt;
  if (!event.code) {
    event.code = Math.random().toString(36).substring(7).toUpperCase();
  }
  next();
});

export const HuntModel: Model<Hunt> = mongoose.models.Hunt || mongoose.model<Hunt>('Hunt', HuntSchema, 'hunts');
