import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { pokeApi, PokemonListResponse } from "../services/pokeapi";

// Hook to get a list of Pokemon with pagination
export const usePokemonList = (limit: number = 20, offset: number = 0) => {
  return useQuery({
    queryKey: ["pokemon-list", limit, offset],
    queryFn: () => pokeApi.getPokemonList(limit, offset),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get infinite Pokemon list for infinite scrolling
export const useInfinitePokemonList = (limit: number = 20) => {
  return useInfiniteQuery({
    queryKey: ["pokemon-list-infinite", limit],
    queryFn: ({ pageParam = 0 }) => pokeApi.getPokemonList(limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: PokemonListResponse) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const offset = url.searchParams.get("offset");
        return offset ? parseInt(offset) : undefined;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get a specific Pokemon by name or ID
export const usePokemon = (identifier: string | number) => {
  return useQuery({
    queryKey: ["pokemon", identifier],
    queryFn: () => pokeApi.getPokemon(identifier),
    enabled: !!identifier,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to search Pokemon by name
export const usePokemonSearch = (query: string) => {
  return useQuery({
    queryKey: ["pokemon-search", query],
    queryFn: () => pokeApi.searchPokemon(query),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook to get Pokemon types
export const usePokemonTypes = () => {
  return useQuery({
    queryKey: ["pokemon-types"],
    queryFn: pokeApi.getTypes,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook to get Pokemon abilities
export const usePokemonAbilities = () => {
  return useQuery({
    queryKey: ["pokemon-abilities"],
    queryFn: pokeApi.getAbilities,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook: species
export const usePokemonSpecies = (identifier: string | number) => {
  return useQuery({
    queryKey: ["pokemon-species", identifier],
    queryFn: () => pokeApi.getPokemonSpecies(identifier),
    enabled: !!identifier,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Hook: evolution chain by URL
export const useEvolutionChainByUrl = (evolutionChainUrl?: string) => {
  return useQuery({
    queryKey: ["evolution-chain", evolutionChainUrl],
    queryFn: () => pokeApi.getEvolutionChainByUrl(evolutionChainUrl as string),
    enabled: !!evolutionChainUrl,
    staleTime: 60 * 60 * 1000,
  });
};
