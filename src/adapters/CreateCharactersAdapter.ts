import { Personnage } from "../models/Personnage";
import { PersonnagePost } from "../type/POSTtype";
import { Alignement, Moral, Order } from "../models/Alignement";
import { EspecePersonnage } from "models/EspecePersonnage";
import { ClassePersonnage } from "models/ClassePersonnage";

export class CreateCharactersAdapter {
  static selectLangues(langues: string[], nbLangues: number, languesOptions: string[]): string[] {
    const languesSelected: string[] = [];

    for (let i = 0; i < nbLangues; i++) {
      if (!languesOptions.includes(langues[i])) {
        throw new Error("La langue séléctionnée est incorrecte: " + langues[i]);
      }
      languesSelected.push(langues[i]);
    }
    return languesSelected;
  }

  static selectMaitrises(maitrises: string[], nbMaitrises: number, maitrisesOptions: string[]) {
    const maitrisesSelected: string[] = [];
    const maitrisesOptionsRefactor = maitrisesOptions.map((maitrise) => maitrise.replace("Skill: ", ""));

    for (let i = 0; i < nbMaitrises; i++) {
      if (!maitrisesOptionsRefactor.includes(maitrises[i])) {
        throw new Error("La maitrise séléctionnée est incorrecte: " + maitrises[i]);
      }
      maitrisesSelected.push(maitrises[i]);
    }
    return maitrisesSelected;
  }

  static validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static createCharacterFromRequestToPersonnage(
    characterInfo: PersonnagePost,
    especeGetInfo: EspecePersonnage,
    classeGetInfo: ClassePersonnage,
  ): Personnage | null {
    try {
      // Vérifier que l'imageUrl est une URL valide
      if (!this.validateUrl(characterInfo.imageUrl)) {
        throw new Error("L'URL de l'image est invalide: " + characterInfo.imageUrl);
      }

      // Valider et transformer l'alignement
      const moralValue = Moral[characterInfo.alignementMoral as keyof typeof Moral];
      const orderValue = Order[characterInfo.alignementOrder as keyof typeof Order];

      if (!moralValue || !orderValue) {
        throw new Error("Valeurs d'alignement invalides");
      }

      const alignement = new Alignement(moralValue, orderValue);

      // Selection de la langue de l'espece
      if (especeGetInfo.getLangues().LanguesADefinir.length > 0) {
        // A VERIFIER
        especeGetInfo.setChoixLangues(
          this.selectLangues(
            characterInfo.especeLangues,
            especeGetInfo.getLangues().LanguesADefinir[0].choose,
            especeGetInfo.getLangues().LanguesADefinir[0].options,
          ),
        );
      }

      // Selection des maitrises de l'espece
      if (especeGetInfo.getMaitrises().maitriseADefinir.length > 0) {
        especeGetInfo.setChoixMaitrises(
          this.selectMaitrises(
            characterInfo.especeMaitrises,
            especeGetInfo.getMaitrises().maitriseADefinir[0].choose,
            especeGetInfo.getMaitrises().maitriseADefinir[0].options,
          ),
        );
      }

      if (especeGetInfo.getSousEspeces().getId() !== "") {
        // Selection de la langue de la sous-espece si il y en a une
        if (especeGetInfo.getSousEspeces().getLangues().LanguesADefinir.length > 0) {
          especeGetInfo
            .getSousEspeces()
            .setChoixLangues(
              this.selectLangues(
                characterInfo.sousEspeceLangues,
                especeGetInfo.getSousEspeces().getLangues().LanguesADefinir[0].choose,
                especeGetInfo.getSousEspeces().getLangues().LanguesADefinir[0].options,
              ),
            );
        }

        // Selection des maitrises de la sous-espece si il y en a une
        if (especeGetInfo.getSousEspeces().getMaitrises().maitriseADefinir.length > 0) {
          especeGetInfo.setChoixMaitrises(
            this.selectMaitrises(
              characterInfo.sousEspeceMaitrises,
              especeGetInfo.getSousEspeces().getMaitrises().maitriseADefinir[0].choose,
              especeGetInfo.getSousEspeces().getMaitrises().maitriseADefinir[0].options,
            ),
          );
        }
      }

      // Selection des maitrises de la classe
      if (characterInfo.classeId !== "") {
        if (classeGetInfo.getMaitrises().maitriseADefinir.length > 0) {
          classeGetInfo.setChoixMaitrises(
            this.selectMaitrises(
              characterInfo.classeMaitrises,
              classeGetInfo.getMaitrises().maitriseADefinir[0].choose,
              classeGetInfo.getMaitrises().maitriseADefinir[0].options,
            ),
          );
        }
      }

      return new Personnage(characterInfo.nom, characterInfo.imageUrl, alignement, especeGetInfo, classeGetInfo);
    } catch (error) {
      console.error("Erreur lors de la création du personnage: ", error);
      throw error;
    }
  }
}
