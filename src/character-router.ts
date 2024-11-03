import { Router, Request, Response } from "express";
import { InfosCharactersController } from "./controllers/InfosCharactersController";
import { CreateCharactersController } from "./controllers/CreateCharactersController";
export const characterRouter = Router();
const infosCharactersController = new InfosCharactersController();
const createCharactersController = new CreateCharactersController();

characterRouter.get("/getInfosFichePersonnage", (_request: Request, response: Response) => {
  infosCharactersController.getCharacterInfo(response);
});

characterRouter.get("/getFichesPersonnages", (_request: Request, response: Response) => {
  createCharactersController.getCharacters(response);
});

characterRouter.post("/addInfosFichePersonnage", (request: Request, response: Response) => {
  createCharactersController.addCharacterInfo(request, response);
});
