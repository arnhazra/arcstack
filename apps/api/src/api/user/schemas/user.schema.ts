import { Schema } from "mongoose"

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  role: {
    type: String,
    default: "user"
  },

  privateKey: {
    type: String,
    required: true
  },

  reduceCarbonEmissions: {
    type: Boolean,
    default: true
  },

  selectedWorkspaceId: {
    type: Schema.Types.ObjectId,
    ref: "workspace"
  },

  isTrialAvailable: {
    type: Boolean,
    default: true
  }
}, { versionKey: false })
