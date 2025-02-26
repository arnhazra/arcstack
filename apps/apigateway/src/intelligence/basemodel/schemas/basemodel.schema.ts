import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ versionKey: false, collection: "basemodels" })
export class BaseModel extends Document {
  @Prop({ required: true, unique: true })
  genericName: string

  @Prop({ required: true })
  displayName: string

  @Prop({ required: true })
  series: string

  @Prop({ required: true })
  provider: string

  @Prop({ required: true })
  parameters: string

  @Prop({ required: true })
  contextWindow: string

  @Prop({ required: true })
  architecture: string

  @Prop({ required: true })
  isPro: boolean

  @Prop({ required: true, default: 0.7 })
  defaultTemperature: number

  @Prop({ required: true, default: 1 })
  defaultTopP: number
}

export const BaseModelSchema = SchemaFactory.createForClass(BaseModel)
