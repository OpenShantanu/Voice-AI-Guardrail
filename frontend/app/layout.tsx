import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voice Guardrail",
  description: "AI Voice Security Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}