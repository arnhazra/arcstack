export class BaseModelResponseDto {
  _id: string
  genericName: string
  displayName: string
  description: string
  series: string
  provider: string
  parameters: string
  contextWindow: string
  isPro: boolean
  architecture: string
  defaultTemperature: number
  defaultTopP: number
  responseFormat: string
  hasWebSearchCapability: boolean
}
