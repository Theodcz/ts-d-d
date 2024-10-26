import { Maitrise } from "./Maitrise";

export class EspecePersonnage {
  private id: string;
  private nom: string;
  private taille: string;
  private maitrises: Maitrise;
  private langues: Array<string>;
  private traits: Array<string>;
  private bonusCaracteristiques: Array<{ caracteristique: string; bonus: number }>;

  constructor(
    id: string,
    nom: string,
    taille: string,
    maitrises: Maitrise,
    langues: Array<string>,
    traits: Array<string>,
    bonusCaracteristiques: Array<{ caracteristique: string; bonus: number }>,
  ) {
    this.id = id;
    this.nom = nom;
    this.taille = taille;
    this.maitrises = maitrises;
    this.langues = langues;
    this.traits = traits;
    this.bonusCaracteristiques = bonusCaracteristiques;
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

  getMaitrises(): Maitrise {
    return this.maitrises;
  }

  getLangues(): Array<string> {
    return this.langues;
  }

  getTraits(): Array<string> {
    return this.traits;
  }

  getBonusCaracteristiques(): Array<{ caracteristique: string; bonus: number }> {
    return this.bonusCaracteristiques;
  }

  getBonusCaracteristique(caracteristique: string): number {
    return this.bonusCaracteristiques.find((bonus) => bonus.caracteristique === caracteristique)?.bonus || 0;
  }
}
