import { EspecePersonnage } from "models/EspecePersonnage";
import { InfosCharactersAdapter } from "../adapters/InfosCharactersAdapter";
import { JSONAlignement, JSONAllEspece, JSONEspeceById } from "adapters/JSONtype";

export class InfosCharactersProvider {
  private baseUrl: string = "https://www.dnd5eapi.co/api";

  constructor() {}

  // lui qui fait les fetch et envoie à l'adapteur pour quil transforme en model
  async getCharacterCreationInfo() {
    return {
      personnagesDisponibles: {
        especes: await this.getAllCharacterEspece(),
        alignements: await this.getCharacterAlignement(),
      },
    };
  }

  async getAllCharacterEspece() {
    try {
      const response = await fetch(`${this.baseUrl}/races`);
      if (!response.ok) {
        throw new Error(`Erreur de l'API D&D: ${response.status}`);
      }

      const json = (await response.json()) as JSONAllEspece;

      const especesAllIds = InfosCharactersAdapter.fromApiResponseEspece(json);

      const especes: (EspecePersonnage | undefined)[] = [];

      especesAllIds.forEach(async (id) => {
        const espece = await this.getCharacterEspeceById(id);
        especes.push(espece);
      });

      return especes;
    } catch (error) {
      console.error(error);
    }
  }

  async getCharacterEspeceById(id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/races/${id}`);
      if (!response.ok) {
        throw new Error(`Erreur de l'API D&D: ${response.status}`);
      }

      const json = (await response.json()) as JSONEspeceById;
      console.log(json);

      const espece = InfosCharactersAdapter.fromApiResponseEspeceById(json);

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
