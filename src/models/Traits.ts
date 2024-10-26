export class Traits {
  private traits: {
    name: string;
  }[] = [];

  constructor(traits: { name: string }[]) {
    this.traits = traits;
  }

  getTraits(): { name: string }[] {
    return this.traits;
  }
}
