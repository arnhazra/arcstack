export class CreateThreadCommand {
  constructor(
    public readonly threadId: string,
    public readonly prompt: string,
    public readonly response: string
  ) {}
}
