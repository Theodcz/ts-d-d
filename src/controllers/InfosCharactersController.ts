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
      res.json(characterInfo);
    } catch {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  }

  // Méthode POST pour ajouter les infos de création de personnage et les sauvegarder avec node json db
  async addCharacterInfo(req: Request, res: Response) {
    try {
      const characterInfo = req.body;
      await this.characterProvider.addCharacterCreationInfo(characterInfo);
      res.json({ message: "Infos de personnage ajoutées avec succès" });
    } catch {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  }
}
