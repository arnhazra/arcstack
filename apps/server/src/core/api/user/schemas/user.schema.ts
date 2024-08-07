import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ versionKey: false, collection: "users", timestamps: { createdAt: true, updatedAt: false } })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ default: "user" })
  role: string

  @Prop({ type: Boolean, default: true })
  reduceCarbonEmissions: boolean

  @Prop({ type: Boolean, default: true })
  usageInsights: boolean

  @Prop({ type: Types.ObjectId, ref: "organization" })
  selectedOrgId: Types.ObjectId
}

export const UserSchema = SchemaFactory.createForClass(User)
