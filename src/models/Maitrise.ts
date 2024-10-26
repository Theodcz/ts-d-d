export class Maitrise {
  maitriseDeDepart: { index: string[] };

  maitriseADefinir: {
    choose: number;
    options: string[];
  };

  constructor(maitriseDeDepart: { index: string[] }, maitriseADefinir: { choose: number; options: string[] }) {
    this.maitriseDeDepart = maitriseDeDepart;
    this.maitriseADefinir = maitriseADefinir;
  }
}
