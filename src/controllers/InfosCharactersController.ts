import { Response } from "express";
import { InfosCharactersProvider } from "../providers/InfosCharactersProvider";

export class InfosCharactersController {
  private characterProvider: InfosCharactersProvider;

  constructor() {
    this.characterProvider = new InfosCharactersProvider();
  }

  async getCharacterInfo(res: Response) {
    try {
      const characterInfo = await this.characterProvider.getCharacterCreationInfo();
      res.json(characterInfo);
    } catch {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  }

  async getCharacterEspeceById(id: string) {
    try {
      const reponse = await this.characterProvider.getCharacterEspeceById(id);
      if (reponse) {
        return reponse;
      } else {
        throw new Error("Response is undefined");
      }
    } catch {
      throw new Error("Erreur interne du serveur getCharacterEspeceById");
    }
  }

  async getCharacterClasseById(id: string) {
    try {
      const reponse = await this.characterProvider.getCharacterClasseById(id);
      if (reponse) {
        return reponse;
      } else {
        throw new Error("Response is undefined");
      }
    } catch {
      throw new Error("Erreur interne du serveur getCharacterEspeceById");
    }
  }
}
