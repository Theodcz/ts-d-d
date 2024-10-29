import { Maitrise } from "./Maitrise";
import { Langues } from "./Langues";
import { Traits } from "./Traits";
import { Bonus } from "./Bonus";
import { SousEspece } from "./SousEspece";

export class EspecePersonnage {
  private id: string;
  private nom: string;
  private taille: string;
  private sousEspeces: SousEspece;
  private maitrises: Maitrise;
  private langues: Langues;
  private traits: Traits;
  private bonus: Bonus;

  constructor(
    id: string,
    nom: string,
    taille: string,
    sousEspeces: SousEspece,
    maitrises: Maitrise,
    langues: Langues,
    traits: Traits,
    bonus: Bonus,
  ) {
    this.id = id;
    this.nom = nom;
    this.taille = taille;
    this.sousEspeces = sousEspeces;
    this.maitrises = maitrises;
    this.langues = langues;
    this.traits = traits;
    this.bonus = bonus;
  }

  getId(): string {
    return this.id;
  }

  getNom(): string {
    return this.nom;
  }

  getTaille(): string {
    return this.taille;
  }

  getSousEspeces(): SousEspece {
    return this.sousEspeces;
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
