import { Alignement } from "../models/Alignement";
import { JSONAlignement, JSONEspeceById, JSONClasseById, JSONClasseSort } from "./JSONtype";
import { Moral, Order } from "../models/Alignement";
import { EspecePersonnage } from "../models/EspecePersonnage";
import { Maitrise } from "../models/Maitrise";
import { Langues } from "../models/Langues";
import { Traits } from "../models/Traits";
import { Bonus } from "../models/Bonus";
import { ClassePersonnage } from "../models/ClassePersonnage";
import { JetSauvegarde } from "../models/JetSauvegarde";
import { Sort } from "../models/Sort";

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

  static fromApiResponseClasse(json: JSONClasseById, jsonSort: JSONClasseSort): ClassePersonnage {
    // parties maitrises
    const maitrisesDeDepart: { name: string }[] = [];
    const maitrisesADefinir: { choose: number; options: string[] }[] = [];

    if (json.proficiencies) {
      maitrisesDeDepart.push(...json.proficiencies.map((maitrise) => ({ name: maitrise.name })));
    }

    if (json.proficiency_choices) {
      maitrisesADefinir.push({
        choose: json.proficiency_choices[0].choose,
        options: json.proficiency_choices[0].from.options.map((option) => option.item.name),
      });
    }

    const maitrises = new Maitrise(maitrisesDeDepart, maitrisesADefinir);

    // parties jets sauvegardes
    const jetSauvegardes: JetSauvegarde[] = [];

    if (json.saving_throws) {
      json.saving_throws.forEach((savingThrow) => {
        const jetKey = Object.keys(JetSauvegarde).find(
          (key) => JetSauvegarde[key as keyof typeof JetSauvegarde] === savingThrow.name,
        );

        if (jetKey) {
          jetSauvegardes.push(JetSauvegarde[jetKey as keyof typeof JetSauvegarde]);
        } else {
          console.log(savingThrow.name + " n'est pas une clé valide dans JetSauvegarde.");
        }
      });
    }

    // parties sorts
    const sortLancement: { name: string }[] = [];
    const sortNiveau0: { name: string }[] = [];

    if (json.spellcasting) {
      sortLancement.push({ name: json.spellcasting.spellcasting_ability.name });
    }

    // insere uniquement les sorts de niveau 0
    jsonSort.results.forEach((sort) => {
      if (sort.level == 0) {
        sortNiveau0.push({ name: sort.name });
      }
    });

    const sorts = new Sort(sortLancement, sortNiveau0);

    return new ClassePersonnage(json.index, json.name, maitrises, jetSauvegardes, sorts);
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
