export function generateRandomKey(): string {
  const length = 8
  const chars = "abcdefghijklmnopqrstuvwxyz"
  let apiKey = ""

  for (let i = 0; i < length; i++) {
    apiKey += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return apiKey
}
