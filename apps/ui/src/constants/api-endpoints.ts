import { uiConstants } from "./global-constants"

export const apiHost = process.env.NODE_ENV === "development" ? "http://localhost:8000" : `https://${uiConstants.brandName}.vercel.app`
export const uiHost = process.env.NODE_ENV === "development" ? "http://localhost:3000" : `https://${uiConstants.brandName}.vercel.app`

export const endPoints = {
  getapireference: `${apiHost}/api/apireference/get`,
  generatePassKey: `${apiHost}/api/user/generatepasskey`,
  verifyPassKey: `${apiHost}/api/user/verifypasskey`,
  userDetails: `${apiHost}/api/user/userdetails`,
  signOut: `${apiHost}/api/user/signout`,
  alchemyTransactionGateway: `${apiHost}/api/transaction/alchemy-gateway`,
  getblockTransactionGateway: `${apiHost}/api/transaction/getblock-gateway`,
  infuraTransactionGateway: `${apiHost}/api/transaction/infura-gateway`,
  quicknodetransactionGateway: `${apiHost}/api/transaction/quicknode-gateway`,
  subscribe: `${apiHost}/api/subscription/subscribe`,
  activateHobby: `${apiHost}/api/subscription/activatehobby`,
  getSubscriptionConfig: `${apiHost}/api/subscription/getsubscriptionconfig`,
  getProductConfig: `${apiHost}/api/platform/getproductconfig`,
  createWorkspace: `${apiHost}/api/workspace/create`,
  findMyWorkspaces: `${apiHost}/api/workspace/findmyworkspaces`,
  switchWorkspace: `${apiHost}/api/workspace/switch`,
  copilotGenerateEndpoint: `${apiHost}/api/products/copilot/generate`,
  datalakeFilters: `${apiHost}/api/products/datalake/filters`,
  datalakeFindDatasets: `${apiHost}/api/products/datalake/finddatasets`,
  datalakeViewDatasets: `${apiHost}/api/products/datalake/viewdataset`,
  datalakeFindSimilarDatasets: `${apiHost}/api/products/datalake/findsimilardatasets`,
  datalakeDataApi: `${apiHost}/api/products/datalake/dataapi`,
  walletCreateTx: `${apiHost}/api/products/wallet/createtx`,
  insightsCreateProject: `${apiHost}/api/products/insights/createproject`,
  insightsGetProjects: `${apiHost}/api/products/insights/getprojects`,
  insightsViewProject: `${apiHost}/api/products/insights/viewproject`,
  insightsDeleteProject: `${apiHost}/api/products/insights/deleteproject`,
  insightsCreateAnalytics: `${apiHost}/api/products/insights/createanalytics`,
  ledgerscanAnalyzer: `${apiHost}/api/products/ledgerscan/analyzer`,
  fabricCreateDb: `${apiHost}/api/products/fabric/createdb`,
  fabricGetMyDbs: `${apiHost}/api/products/fabric/getmydbs`,
  fabricViewDb: `${apiHost}/api/products/fabric/viewdbfromplatform`,
  fabricDeleteDb: `${apiHost}/api/products/fabric/deletedb`,
  fabricCreateKv: `${apiHost}/api/products/fabric/createkv`,
  fabricDeleteKv: `${apiHost}/api/products/fabric/deletekv`,
  nftstudioCreateTx: `${apiHost}/api/products/nftstudio/createtx`,
  nftstudioGetContractAddress: `${apiHost}/api/products/nftstudio/getnftcontractaddress`,
  swapCreateTx: `${apiHost}/api/products/swap/createtx`,
  swapTokenConfig: `${apiHost}/api/products/swap/getswaptokenconfig`,
  getAllActivities: `${apiHost}/api/activity/getactivities`
}