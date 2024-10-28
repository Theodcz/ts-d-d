import { Router, Request, Response } from "express";
import { InfosCharactersController } from "./controllers/InfosCharactersController";

export const characterRouter = Router();
const infosCharactersController = new InfosCharactersController();

characterRouter.get("/getInfosFichePersonnage", (_request: Request, response: Response) => {
  infosCharactersController.getCharacterInfo(response);
});

characterRouter.post("/addInfosFichePersonnage", (request: Request, response: Response) => {
  infosCharactersController.addCharacterInfo(request, response);
});
