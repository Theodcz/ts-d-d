export class Bonus {
  private BonusScoreAbilite: {
    scoreAbilite: string;
    bonus: number;
  }[] = [];

  constructor(BonusScoreAbilite: { scoreAbilite: string; bonus: number }[]) {
    this.BonusScoreAbilite = BonusScoreAbilite;
  }

  getBonusScoreAbilite(): { scoreAbilite: string; bonus: number }[] {
    return this.BonusScoreAbilite;
  }
}
