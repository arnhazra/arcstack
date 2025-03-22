import { User } from "@/core/user/schemas/user.schema"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({
  versionKey: false,
  collection: "apikeys",
  timestamps: { createdAt: true, updatedAt: false },
})
export class APIKey extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId

  @Prop({ required: true })
  apiKey: string
}

export const APIKeySchema = SchemaFactory.createForClass(APIKey)
