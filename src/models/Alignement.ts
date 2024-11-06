export enum Moral {
  good = "good",
  evil = "evil",
  neutral = "neutral",
}

export enum Order {
  lawful = "lawful",
  neutral = "neutral",
  chaotic = "chaotic",
}

export class Alignement {
  private moral: Moral;
  private order: Order;

  constructor(moral: Moral, order: Order) {
    this.moral = moral;
    this.order = order;
  }

  getMoral(): Moral {
    return this.moral;
  }

  getOrder(): Order {
    return this.order;
  }

  getAlignement(): string {
    if (this.moral == Moral.neutral && this.order == Order.neutral) {
      return "neutral";
    }
    return `${this.moral}-${this.order}`;
  }
}
