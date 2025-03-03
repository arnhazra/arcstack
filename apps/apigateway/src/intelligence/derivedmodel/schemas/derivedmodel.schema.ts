import { User } from "@/core/user/schemas/user.schema"
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

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  modelOwner: Types.ObjectId

  @Prop({ required: true, default: true })
  isFineTuned: boolean

  @Prop({ required: true })
  systemPrompt: string

  @Prop({ required: true, default: "text" })
  responseFormat: string

  @Prop({ required: true, default: false })
  hasWebSearchCapability: boolean

  @Prop({ required: true })
  isPublic: boolean
}

export const DerivedModelSchema = SchemaFactory.createForClass(DerivedModel)
