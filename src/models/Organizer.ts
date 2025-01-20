import mongoose, { Model, Schema } from 'mongoose';

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

export type OrganizerObject = mongoose.InferSchemaType<typeof OrganizerSchema>;

export const Organizer: Model<typeof OrganizerSchema> = mongoose.models.Organizer || mongoose.model('Organizer', OrganizerSchema, 'organizers');