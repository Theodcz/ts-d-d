export type JSONAlignement = {
  count: number;
  results: Array<{
    index: string;
    name: string;
    url: string;
  }>;
};

export type JSONAllEspece = {
  count: number;
  results: Array<{
    index: string;
    name: string;
    url: string;
  }>;
};

export type JSONEspeceById = {
  index: string;
  name: string;
  speed: number;
  ability_bonuses: Array<{
    ability_score: {
      index: string;
      name: string;
      url: string;
    };
    bonus: number;
  }>;
  ability_bonus_options: {
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: Array<{
        option_type: string;
        ability_score: {
          index: string;
          name: string;
          url: string;
        };
        bonus: number;
      }>;
    };
  };
  alignment: string;
  age: string;
  size: string;
  size_description: string;
  starting_proficiencies: Array<{
    index: string;
  }>;
  starting_proficiency_options: {
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: Array<{
        option_type: string;
        item: {
          index: string;
          name: string;
          url: string;
        };
      }>;
    };
  };
  languages: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  language_options: {
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: Array<{
        option_type: string;
        item: {
          index: string;
          name: string;
          url: string;
        };
      }>;
    };
  };
  language_desc: string;
  traits: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  subraces: [];
  url: string;
};
