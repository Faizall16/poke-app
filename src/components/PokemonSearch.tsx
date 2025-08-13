"use client";

import { useState, useEffect } from "react";
import { usePokemonSearch, usePokemon } from "../hooks/usePokemon";
import PokemonCard from "./PokemonCard";
import PokemonDetailModal from "./PokemonDetailModal";

export default function PokemonSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, isError, error } = usePokemonSearch(debouncedQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedQuery(searchQuery);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a Pokemon..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Search
        </button>
      </form>

      {debouncedQuery && (
        <div>
          {isLoading && (
            <div className="flex justify-center items-center min-h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}

          {isError && (
            <div className="text-center text-red-600 p-4">
              <p className="text-sm">
                {error?.message || "Error searching Pokemon"}
              </p>
            </div>
          )}

          {data && data.results.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Found {data.count} Pokemon matching "{debouncedQuery}"
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.results.map((pokemon) => (
                  <PokemonCardWrapper
                    key={pokemon.name}
                    pokemonName={pokemon.name}
                    onClick={() => setSelectedPokemon(pokemon.name)}
                  />
                ))}
              </div>
            </div>
          )}

          {data && data.results.length === 0 && debouncedQuery && (
            <div className="text-center text-gray-600 p-8">
              <p>No Pokemon found matching "{debouncedQuery}"</p>
            </div>
          )}
        </div>
      )}

      {selectedPokemon && (
        <PokemonDetailModal
          name={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}

// Wrapper component to fetch individual Pokemon data
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

        {/* Pokemon image skeleton */}
        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gray-300 rounded-full"></div>

        {/* Decorative elements skeleton */}
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
