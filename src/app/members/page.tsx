import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { mockUsers } from "@/lib/mockData";

export default function MembersPage() {
  return (
    <div style={{ backgroundColor: "#14181c", minHeight: "100vh" }}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="font-display font-black text-3xl mb-2" style={{ color: "#fff" }}>
          Membros
        </h1>
        <p className="text-sm mb-8" style={{ color: "#9ab" }}>
          Descubra outros jogadores e suas coleções
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockUsers.map((user) => (
            <Link
              key={user.id}
              href={`/members/${user.username}`}
              className="rounded-xl p-5 flex items-start gap-4 transition-colors hover:bg-white/5"
              style={{ backgroundColor: "#1c2228", border: "1px solid #2c3440" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black shrink-0"
                style={{ backgroundColor: "#00e054", color: "#14181c" }}
              >
                {user.username[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-base" style={{ color: "#fff" }}>
                  {user.displayName || user.username}
                </p>
                <p className="text-sm" style={{ color: "#40bcf4" }}>@{user.username}</p>
                {user.bio && (
                  <p className="text-xs mt-1 line-clamp-2" style={{ color: "#9ab" }}>
                    {user.bio}
                  </p>
                )}
                <div className="flex gap-4 mt-2 text-xs" style={{ color: "#678" }}>
                  <span><strong style={{ color: "#9ab" }}>{user.gamesPlayed}</strong> jogos</span>
                  <span><strong style={{ color: "#9ab" }}>{user.followersCount}</strong> seguidores</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
