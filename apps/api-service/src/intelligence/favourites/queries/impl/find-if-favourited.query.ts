export class FindIfFavouritedQuery {
  constructor(
    public readonly userId: string,
    public readonly modelId: string
  ) {}
}
