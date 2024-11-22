import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/Components/Header";

export const metadata: Metadata = {
  title: "Urna",
  description: "Eletronic Electoral System",
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
