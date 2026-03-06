"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  interactive?: boolean;
  size?: "sm" | "md" | "lg";
  onRate?: (rating: number) => void;
  className?: string;
}

export default function StarRating({
  rating = 0,
  maxRating = 5,
  interactive = false,
  size = "md",
  onRate,
  className,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const sizeClasses = {
    sm: "text-sm gap-0.5",
    md: "text-base gap-0.5",
    lg: "text-xl gap-1",
  };

  const displayRating = hovered !== null ? hovered : rating;

  const handleClick = (value: number) => {
    if (interactive && onRate) {
      onRate(value);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>, starIndex: number) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    setHovered(isHalf ? starIndex - 0.5 : starIndex);
  };

  const renderStar = (index: number) => {
    const value = index;
    const filled = displayRating >= value;
    const halfFilled = !filled && displayRating >= value - 0.5;

    return (
      <span
        key={index}
        className={cn(
          "relative inline-block",
          interactive && "cursor-pointer select-none"
        )}
        onMouseMove={(e) => handleMouseMove(e, index)}
        onMouseLeave={() => interactive && setHovered(null)}
        onClick={() => handleClick(hovered !== null ? hovered : value)}
        role={interactive ? "button" : undefined}
        aria-label={interactive ? `Rate ${value} stars` : undefined}
      >
        {halfFilled ? (
          <span className="relative inline-block">
            <span style={{ color: "#2c3440" }}>★</span>
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: "50%", color: "#00e054" }}
            >
              ★
            </span>
          </span>
        ) : (
          <span style={{ color: filled ? "#00e054" : "#2c3440" }}>★</span>
        )}
      </span>
    );
  };

  return (
    <span className={cn("inline-flex items-center", sizeClasses[size], className)}>
      {Array.from({ length: maxRating }, (_, i) => renderStar(i + 1))}
    </span>
  );
}
