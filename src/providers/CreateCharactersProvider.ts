import db from "../database/db";
import { CreateCharactersAdapter } from "../adapters/CreateCharactersAdapter";
import { EspecePersonnage } from "../models/EspecePersonnage";
import { ClassePersonnage } from "../models/ClassePersonnage";
import { PersonnagePost } from "../type/POSTtype";
import { Personnage } from "../models/Personnage";
import { Response } from "express";
export class CreateCharactersProvider {
  async addCharacterCreationInfo(
    characterInfo: PersonnagePost,
    especeGetInfo: EspecePersonnage,
    classeGetInfo: ClassePersonnage,
    res: Response,
  ) {
    try {
      const personnage = await CreateCharactersAdapter.createCharacterFromRequestToPersonnage(
        characterInfo,
        especeGetInfo,
        classeGetInfo,
      );

      db.push("/characters[]", personnage, true);
      res.json({ message: "Infos de personnage ajoutées avec succès" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
      res.status(500).json({ message: errorMessage });
    }
  }

  async getCharacters(): Promise<Personnage[]> {
    try {
      const characters = await db.getData("/characters");
      return characters;
    } catch (error) {
      console.error("Erreur lors de la récupération des personnages:", error);
      return [];
    }
  }
}
