class EspecePersonnage {
    private int id;
    private string nom;
    private int taille;
    private SousEspece sousEspece;
    private Maitrise maitrises;
    private Langue langues;
    private Trait traits;
    private Bonus bonus;

    constructor(int id, string nom, int taille, SousEspece sousEspece, Maitrise maitrises, Langue langues, Trait traits, Bonus bonus) {
        this.id = id;
        this.nom = nom;
        this.taille = taille;
        this.sousEspece = sousEspece;
        this.maitrises = maitrises;
        this.langues = langues;
        this.traits = traits;
        this.bonus = bonus;
    }
}