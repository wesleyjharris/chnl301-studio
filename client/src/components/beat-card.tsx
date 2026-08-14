import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import type { Beat, Artist } from "@shared/schema";

interface BeatCardProps {
  beat: Beat;
}

export default function BeatCard({ beat }: BeatCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const { data: producer } = useQuery<Artist>({
    queryKey: [`/api/artists/${beat.producerId}`],
  });

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      // Simulate audio progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    } else {
      setProgress(0);
    }
  };

  const getGradientColor = () => {
    const gradients = [
      'from-spotify-green to-accent-orange',
      'from-accent-orange to-spotify-green',
      'from-purple-500 to-pink-500',
      'from-blue-500 to-teal-500'
    ];
    return gradients[beat.id % gradients.length];
  };

  return (
    <div className="bg-dark-secondary rounded-xl p-4 hover:bg-dark-tertiary transition-colors">
      <div className={`w-full aspect-square bg-gradient-to-br ${getGradientColor()} rounded-lg mb-4 flex items-center justify-center`}>
        <SiSpotify className="text-4xl text-blue-200 opacity-50" />
      </div>
      
      <h4 className="font-semibold mb-2">{beat.title}</h4>
      <p className="text-muted text-sm mb-2">by {producer?.name || 'Loading...'}</p>
      
      <div className="flex justify-between text-xs text-muted mb-4">
        <span>{beat.bpm} BPM</span>
        <span>{beat.key}</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          className="bg-spotify-green text-black p-2 rounded-full hover:scale-110 transition-transform flex-shrink-0"
          onClick={handlePlayToggle}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        
        <div className="flex-1 bg-dark-tertiary rounded-full h-1">
          <div 
            className="bg-spotify-green h-1 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
