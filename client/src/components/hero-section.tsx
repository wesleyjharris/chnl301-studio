import { Button } from "@/components/ui/button";
import { ChevronDown, Music } from "lucide-react";
import { Music2 } from "lucide-react";
import { useLocation } from "wouter";
import { useTVChannel } from "@/context/tv-channel-context";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const [location, setLocation] = useLocation();
  const { triggerChannelSwitch } = useTVChannel();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleNavigation = (path: string) => {
    triggerChannelSwitch(path);
    setTimeout(() => {
      setLocation(path);
    }, 300); // Delay to allow channel switch animation
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Preload and prepare video for smooth playback
      video.load();
      
      // Handle seamless looping by preventing the default loop behavior
      const handleTimeUpdate = () => {
        // When video is very close to end, seamlessly jump to beginning
        if (video.duration && video.currentTime >= video.duration - 0.5) {
          video.currentTime = 0;
        }
      };

      const handleLoadedData = () => {
        console.log('Video loaded successfully');
        video.playbackRate = 1.0;
        // Start playing as soon as data is loaded
        video.play().catch(e => console.log('Autoplay blocked:', e));
      };

      const handleCanPlay = () => {
        console.log('Video ready to play');
        video.playbackRate = 1.0;
      };

      // Prevent the video from actually ending to avoid black screen
      const handleEnded = (e: Event) => {
        e.preventDefault();
        const target = e.target as HTMLVideoElement;
        target.currentTime = 0;
        target.play();
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        poster=""
        style={{ 
          animationPlayState: 'running',
          transform: 'translateZ(0)', // Hardware acceleration
          willChange: 'transform'
        }}
        onLoadStart={() => console.log('Video loading started')}
        onError={(e) => {
          console.error('Video failed to load:', e);
          console.error('Video error code:', e.currentTarget.error?.code);
          console.error('Video error message:', e.currentTarget.error?.message);
          const fallback = document.getElementById('fallback-bg');
          if (fallback) {
            fallback.style.display = 'block';
          }
        }}
        onPlay={() => console.log('Video playing')}
        onPause={() => console.log('Video paused')}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <source src="/hero-video.mov" type="video/quicktime" />
        Your browser does not support the video tag.
      </video>
      
      {/* Fallback background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black" 
        style={{ display: 'none' }} 
        id="fallback-bg"
      ></div>
      
      {/* Light overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      {/* Action buttons positioned strategically over video without blocking content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        {/* Left side button - positioned to avoid video text */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 pointer-events-auto">
          <Button 
            className="border-2 border-white bg-black/60 hover:bg-white hover:text-black text-white font-semibold px-6 py-3 rounded-full transition-all transform hover:scale-105 shadow-2xl backdrop-blur-md"
            onClick={() => handleNavigation('/artists')}
          >
            Meet the Artists
          </Button>
        </div>
        
        {/* Right side button - positioned to avoid video text */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-auto">
          <Button 
            className="border-2 border-white bg-black/60 hover:bg-white hover:text-black text-white font-semibold px-6 py-3 rounded-full transition-all shadow-2xl backdrop-blur-md"
            onClick={() => handleNavigation('/music')}
          >
            Discover the Music
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-blue-200 text-2xl" />
      </div>
    </section>
  );
}
