# Guide d'utilisation de l'API de gestion de fiche personnages D&D

Réalisé par : 
- [ Da Cruz Théo ]
- [ Benault Alexandre ]
- [ Masquelier Orféo ]

## Table des matières

1. [Introduction](#introduction)
2. [Endpoints disponibles](#endpoints-disponibles)
3. [Exemples d'utilisation](#exemples-dutilisation)
   - [Récupérer toutes les informations lié à la création de personnage](#récupérer-toutes-les-informations-lié-à-la-création-de-personnage)
   - [Créer un personnage](#créer-un-personnage)
   - [Récupérer toutes les fiches personnages](#récupérer-toutes-les-fiches-personnages)
   - [Récupérer une fiche personnages par nom](#récupérer-une-fiche-personnages-par-nom)
4. [Gestion des maîtrises et langues](#gestion-des-maîtrises-et-langues)
5. [Structure de données](#structure-de-données)

---

## Introduction

Ce projet consiste en une API en TypeScript permettant de créer, gérer, récupérer et sauvegarder des fiches de personnages pour D&D 5e.

## Endpoints disponibles

- **GET** `/getInfosPersonnage` : Récupère la liste de toute les espèces, sous-espèces et classes ainsi que leurs caractéristique.
- **GET** `/getFichesPersonnages` : Récupère toute les fiches personnage créée au préalable.
- **GET** `/getFichePersonnageByName/:nom` : Récupère une fiche personnage spécifique par son nom.
- **POST** `/addFichePersonnage` : Crée une fiche personnage en fonction des informations fournies.

## Exemples d'utilisation

### Récupérer toutes les informations lié à la création de personnage

Pour qu'un utilisateur puisse créer sa fiche de personnage, il faut déjà qu'il sachent les choix que lui propose le jeu :

C'est pour cela qu'il va récupérer les informations de :

- Toutes les `espèces` disponibles avec leur id, nom, taille, sous-espèces s'il y a, liste des maîtrises, liste des maîtrises à choisir, langues, langues à choisir, traits, bonus de caractéristique et donc une sous espèce s'il y a.

- Tous les `alignements` disponibles, qu’ils concernent l’ordre ou la morale.

- Toutes les `classes` disponibles avec leur id, nom, maîtrises, maîtrises à choisir, jets de sauvegarde, la caractéristique de lancement de sort s'il y a et les sorts de niveau 0 pour cette classe.

### Exemple de requête GET `/getInfosPersonnage`

```bash
curl -X GET http://localhost:3000/getInfosPersonnage
```

### Créer un personnage

Pour créer une fiche personnage, vous devrez utiliser l'endpoint POST `/addFichePersonnage`. Avant de créer un personnage, vous pouvez récupérer toutes les informations d'espèces, sous-espèces et classes disponibles pour s'assurer de faire les bon choix via l'endpoint `/getInfosPersonnage`.

#### Exemple de requête POST `/addFichePersonnage`

Dans cette requête, **HalfElf** est un half-elf de classe **cleric** sans sous espece

```json
{
  "nom": "HalfElf",
  "imageUrl": "https://media.istockphoto.com/id/1443562748/fr/photo/mignon-chat-gingembre.jpg?s=612x612&w=0&k=20&c=ygNVVnqLk9V8BWu4VQ0D21u7-daIyHUoyKlCcx3K1E8=",
  "espece": {
    "id": "half-elf",
    "maitrise": ["History", "Intimidation"],
    "langue": ["Dwarvish"]
  },
  "alignementMoral": "neutral",
  "alignementOrder": "lawful",
  "classe": {
    "id": "cleric",
    "maitrise": ["Insight", "Medicine"]
  }
}
```

Dans cette requête, `Test` est un elf de classe `cleric` et avec une sous-espèce `high-elf`

```json
{
  "nom": "Test",
  "imageUrl": "https://media.istockphoto.com/id/1443562748/fr/photo/mignon-chat-gingembre.jpg?s=612x612&w=0&k=20&c=ygNVVnqLk9V8BWu4VQ0D21u7-daIyHUoyKlCcx3K1E8=",
  "espece": {
    "id": "elf",
    "maitrise": [],
    "langue": [],
    "sousEspece": {
      "id": "high-elf",
      "maitrise": [],
      "langue": ["Giant"]
    }
  },
  "alignementMoral": "neutral",
  "alignementOrder": "lawful",
  "classe": {
    "id": "cleric",
    "maitrise": ["Insight", "Medicine"]
  }
}
```

Dans ces exemple :

- `espece` contient l'ID de l'espèce choisie ainsi que ses compétences (`maitrise`) et langues (`langue`) à définir.
- `sousEspece` est optionnelle, si le personnage n'a pas de sous-espèce ou que vous ne souhaitez pas en mettre, cette section peut être omise.
- `classe` contient l'ID de la classe et ses compétences (`maitrise`) et langues (`langue`) à définir.

## Récupérer toutes les fiches personnages

Pour récupérer toutes les informations de chaque fiches personnages, envoyez une requête GET à `/getFichesPersonnages`.

### Exemple de requête GET `/getFichesPersonnages`

```bash
curl -X GET http://localhost:3000/getFichesPersonnages
```

La réponse contiendra une liste de toutes les fiches personnages créés avec leurs attributs complets.

## Récupérer une fiche personnages via son nom

Pour récupérer un personnage spécifique par son nom, utilisez l'endpoint GET `/getFichePersonnageByName/:nom` en remplaçant `:nom` par le nom du personnage.

### Exemple de requête GET `/getFichePersonnageByName/Test`

```bash
curl -X GET http://localhost:3000/getFichePersonnageByName/Test
```

Si le personnage existe, l'API renverra les informations complètes du personnage nommé "Elminster". Sinon, un message d'erreur indiquera que le personnage n'existe pas.

## Gestion des maîtrises et langues

Lors de la création d'un personnage, il est parfois nécessaire de choisir un nombre spécifique de maîtrises et de langues. Pour une espèce, sous-espèce ou classe donnée, l'API vérifiera :

- Si le nombre de compétences (`maitrise`) ou de langues sélectionnées correspond au nombre requis.
- Si chaque compétence ou langue sélectionnée est disponible dans les options associées.

**Remarque** : Si vous essayez de créer un personnage sans respecter les options disponibles ou le nombre requis, une erreur sera retournée.

## Structure de données

Voici les structures de données importantes utilisées dans les requêtes :

- **PersonnagePost** : Représente les informations envoyées pour créer une fiche personnage.
  - `nom` : Nom du personnage.
  - `imageUrl` : URL de l'image du personnage.
  - `alignementMoral` et `alignementOrder` : Alignement du personnage.
  - `espece` : Informations sur l'espèce du personnage (ID, maîtrises, langues, sous-espèce).
    - `sous-espèce`: Informations sur la sous-espèce du personnage (ID, maîtrises, langues).
  - `classe` : Informations sur la classe du personnage (ID, maîtrises).

Pour plus d'informations sur l'alignement ou les types de langues et de maîtrises disponibles, utilisez d'abord l'endpoints GET `getInfosPersonnage` pour récupérer les options disponibles.
