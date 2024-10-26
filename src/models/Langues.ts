export class Langues {
  LanguesDeDepart: {
    name: string;
  }[] = [];

  LanguesADefinir: {
    choose: number;
    options: string[];
  }[] = [];

  constructor(LanguesDeDepart: { name: string }[], LanguesADefinir: { choose: number; options: string[] }[]) {
    this.LanguesDeDepart = LanguesDeDepart;
    this.LanguesADefinir = LanguesADefinir;
  }
}
