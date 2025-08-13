"use client";

import { Pokemon } from "../services/pokeapi";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const getTypeColor = (typeName: string) => {
    const typeColors: { [key: string]: string } = {
      normal: "bg-gray-400",
      fire: "bg-red-500",
      water: "bg-blue-500",
      electric: "bg-yellow-400",
      grass: "bg-green-500",
      ice: "bg-cyan-300",
      fighting: "bg-red-700",
      poison: "bg-purple-500",
      ground: "bg-yellow-600",
      flying: "bg-indigo-400",
      psychic: "bg-pink-500",
      bug: "bg-lime-500",
      rock: "bg-yellow-800",
      ghost: "bg-purple-700",
      dragon: "bg-indigo-700",
      dark: "bg-gray-700",
      steel: "bg-gray-500",
      fairy: "bg-pink-300",
    };
    return typeColors[typeName] || "bg-gray-400";
  };

  const getCardBackgroundColor = (typeName: string) => {
    const cardColors: { [key: string]: string } = {
      normal: "bg-gray-100",
      fire: "bg-red-100",
      water: "bg-blue-100",
      electric: "bg-yellow-100",
      grass: "bg-green-100",
      ice: "bg-cyan-100",
      fighting: "bg-red-100",
      poison: "bg-purple-100",
      ground: "bg-yellow-100",
      flying: "bg-indigo-100",
      psychic: "bg-pink-100",
      bug: "bg-lime-100",
      rock: "bg-yellow-100",
      ghost: "bg-purple-100",
      dragon: "bg-indigo-100",
      dark: "bg-gray-100",
      steel: "bg-gray-100",
      fairy: "bg-pink-100",
    };
    return cardColors[typeName] || "bg-gray-100";
  };

  // Safety checks for required properties
  if (!pokemon || !pokemon.sprites || !pokemon.types || !pokemon.stats) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200 min-h-[200px]">
        <div className="text-center text-red-500">
          <p className="text-sm">Invalid Pokemon data</p>
        </div>
      </div>
    );
  }

  const spriteUrl =
    pokemon.sprites.front_default ||
    "https://via.placeholder.com/96x96?text=Pokemon";
  const pokemonName = pokemon.name || "Unknown";
  const pokemonId = pokemon.id || 0;
  const primaryType = pokemon.types[0]?.type.name || "normal";

  return (
    <div
      className={`${getCardBackgroundColor(
        primaryType
      )} rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 min-h-[200px] relative overflow-hidden`}
      onClick={onClick}
    >
      {/* Pokemon Image */}
      <div className="w-24 h-24">
        <img
          src={spriteUrl}
          alt={pokemonName}
          className="w-full h-full object-contain drop-shadow-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/96x96?text=Pokemon";
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-20">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 capitalize leading-tight">
            {pokemonName}
          </h3>
          <span className="text-sm font-medium text-gray-600">
            #{pokemonId.toString().padStart(3, "0")}
          </span>
        </div>

        {/* Types Section */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pokemon.types.map((type) => (
            <span
              key={type.slot}
              className={`px-3 py-1 text-xs font-medium text-white rounded-full ${getTypeColor(
                type.type.name
              )} shadow-sm`}
            >
              {type.type.name}
            </span>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
          <div className="bg-white/50 rounded-lg px-2 py-1">
            <span className="font-semibold">HP</span>
            <div className="text-lg font-bold">
              {pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat || 0}
            </div>
          </div>
          <div className="bg-white/50 rounded-lg px-2 py-1">
            <span className="font-semibold">ATK</span>
            <div className="text-lg font-bold">
              {pokemon.stats.find((s) => s.stat.name === "attack")?.base_stat ||
                0}
            </div>
          </div>
          <div className="bg-white/50 rounded-lg px-2 py-1">
            <span className="font-semibold">DEF</span>
            <div className="text-lg font-bold">
              {pokemon.stats.find((s) => s.stat.name === "defense")
                ?.base_stat || 0}
            </div>
          </div>
          <div className="bg-white/50 rounded-lg px-2 py-1">
            <span className="font-semibold">SPD</span>
            <div className="text-lg font-bold">
              {pokemon.stats.find((s) => s.stat.name === "speed")?.base_stat ||
                0}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full"></div>
      <div className="absolute bottom-16 right-16 w-4 h-4 bg-white/20 rounded-full"></div>
    </div>
  );
}
