import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AudioControls from "@/components/audio-controls";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-primary text-white">
      <Navigation />
      <main>
        <HeroSection />
      </main>
      <Footer />
      <AudioControls />
    </div>
  );
}
