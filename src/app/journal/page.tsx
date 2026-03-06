"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import StarRating from "@/components/ui/StarRating";
import LogModal from "@/components/game/LogModal";
import { mockGameEntries } from "@/lib/mockData";
import { formatDate, getStatusLabel, getStatusColor } from "@/lib/utils";

export default function JournalPage() {
  const [showLogModal, setShowLogModal] = useState(false);

  const entries = mockGameEntries;

  return (
    <div style={{ backgroundColor: "#14181c", minHeight: "100vh" }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-black text-3xl mb-2" style={{ color: "#fff" }}>
              Meu Diário
            </h1>
            <p className="text-sm" style={{ color: "#9ab" }}>
              Seu histórico de jogos
            </p>
          </div>
          <button
            onClick={() => setShowLogModal(true)}
            className="px-4 py-2.5 rounded font-bold text-sm"
            style={{ backgroundColor: "#00e054", color: "#14181c" }}
          >
            + Log Game
          </button>
        </div>

        {/* Entries */}
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-xl p-4 flex items-center gap-4"
              style={{ backgroundColor: "#1c2228", border: "1px solid #2c3440" }}
            >
              {/* Cover */}
              {entry.game && (
                <Link href={`/games/${entry.game.slug}`} className="shrink-0">
                  <div className="relative rounded overflow-hidden" style={{ width: 48, height: 64 }}>
                    {entry.game.coverUrl ? (
                      <Image src={entry.game.coverUrl} alt={entry.game.title} fill className="object-cover" sizes="48px" />
                    ) : (
                      <div className="w-full h-full" style={{ backgroundColor: "#242c36" }} />
                    )}
                  </div>
                </Link>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/games/${entry.game?.slug || ""}`}
                  className="font-display font-bold text-base hover:text-white transition-colors"
                  style={{ color: "#fff" }}
                >
                  {entry.game?.title}
                </Link>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    className="text-xs px-2 py-0.5 rounded font-semibold"
                    style={{
                      backgroundColor: getStatusColor(entry.status) + "22",
                      color: getStatusColor(entry.status),
                    }}
                  >
                    {getStatusLabel(entry.status)}
                  </span>
                  {entry.rating && <StarRating rating={entry.rating} size="sm" />}
                </div>
              </div>

              {/* Date */}
              <div className="text-xs shrink-0" style={{ color: "#678" }}>
                {entry.playedDate ? formatDate(entry.playedDate) : formatDate(entry.createdAt)}
              </div>
            </div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg mb-4" style={{ color: "#9ab" }}>Seu diário está vazio.</p>
            <button
              onClick={() => setShowLogModal(true)}
              className="px-5 py-2.5 rounded font-bold text-sm"
              style={{ backgroundColor: "#00e054", color: "#14181c" }}
            >
              + Adicionar primeiro jogo
            </button>
          </div>
        )}
      </div>

      {showLogModal && (
        <LogModal onClose={() => setShowLogModal(false)} />
      )}
    </div>
  );
}
