import { JetSauvegarde } from "./JetSauvegarde";
import { Maitrise } from "./Maitrise";
import { Sort } from "./Sort";

export class ClassePersonnage {
  private id: string;
  private nom: string;
  private maitrises: Maitrise;
  private jetsDeSauvegarde: JetSauvegarde[];
  private sort: Sort;

  constructor(id: string, nom: string, maitrises: Maitrise, jetsDeSauvegarde: JetSauvegarde[], sort: Sort) {
    this.id = id;
    this.nom = nom;
    this.maitrises = maitrises;
    this.jetsDeSauvegarde = jetsDeSauvegarde;
    this.sort = sort;
  }

  public getId(): string {
    return this.id;
  }

  public getNom(): string {
    return this.nom;
  }

  public getMaitrises(): Maitrise {
    return this.maitrises;
  }

  public getJetsDeSauvegarde(): JetSauvegarde[] {
    return this.jetsDeSauvegarde;
  }

  public getSort(): Sort {
    return this.sort;
  }

  public setSord(sort: Sort) {
    this.sort = sort;
  }
}
