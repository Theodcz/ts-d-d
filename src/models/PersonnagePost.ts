export class PersonnagePost {
  private nom: string;
  private imageUrl: string;
  private especeId: string;
  private especeMaitrises: string[];
  private especeLangues: string[];
  private alignementMoral: string;
  private alignementOrder: string;
  private classeId: string; // classe du personnage
  private classeMaitrises: string[];

  getNom(): string {
    return this.nom;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  getEspeceId(): string {
    return this.especeId;
  }

  getEspeceMaitrises(): string[] {
    return this.especeMaitrises;
  }

  getEspeceLangues(): string[] {
    return this.especeLangues;
  }

  getAlignementMoral(): string {
    return this.alignementMoral;
  }

  getAlignementOrder(): string {
    return this.alignementOrder;
  }

  getClasseId(): string {
    return this.classeId;
  }

  getClasseMaitrises(): string[] {
    return this.classeMaitrises;
  }

  constructor(
    nom: string,
    imageUrl: string,
    alignementMoral: string,
    alignementOrder: string,
    especeId: string, // langue et maitrise à choisir
    especeMaitrises: string[],
    especeLangues: string[],
    classeId: string,
    classeMaitrises: string[],
  ) {
    this.nom = nom;
    this.imageUrl = imageUrl;
    this.alignementMoral = alignementMoral;
    this.alignementOrder = alignementOrder;
    this.especeId = especeId;
    this.especeMaitrises = especeMaitrises;
    this.especeLangues = especeLangues;
    this.classeId = classeId;
    this.classeMaitrises = classeMaitrises;
  }

  /*
{
    nom,
    image
    espece(id) {
        liste des maitrise à choisir, langues à choisir)
    un alignement
    une classe(id, maitrise à choisir)
}
*/
}
