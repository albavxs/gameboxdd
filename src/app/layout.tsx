import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GameLog — Track every game. Share every thought.",
  description: "GameLog é uma plataforma social de rastreamento, avaliação e descoberta de videogames.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700;900&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: "#14181c", color: "#fff" }}>
        {children}
      </body>
    </html>
  );
}
