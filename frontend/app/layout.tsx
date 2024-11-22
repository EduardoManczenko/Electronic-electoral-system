import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/app/Components/Header";

export const metadata: Metadata = {
  title: "Urna",
  description: "Electronic Electoral System",
  icons: {
    icon: "/images/logo_justica_eleitoral_2.png", // Caminho para o favicon
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
