import { Personnage } from "../models/Personnage";
import { PersonnagePost } from "../type/POSTtype";
import { Alignement, Moral, Order } from "../models/Alignement";
import { EspecePersonnage } from "../models/EspecePersonnage";
import { ClassePersonnage } from "../models/ClassePersonnage";
import { SousEspece } from "../models/SousEspece";
import { Maitrise } from "../models/Maitrise";
import { Langues } from "../models/Langues";
import { Traits } from "../models/Traits";
import { Bonus } from "../models/Bonus";

export class CreateCharactersAdapter {
  static selectLangues(langues: string[], nbLangues: number, languesOptions: string[]): string[] {
    const languesSelected: string[] = [];

    if (
      (langues.length == 0 && nbLangues > 0) ||
      (langues.length > 0 && nbLangues == 0) ||
      langues.length != nbLangues
    ) {
      throw new Error("Merci de sélectionner le bon nombre de langues");
    }

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

    if (
      (maitrises.length == 0 && nbMaitrises > 0) ||
      (maitrises.length > 0 && nbMaitrises == 0) ||
      maitrises.length != nbMaitrises
    ) {
      throw new Error("Merci de sélectionner le bon nombre de maitrise");
    }

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
    characterName: Personnage | null,
  ): Personnage | null {
    try {
      if (!this.validateUrl(characterInfo.imageUrl)) {
        throw new Error("L'URL de l'image est invalide: " + characterInfo.imageUrl);
      }

      if (characterInfo.sousEspeceId !== especeGetInfo.getSousEspeces().getId()) {
        throw new Error("La sous-espece n'existe pas pour cette espece");
      }

      if (characterInfo.nom === "") {
        throw new Error("Le nom du personnage est vide");
      }

      if (characterName !== null) {
        throw new Error("Le nom du personnage existe déjà");
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

      if (characterInfo.sousEspeceId !== "") {
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
      } else {
        const maitriseNull = new Maitrise([], []);
        const languesNull = new Langues([], []);
        const traitsNull = new Traits([]);
        const bonusNull = new Bonus([]);
        const sousEspeceNull = new SousEspece("", "", maitriseNull, languesNull, traitsNull, bonusNull);

        especeGetInfo.setSousEspeces(sousEspeceNull);
      }

      // Selection des maitrises de la classe
      if (classeGetInfo.getMaitrises().maitriseADefinir.length > 0) {
        classeGetInfo.setChoixMaitrises(
          this.selectMaitrises(
            characterInfo.classeMaitrises,
            classeGetInfo.getMaitrises().maitriseADefinir[0].choose,
            classeGetInfo.getMaitrises().maitriseADefinir[0].options,
          ),
        );
      }

      return new Personnage(characterInfo.nom, characterInfo.imageUrl, alignement, especeGetInfo, classeGetInfo);
    } catch (error) {
      console.error("Erreur lors de la création du personnage: ", error);
      throw error;
    }
  }
}
