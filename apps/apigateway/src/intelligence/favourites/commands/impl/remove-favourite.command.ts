export class RemoveFavouriteCommand {
  constructor(
    public readonly userId: string,
    public readonly modelId: string
  ) {}
}
