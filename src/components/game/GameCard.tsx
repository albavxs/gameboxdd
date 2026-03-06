"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, getStatusColor, getStatusLabel } from "@/lib/utils";
import { Game, GameEntry } from "@/types";
import StarRating from "@/components/ui/StarRating";

interface GameCardProps {
  game: Game;
  entry?: GameEntry;
  size?: "sm" | "md" | "lg";
  showRating?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { width: 80, height: 107, titleSize: "text-xs" },
  md: { width: 120, height: 160, titleSize: "text-sm" },
  lg: { width: 160, height: 213, titleSize: "text-base" },
};

export default function GameCard({
  game,
  entry,
  size = "md",
  showRating = true,
  className,
}: GameCardProps) {
  const [imgError, setImgError] = useState(false);
  const config = sizeConfig[size];

  return (
    <Link
      href={`/games/${game.slug}`}
      className={cn("group relative block rounded overflow-hidden", className)}
      style={{ width: config.width, flexShrink: 0 }}
    >
      {/* Cover Image */}
      <div
        className="relative overflow-hidden rounded"
        style={{ width: config.width, height: config.height }}
      >
        {game.coverUrl && !imgError ? (
          <Image
            src={game.coverUrl}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
            sizes={`${config.width}px`}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-center p-2"
            style={{ backgroundColor: "#242c36" }}
          >
            <span
              className={cn("font-display font-bold leading-tight", config.titleSize)}
              style={{ color: "#9ab" }}
            >
              {game.title}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 game-card-overlay flex flex-col justify-end p-2">
          <p
            className={cn("font-display font-semibold leading-tight mb-1", config.titleSize)}
            style={{ color: "#fff" }}
          >
            {game.title}
          </p>
          {showRating && game.communityRating && (
            <StarRating rating={game.communityRating} size="sm" />
          )}
        </div>

        {/* Status Badge */}
        {entry && (
          <div
            className="absolute top-1 right-1 rounded px-1 py-0.5 text-xs font-semibold"
            style={{
              backgroundColor: getStatusColor(entry.status) + "33",
              color: getStatusColor(entry.status),
              border: `1px solid ${getStatusColor(entry.status)}44`,
              fontSize: "9px",
            }}
          >
            {entry.status === "PLAYING" ? "▶" : entry.status === "PLAYED" ? "✓" : "♥"}
          </div>
        )}

        {/* Playing Now badge */}
        {entry?.status === "PLAYING" && (
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ backgroundColor: "#ff8000" }}
          />
        )}
      </div>

      {/* Entry Rating below card */}
      {entry?.rating && size !== "sm" && (
        <div className="mt-1 flex justify-center">
          <StarRating rating={entry.rating} size="sm" />
        </div>
      )}
    </Link>
  );
}
