import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ versionKey: false, collection: "models" })
export class Model extends Document {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  category: string

  @Prop({ type: Types.ObjectId, ref: "basemodels", required: true })
  baseModel: Types.ObjectId

  @Prop({ required: true })
  isFineTuned: boolean

  @Prop({ required: true })
  promptStyle: string

  @Prop({ required: true })
  systemPrompt: string

  @Prop({ required: true })
  isPro: boolean

  @Prop({ required: true })
  responseFormat: string
}

export const ModelSchema = SchemaFactory.createForClass(Model)
