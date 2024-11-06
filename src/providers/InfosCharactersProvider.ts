import { EspecePersonnage } from "models/EspecePersonnage";
import { ClassePersonnage } from "models/ClassePersonnage";
import { InfosCharactersAdapter } from "../adapters/InfosCharactersAdapter";
import {
  JSONAlignement,
  JSONClasse,
  JSONClasseById,
  JSONClasseSort,
  JSONEspece,
  JSONEspeceById,
  JSONSubEspeceById,
} from "../type/JSONtype";

export class InfosCharactersProvider {
  private baseUrl: string = "https://www.dnd5eapi.co/api";

  constructor() {}

  // lui qui fait les fetch et envoie à l'adapteur pour quil transforme en model
  async getCharacterCreationInfo() {
    return {
      personnagesDisponibles: {
        especes: await this.getAllCharacterEspece(),
        classes: await this.getAllCharacterClasse(),
        alignements: await this.getCharacterAlignement(),
      },
    };
  }

  async getAllCharacterEspece() {
    try {
      console.log("szjeezjdjzso");
      const response = await fetch(`${this.baseUrl}/races`);
      if (!response.ok) {
        throw new Error(`Erreur de l'API D&D: ${response.status}`);
      }

      const json = (await response.json()) as JSONEspece;

      const especesAllIds = json.results.map((espece) => espece.index);

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

      const subRaces = json.subraces.map((subRace) => subRace.index);

      if (subRaces.length === 0) {
        const espece = InfosCharactersAdapter.fromApiResponseEspeceByIdNoSubRaces(json);

        return espece;
      }

      const responseSubRace = await fetch(`${this.baseUrl}/subraces/${subRaces[0]}`);

      if (!responseSubRace.ok) {
        throw new Error(`Erreur de l'API D&D: ${responseSubRace.status}`);
      }

      const jsonSubRace = (await responseSubRace.json()) as JSONSubEspeceById;

      const espece = InfosCharactersAdapter.fromApiResponseEspeceById(json, jsonSubRace);

      return espece;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllCharacterClasse() {
    try {
      const response = await fetch(`${this.baseUrl}/classes`);
      if (!response.ok) {
        throw new Error(`Erreur de l'API D&D: ${response.status}`);
      }

      const json = (await response.json()) as JSONClasse;

      const classesAllIds = json.results.map((classe) => classe.index);

      const classes: (ClassePersonnage | undefined)[] = [];

      classesAllIds.forEach(async (id) => {
        const classe = await this.getCharacterClasseById(id);
        classes.push(classe);
      });

      console.log(classes);

      return classes;
    } catch (error) {
      console.error(error);
    }
  }

  async getCharacterClasseById(id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/classes/${id}`);
      if (!response.ok) {
        throw new Error(`Erreur de l'API D&D: ${response.status}`);
      }

      const json = (await response.json()) as JSONClasseById;

      const responseSort = await fetch(`${this.baseUrl}/classes/${id}/spells`);

      if (!responseSort.ok) {
        throw new Error(`Erreur de l'API D&D: ${responseSort.status}`);
      }

      const jsonSort = (await responseSort.json()) as JSONClasseSort;

      const classe = InfosCharactersAdapter.fromApiResponseClasse(json, jsonSort);

      return classe;
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
