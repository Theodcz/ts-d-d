import { Alignement } from "../models/Alignement";
import { JSONAlignement, JSONEspeceById } from "./JSONtype";
import { Moral, Order } from "../models/Alignement";
import { EspecePersonnage } from "../models/EspecePersonnage";
import { Maitrise } from "../models/Maitrise";
import { Langues } from "../models/Langues";
import { Traits } from "../models/Traits";
import { Bonus } from "../models/Bonus";

export class InfosCharactersAdapter {
  static fromApiResponseEspeceById(json: JSONEspeceById): EspecePersonnage {
    // partie maîtrises, check si il y a des maitrises de départ et des maitrises à définir
    const maitrisesDeDepart: { name: string }[] = [];
    const maitrisesADefinir: { choose: number; options: string[] }[] = [];

    if (json.starting_proficiencies) {
      maitrisesDeDepart.push(...json.starting_proficiencies.map((maitrise) => ({ name: maitrise.name })));
    }

    if (json.starting_proficiency_options) {
      maitrisesADefinir.push({
        choose: json.starting_proficiency_options.choose,
        options: json.starting_proficiency_options.from.options.map((option) => option.item.name),
      });
    }

    // création de l'objet maitrise

    const maitrises = new Maitrise(maitrisesDeDepart, maitrisesADefinir);

    // parties langues, check si il y a des langues de départ et des langues à définir
    const languesDeDepart: { name: string }[] = [];
    const languesADefinir: { choose: number; options: string[] }[] = [];

    if (json.languages) {
      languesDeDepart.push(...json.languages.map((langue) => ({ name: langue.name })));
    }

    if (json.language_options) {
      languesADefinir.push({
        choose: json.language_options.choose,
        options: json.language_options.from.options.map((option) => option.item.name),
      });
    }

    const langues: Langues = new Langues(languesDeDepart, languesADefinir);

    // parties traits
    const traits: { name: string }[] = [];

    json.traits.forEach((trait) => {
      traits.push({ name: trait.name });
    });

    // création de l'objet traits
    const traitsObj = new Traits(traits);

    // parties bonus
    const abilityBonus: { scoreAbilite: string; bonus: number }[] = [];

    json.ability_bonuses.forEach((bonus) => {
      abilityBonus.push({ scoreAbilite: bonus.ability_score.name, bonus: bonus.bonus });
    });

    const bonus = new Bonus(abilityBonus);

    return new EspecePersonnage(json.index, json.name, json.size, maitrises, langues, traitsObj, bonus);
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
