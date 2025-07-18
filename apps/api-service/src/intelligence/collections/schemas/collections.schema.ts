import { User } from "@/core/user/schemas/user.schema"
import { BaseModel } from "@/intelligence/basemodel/schemas/basemodel.schema"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({
  versionKey: false,
  collection: "collections",
  timestamps: { createdAt: true, updatedAt: false },
})
export class Collection extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  readonly userId: Types.ObjectId

  @Prop({ type: Types.ObjectId, required: true, ref: BaseModel.name })
  readonly baseModel: Types.ObjectId
}

export const CollectionSchema = SchemaFactory.createForClass(Collection)
