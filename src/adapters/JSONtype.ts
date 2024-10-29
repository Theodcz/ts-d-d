export type JSONAlignement = {
  count: number;
  results: Array<{
    index: string;
    name: string;
    url: string;
  }>;
};

export type JSONEspece = {
  count: number;
  results: Array<{
    index: string;
    name: string;
    url: string;
  }>;
};

export type JSONClasse = {
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
    name: string;
    url: string;
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
  subraces: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  url: string;
};

export type JSONSubEspeceById = {
  index: string;
  name: string;
  race: {
    index: string;
    name: string;
    url: string;
  };
  desc: string;
  ability_bonuses: {
    ability_score: {
      index: string;
      name: string;
      url: string;
    };
    bonus: number;
  }[];
  starting_proficiencies: {
    index: string;
    name: string;
    url: string;
  }[];
  languages: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  language_options: {
    choose: number;
    from: {
      option_set_type: string;
      options: {
        option_type: string;
        item: {
          index: string;
          name: string;
          url: string;
        };
      }[];
    };
    type: string;
  };
  racial_traits: {
    index: string;
    name: string;
    url: string;
  }[];
  url: string;
};

export type JSONClasseById = {
  index: string;
  name: string;
  hit_die: number;
  proficiency_choices: Array<{
    desc: string;
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
  }>;
  proficiencies: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  saving_throws: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  starting_equipment: Array<{
    equipment: {
      index: string;
      name: string;
      url: string;
    };
    quantity: number;
  }>;
  starting_equipment_options: Array<{
    desc: string;
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: Array<{
        option_type: string;
        counted_reference: {
          count: number;
          of: {
            index: string;
            name: string;
            url: string;
          };
        };
      }>;
    };
  }>;
  class_levels: string;
  multi_classing: {
    prerequisites: Array<{
      ability_score: {
        index: string;
        name: string;
        url: string;
      };
      minimum_score: number;
    }>;
    proficiencies: [];
  };
  subclasses: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  spellcasting: {
    level: number;
    spellcasting_ability: {
      index: string;
      name: string;
      url: string;
    };
    info: Array<{
      name: string;
      desc: string[];
    }>;
  };
  spells: string;
  url: string;
};

export type JSONClasseSort = {
  count: number;
  results: Array<{
    index: string;
    name: string;
    level: number;
    url: string;
  }>;
};
