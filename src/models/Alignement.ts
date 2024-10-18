export enum Moral {
  Bon = "good",
  Mauvais = "evil",
  Neutre = "neutral",
}

export enum Order {
  Loyal = "lawful",
  Neutre = "neutral",
  Chaotique = "chaotic",
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
    if (this.moral == Moral.Neutre && this.order == Order.Neutre) {
      return "neutral";
    }
    return `${this.moral}-${this.order}`;
  }
}
