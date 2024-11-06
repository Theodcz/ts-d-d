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

  public setChoixMaitrises(maitrises: string[]): void {
    this.maitrises.maitriseADefinir[0].options = maitrises;
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

  public getNbMaitrises(): number {
    return this.maitrises.maitriseADefinir[0].choose;
  }

  public getMaitrisesOptions(): string[] {
    return this.maitrises.maitriseADefinir[0].options;
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
