export class CreateHistoryCommand {
  constructor(
    public readonly userId: string,
    public readonly modelId: string
  ) {}
}
