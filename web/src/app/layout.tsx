import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Prof",
  authors: [{ name: "Arthur Rodrigues", url: "https://github.com/ArthurRod" }],
  description: "Grades and observations register aplication",
  icons: {
    icon: "/ico/favicon.ico",
    apple: "/ico/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
