import { config } from "dotenv"
config()

export const envConfig = {
  apiPort: process.env.API_PORT,
  lenstackMasterDbUri: process.env.LENSTACK_MASTER_DB_URI,
  lenstackReplicaDbUri: process.env.LENSTACK_REPLICA_DB_URI,
  redisSocketHost: process.env.REDIS_SOCKET,
  redisPassword: process.env.REDIS_PASSWORD,
  redisPort: process.env.REDIS_PORT,
  infuraApiKey: process.env.INFURA_API_KEY,
  otpKey: process.env.OTP_KEY,
  redirectUri: process.env.GCLOUD_REDIRECT_URI,
  clientId: process.env.GCLOUD_CLIENT_ID,
  clientSecret: process.env.GCLOUD_CLIENT_SECRET,
  refreshToken: process.env.GCLOUD_REFRESH_TOKEN,
  mailerEmail: process.env.MAILER_EMAIL,
  authPrivateKey: process.env.AUTH_RSA_PRIVATE_KEY,
  authPublicKey: process.env.AUTH_RSA_PUBLIC_KEY,
  tokenContractAddress: process.env.TOKEN_CONTRACT_ADDRESS,
  vendorContractAddress: process.env.VENDOR_CONTRACT_ADDRESS,
  nftContractAddress: process.env.NFT_CONTRACT_ADDRESS,
  prototypeContractAddress: process.env.PROTOTYPE_CONTRACT_ADDRESS,
  nodeEnv: process.env.NODE_ENV,
}