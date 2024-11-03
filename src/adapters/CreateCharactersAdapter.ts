import { Personnage } from "../models/Personnage";
import { PersonnagePost } from "models/PersonnagePost";
import { Alignement, Moral, Order } from "../models/Alignement";
import { EspecePersonnage } from "models/EspecePersonnage";
import { ClassePersonnage } from "models/ClassePersonnage";

export class CreateCharactersAdapter {
  static createCharacterFromRequestToPersonnage(
    characterInfo: PersonnagePost,
    especeGetInfo: EspecePersonnage,
    classeGetInfo: ClassePersonnage,
  ): Personnage | null {
    try {
      // Valider et transformer l'alignement
      const alignement = new Alignement(
        Moral[characterInfo.getAlignementMoral() as keyof typeof Moral],
        Order[characterInfo.getAlignementOrder() as keyof typeof Order],
      );

      // Créer le personnage
      return new Personnage(
        characterInfo.getNom(),
        characterInfo.getImageUrl(),
        alignement,
        especeGetInfo,
        classeGetInfo,
      );
    } catch (error) {
      console.error("Erreur lors de la création du personnage:", error);
      return null;
    }
  }
}
