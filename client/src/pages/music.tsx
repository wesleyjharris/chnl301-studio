import Navigation from "@/components/navigation";
import MusicSection from "@/components/music-section";
import Footer from "@/components/footer";

export default function Music() {
  return (
    <div className="min-h-screen bg-dark-primary">
      <Navigation />
      <MusicSection />
      <Footer />
    </div>
  );
}