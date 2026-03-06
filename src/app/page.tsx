import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import GameCard from "@/components/game/GameCard";
import ReviewCard from "@/components/review/ReviewCard";
import StarRating from "@/components/ui/StarRating";
import { mockGames, mockReviews, mockLists } from "@/lib/mockData";

export default function HomePage() {
  const featuredGame = mockGames[4];
  const popularGames = mockGames.slice(0, 8);
  const recentReviews = mockReviews;

  return (
    <div style={{ backgroundColor: "#14181c", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ minHeight: 480 }}>
        <div className="absolute inset-0">
          {featuredGame.backdropUrl && (
            <Image src={featuredGame.backdropUrl} alt={featuredGame.title} fill className="object-cover" priority sizes="100vw" />
          )}
          <div className="absolute inset-0 backdrop-overlay" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, #14181c 100%)" }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 flex items-end" style={{ minHeight: 480 }}>
          <div className="flex gap-8 items-end">
            <div className="hidden md:block rounded-lg overflow-hidden shadow-2xl shrink-0" style={{ width: 140, height: 187, border: "2px solid rgba(255,255,255,0.1)" }}>
              {featuredGame.coverUrl && <Image src={featuredGame.coverUrl} alt={featuredGame.title} width={140} height={187} className="object-cover" />}
            </div>
            <div className="pb-2">
              <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#00e054" }}>Jogo em Destaque</div>
              <h1 className="font-display font-black text-4xl md:text-5xl mb-2 leading-tight" style={{ color: "#fff", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>{featuredGame.title}</h1>
              <div className="flex items-center gap-3 mb-3">
                <StarRating rating={featuredGame.communityRating || 0} size="md" />
                <span className="font-bold text-lg" style={{ color: "#00e054" }}>{featuredGame.communityRating?.toFixed(1)}</span>
                <span className="text-sm" style={{ color: "#678" }}>({featuredGame.ratingCount?.toLocaleString()} avaliações)</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xl mb-4 hidden md:block" style={{ color: "#9ab" }}>{featuredGame.summary?.slice(0, 180)}...</p>
              <div className="flex gap-3">
                <Link href={`/games/${featuredGame.slug}`} className="px-5 py-2.5 rounded font-semibold text-sm transition-colors" style={{ backgroundColor: "#00e054", color: "#14181c" }}>Ver Jogo</Link>
                <button className="px-5 py-2.5 rounded font-semibold text-sm transition-colors hover:bg-white/10" style={{ color: "#9ab", border: "1px solid #456" }}>+ Log</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            {/* Popular Games */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-xl" style={{ color: "#fff" }}>Jogos Populares</h2>
                <Link href="/games" className="text-sm font-semibold transition-colors hover:text-white" style={{ color: "#40bcf4" }}>Ver todos →</Link>
              </div>
              <div className="flex flex-wrap gap-3">
                {popularGames.map((game) => (<GameCard key={game.id} game={game} size="md" />))}
              </div>
            </section>

            {/* Recent Reviews */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-xl" style={{ color: "#fff" }}>Reviews Recentes</h2>
                <Link href="/games" className="text-sm font-semibold transition-colors hover:text-white" style={{ color: "#40bcf4" }}>Ver mais →</Link>
              </div>
              <div className="space-y-4">
                {recentReviews.map((review) => (<ReviewCard key={review.id} review={review} showGame />))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <section className="mb-8">
              <h3 className="font-display font-bold text-base uppercase tracking-wider mb-4" style={{ color: "#9ab", borderBottom: "1px solid #2c3440", paddingBottom: "8px" }}>Listas Populares</h3>
              <div className="space-y-3">
                {mockLists.map((list) => (
                  <Link key={list.id} href={`/lists/${list.id}`} className="block rounded-lg p-3 transition-colors hover:bg-white/5" style={{ backgroundColor: "#1c2228", border: "1px solid #2c3440" }}>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#fff" }}>{list.title}</p>
                    <p className="text-xs" style={{ color: "#678" }}>por <span style={{ color: "#40bcf4" }}>{list.user?.displayName || list.user?.username}</span> · {list.gamesCount} jogos · ♥ {list.likesCount}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-xl p-5 text-center" style={{ backgroundColor: "#1c2228", border: "1px solid #2c3440" }}>
              <div className="text-3xl font-display font-black mb-2"><span style={{ color: "#00e054" }}>GAME</span><span style={{ color: "#fff" }}>LOG</span></div>
              <p className="text-sm mb-4" style={{ color: "#9ab" }}>Registre cada jogo. Compartilhe cada pensamento. Descubra sua próxima aventura.</p>
              <Link href="/sign-up" className="block w-full py-2.5 rounded font-bold text-sm transition-colors" style={{ backgroundColor: "#00e054", color: "#14181c" }}>Criar conta grátis</Link>
              <p className="text-xs mt-3" style={{ color: "#678" }}>Já tem conta? <Link href="/sign-in" style={{ color: "#40bcf4" }}>Entrar</Link></p>
            </section>

            <section className="mt-6">
              <div className="grid grid-cols-3 gap-2">
                {[{ label: "Jogos", value: "12.4K" }, { label: "Reviews", value: "89K" }, { label: "Membros", value: "4.2K" }].map((stat) => (
                  <div key={stat.label} className="rounded-lg p-3 text-center" style={{ backgroundColor: "#1c2228", border: "1px solid #2c3440" }}>
                    <div className="font-display font-bold text-lg" style={{ color: "#00e054" }}>{stat.value}</div>
                    <div className="text-xs" style={{ color: "#678" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8" style={{ borderTop: "1px solid #2c3440" }}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display font-black text-lg"><span style={{ color: "#00e054" }}>GAME</span><span style={{ color: "#fff" }}>LOG</span></div>
          <p className="text-xs" style={{ color: "#678" }}>Track every game. Share every thought. — GameLog © 2024</p>
          <div className="flex gap-4">
            {["Sobre", "Privacidade", "Termos", "API"].map((item) => (<Link key={item} href="#" className="text-xs transition-colors hover:text-white" style={{ color: "#678" }}>{item}</Link>))}
          </div>
        </div>
      </footer>
    </div>
  );
}
