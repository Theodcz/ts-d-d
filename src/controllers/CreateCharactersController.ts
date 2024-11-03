import { Response, Request } from "express";
import { CreateCharactersProvider } from "../providers/CreateCharactersProvider";
import { InfosCharactersController } from "./InfosCharactersController";
import { PersonnagePost } from "../models/PersonnagePost";

export class CreateCharactersController {
  private characterProvider: CreateCharactersProvider;

  constructor() {
    this.characterProvider = new CreateCharactersProvider();
  }

  async addCharacterInfo(req: Request, res: Response) {
    try {
      const characterInfo = new PersonnagePost(
        req.body.nom,
        req.body.imageUrl,
        req.body.alignementMoral,
        req.body.alignementOrder,
        req.body.espece.id,
        req.body.espece.maitrises,
        req.body.espece.langues,
        req.body.classe.id,
        req.body.classe.maitrises,
      );
      console.log("Request Body:", req.body);

      const infosCharactersController = new InfosCharactersController();

      const especeGetInfo = await infosCharactersController.getCharacterEspeceById(characterInfo.getEspeceId());
      console.log("espece : ", especeGetInfo);
      const classeGetInfo = await infosCharactersController.getCharacterClasseById(characterInfo.getClasseId());
      console.log("classe : ", classeGetInfo);

      await this.characterProvider.addCharacterCreationInfo(characterInfo, especeGetInfo, classeGetInfo);
      res.json({ message: "Infos de personnage ajoutées avec succès" });
    } catch {
      res.status(500).json({ message: "Erreur dans les données du post" });
    }
  }

  async getCharacters(res: Response) {
    try {
      const characters = await this.characterProvider.getCharacters();
      res.json(characters);
    } catch {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  }
}
