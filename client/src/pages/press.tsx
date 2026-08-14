import Navigation from "@/components/navigation";
import EventRecapSection from "@/components/event-recap-section";
import Footer from "@/components/footer";

export default function Press() {
  return (
    <div className="min-h-screen bg-dark-primary">
      <Navigation />
      <EventRecapSection />
      <Footer />
    </div>
  );
}