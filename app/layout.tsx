import type { Metadata } from "next";
import { Zain } from "next/font/google";
import "./globals.css";

const zain = Zain({
  variable: "--font-zain",
  weight: ["200", "300", "400", "700", "800", "900"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "My Company App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body
        className={`${zain.className} antialiased `}
        style={{ direction: "rtl" }}
      >
        {children}
      </body>
    </html>
  );
}
