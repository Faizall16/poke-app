"use client";

import { useInfinitePokemonList, usePokemon } from "../hooks/usePokemon";
import PokemonCard from "./PokemonCard";
import PokemonDetailModal from "./PokemonDetailModal";
import { useState } from "react";

export default function PokemonList() {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfinitePokemonList(20);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 p-8">
        <h3 className="text-lg font-semibold mb-2">Error loading Pokemon</h3>
        <p className="text-sm">{error?.message || "Something went wrong"}</p>
      </div>
    );
  }

  const allPokemon = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {allPokemon.map((pokemon) => (
          <PokemonCardWrapper
            key={pokemon.name}
            pokemonName={pokemon.name}
            onClick={() => setSelectedPokemon(pokemon.name)}
          />
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {isFetchingNextPage ? "Loading..." : "Load More Pokemon"}
          </button>
        </div>
      )}

      {selectedPokemon && (
        <PokemonDetailModal
          name={selectedPokemon}
          onCloseAction={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}

function PokemonCardWrapper({
  pokemonName,
  onClick,
}: {
  pokemonName: string;
  onClick?: () => void;
}) {
  const { data: pokemon, isLoading, isError } = usePokemon(pokemonName);

  if (isLoading) {
    return (
      <div className="bg-gray-100 rounded-2xl shadow-lg p-4 border border-gray-200 min-h-[200px] relative overflow-hidden animate-pulse">
        {/* Content skeleton */}
        <div className="relative z-20">
          {/* Header skeleton */}
          <div className="flex justify-between items-start mb-3">
            <div className="h-6 bg-gray-300 rounded w-24"></div>
            <div className="h-4 bg-gray-300 rounded w-12"></div>
          </div>

          {/* Types skeleton */}
          <div className="flex gap-2 mb-4">
            <div className="h-6 bg-gray-300 rounded-full w-16"></div>
            <div className="h-6 bg-gray-300 rounded-full w-16"></div>
          </div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/50 rounded-lg px-2 py-1">
              <div className="h-3 bg-gray-300 rounded w-8 mb-1"></div>
              <div className="h-5 bg-gray-300 rounded w-6"></div>
            </div>
            <div className="bg-white/50 rounded-lg px-2 py-1">
              <div className="h-3 bg-gray-300 rounded w-8 mb-1"></div>
              <div className="h-5 bg-gray-300 rounded w-6"></div>
            </div>
            <div className="bg-white/50 rounded-lg px-2 py-1">
              <div className="h-3 bg-gray-300 rounded w-8 mb-1"></div>
              <div className="h-5 bg-gray-300 rounded w-6"></div>
            </div>
            <div className="bg-white/50 rounded-lg px-2 py-1">
              <div className="h-3 bg-gray-300 rounded w-8 mb-1"></div>
              <div className="h-5 bg-gray-300 rounded w-6"></div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gray-300 rounded-full"></div>

        <div className="absolute top-2 right-2 w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="absolute bottom-16 right-16 w-4 h-4 bg-gray-300 rounded-full"></div>
      </div>
    );
  }

  if (isError || !pokemon) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200 min-h-[200px]">
        <div className="text-center text-red-500">
          <p className="text-sm">Error loading {pokemonName}</p>
        </div>
      </div>
    );
  }

  return <PokemonCard pokemon={pokemon} onClick={onClick} />;
}
