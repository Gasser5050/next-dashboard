// import {} from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://next-dashboard-gasser.vercel.app/"
  ),
  title: {
    default: "My Dashboard",
    template: "%s | My Dashboard"
  },
  description: "A modern Next.js dashboard application",
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased scrollbar-none`}>
      <body className="min-h-full flex flex-col">
        <Header />

        <main className="flex flex-col grow bg-black/10">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
