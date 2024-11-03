import { Alignement } from "./Alignement";
import { ClassePersonnage } from "./ClassePersonnage";
import { EspecePersonnage } from "./EspecePersonnage";

export class Personnage {
  private nom: string;
  private imageUrl: string;
  private espece: EspecePersonnage;
  private alignement: Alignement;
  private classe: ClassePersonnage; // classe du personnage

  constructor(
    nom: string,
    imageUrl: string,
    alignement: Alignement,
    espece: EspecePersonnage, // langue et maitrise à choisir
    classe: ClassePersonnage,
  ) {
    this.nom = nom;
    this.imageUrl = imageUrl;
    this.alignement = alignement;
    this.espece = espece;
    this.classe = classe;
  }

  getNom(): string {
    return this.nom;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  getAlignement(): Alignement {
    return this.alignement;
  }

  getEspece(): EspecePersonnage {
    return this.espece;
  }

  getClasse(): ClassePersonnage {
    return this.classe;
  }

  getPersonnage(): object {
    return {
      nom: this.nom,
      imageUrl: this.imageUrl,
      alignement: this.alignement,
      espece: this.espece,
      classe: this.classe,
    };
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
