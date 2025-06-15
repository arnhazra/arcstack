export class RemoveCollectionCommand {
  constructor(
    public readonly userId: string,
    public readonly modelId: string
  ) {}
}
