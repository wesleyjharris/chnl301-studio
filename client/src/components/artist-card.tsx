import { Instagram } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import type { Artist } from "@shared/schema";

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 mb-16 last:mb-0 group cursor-pointer p-4 -m-4 rounded-2xl transition-all duration-300 ease-out hover:bg-dark-secondary/20 hover:shadow-2xl hover:shadow-spotify-green/5">
      {/* Artist Image */}
      <div className="lg:w-1/3 flex-shrink-0 overflow-hidden rounded-lg relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-spotify-green/10 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 z-10 pointer-events-none"></div>
        <img 
          src={artist.imageUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'} 
          alt={`${artist.name} portrait`} 
          className="w-full aspect-square object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-105 group-hover:contrast-105 group-hover:saturate-110" 
          style={artist.name === "Isaiah Bradshaw" ? { objectPosition: "center 70%" } : {}}
        />
      </div>

      {/* Artist Info */}
      <div className="lg:w-2/3 transition-all duration-300 ease-out group-hover:transform group-hover:translate-x-2">
        <h3 className="text-3xl font-bold mb-6 transition-all duration-300 ease-out group-hover:text-spotify-green group-hover:transform group-hover:scale-105 origin-left">
          {artist.soundcloudUrl ? (
            <a 
              href={artist.soundcloudUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-spotify-green hover:underline transition-all duration-300 ease-out hover:drop-shadow-lg hover:drop-shadow-spotify-green/50"
            >
              {artist.name.toUpperCase()}
            </a>
          ) : (
            <span className="text-spotify-green">{artist.name.toUpperCase()}</span>
          )}
        </h3>
        
        <div className="text-white text-base leading-relaxed mb-8 space-y-4 transition-all duration-300 ease-out group-hover:text-gray-200">
          {artist.bio.split('\n\n').map((paragraph, index) => (
            <p key={index} className="transition-all duration-300 ease-out opacity-90 group-hover:opacity-100 group-hover:transform group-hover:translate-x-1" style={{ transitionDelay: `${index * 50}ms` }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col space-y-2">
          {artist.instagramUrl && (
            <a 
              href={artist.instagramUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-spotify-green hover:underline flex items-center transition-all duration-300 ease-out hover:transform hover:translate-x-1 hover:text-spotify-green hover:drop-shadow-lg hover:drop-shadow-spotify-green/50 group-hover:transform group-hover:scale-105 w-fit"
            >
              <Instagram className="mr-2 text-lg transition-all duration-300 ease-out hover:scale-110 hover:rotate-12" />
              {artist.instagramHandle || `@${artist.instagramUrl?.split('/').pop()?.replace(/\?.*/, '') || 'instagram'}`}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
