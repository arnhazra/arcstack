import { BaseModel } from "@/intelligence/basemodel/schemas/basemodel.schema"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ versionKey: false, collection: "derivedmodels" })
export class DerivedModel extends Document {
  @Prop({ required: true })
  displayName: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  category: string

  @Prop({ type: Types.ObjectId, ref: BaseModel.name, required: true })
  baseModel: Types.ObjectId

  @Prop({ required: true })
  isFineTuned: boolean

  @Prop({ required: true })
  promptStyle: string

  @Prop({ required: true })
  systemPrompt: string

  @Prop({ required: true })
  responseFormat: string
}

export const DerivedModelSchema = SchemaFactory.createForClass(DerivedModel)
