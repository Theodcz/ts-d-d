import { InfosCharactersAdapter } from "../adapters/InfosCharactersAdapter";
import { JSONAlignement } from "adapters/JSONtype";

export class InfosCharactersProvider {
  private baseUrl: string = "https://www.dnd5eapi.co/api";

  constructor() {}

  // lui qui fait les fetch et envoie à l'adapteur pour quil transforme en model
  async getCharacterCreationInfo() {
    return {
      personnagesDisponibles: {
        especes: await this.getCharacterEspece(),
        alignements: await this.getCharacterAlignement(),
      },
    };
  }

  async getCharacterEspece() {
    try {
      const response = await fetch(`${this.baseUrl}/races`);
      if (!response.ok) {
        throw new Error(`Erreur de l'API D&D: ${response.status}`);
      }

      const json = (await response.json()) as JSONAlignement;

      const espece = InfosCharactersAdapter.fromApiResponseEspece(json);
      return espece;
    } catch (error) {
      console.error(error);
    }
  }

  async getCharacterAlignement() {
    try {
      const response = await fetch(`${this.baseUrl}/alignments`);
      if (!response.ok) {
        throw new Error(`Erreur de l'API D&D: ${response.status}`);
      }

      const json = (await response.json()) as JSONAlignement;

      const alignement = InfosCharactersAdapter.fromApiResponseAlignement(json);
      return alignement;
    } catch (error) {
      console.error(error);
    }
  }
}
