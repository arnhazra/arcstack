import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({
  versionKey: false,
  collection: "accesskeys",
  timestamps: { createdAt: true, updatedAt: false },
})
export class AccessKey extends Document {
  @Prop({ type: Types.ObjectId, ref: "user", required: true })
  userId: Types.ObjectId

  @Prop({ required: true })
  accessKey: string
}

export const AccessKeySchema = SchemaFactory.createForClass(AccessKey)
