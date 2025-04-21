/**
 * Interface representing the fields in a response from the PokéAPI pokemon endpoint.
 */
export interface PokemonAPIResponse {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  held_items: {
    item: {
      name: string;
      url: string;
    };
    version_details: {
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      order: number | null;
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  past_abilities: {
    abilities: {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }[];
    generation: {
      name: string;
      url: string;
    };
  }[];
  past_types: {
    types: {
      type: {
        name: string;
        url: string;
      };
      slot: string;
    }[];
    generation: {
      name: string;
      url: string;
    };
  }[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: {
      'dream_world': {
        front_default: string | null;
        front_female: string | null;
      };
      'home': {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      'official-artwork': {
        front_default: string;
        front_shiny: string | null;
      };
      'showdown': {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    versions: {
      'generation-i': {
        'red-blue': {
          back_default: string | null;
          back_gray: string | null;
          back_transparent: string | null;
          front_default: string | null;
          front_gray: string | null;
          front_transparent: string | null;
        };
        'yellow': {
          back_default: string | null;
          back_gray: string | null;
          back_transparent: string | null;
          front_default: string | null;
          front_gray: string | null;
          front_transparent: string | null;
        };
      };
      'generation-ii': {
        crystal: {
          back_default: string | null;
          back_shiny: string | null;
          back_shiny_transparent: string | null;
          back_transparent: string | null;
          front_default: string | null;
          front_shiny: string | null;
          front_shiny_transparent: string | null;
          front_transparent: string | null;
        };
        gold: {
          back_default: string | null;
          back_shiny: string | null;
          front_default: string | null;
          front_shiny: string | null;
          front_transparent: string | null;
        };
        silver: {
          back_default: string | null;
          back_shiny: string | null;
          front_default: string | null;
          front_shiny: string | null;
          front_transparent: string | null;
        };
      };
      'generation-iii': {
        'emerald': {
          front_default: string | null;
          front_shiny: string | null;
        };
        'firered-leafgreen': {
          back_default: string | null;
          back_shiny: string | null;
          front_default: string | null;
          front_shiny: string | null;
        };
        'ruby-sapphire': {
          back_default: string | null;
          back_shiny: string | null;
          front_default: string | null;
          front_shiny: string | null;
        };
      };
      'generation-iv': {
        'diamond-pearl': {
          back_default: string | null;
          back_female: string | null;
          back_shiny: string | null;
          back_shiny_female: string | null;
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
        'heartgold-soulsilver': {
          back_default: string | null;
          back_female: string | null;
          back_shiny: string | null;
          back_shiny_female: string | null;
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
        'platinum': {
          back_default: string | null;
          back_female: string | null;
          back_shiny: string | null;
          back_shiny_female: string | null;
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
      };
      'generation-v': {
        'black-white': {
          animated: {
            back_default: string | null;
            back_female: string | null;
            back_shiny: string | null;
            back_shiny_female: string | null;
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
          };
          back_default: string | null;
          back_female: string | null;
          back_shiny: string | null;
          back_shiny_female: string | null;
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
      };
      'generation-vi': {
        'omegaruby-alphasapphire': {
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
        'x-y': {
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
      };
      'generation-vii': {
        'icons': {
          front_default: string | null;
          front_female: string | null;
        };
        'ultra-sun-ultra-moon': {
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
      };
      'generation-viii': {
        icons: {
          front_default: string | null;
          front_female: string | null;
        };
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
}

/**
 * Interface representing the fields in a response from the PokéAPI pokemon-species endpoint.
 */
export default interface SpeciesAPIResponse {
  base_happiness: number;
  capture_rate: number;
  color: {
    name: string;
    url: string;
  };
  egg_groups: {
    name: string;
    url: string;
  }[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: {
    name: string;
    url: string;
  };
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }[];
  form_descriptions: [];
  forms_switchable: boolean;
  gender_rate: number;
  genera: {
    genus: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  generation: {
    name: string;
    url: string;
  };
  growth_rate: {
    name: string;
    url: string;
  };
  habitat: {
    name: string;
    url: string;
  };
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  order: number;
  pal_park_encounters: {
    area: {
      name: string;
      url: string;
    };
    base_score: number;
    rate: number;
  }[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: {
      name: string;
      url: string;
    };
  }[];
  shape: {
    name: string;
    url: string;
  };
  varieties: {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}
/**
 * Interface representing the fields in a response from the PokéAPI types endpoint.
 */
export interface TypesAPIResponse {
  damage_relations: {
    double_damage_from: {
      name: string;
      url: string;
    }[];
    double_damage_to: {
      name: string;
      url: string;
    }[];
    half_damage_from: {
      name: string;
      url: string;
    }[];
    half_damage_to: {
      name: string;
      url: string;
    }[];
    no_damage_from: {
      name: string;
      url: string;
    }[];
    no_damage_to: {
      name: string;
      url: string;
    }[];
  };
  game_indices: {
    game_index: number;
    generation: {
      name: string;
      url: string;
    };
  }[];
  generation: {
    name: string;
    url: string;
  };
  id: number;
  move_damage_class: {
    name: string;
    url: string;
  } | null;
  moves: {
    name: string;
    url: string;
  }[];
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  past_damage_relations: {
    damage_relations: {
      double_damage_from: {
        name: string;
        url: string;
      }[];
      double_damage_to: {
        name: string;
        url: string;
      }[];
      half_damage_from: {
        name: string;
        url: string;
      }[];
      half_damage_to: {
        name: string;
        url: string;
      }[];
      no_damage_from: {
        name: string;
        url: string;
      }[];
      no_damage_to: {
        name: string;
        url: string;
      }[];
    };
    generation: {
      name: string;
      url: string;
    };
  }[];
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
  sprites: {
    'generation-iii': {
      'colosseum': {
        name_icon: string | null;
      };
      'emerald': {
        name_icon: string | null;
      };
      'firered-leafgreen': {
        name_icon: string | null;
      };
      'ruby-saphire': {
        name_icon: string | null;
      };
      'xd': {
        name_icon: string | null;
      };
    };
    'generation-iv': {
      'diamond-pearl': {
        name_icon: string | null;
      };
      'heartgold-soulsilver': {
        name_icon: string | null;
      };
      'platinum': {
        name_icon: string | null;
      };
    };
    'generation-ix': {
      'scarlet-violet': {
        name_icon: string | null;
      };
    };
    'generation-v': {
      'black-2-white-2': {
        name_icon: string | null;
      };
      'black-white': {
        name_icon: string | null;
      };
    };
    'generation-vi': {
      'omega-ruby-alpha-sapphire': {
        name_icon: string | null;
      };
      'x-y': {
        name_icon: string | null;
      };
    };
    'generation-vii': {
      'lets-go-pikachu-lets-go-eevee': {
        name_icon: string | null;
      };
      'sun-moon': {
        name_icon: string | null;
      };
      'ultra-sun-ultra-moon': {
        name_icon: string | null;
      };
    };
    'generation-viii': {
      'brilliant-diamond-and-shining-pearl': {
        name_icon: string | null;
      };
      'legends-arceus': {
        name_icon: string | null;
      };
      'sword-shield': {
        name_icon: string | null;
      };
    };
  };
}

/**
 * Interface representing the fields in a response from the PokéAPI version endpoint.
 */
export interface VersionAPIResponse {
  id: number;
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  version_group: {
    name: string;
    url: string;
  };
}

/**
 * Interface representing the fields in a response from the PokéAPI generation endpoint.
 */
export interface GenerationAPIResponse {
  abilities: {
    name: string;
    url: string;
  }[];
  id: number;
  main_region: {
    name: string;
    url: string;
  };
  moves: {
    name: string;
    url: string;
  }[];
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_species: {
    name: string;
    url: string;
  }[];
  types: {
    name: string;
    url: string;
  }[];
  version_groups: {
    name: string;
    url: string;
  }[];
}

export interface EvolutionChainAPIResponse {
  evolution_details: {
    gender: number | null;
    held_item: {
      name: string;
      url: string;
    } | null;
    item: {
      name: string;
      url: string;
    } | null;
    known_move: {
      name: string;
      url: string;
    } | null;
    known_move_type: {
      name: string;
      url: string;
    } | null;
    location: {
      name: string;
      url: string;
    } | null;
    min_affection: number | null;
    min_beauty: number | null;
    min_happiness: number | null;
    min_level: number | null;
    needs_overworld_rain: boolean;
    party_species: {
      name: string;
      url: string;
    } | null;
    party_type: {
      name: string;
      url: string;
    } | null;
    relative_physical_stats: number | null;
    time_of_day: string;
    trade_species: {
      name: string;
      url: string;
    } | null;
    trigger: {
      name: string;
      url: string;
    } | null;
    turn_upside_down: boolean;
  }[];
  evolves_to: EvolutionChainAPIResponse[];
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
}

export interface EvolutionAPIResponse {
  baby_trigger_item: {
    name: string;
    url: string;
  } | null;
  chain: EvolutionChainAPIResponse;
  id: number;
}

export type APIResponse =
  | PokemonAPIResponse
  | SpeciesAPIResponse
  | EvolutionAPIResponse
  | GenerationAPIResponse;
