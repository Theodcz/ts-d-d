export class Sort {
  private caractLancementSort: {
    name: string;
  }[] = [];
  private sortNiveau0: string;

  constructor(
    caractLancementSort: {
      name: string;
    }[],
    sortNiveau0: string,
  ) {
    this.caractLancementSort = caractLancementSort;
    this.sortNiveau0 = sortNiveau0;
  }

  public getCaractLancementSort(): {
    name: string;
  }[] {
    return this.caractLancementSort;
  }

  public getSortNiveau0(): string {
    return this.sortNiveau0;
  }
}
