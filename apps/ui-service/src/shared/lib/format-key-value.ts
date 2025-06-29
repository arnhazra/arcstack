export const excludedKeys = [
  "_id",
  "description",
  "displayName",
  "genericName",
  "isPro",
]

export function formatKey(key: string) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase())
}

export function formatValue(value: any) {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No"
  }
  return String(value)
}
