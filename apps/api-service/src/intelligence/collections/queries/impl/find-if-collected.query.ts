export class FindIfCollectedQuery {
  constructor(
    public readonly userId: string,
    public readonly modelId: string
  ) {}
}
