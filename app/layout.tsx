import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const firaGo = localFont({
  src: [
    { path: "../public/fonts/FiraGO-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/FiraGO-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/FiraGO-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/FiraGO-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-firago",
  display: "swap",
});

export const metadata: Metadata = {
  title: "სასტუმრო აგავა — რეცეფცია",
  description: "სტუმრების აღრიცხვის სისტემა",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ka" className={`${firaGo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
