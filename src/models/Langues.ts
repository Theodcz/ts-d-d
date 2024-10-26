export class Langues {
  LanguesDeDepart: {
    index: string[];
  };
  LanguesADefinir: {
    choose: number;
    options: string[];
  };

  constructor(LanguesDeDepart: { index: string[] }, LanguesADefinir: { choose: number; options: string[] }) {
    this.LanguesDeDepart = LanguesDeDepart;
    this.LanguesADefinir = LanguesADefinir;
  }
}
