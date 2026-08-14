import { useState } from "react";
import { Play, Pause } from "lucide-react";

interface EventVideo {
  id: number;
  title: string;
  date: string;
  location: string;
  thumbnailUrl: string;
  videoUrl: string;
  description: string;
}

// Data structure for press items (videos and articles)
const pressItems: EventVideo[] = [
  {
    id: 1,
    title: "Isaiah Bradshaw: 40 Days & 40 Nights",
    date: "2024-03-15",
    location: "Documentary",
    thumbnailUrl: "https://img.youtube.com/vi/f92yNmmvgUk/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=f92yNmmvgUk&ab_channel=TheThirdPlace",
    description: "The Third Place Productions documentary exploring the artistic journey of Isaiah Bradshaw as he drops his first ever EP and does his first show with a live band"
  },
  {
    id: 2,
    title: "Life & Work with Isaiah Bradshaw of Mid City",
    date: "",
    location: "VoyageLA Interview",
    thumbnailUrl: "https://cdn.voyagela.com/wp-content/uploads/2023/11/c-PersonalIsaiahBradshaw__isah004053_1698731332356-1000x600.jpg",
    videoUrl: "https://voyagela.com/interview/life-work-with-isaiah-bradshaw-of-mid-city/",
    description: "In-depth interview exploring Isaiah Bradshaw's creative journey, artistic process, and the story behind his work in Mid City"
  },
  {
    id: 3,
    title: "Listening Now: Isaiah Bradshaw - Rebirth",
    date: "",
    location: "Last Day Deaf Feature",
    thumbnailUrl: "https://lastdaydeaf.com/wp-content/uploads/2024/11/Isaiah-Bradshaw-Rebirth.jpg",
    videoUrl: "https://lastdaydeaf.com/listening-now-isaiah-bradshaw-rebirth/",
    description: "Feature article highlighting Isaiah Bradshaw's latest song 'Rebirth' and his evolving sound as an artist"
  },
  {
    id: 4,
    title: "Airbnb – [Bran Movay]",
    date: "March 19, 2020",
    location: "Lyrical Lemonade Feature",
    thumbnailUrl: "https://img.youtube.com/vi/xn9wvzfRq3U/maxresdefault.jpg",
    videoUrl: "https://www.lyricallemonade.com/p/airbnb-bran-movay",
    description: "Feature article exploring Bran Movay's latest song 'Airbnb' featuring Ronnie Quest, showcasing their experimental blend of Hip-Hop, R&B, and Neo-Soul in this luscious weekend getaway anthem"
  }
];

export default function EventRecapSection() {
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);

  return (
    <section id="events" className="pt-32 pb-20 bg-dark-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-gray-400">Press</h2>
          <p className="text-gray-400 text-xl mb-4">Media Coverage & Features</p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover where CHNL301 artists have been featured in documentaries, interviews, and media showcases highlighting their creative journeys and musical contributions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pressItems.map((item) => (
            <a
              key={item.id}
              href={item.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dark-secondary rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 block"
              onMouseEnter={() => setHoveredVideo(item.id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <div className="relative group">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Play button overlay for videos, article icon for articles */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-spotify-green text-black rounded-full p-4 hover:bg-yellow-300 transition-colors duration-200">
                    <Play className="h-8 w-8" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-spotify-green text-sm font-medium mb-3">{item.location}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Coming Soon message */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg">
            Follow us on social media to stay updated on everything Chnl301.
          </p>
        </div>
      </div>
    </section>
  );
}