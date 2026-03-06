"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#14181c" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="font-display font-black text-4xl" style={{ color: "#00e054" }}>GAME</span>
            <span className="font-display font-black text-4xl" style={{ color: "#fff" }}>LOG</span>
          </Link>
          <p className="mt-2 text-sm" style={{ color: "#9ab" }}>
            Track every game. Share every thought.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-xl p-6" style={{ backgroundColor: "#1c2228", border: "1px solid #2c3440" }}>
          <h1 className="font-display font-bold text-xl mb-6 text-center" style={{ color: "#fff" }}>
            Entrar
          </h1>

          <form className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#9ab" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded px-3 py-2.5 text-sm outline-none"
                style={{ backgroundColor: "#2c3440", color: "#fff", border: "1px solid #456" }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#9ab" }}>
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded px-3 py-2.5 text-sm outline-none"
                style={{ backgroundColor: "#2c3440", color: "#fff", border: "1px solid #456" }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded font-bold text-sm transition-colors mt-2"
              style={{ backgroundColor: "#00e054", color: "#14181c" }}
            >
              Entrar
            </button>
          </form>

          <div className="relative my-5">
            <div style={{ borderTop: "1px solid #2c3440" }} />
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 text-xs"
              style={{ backgroundColor: "#1c2228", color: "#678" }}
            >
              ou continue com
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Google", icon: "G" },
              { name: "Discord", icon: "D" },
            ].map((provider) => (
              <button
                key={provider.name}
                className="flex items-center justify-center gap-2 py-2.5 rounded font-semibold text-sm transition-colors hover:bg-white/10"
                style={{ color: "#9ab", border: "1px solid #456" }}
              >
                <span className="font-bold">{provider.icon}</span>
                {provider.name}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center mt-5 text-sm" style={{ color: "#678" }}>
          Não tem conta?{" "}
          <Link href="/sign-up" style={{ color: "#40bcf4" }}>
            Criar conta grátis
          </Link>
        </p>
      </div>
    </div>
  );
}
