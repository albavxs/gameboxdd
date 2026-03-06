import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatRelativeDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "hoje";
  if (diffDays === 1) return "ontem";
  if (diffDays < 7) return `${diffDays} dias atrás`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses atrás`;
  return `${Math.floor(diffDays / 365)} anos atrás`;
}

export function getIGDBCoverUrl(imageId: string, size: "cover_small" | "cover_big" | "720p" | "1080p" = "cover_big"): string {
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`;
}

export function getIGDBScreenshotUrl(imageId: string): string {
  return `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${imageId}.jpg`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getRatingLabel(rating: number): string {
  if (rating >= 4.5) return "Obra-prima";
  if (rating >= 4.0) return "Excelente";
  if (rating >= 3.5) return "Muito bom";
  if (rating >= 3.0) return "Bom";
  if (rating >= 2.5) return "Regular";
  if (rating >= 2.0) return "Fraco";
  if (rating >= 1.0) return "Ruim";
  return "Péssimo";
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PLAYED: "Jogado",
    PLAYING: "Jogando",
    WISHLIST: "Lista de Desejos",
    DROPPED: "Abandonado",
    BACKLOG: "Backlog",
  };
  return labels[status] || status;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PLAYED: "#00e054",
    PLAYING: "#ff8000",
    WISHLIST: "#40bcf4",
    DROPPED: "#ff4444",
    BACKLOG: "#9ab",
  };
  return colors[status] || "#9ab";
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}
