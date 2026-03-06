import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { mockLists } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";

export default function ListsPage() {
  return (
    <div style={{ backgroundColor: "#14181c", minHeight: "100vh" }}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-black text-3xl mb-2" style={{ color: "#fff" }}>
              Listas
            </h1>
            <p className="text-sm" style={{ color: "#9ab" }}>
              Coleções curadas pela comunidade
            </p>
          </div>
          <button
            className="px-4 py-2.5 rounded font-bold text-sm"
            style={{ backgroundColor: "#00e054", color: "#14181c" }}
          >
            + Nova Lista
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockLists.map((list) => (
            <Link
              key={list.id}
              href={`/lists/${list.id}`}
              className="block rounded-xl p-5 transition-colors hover:bg-white/5"
              style={{ backgroundColor: "#1c2228", border: "1px solid #2c3440" }}
            >
              <h2 className="font-display font-bold text-lg mb-2" style={{ color: "#fff" }}>
                {list.title}
              </h2>
              {list.description && (
                <p className="text-sm mb-3 line-clamp-2" style={{ color: "#9ab" }}>
                  {list.description}
                </p>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: "#00e054", color: "#14181c" }}
                  >
                    {list.user?.username?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm" style={{ color: "#40bcf4" }}>
                    {list.user?.displayName || list.user?.username}
                  </span>
                </div>
                <div className="flex gap-4 text-xs" style={{ color: "#678" }}>
                  <span>{list.gamesCount} jogos</span>
                  <span>♥ {list.likesCount}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
