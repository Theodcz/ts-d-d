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

  static createCharacterFromRequestToPersonnage(
    characterInfo: PersonnagePost,
    especeGetInfo: EspecePersonnage,
    classeGetInfo: ClassePersonnage,
  ): Personnage | null {
    try {
      // Valider et transformer l'alignement
      const moralValue = Moral[characterInfo.getAlignementMoral() as keyof typeof Moral];
      const orderValue = Order[characterInfo.getAlignementOrder() as keyof typeof Order];

      if (!moralValue || !orderValue) {
        throw new Error("Valeurs d'alignement invalides");
      }

      const alignement = new Alignement(moralValue, orderValue);

      // Selection de la langue de l'espece
      if (especeGetInfo.getLangues().LanguesADefinir.length > 0) {
        // A VERIFIER
        especeGetInfo.setChoixLangues(
          this.selectLangues(
            characterInfo.getEspeceLangues(),
            especeGetInfo.getLangues().LanguesADefinir[0].choose,
            especeGetInfo.getLangues().LanguesADefinir[0].options,
          ),
        );
      }

      // Selection des maitrises de l'espece
      if (especeGetInfo.getMaitrises().maitriseADefinir.length > 0) {
        especeGetInfo.setChoixMaitrises(
          this.selectMaitrises(
            characterInfo.getEspeceMaitrises(),
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
                characterInfo.getSousEspeceLangues(),
                especeGetInfo.getSousEspeces().getLangues().LanguesADefinir[0].choose,
                especeGetInfo.getSousEspeces().getLangues().LanguesADefinir[0].options,
              ),
            );
        }

        // Selection des maitrises de la sous-espece si il y en a une
        if (especeGetInfo.getSousEspeces().getMaitrises().maitriseADefinir.length > 0) {
          especeGetInfo.setChoixMaitrises(
            this.selectMaitrises(
              characterInfo.getSousEspeceMaitrises(),
              especeGetInfo.getSousEspeces().getMaitrises().maitriseADefinir[0].choose,
              especeGetInfo.getSousEspeces().getMaitrises().maitriseADefinir[0].options,
            ),
          );
        }
      }

      // Selection des maitrises de la classe
      if (characterInfo.getClasseId() !== "") {
        if (classeGetInfo.getMaitrises().maitriseADefinir.length > 0) {
          classeGetInfo.setChoixMaitrises(
            this.selectMaitrises(
              characterInfo.getClasseMaitrises(),
              classeGetInfo.getMaitrises().maitriseADefinir[0].choose,
              classeGetInfo.getMaitrises().maitriseADefinir[0].options,
            ),
          );
        }
      }

      return new Personnage(
        characterInfo.getNom(),
        characterInfo.getImageUrl(),
        alignement,
        especeGetInfo,
        classeGetInfo,
      );
    } catch (error) {
      console.error("Erreur lors de la création du personnage: ", error);
      throw error;
    }
  }
}
