"use client";

import { useState } from "react";
import { GameStatus } from "@/types";
import { getStatusLabel } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";

interface LogModalProps {
  gameTitle?: string;
  onClose: () => void;
  onSubmit?: (data: {
    status: GameStatus;
    rating?: number;
    review?: string;
    playedDate?: string;
    containsSpoiler?: boolean;
  }) => void;
}

const statuses: GameStatus[] = ["PLAYED", "PLAYING", "WISHLIST", "DROPPED", "BACKLOG"];

export default function LogModal({ gameTitle, onClose, onSubmit }: LogModalProps) {
  const [status, setStatus] = useState<GameStatus>("PLAYED");
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState("");
  const [playedDate, setPlayedDate] = useState("");
  const [containsSpoiler, setContainsSpoiler] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ status, rating: rating || undefined, review, playedDate, containsSpoiler });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-xl shadow-2xl animate-fade-in"
        style={{ backgroundColor: "#1c2228", border: "1px solid #456" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid #2c3440" }}
        >
          <h2 className="font-display font-bold text-lg" style={{ color: "#fff" }}>
            {gameTitle ? `Log: ${gameTitle}` : "Log a Game"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            style={{ color: "#9ab" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Status */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#9ab" }}>
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className="px-3 py-1.5 rounded text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: status === s ? "#00e054" : "#2c3440",
                    color: status === s ? "#14181c" : "#9ab",
                    border: `1px solid ${status === s ? "#00e054" : "#456"}`,
                  }}
                >
                  {getStatusLabel(s)}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#9ab" }}>
              Avaliação
            </label>
            <div className="flex items-center gap-3">
              <StarRating
                rating={rating}
                interactive
                size="lg"
                onRate={setRating}
              />
              {rating > 0 && (
                <span className="text-sm font-semibold" style={{ color: "#00e054" }}>
                  {rating.toFixed(1)}
                </span>
              )}
            </div>
          </div>

          {/* Review */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#9ab" }}>
              Review (opcional)
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Escreva sua review..."
              rows={4}
              className="w-full rounded px-3 py-2 text-sm resize-none outline-none"
              style={{
                backgroundColor: "#2c3440",
                color: "#fff",
                border: "1px solid #456",
              }}
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#9ab" }}>
              Data jogado
            </label>
            <input
              type="date"
              value={playedDate}
              onChange={(e) => setPlayedDate(e.target.value)}
              className="rounded px-3 py-2 text-sm outline-none"
              style={{
                backgroundColor: "#2c3440",
                color: "#9ab",
                border: "1px solid #456",
              }}
            />
          </div>

          {/* Spoiler toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              className="relative w-10 h-5 rounded-full transition-colors"
              style={{ backgroundColor: containsSpoiler ? "#00e054" : "#2c3440" }}
              onClick={() => setContainsSpoiler(!containsSpoiler)}
            >
              <div
                className="absolute top-0.5 w-4 h-4 rounded-full transition-transform"
                style={{
                  backgroundColor: "#fff",
                  transform: containsSpoiler ? "translateX(22px)" : "translateX(2px)",
                }}
              />
            </div>
            <span className="text-sm" style={{ color: "#9ab" }}>
              Contém spoilers
            </span>
          </label>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded font-semibold text-sm transition-colors hover:bg-white/10"
              style={{ color: "#9ab", border: "1px solid #456" }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded font-semibold text-sm transition-colors"
              style={{ backgroundColor: "#00e054", color: "#14181c" }}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
