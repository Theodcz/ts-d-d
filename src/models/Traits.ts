export class Traits {
  private traits: string[];

  constructor(traits: string[]) {
    this.traits = traits;
  }

  getTraits(): string[] {
    return this.traits;
  }
}
