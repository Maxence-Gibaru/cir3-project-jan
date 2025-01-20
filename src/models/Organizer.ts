import mongoose, { Model, Schema } from 'mongoose';

const OrganizerSchema = new Schema({
  login: {
    type: String,
    required: [true, 'Login is required'],
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

export type OrganizerObject = mongoose.InferSchemaType<typeof OrganizerSchema>;

export const Organizer = (mongoose.models.Organizer as Model<OrganizerObject>) || mongoose.model<OrganizerObject>('organizers', OrganizerSchema);