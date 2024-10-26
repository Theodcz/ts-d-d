import { Alignement } from "../models/Alignement";
import { JSONAlignement, JSONEspeceById } from "./JSONtype";
import { Moral, Order } from "../models/Alignement";
import { EspecePersonnage } from "../models/EspecePersonnage";
import { Maitrise } from "../models/Maitrise";
import { Langues } from "../models/Langues";
import { Traits } from "../models/Traits";

export class InfosCharactersAdapter {
  static fromApiResponseEspeceById(json: JSONEspeceById): EspecePersonnage {
    // partie maîtrises
    const maitrisesDeDepart: { index: string[] } = { index: [] };
    const maitrisesADefinir: { choose: number; options: string[] } = { choose: 0, options: [] };

    if (json.starting_proficiencies) {
      maitrisesDeDepart.index = json.starting_proficiencies.map((maitrise) => maitrise.index);
    }

    if (json.starting_proficiency_options) {
      maitrisesADefinir.choose = json.starting_proficiency_options.choose;
      maitrisesADefinir.options = json.starting_proficiency_options.from.options.map((option) => option.item.index);
    }

    const maitrises = new Maitrise(maitrisesDeDepart, maitrisesADefinir);

    // parties langues
    const languesDeDepart: { index: string[] } = { index: [] };
    const languesADefinir: { choose: number; options: string[] } = { choose: 0, options: [] };

    if (json.starting_proficiencies) {
      languesDeDepart.index = json.languages.map((langue) => langue.index);
    }

    if (json.language_options) {
      languesADefinir.choose = json.language_options.choose;
      languesADefinir.options = json.language_options.from.options.map((option) => option.item.index);
    }

    // parties traits
    const traits: Traits = new Traits(json.traits.map((trait) => trait.name));

    const langues = new Langues(languesDeDepart, languesADefinir);

    return new EspecePersonnage(json.index, json.name, json.size, maitrises, langues, traits, []);
  }

  static fromApiResponseAlignement(json: JSONAlignement): string[] {
    const alignements: string[] = [];

    json.results.forEach((result) => {
      if (result.index == "neutral") {
        alignements.push(new Alignement(Moral.Neutre, Order.Neutre).getAlignement());
      }

      if (result.index == "lawful-good") {
        alignements.push(new Alignement(Moral.Bon, Order.Loyal).getAlignement());
      }

      if (result.index == "lawful-neutral") {
        alignements.push(new Alignement(Moral.Neutre, Order.Loyal).getAlignement());
      }

      if (result.index == "lawful-evil") {
        alignements.push(new Alignement(Moral.Mauvais, Order.Loyal).getAlignement());
      }

      if (result.index == "neutral-good") {
        alignements.push(new Alignement(Moral.Bon, Order.Neutre).getAlignement());
      }

      if (result.index == "neutral-evil") {
        alignements.push(new Alignement(Moral.Mauvais, Order.Neutre).getAlignement());
      }

      if (result.index == "chaotic-good") {
        alignements.push(new Alignement(Moral.Bon, Order.Chaotique).getAlignement());
      }

      if (result.index == "chaotic-neutral") {
        alignements.push(new Alignement(Moral.Neutre, Order.Chaotique).getAlignement());
      }

      if (result.index == "chaotic-evil") {
        alignements.push(new Alignement(Moral.Mauvais, Order.Chaotique).getAlignement());
      }
    });

    return alignements;
  }
}
