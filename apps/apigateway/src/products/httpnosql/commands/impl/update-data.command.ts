export class UpdateDataCommand {
  constructor(
    public readonly workspaceId: string,
    public readonly key: string,
    public readonly value:
      | Record<string, any>
      | Record<string, any>[]
      | string
      | string[]
  ) {}
}
