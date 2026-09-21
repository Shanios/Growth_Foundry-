import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Growth Foundry", template: "%s | Growth Foundry" },
  description:
    "Independent strategy and transformation partner helping ambitious businesses turn direction into measurable momentum.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
