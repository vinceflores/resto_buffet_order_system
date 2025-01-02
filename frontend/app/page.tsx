import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { CTA } from "@/components/landing/cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
      <footer className="py-8 text-center text-sm text-gray-500">
        © 2023 BuffetBoss. All rights reserved.
      </footer>
    </div>
  );
}
