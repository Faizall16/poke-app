"use client";

import { useMemo, useState } from "react";
import {
  useEvolutionChainByUrl,
  usePokemon,
  usePokemonSpecies,
} from "../hooks/usePokemon";

export default function PokemonDetailModal({
  name,
  onClose,
}: {
  name: string;
  onClose: () => void;
}) {
  const { data: pokemon } = usePokemon(name);
  const { data: species } = usePokemonSpecies(name);
  const evolutionUrl = species?.evolution_chain?.url;
  const { data: evolution } = useEvolutionChainByUrl(evolutionUrl);

  const [activeTab, setActiveTab] = useState<
    "about" | "stats" | "evolution" | "moves"
  >("about");

  const primaryType = pokemon?.types?.[0]?.type?.name ?? "normal";

  const typeBg: Record<string, string> = {
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

  const artwork =
    // try official-artwork path safely
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((pokemon?.sprites as any)?.other?.["official-artwork"]?.front_default as
      | string
      | undefined) ||
    pokemon?.sprites?.front_default ||
    "";

  const englishFlavor = useMemo(() => {
    const entry = species?.flavor_text_entries?.find(
      (e) => e.language.name === "en"
    );
    return entry?.flavor_text?.replace(/\f|\n|\r/g, " ") ?? "";
  }, [species]);

  const genus = useMemo(() => {
    return species?.genera?.find((g) => g.language.name === "en")?.genus ?? "";
  }, [species]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        <div className={`${typeBg[primaryType] ?? "bg-gray-100"} p-6`}>
          <div className="flex items-start justify-between">
            <h2 className="text-3xl text-white font-extrabold capitalize">
              {pokemon?.name}
            </h2>
            <span className="text-gray-700 font-semibold">
              #{pokemon?.id?.toString().padStart(3, "0")}
            </span>
          </div>

          <div className="mt-3 flex gap-2">
            {pokemon?.types?.map((t) => (
              <span
                key={t.slot}
                className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-black/30 backdrop-blur"
              >
                {t.type.name}
              </span>
            ))}
          </div>

          {artwork && (
            <img
              src={artwork}
              alt={pokemon?.name ?? "pokemon"}
              className="flex items-end w-40 h-40 drop-shadow"
            />
          )}
        </div>

        {/* Tabs container */}
        <div className="px-6 pt-12 pb-6 bg-white rounded-t-3xl -mt-6">
          <div className="border-b border-gray-200 mb-4">
            <nav className="-mb-px flex space-x-8">
              {(
                [
                  { id: "about", label: "About" },
                  { id: "stats", label: "Base Stats" },
                  { id: "evolution", label: "Evolution" },
                  { id: "moves", label: "Moves" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab panels */}
          {activeTab === "about" && (
            <div className="space-y-3 text-gray-800">
              <p className="text-sm text-gray-600">{englishFlavor}</p>

              <div className="space-y-1 text-sm">
                <Row label="Species" value={genus || "-"} />
                <Row
                  label="Height"
                  value={`${((pokemon?.height ?? 0) / 10).toFixed(2)} m`}
                />
                <Row
                  label="Weight"
                  value={`${((pokemon?.weight ?? 0) / 10).toFixed(1)} kg`}
                />
                <Row
                  label="Abilities"
                  value={
                    pokemon?.abilities?.map((a) => a.ability.name).join(", ") ||
                    "-"
                  }
                />
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-3">
              {pokemon?.stats?.map((s) => (
                <div key={s.stat.name}>
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span className="capitalize">{s.stat.name}</span>
                    <span>{s.base_stat}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded">
                    <div
                      className="h-2 bg-blue-500 rounded"
                      style={{
                        width: `${Math.min(100, (s.base_stat / 200) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "evolution" && (
            <div className="space-y-4 text-sm">
              {evolution ? (
                <EvolutionChainView chain={evolution.chain} />
              ) : (
                <p className="text-gray-500">No evolution data.</p>
              )}
            </div>
          )}

          {activeTab === "moves" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              {pokemon?.moves?.slice(0, 30).map((m) => (
                <span
                  key={m.move.name}
                  className="px-3 py-1 bg-gray-100 rounded-full text-black capitalize"
                >
                  {m.move.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

type ChainNode = {
  species: { name: string; url: string };
  evolves_to: ChainNode[];
};

function EvolutionChainView({ chain }: { chain: ChainNode }) {
  const items: string[] = [];
  const dfs = (node: ChainNode) => {
    items.push(node.species.name);
    node.evolves_to.forEach(dfs);
  };
  dfs(chain);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {items.map((n, i) => (
        <div key={n} className="flex items-center">
          <span className="capitalize bg-gray-100 text-black px-3 py-1 rounded-full">
            {n}
          </span>
          {i < items.length - 1 && <span className="mx-2">→</span>}
        </div>
      ))}
    </div>
  );
}
