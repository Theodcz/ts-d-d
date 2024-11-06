import { Response, Request } from "express";
import { CreateCharactersProvider } from "../providers/CreateCharactersProvider";
import { InfosCharactersController } from "./InfosCharactersController";
import { PersonnagePost } from "../type/POSTtype";
export class CreateCharactersController {
  private characterProvider: CreateCharactersProvider;

  constructor() {
    this.characterProvider = new CreateCharactersProvider();
  }

  async addCharacterInfo(req: Request, res: Response) {
    try {
      const characterInfo: PersonnagePost =
        (req.body.nom,
        req.body.imageUrl,
        req.body.alignementMoral,
        req.body.alignementOrder,
        req.body.espece.id,
        req.body.espece.maitrise,
        req.body.espece.sousEspece.maitrise,
        req.body.espece.langue,
        req.body.espece.sousEspece.langue,
        req.body.classe.id,
        req.body.classe.maitrise);
      console.log("Request Body:", req.body);

      const infosCharactersController = new InfosCharactersController();

      const especeGetInfo = await infosCharactersController.getCharacterEspeceById(characterInfo.especeId);
      const classeGetInfo = await infosCharactersController.getCharacterClasseById(characterInfo.classeId);

      await this.characterProvider.addCharacterCreationInfo(characterInfo, especeGetInfo, classeGetInfo, res);
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
