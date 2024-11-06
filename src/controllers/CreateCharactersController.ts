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
      const characterInfo: PersonnagePost = {
        nom: req.body.nom,
        imageUrl: req.body.imageUrl,
        alignementMoral: req.body.alignementMoral,
        alignementOrder: req.body.alignementOrder,
        especeId: req.body.espece.id,
        especeMaitrises: req.body.espece.maitrise || [],
        sousEspeceMaitrises: req.body.espece.sousEspece ? req.body.espece.sousEspece.maitrise : [],
        especeLangues: req.body.espece.langue || [],
        sousEspeceLangues: req.body.espece.sousEspece ? req.body.espece.sousEspece.langue : [],
        classeId: req.body.classe.id || [],
        classeMaitrises: req.body.classe.maitrise || [],
      };
      console.log("Request Body:", req.body);

      const infosCharactersController = new InfosCharactersController();
      console.log("characterInfo ", characterInfo);
      const especeGetInfo = await infosCharactersController.getCharacterEspeceById(characterInfo.especeId);
      const classeGetInfo = await infosCharactersController.getCharacterClasseById(characterInfo.classeId);

      await this.characterProvider.addCharacterCreationInfo(characterInfo, especeGetInfo, classeGetInfo, res);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
      res.status(500).json({ message: errorMessage });
    }
  }

  async getCharacters(res: Response) {
    try {
      const characters = await this.characterProvider.getCharacters();
      res.json(characters);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
      res.status(500).json({ message: errorMessage });
    }
  }
}
