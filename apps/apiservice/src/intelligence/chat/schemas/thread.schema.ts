import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({
  versionKey: false,
  collection: "threads",
  timestamps: { createdAt: true, updatedAt: false },
})
export class Thread extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  readonly threadId: Types.ObjectId

  @Prop({ type: Types.ObjectId, required: true })
  readonly userId: Types.ObjectId

  @Prop({ required: true })
  readonly prompt: string

  @Prop({ required: true })
  readonly response: string
}

export const ThreadSchema = SchemaFactory.createForClass(Thread)
