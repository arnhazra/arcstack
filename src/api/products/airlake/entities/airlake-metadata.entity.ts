import mongoose from "mongoose"
import { airlakeMongoDbConn } from "../../../../utils/dbConnect"

const AirlakeDatasetMetadataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  rating: {
    type: Number,
    required: true
  }
}, { versionKey: false })

export const AirlakeDatasetMetaDataModel = airlakeMongoDbConn.model("datasetmetadata", AirlakeDatasetMetadataSchema)