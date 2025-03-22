export class CreateSubscriptionCommand {
  constructor(
    public readonly userId: string,
    public readonly price: number
  ) {}
}
