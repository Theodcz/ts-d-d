import db from "../database/db";
import { CreateCharactersAdapter } from "../adapters/CreateCharactersAdapter";
import { EspecePersonnage } from "../models/EspecePersonnage";
import { ClassePersonnage } from "../models/ClassePersonnage";
import { PersonnagePost } from "../models/PersonnagePost";
import { Personnage } from "../models/Personnage";

export class CreateCharactersProvider {
  async addCharacterCreationInfo(
    characterInfo: PersonnagePost,
    especeGetInfo: EspecePersonnage,
    classeGetInfo: ClassePersonnage,
  ) {
    try {
      // Ajouter les informations du personnage dans la base de données
      // comparer class personnage
      const personnage = await CreateCharactersAdapter.createCharacterFromRequestToPersonnage(
        characterInfo,
        especeGetInfo,
        classeGetInfo,
      );
      console.log("Personnage créé:", personnage);

      db.push("/characters[]", personnage, true);
      console.log("Infos de personnage sauvegardées:", characterInfo);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des infos de personnage:", error);
    }
  }
  async getCharacters(): Promise<Personnage[]> {
    try {
      // Lire tous les personnages stockés
      const characters = await db.getData("/characters");
      console.log("Personnages récupérés :", characters);
      return characters;
    } catch (error) {
      console.error("Erreur lors de la récupération des personnages:", error);
      return [];
    }
  }
}
