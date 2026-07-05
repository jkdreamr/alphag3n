import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ALPHAG3N — The World's Largest Web3 and AI Highschool Community",
  description:
    "ALPHAG3N is the largest Web3 and AI community for high schoolers. Working with sponsors such as Coinbase, we connect and teach like-minded teens through resources, once-in-a-lifetime events, and a strong community.",
  keywords: [
    "ALPHAG3N",
    "Web3",
    "AI",
    "high school",
    "community",
    "blockchain",
    "hackathon",
    "Stanford",
  ],
  openGraph: {
    title: "ALPHAG3N — The World's Largest Web3 and AI Highschool Community",
    description:
      "The largest Web3 and AI community for high schoolers. Resources, once-in-a-lifetime events, and a strong community.",
    type: "website",
  },
  icons: {
    icon: "/assets/ag-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#050609",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
