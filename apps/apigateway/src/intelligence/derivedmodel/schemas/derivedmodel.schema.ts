import { User } from "@/core/user/schemas/user.schema"
import { BaseModel } from "@/intelligence/basemodel/schemas/basemodel.schema"
import { DbConnectionMap } from "@/shared/utils/db-connection.map"
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

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
    connectionName: DbConnectionMap.Core,
  })
  modelOwner: Types.ObjectId

  @Prop({ required: true })
  isFineTuned: boolean

  @Prop({ required: true })
  systemPrompt: string

  @Prop({ required: true })
  responseFormat: string

  @Prop({ required: true, default: false })
  hasWebSearchCapability: boolean
}

export const DerivedModelSchema = SchemaFactory.createForClass(DerivedModel)
