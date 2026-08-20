import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MindEase — Your sanctuary for mental well-being",
  description:
    "A calm, supportive space for students to track well-being, take assessments, and find support.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${baloo.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream">{children}</body>
    </html>
  );
}
