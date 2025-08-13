import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export interface Pokemon {
  id: number;
  name: string;
  height: number; // decimeters
  weight: number; // hectograms
  base_experience: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
    other?: {
      dream_world?: { front_default: string | null };
      home?: { front_default: string | null };
      [key: string]: unknown;
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  species: {
    name: string;
    url: string;
  };
  moves: Array<{ move: { name: string; url: string } }>;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonSpecies {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: { name: string };
    version?: { name: string };
  }>;
  genera: Array<{
    genus: string;
    language: { name: string };
  }>;
  evolution_chain: { url: string };
  habitat?: { name: string } | null;
  shape?: { name: string } | null;
}

export interface EvolutionChain {
  id: number;
  chain: {
    species: { name: string; url: string };
    evolves_to: EvolutionChain["chain"][];
  };
}

export const pokeApi = {
  // Get a list of Pokemon with pagination
  getPokemonList: async (
    limit: number = 20,
    offset: number = 0
  ): Promise<PokemonListResponse> => {
    const response = await axios.get(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
    return response.data;
  },

  // Get a specific Pokemon by name or ID
  getPokemon: async (identifier: string | number): Promise<Pokemon> => {
    const response = await axios.get(`${BASE_URL}/pokemon/${identifier}`);
    return response.data;
  },

  // Get Pokemon species for extra info and evolution chain URL
  getPokemonSpecies: async (
    identifier: string | number
  ): Promise<PokemonSpecies> => {
    const response = await axios.get(
      `${BASE_URL}/pokemon-species/${identifier}`
    );
    return response.data;
  },

  // Get evolution chain by URL provided by species
  getEvolutionChainByUrl: async (
    evolutionChainUrl: string
  ): Promise<EvolutionChain> => {
    const response = await axios.get(evolutionChainUrl);
    return response.data;
  },

  // Get Pokemon types
  getTypes: async () => {
    const response = await axios.get(`${BASE_URL}/type`);
    return response.data as unknown;
  },

  // Get Pokemon abilities
  getAbilities: async () => {
    const response = await axios.get(`${BASE_URL}/ability`);
    return response.data as unknown;
  },

  // Search Pokemon by name
  searchPokemon: async (query: string): Promise<PokemonListResponse> => {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=1000`);
    const allPokemon: Array<{ name: string; url: string }> =
      response.data.results;
    const filteredPokemon = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    return {
      count: filteredPokemon.length,
      next: null,
      previous: null,
      results: filteredPokemon,
    };
  },
};
