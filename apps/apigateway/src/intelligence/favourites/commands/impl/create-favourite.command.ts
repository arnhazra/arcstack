export class CreateFavouriteCommand {
  constructor(
    public readonly userId: string,
    public readonly modelId: string
  ) {}
}
