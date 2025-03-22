export function generateApiKey(): string {
  const prefix = "ask_"
  const length = 36
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let apiKey = prefix

  for (let i = 0; i < length; i++) {
    apiKey += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return apiKey
}
