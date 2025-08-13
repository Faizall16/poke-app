"use client";

import { useState } from "react";
import PokemonList from "../components/PokemonList";
import PokemonSearch from "../components/PokemonSearch";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"list" | "search">("list");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Pokédex</h1>
              <span className="ml-2 text-sm text-gray-500">
                Powered by PokéAPI
              </span>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://pokeapi.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                API Docs
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("list")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "list"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Pokemon List
              </button>
            </nav>
          </div>
        </div>

        {activeTab === "list" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Pokemon List
            </h2>
            <p className="text-gray-600 mb-6">
              Browse through all Pokemon with infinite scrolling. Click on any
              Pokemon card to see more details.
            </p>
            <PokemonList />
          </div>
        )}

        {activeTab === "search" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Search Pokemon
            </h2>
            <p className="text-gray-600 mb-6">
              Search for specific Pokemon by name. Results will appear as you
              type.
            </p>
            <PokemonSearch />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>
              This app uses the{" "}
              <a
                href="https://pokeapi.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                PokéAPI
              </a>{" "}
              to fetch Pokemon data. Built with Next.js, TanStack Query, and
              Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
