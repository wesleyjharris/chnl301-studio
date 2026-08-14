import Navigation from "@/components/navigation";
import ArtistsSection from "@/components/artists-section";
import Footer from "@/components/footer";

export default function Artists() {
  return (
    <div className="min-h-screen bg-dark-primary">
      <Navigation />
      <ArtistsSection />
      <Footer />
    </div>
  );
}