import Image from "next/image";
import Link from "next/link";
import { Review } from "@/types";
import { formatRelativeDate, truncateText } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";

interface ReviewCardProps {
  review: Review;
  showGame?: boolean;
}

export default function ReviewCard({ review, showGame = true }: ReviewCardProps) {
  const { user, game, content, rating, containsSpoiler, createdAt, likesCount, commentsCount } = review;

  return (
    <div
      className="rounded-lg p-4 flex gap-4"
      style={{ backgroundColor: "#1c2228", border: "1px solid #2c3440" }}
    >
      {/* Game Cover */}
      {showGame && game && (
        <Link href={`/games/${game.slug}`} className="shrink-0">
          <div
            className="relative rounded overflow-hidden"
            style={{ width: 48, height: 64 }}
          >
            {game.coverUrl ? (
              <Image
                src={game.coverUrl}
                alt={game.title}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: "#242c36" }}
              >
                <span style={{ color: "#678", fontSize: "8px" }}>N/A</span>
              </div>
            )}
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <Link href={`/members/${user?.username}`}>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ backgroundColor: "#00e054", color: "#14181c" }}
              >
                {user?.username?.[0]?.toUpperCase() || "?"}
              </div>
            </Link>
            <div>
              <Link
                href={`/members/${user?.username}`}
                className="text-sm font-semibold hover:text-white transition-colors"
                style={{ color: "#40bcf4" }}
              >
                {user?.displayName || user?.username}
              </Link>
              {showGame && game && (
                <span style={{ color: "#678" }} className="text-xs ml-1">
                  {" "}reviewed{" "}
                  <Link
                    href={`/games/${game.slug}`}
                    className="hover:text-white transition-colors"
                    style={{ color: "#9ab" }}
                  >
                    {game.title}
                  </Link>
                </span>
              )}
            </div>
          </div>
          <span className="text-xs shrink-0" style={{ color: "#678" }}>
            {formatRelativeDate(createdAt)}
          </span>
        </div>

        {/* Rating */}
        {rating && (
          <div className="mb-2">
            <StarRating rating={rating} size="sm" />
          </div>
        )}

        {/* Spoiler Warning */}
        {containsSpoiler && (
          <div
            className="text-xs px-2 py-1 rounded mb-2 inline-block"
            style={{ backgroundColor: "#ff444422", color: "#ff4444", border: "1px solid #ff444433" }}
          >
            ⚠ Contém spoilers
          </div>
        )}

        {/* Review Content */}
        {content && (
          <p className="text-sm leading-relaxed" style={{ color: "#ccc" }}>
            {truncateText(content, 200)}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center gap-4 mt-3">
          <button
            className="flex items-center gap-1 text-xs transition-colors hover:text-white"
            style={{ color: "#678" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {likesCount || 0}
          </button>
          <button
            className="flex items-center gap-1 text-xs transition-colors hover:text-white"
            style={{ color: "#678" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {commentsCount || 0}
          </button>
        </div>
      </div>
    </div>
  );
}
