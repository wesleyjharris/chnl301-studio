import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2 } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import { useAudio } from "@/context/audio-context";
import type { Song } from "@shared/schema";

interface SongCardProps {
  song: Song;
}

// Function to extract YouTube video ID from URL (including Shorts)
function getYouTubeVideoId(url: string): string | null {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|shorts\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Function to check if URL is a YouTube Short
function isYouTubeShort(url: string): boolean {
  return url.includes('/shorts/');
}

export default function SongCard({ song }: SongCardProps) {


  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudio();
  const youtubeVideoId = song.youtubeUrl ? getYouTubeVideoId(song.youtubeUrl) : null;
  const isCurrentTrack = currentTrack?.id === song.id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  const handlePlayToggle = async () => {
    if (isCurrentTrack) {
      if (isPlaying) {
        pauseTrack();
      } else {
        await playTrack(song);
      }
    } else {
      await playTrack(song);
    }
  };

  return (
    <div className="bg-dark-secondary rounded-xl overflow-hidden hover:bg-dark-tertiary transition-colors group relative">
      {youtubeVideoId ? (
        <>
          <div 
            className="w-full aspect-video p-4 pb-2 overflow-hidden relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeVideoId}${song.title === 'Coffee In The Hills' ? '?start=18' : '?'}${isHovered ? '&autoplay=1&mute=0' : ''}&controls=1&modestbranding=1&rel=0&enablejsapi=1`}
              title={`${song.title} - YouTube video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="rounded-lg transition-all duration-300 ${isHovered ? 'scale-[1.02] shadow-lg' : ''}"
              onLoad={() => console.log('Video loaded successfully')}
              onError={() => console.log('Video failed to load')}
            />
            {/* Hover overlay with play indicator */}
            {!isHovered && (
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-red-600 text-white rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Play className="h-6 w-6" />
                </div>
              </div>
            )}
            {/* Video status indicator */}
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {isHovered ? 'Playing' : 'Hover to play'}
            </div>
          </div>

          {/* Video Title */}
          <div className="px-4 pb-4">
            <h4 className="font-semibold text-lg">{song.title}</h4>
          </div>

        </>
      ) : (
        <>
          <img 
            src={song.artworkUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400'} 
            alt={`${song.title} artwork`} 
            className="w-full aspect-square rounded-lg mb-4" 
          />
          <h4 className="font-semibold mb-2">{song.title}</h4>
          <p className="text-muted text-sm mb-4">{song.duration}</p>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              className={`p-2 rounded-full hover:scale-110 transition-all ${
                isCurrentTrack 
                  ? 'bg-amber-500 text-black' 
                  : 'bg-spotify-green text-black'
              }`}
              onClick={handlePlayToggle}
            >
              {isCurrentlyPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            {isCurrentTrack && (
              <div className="flex items-center text-xs text-amber-400">
                <Volume2 className="h-3 w-3 mr-1" />
                <span className="text-xs">Crossfade Ready</span>
              </div>
            )}
            {song.spotifyUrl && (
              <a
                href={song.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-spotify-green hover:underline text-sm flex items-center"
              >
                <SiSpotify className="mr-1 h-4 w-4" />
                Listen on Spotify
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
}
