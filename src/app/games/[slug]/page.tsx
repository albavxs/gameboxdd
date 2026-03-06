"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import StarRating from "@/components/ui/StarRating";
import ReviewCard from "@/components/review/ReviewCard";
import LogModal from "@/components/game/LogModal";
import { mockGames, mockReviews, ratingHistogram } from "@/lib/mockData";

interface GamePageProps {
  params: { slug: string };
}

export default function GamePage({ params }: GamePageProps) {
  const [activeTab, setActiveTab] = useState<"reviews" | "members" | "lists" | "similar">("reviews");
  const [showLogModal, setShowLogModal] = useState(false);

  const game = mockGames.find((g) => g.slug === params.slug) || mockGames[1];
  const gameReviews = mockReviews.filter((r) => r.gameId === game.id);

  const tabs = [
    { id: "reviews", label: "Reviews", count: gameReviews.length },
    { id: "members", label: "Members", count: 1243 },
    { id: "lists", label: "Lists", count: 89 },
    { id: "similar", label: "Similar", count: 6 },
  ] as const;

  return (
    <div style={{ backgroundColor: "#14181c", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero / Backdrop */}
      <section className="relative overflow-hidden" style={{ minHeight: 400 }}>
        {/* Backdrop */}
        <div className="absolute inset-0">
          {game.backdropUrl && (
            <Image src={game.backdropUrl} alt={game.title} fill className="object-cover" priority sizes="100vw" />
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(20,24,28,0.97) 30%, rgba(20,24,28,0.7) 60%, rgba(20,24,28,0.3) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, #14181c 100%)" }} />
        </div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 py-12 flex gap-8 items-start">
          {/* Cover */}
          <div
            className="shrink-0 rounded-lg overflow-hidden shadow-2xl"
            style={{ width: 160, height: 213, border: "2px solid rgba(255,255,255,0.15)" }}
          >
            {game.coverUrl ? (
              <Image src={game.coverUrl} alt={game.title} width={160} height={213} className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "#242c36" }}>
                <span style={{ color: "#9ab" }}>No Cover</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 pt-4">
            <h1 className="font-display font-black text-3xl md:text-4xl mb-2" style={{ color: "#fff" }}>
              {game.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mb-4 text-sm" style={{ color: "#9ab" }}>
              {game.developer && <span>{game.developer}</span>}
              {game.releaseYear && <><span>·</span><span>{game.releaseYear}</span></>}
              {game.platforms.slice(0, 3).map((p) => (
                <span key={p} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: "#2c3440", color: "#9ab" }}>
                  {p}
                </span>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={game.communityRating || 0} size="lg" />
              <span className="font-bold text-2xl" style={{ color: "#00e054" }}>
                {game.communityRating?.toFixed(1)}
              </span>
              <span className="text-sm" style={{ color: "#678" }}>
                {game.ratingCount?.toLocaleString()} avaliações
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-5">
              {game.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: "#1c2228", color: "#40bcf4", border: "1px solid #2c3440" }}
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowLogModal(true)}
                className="px-5 py-2.5 rounded font-bold text-sm transition-colors"
                style={{ backgroundColor: "#00e054", color: "#14181c" }}
              >
                + Log Game
              </button>
              <button
                className="px-5 py-2.5 rounded font-semibold text-sm transition-colors hover:bg-white/10"
                style={{ color: "#9ab", border: "1px solid #456" }}
              >
                ♥ Wishlist
              </button>
              <button
                className="px-5 py-2.5 rounded font-semibold text-sm transition-colors hover:bg-white/10"
                style={{ color: "#9ab", border: "1px solid #456" }}
              >
                + List
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left */}
          <div className="flex-1 min-w-0">
            {/* Summary */}
            {game.summary && (
              <p className="text-sm leading-relaxed mb-8" style={{ color: "#9ab" }}>
                {game.summary}
              </p>
            )}

            {/* Tabs */}
            <div className="flex gap-0 mb-6" style={{ borderBottom: "1px solid #2c3440" }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-4 py-3 text-sm font-semibold transition-colors relative"
                  style={{
                    color: activeTab === tab.id ? "#fff" : "#9ab",
                    borderBottom: activeTab === tab.id ? "2px solid #00e054" : "2px solid transparent",
                    marginBottom: "-1px",
                  }}
                >
                  {tab.label}
                  <span
                    className="ml-1.5 text-xs px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: "#2c3440", color: "#678" }}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                {gameReviews.length > 0 ? (
                  gameReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} showGame={false} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p style={{ color: "#9ab" }}>Seja o primeiro a avaliar este jogo!</p>
                    <button
                      onClick={() => setShowLogModal(true)}
                      className="mt-4 px-5 py-2.5 rounded font-bold text-sm"
                      style={{ backgroundColor: "#00e054", color: "#14181c" }}
                    >
                      + Log Game
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "members" && (
              <div className="text-center py-12">
                <p style={{ color: "#9ab" }}>1.243 membros jogaram este jogo</p>
              </div>
            )}

            {activeTab === "lists" && (
              <div className="text-center py-12">
                <p style={{ color: "#9ab" }}>Este jogo aparece em 89 listas</p>
              </div>
            )}

            {activeTab === "similar" && (
              <div className="flex flex-wrap gap-3">
                {mockGames.slice(0, 6).map((g) => (
                  <Link key={g.id} href={`/games/${g.slug}`}>
                    <div className="relative rounded overflow-hidden" style={{ width: 100, height: 133 }}>
                      {g.coverUrl && <Image src={g.coverUrl} alt={g.title} fill className="object-cover" sizes="100px" />}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            {/* Rating Histogram */}
            <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: "#1c2228", border: "1px solid #2c3440" }}>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-4" style={{ color: "#9ab" }}>
                Distribuição de Notas
              </h3>
              <div className="space-y-2">
                {ratingHistogram.map((item) => (
                  <div key={item.rating} className="flex items-center gap-2">
                    <span className="text-xs w-6 text-right shrink-0" style={{ color: "#9ab" }}>
                      {item.rating}★
                    </span>
                    <div className="flex-1 rounded-full overflow-hidden" style={{ backgroundColor: "#2c3440", height: 8 }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.percentage}%`, backgroundColor: "#00e054" }}
                      />
                    </div>
                    <span className="text-xs w-8 shrink-0" style={{ color: "#678" }}>
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Details */}
            <div className="rounded-xl p-4" style={{ backgroundColor: "#1c2228", border: "1px solid #2c3440" }}>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-4" style={{ color: "#9ab" }}>
                Detalhes
              </h3>
              <div className="space-y-2 text-sm">
                {game.developer && (
                  <div className="flex justify-between">
                    <span style={{ color: "#678" }}>Developer</span>
                    <span style={{ color: "#9ab" }}>{game.developer}</span>
                  </div>
                )}
                {game.publisher && (
                  <div className="flex justify-between">
                    <span style={{ color: "#678" }}>Publisher</span>
                    <span style={{ color: "#9ab" }}>{game.publisher}</span>
                  </div>
                )}
                {game.releaseYear && (
                  <div className="flex justify-between">
                    <span style={{ color: "#678" }}>Lançamento</span>
                    <span style={{ color: "#9ab" }}>{game.releaseYear}</span>
                  </div>
                )}
                {game.igdbRating && (
                  <div className="flex justify-between">
                    <span style={{ color: "#678" }}>IGDB Score</span>
                    <span style={{ color: "#00e054", fontWeight: "bold" }}>{game.igdbRating}</span>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Log Modal */}
      {showLogModal && (
        <LogModal
          gameTitle={game.title}
          onClose={() => setShowLogModal(false)}
          onSubmit={(data) => {
            console.log("Logged:", data);
            setShowLogModal(false);
          }}
        />
      )}
    </div>
  );
}
