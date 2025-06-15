export class CreateCollectionCommand {
  constructor(
    public readonly userId: string,
    public readonly modelId: string
  ) {}
}
