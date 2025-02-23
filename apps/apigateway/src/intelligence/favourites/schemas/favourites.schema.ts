import { User } from "@/core/user/schemas/user.schema"
import { DerivedModel } from "@/intelligence/derivedmodel/schemas/derivedmodel.schema"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({
  versionKey: false,
  collection: "favourites",
  timestamps: { createdAt: true, updatedAt: false },
})
export class Favourite extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  readonly userId: Types.ObjectId

  @Prop({ type: Types.ObjectId, required: true, ref: DerivedModel.name })
  readonly derivedModel: Types.ObjectId
}

export const FavouriteSchema = SchemaFactory.createForClass(Favourite)
