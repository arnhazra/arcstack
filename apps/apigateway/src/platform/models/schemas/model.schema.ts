import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ versionKey: false, collection: "models" })
export class Model extends Document {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  category: string

  @Prop({ required: true })
  series: string

  @Prop({ required: true })
  baseModel: string

  @Prop({ required: true })
  isFineTuned: boolean

  @Prop({ required: true })
  vendor: string

  @Prop({ required: true })
  promptStyle: string

  @Prop({ required: true })
  systemPrompt: string

  @Prop({ required: true })
  isPro: boolean

  @Prop({ required: true })
  responseFormat: string

  @Prop({ required: true, default: 0.7 })
  defaultTemperature: number

  @Prop({ required: true, default: 1 })
  defaultTopP: number

  @Prop({ required: true, default: 50 })
  defaultTopK: number
}

export const ModelSchema = SchemaFactory.createForClass(Model)
