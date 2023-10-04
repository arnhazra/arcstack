import mongoose from "mongoose"
import { masterDb, replicaDb } from "../../../../utils/dbConnect"

const AirlakeDatasetDataSchema = new mongoose.Schema({
  datasetRelationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "airlakedatasetsmetadata",
    required: true
  },

  data: {
    type: Object,
    required: true
  }
}, { versionKey: false })


const MasterAirlakeDatasetDataModel = masterDb.model("airlakedatasetsdata", AirlakeDatasetDataSchema)
const ReplicaAirlakeDatasetDataModel = replicaDb.model("airlakedatasetsdata", AirlakeDatasetDataSchema)

export { MasterAirlakeDatasetDataModel, ReplicaAirlakeDatasetDataModel }