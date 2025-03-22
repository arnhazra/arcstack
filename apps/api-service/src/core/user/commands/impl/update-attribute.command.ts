export enum AttributeNames {
  ReduceCarbonEmissions = "reduceCarbonEmissions",
  ActivityLog = "activityLog",
  Name = "name",
}

export class UpdateAttributeCommand {
  constructor(
    public readonly userId: string,
    public readonly attributeName: AttributeNames,
    public readonly attributeValue: string
  ) {}
}
