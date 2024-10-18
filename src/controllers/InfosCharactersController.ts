import { Response } from "express";
import { InfosCharactersProvider } from "../providers/InfosCharactersProvider";

export class InfosCharactersController {
  private characterProvider: InfosCharactersProvider;

  constructor() {
    this.characterProvider = new InfosCharactersProvider();
  }

  // Méthode GET pour récupérer les infos de création de personnage
  async getCharacterInfo(res: Response) {
    try {
      const characterInfo = await this.characterProvider.getCharacterCreationInfo();
      // console.log("get" + characterInfo);
      res.json(characterInfo);
    } catch {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  }
}
