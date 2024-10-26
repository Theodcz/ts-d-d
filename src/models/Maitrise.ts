export class Maitrise {
  maitriseDeDepart: {
    name: string;
  }[] = [];

  maitriseADefinir: {
    choose: number;
    options: string[];
  }[] = [];

  constructor(maitriseDeDepart: { name: string }[], maitriseADefinir: { choose: number; options: string[] }[]) {
    this.maitriseDeDepart = maitriseDeDepart;
    this.maitriseADefinir = maitriseADefinir;
  }
}
