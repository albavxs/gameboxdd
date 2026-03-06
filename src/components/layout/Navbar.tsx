"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavbarProps {
  user?: { username: string; avatarUrl?: string } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: "#14181c",
        borderBottom: "1px solid #2c3440",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          style={{ textDecoration: "none" }}
        >
          <span
            className="font-display font-black text-xl tracking-tight"
            style={{ color: "#00e054" }}
          >
            GAME
          </span>
          <span
            className="font-display font-black text-xl tracking-tight"
            style={{ color: "#ffffff" }}
          >
            LOG
          </span>
        </Link>

        {/* Nav Links — desktop */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { href: "/games", label: "Games" },
            { href: "/members", label: "Members" },
            { href: "/journal", label: "Journal" },
            { href: "/lists", label: "Lists" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-wider transition-colors hover:text-white"
              style={{ color: "#9ab", letterSpacing: "0.08em" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setSearchOpen(false)}
                placeholder="Buscar jogos..."
                className="rounded px-3 py-1.5 text-sm outline-none w-48 md:w-64"
                style={{
                  backgroundColor: "#2c3440",
                  color: "#fff",
                  border: "1px solid #456",
                }}
              />
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 rounded transition-colors hover:bg-white/10"
                style={{ color: "#9ab" }}
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            )}
          </div>

          {/* Auth */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-full overflow-hidden"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: "#00e054", color: "#14181c" }}
                >
                  {user.username[0].toUpperCase()}
                </div>
              </button>
              {menuOpen && (
                <div
                  className="absolute right-0 top-10 rounded shadow-xl py-1 min-w-40 z-50"
                  style={{ backgroundColor: "#242c36", border: "1px solid #456" }}
                >
                  <Link
                    href={`/members/${user.username}`}
                    className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                    style={{ color: "#9ab" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                    style={{ color: "#9ab" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <hr style={{ borderColor: "#456", margin: "4px 0" }} />
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                    style={{ color: "#9ab" }}
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="text-sm font-semibold transition-colors hover:text-white"
                style={{ color: "#9ab" }}
              >
                Entrar
              </Link>
              <Link
                href="/sign-up"
                className="text-sm font-semibold px-3 py-1.5 rounded transition-colors"
                style={{
                  backgroundColor: "#00e054",
                  color: "#14181c",
                }}
              >
                Criar conta
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-1.5"
            style={{ color: "#9ab" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
