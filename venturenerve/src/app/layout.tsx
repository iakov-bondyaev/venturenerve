import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "VentureNerve",
  description: "Match capital to startups by risk-adjusted return.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
          <Navbar />
          <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
              <Sidebar />
              <main className="min-w-0">{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
