"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import GameCard from "@/components/game/GameCard";
import ReviewCard from "@/components/review/ReviewCard";
import { mockUsers, mockGameEntries, mockReviews, mockLists } from "@/lib/mockData";

interface ProfilePageProps {
  params: { username: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<"games" | "reviews" | "lists">("games");

  const user = mockUsers.find((u) => u.username === params.username) || mockUsers[0];
  const userEntries = mockGameEntries.filter((e) => e.userId === user.id);
  const userReviews = mockReviews.filter((r) => r.userId === user.id);
  const userLists = mockLists.filter((l) => l.userId === user.id);

  const playedGames = userEntries.filter((e) => e.status === "PLAYED");
  const recentGames = userEntries.slice(0, 4);

  const tabs = [
    { id: "games", label: "Jogos", count: userEntries.length },
    { id: "reviews", label: "Reviews", count: userReviews.length },
    { id: "lists", label: "Listas", count: userLists.length },
  ] as const;

  return (
    <div style={{ backgroundColor: "#14181c", minHeight: "100vh" }}>
      <Navbar />

      {/* Profile Header */}
      <div style={{ backgroundColor: "#1c2228", borderBottom: "1px solid #2c3440" }}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black shrink-0"
              style={{ backgroundColor: "#00e054", color: "#14181c" }}
            >
              {user.username[0].toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="font-display font-black text-2xl" style={{ color: "#fff" }}>
                {user.displayName || user.username}
              </h1>
              <p className="text-sm mb-2" style={{ color: "#40bcf4" }}>@{user.username}</p>
              {user.bio && (
                <p className="text-sm mb-3" style={{ color: "#9ab" }}>{user.bio}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm">
                {user.location && (
                  <span style={{ color: "#678" }}>📍 {user.location}</span>
                )}
                {user.website && (
                  <a href={user.website} style={{ color: "#40bcf4" }} target="_blank" rel="noopener noreferrer">
                    🔗 {user.website}
                  </a>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 shrink-0">
              <button
                className="px-4 py-2 rounded font-semibold text-sm transition-colors"
                style={{ backgroundColor: "#00e054", color: "#14181c" }}
              >
                Seguir
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-6 pt-6" style={{ borderTop: "1px solid #2c3440" }}>
            {[
              { label: "Jogados", value: user.gamesPlayed || 0 },
              { label: "Este Ano", value: user.gamesThisYear || 0 },
              { label: "Seguidores", value: user.followersCount || 0 },
              { label: "Seguindo", value: user.followingCount || 0 },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-xl" style={{ color: "#fff" }}>
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-xs uppercase tracking-wider" style={{ color: "#678" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Recent Games */}
            <section className="mb-8">
              <h2 className="font-display font-bold text-lg mb-4" style={{ color: "#fff" }}>
                Jogos Recentes
              </h2>
              <div className="flex gap-3">
                {recentGames.map((entry) =>
                  entry.game ? (
                    <GameCard key={entry.id} game={entry.game} entry={entry} size="md" />
                  ) : null
                )}
                {recentGames.length === 0 && (
                  <p style={{ color: "#9ab" }}>Nenhum jogo registrado ainda.</p>
                )}
              </div>
            </section>

            {/* Tabs */}
            <div className="flex gap-0 mb-6" style={{ borderBottom: "1px solid #2c3440" }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-4 py-3 text-sm font-semibold transition-colors"
                  style={{
                    color: activeTab === tab.id ? "#fff" : "#9ab",
                    borderBottom: activeTab === tab.id ? "2px solid #00e054" : "2px solid transparent",
                    marginBottom: "-1px",
                  }}
                >
                  {tab.label}
                  <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: "#2c3440", color: "#678" }}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {activeTab === "games" && (
              <div className="flex flex-wrap gap-3">
                {userEntries.map((entry) =>
                  entry.game ? (
                    <GameCard key={entry.id} game={entry.game} entry={entry} size="md" />
                  ) : null
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                {userReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} showGame />
                ))}
                {userReviews.length === 0 && (
                  <p style={{ color: "#9ab" }}>Nenhuma review ainda.</p>
                )}
              </div>
            )}

            {activeTab === "lists" && (
              <div className="space-y-4">
                {userLists.map((list) => (
                  <Link
                    key={list.id}
                    href={`/lists/${list.id}`}
                    className="block rounded-xl p-4 transition-colors hover:bg-white/5"
                    style={{ backgroundColor: "#1c2228", border: "1px solid #2c3440" }}
                  >
                    <h3 className="font-display font-bold text-base mb-1" style={{ color: "#fff" }}>
                      {list.title}
                    </h3>
                    {list.description && (
                      <p className="text-sm mb-2" style={{ color: "#9ab" }}>{list.description}</p>
                    )}
                    <p className="text-xs" style={{ color: "#678" }}>
                      {list.gamesCount} jogos · ♥ {list.likesCount}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="rounded-xl p-4" style={{ backgroundColor: "#1c2228", border: "1px solid #2c3440" }}>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-4" style={{ color: "#9ab" }}>
                Favoritos
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {mockGameEntries.slice(0, 4).map((entry) =>
                  entry.game ? (
                    <Link key={entry.id} href={`/games/${entry.game.slug}`}>
                      <div className="relative rounded overflow-hidden" style={{ width: "100%", paddingBottom: "133%" }}>
                        {entry.game.coverUrl && (
                          <Image src={entry.game.coverUrl} alt={entry.game.title} fill className="object-cover" sizes="100px" />
                        )}
                      </div>
                    </Link>
                  ) : null
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
