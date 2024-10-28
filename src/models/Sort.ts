export class Sort {
  private caractLancementSort: {
    name: string;
  }[] = [];
  private sortNiveau0: {
    name: string;
  }[] = [];

  constructor(caractLancementSort: { name: string }[], sortNiveau0: { name: string }[]) {
    this.caractLancementSort = caractLancementSort;
    this.sortNiveau0 = sortNiveau0;
  }

  public getCaractLancementSort(): { name: string }[] {
    return this.caractLancementSort;
  }

  public getSortNiveau0(): { name: string }[] {
    return this.sortNiveau0;
  }
}
