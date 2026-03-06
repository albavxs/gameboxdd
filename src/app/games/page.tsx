"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import GameCard from "@/components/game/GameCard";
import { mockGames } from "@/lib/mockData";

const genres = ["Todos", "RPG", "Action", "Adventure", "Metroidvania", "Roguelike", "Strategy"];
const platforms = ["Todos", "PC", "PS5", "PS4", "Xbox", "Switch"];
const sortOptions = [
  { value: "rating", label: "Melhor Avaliados" },
  { value: "popular", label: "Mais Populares" },
  { value: "recent", label: "Mais Recentes" },
  { value: "name", label: "Nome A-Z" },
];

export default function GamesPage() {
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [selectedPlatform, setSelectedPlatform] = useState("Todos");
  const [sort, setSort] = useState("rating");
  const [search, setSearch] = useState("");

  const filtered = mockGames.filter((g) => {
    const matchGenre = selectedGenre === "Todos" || g.genres.includes(selectedGenre);
    const matchPlatform = selectedPlatform === "Todos" || g.platforms.includes(selectedPlatform);
    const matchSearch = !search || g.title.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchPlatform && matchSearch;
  });

  return (
    <div style={{ backgroundColor: "#14181c", minHeight: "100vh" }}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-black text-3xl mb-2" style={{ color: "#fff" }}>
            Explorar Jogos
          </h1>
          <p className="text-sm" style={{ color: "#9ab" }}>
            {filtered.length} jogos encontrados
          </p>
        </div>

        {/* Filters */}
        <div
          className="rounded-xl p-4 mb-8 flex flex-wrap gap-4 items-center"
          style={{ backgroundColor: "#1c2228", border: "1px solid #2c3440" }}
        >
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar jogo..."
            className="rounded px-3 py-2 text-sm outline-none flex-1 min-w-48"
            style={{ backgroundColor: "#2c3440", color: "#fff", border: "1px solid #456" }}
          />

          {/* Genre filter */}
          <div className="flex flex-wrap gap-1">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className="px-3 py-1 rounded text-xs font-semibold transition-colors"
                style={{
                  backgroundColor: selectedGenre === g ? "#00e054" : "#2c3440",
                  color: selectedGenre === g ? "#14181c" : "#9ab",
                }}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded px-3 py-2 text-sm outline-none"
            style={{ backgroundColor: "#2c3440", color: "#9ab", border: "1px solid #456" }}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Games Grid */}
        <div className="flex flex-wrap gap-4">
          {filtered.map((game) => (
            <GameCard key={game.id} game={game} size="lg" showRating />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: "#9ab" }}>Nenhum jogo encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
