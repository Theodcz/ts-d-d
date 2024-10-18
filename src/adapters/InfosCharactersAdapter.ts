import { Alignement } from "../models/Alignement";
import { JSONAlignement, JSONEspece } from "./JSONtype";
import { Moral, Order } from "../models/Alignement";

export class InfosCharactersAdapter {
  // transforme JSON de l'api en Model
  static fromApiResponseEspece(json: JSONEspece): string[] {
    const espece: string[] = [];

    json.results.forEach((result) => {
      espece.push(result.name);
    });

    return espece;
  }

  static fromApiResponseAlignement(json: JSONAlignement): string[] {
    const alignements: string[] = [];

    json.results.forEach((result) => {
      // console.log(result);

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
