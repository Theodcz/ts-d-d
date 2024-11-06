import { Maitrise } from "./Maitrise";
import { Langues } from "./Langues";
import { Traits } from "./Traits";
import { Bonus } from "./Bonus";

export class SousEspece {
  private id: string;
  private nom: string;
  private maitrises: Maitrise;
  private langues: Langues;
  private traits: Traits;
  private bonus: Bonus;

  constructor(id: string, nom: string, maitrises: Maitrise, langues: Langues, traits: Traits, bonus: Bonus) {
    this.id = id;
    this.nom = nom;
    this.maitrises = maitrises;
    this.langues = langues;
    this.traits = traits;
    this.bonus = bonus;
  }

  setChoixLangues(langues: string[]): void {
    this.langues.LanguesADefinir[0].options = langues;
  }

  setChoixMaitrises(maitrises: string[]): void {
    this.maitrises.maitriseADefinir[0].options = maitrises;
  }

  getId(): string {
    return this.id;
  }

  getNom(): string {
    return this.nom;
  }

  getMaitrises(): Maitrise {
    return this.maitrises;
  }

  getLangues(): Langues {
    return this.langues;
  }

  getTraits(): Traits {
    return this.traits;
  }

  getBonus(): Bonus {
    return this.bonus;
  }
}
