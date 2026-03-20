import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Pricing } from "@/components/Pricing";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col noise-bg">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <Pricing />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
