import { JSONAlignement, JSONClasse, JSONEspece } from "./JSONtype";

export type JSONPersonnage = {
  nom: string;
  imageUrl: string;
  espece: JSONEspece;
  alignement: JSONAlignement;
  classe: JSONClasse;
};
