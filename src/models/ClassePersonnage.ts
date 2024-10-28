import { JetSauvegarde } from "./JetSauvegarde";

export class ClassePersonnage {
  private id: number;
  private nom: string;
  private maitrises: string[];
  private maitrisesAChoisir: number;
  private jetsDeSauvegarde: JetSauvegarde;
  private caractSort: string;
  private sortsNiveau0: string[];

  constructor(
    id: number,
    nom: string,
    maitrises: string[],
    maitrisesAChoisir: number,
    jetsDeSauvegarde: JetSauvegarde,
    caractSort: string,
    sortsNiveau0: string[],
  ) {
    this.id = id;
    this.nom = nom;
    this.maitrises = maitrises;
    this.maitrisesAChoisir = maitrisesAChoisir;
    this.jetsDeSauvegarde = jetsDeSauvegarde;
    this.caractSort = caractSort;
    this.sortsNiveau0 = sortsNiveau0;
  }

  public getId(): number {
    return this.id;
  }

  public getNom(): string {
    return this.nom;
  }

  public getMaitrises(): string[] {
    return this.maitrises;
  }

  public getMaitrisesAChoisir(): number {
    return this.maitrisesAChoisir;
  }

  public getJetsDeSauvegarde(): JetSauvegarde {
    return this.jetsDeSauvegarde;
  }

  public getCaractSort(): string {
    return this.caractSort;
  }

  public getSortsNiveau0(): string[] {
    return this.sortsNiveau0;
  }
}
