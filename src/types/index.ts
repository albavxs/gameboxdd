export type GameStatus = "PLAYED" | "PLAYING" | "WISHLIST" | "DROPPED" | "BACKLOG";

export interface Game {
  id: string;
  slug: string;
  title: string;
  coverUrl?: string;
  backdropUrl?: string;
  releaseYear?: number;
  developer?: string;
  publisher?: string;
  platforms: string[];
  genres: string[];
  summary?: string;
  igdbRating?: number;
  communityRating?: number;
  ratingCount?: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  website?: string;
  location?: string;
  createdAt: string;
  gamesPlayed?: number;
  gamesThisYear?: number;
  followersCount?: number;
  followingCount?: number;
}

export interface GameEntry {
  id: string;
  userId: string;
  gameId: string;
  status: GameStatus;
  rating?: number;
  playedDate?: string;
  createdAt: string;
  updatedAt: string;
  game?: Game;
  user?: User;
}

export interface Review {
  id: string;
  userId: string;
  gameId: string;
  rating?: number;
  content?: string;
  containsSpoiler: boolean;
  playedDate?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  game?: Game;
  likesCount?: number;
  commentsCount?: number;
}

export interface GameList {
  id: string;
  userId: string;
  title: string;
  description?: string;
  isPublic: boolean;
  createdAt: string;
  user?: User;
  items?: GameListItem[];
  likesCount?: number;
  gamesCount?: number;
}

export interface GameListItem {
  id: string;
  listId: string;
  gameId: string;
  notes?: string;
  position: number;
  game?: Game;
}

export interface RatingHistogram {
  rating: number;
  count: number;
  percentage: number;
}
