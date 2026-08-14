import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Music2, Music } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useTVChannel } from "@/context/tv-channel-context";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location, setLocation] = useLocation();
  const { triggerChannelSwitch } = useTVChannel();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    triggerChannelSwitch(path);
    setTimeout(() => {
      setLocation(path);
    }, 300); // Delay to allow channel switch animation
  };

  return (
    <nav className={`fixed top-0 w-full z-50 border-b border-dark-tertiary transition-all duration-300 ${
      isScrolled ? 'bg-dark-primary/95 backdrop-blur-sm' : 'bg-dark-primary/95'
    }`}>
      <div className="max-w-full mx-auto px-8 py-4">
        <div className="flex items-center justify-between w-full">
          <button 
            onClick={() => handleNavigation('/')}
            className="text-2xl font-bold text-blue-200 flex items-center hover:text-spotify-green transition-colors"
          >
            <span className="mr-2 text-2xl">🌐</span>
            chnl301
          </button>
          
          <div className="hidden md:flex space-x-6 items-center flex-1 justify-center">
            <button 
              onClick={() => handleNavigation('/')}
              className={`transition-all duration-300 text-base font-semibold px-4 py-2 rounded-lg hover:bg-dark-tertiary nav-transition ${
                location === '/' ? 'text-spotify-green bg-dark-tertiary' : 'text-white hover:text-spotify-green'
              }`}
              style={{ minWidth: '70px', fontSize: '14px' }}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/artists')}
              className={`transition-all duration-300 text-base font-semibold px-4 py-2 rounded-lg hover:bg-dark-tertiary nav-transition ${
                location === '/artists' ? 'text-spotify-green bg-dark-tertiary' : 'text-white hover:text-spotify-green'
              }`}
              style={{ minWidth: '70px', fontSize: '14px' }}
            >
              Artists
            </button>
            <button 
              onClick={() => handleNavigation('/music')}
              className={`transition-all duration-300 text-base font-semibold px-4 py-2 rounded-lg hover:bg-dark-tertiary nav-transition ${
                location === '/music' ? 'text-spotify-green bg-dark-tertiary' : 'text-white hover:text-spotify-green'
              }`}
              style={{ minWidth: '70px', fontSize: '14px' }}
            >
              Music
            </button>
            <button 
              onClick={() => handleNavigation('/press')}
              className={`transition-all duration-300 text-base font-semibold px-4 py-2 rounded-lg hover:bg-dark-tertiary nav-transition ${
                location === '/press' ? 'text-spotify-green bg-dark-tertiary' : 'text-white hover:text-spotify-green'
              }`}
              style={{ minWidth: '70px', fontSize: '14px' }}
            >
              Press
            </button>
            <button 
              onClick={() => handleNavigation('/about')}
              className={`transition-all duration-300 text-base font-semibold px-4 py-2 rounded-lg hover:bg-dark-tertiary nav-transition ${
                location === '/about' ? 'text-spotify-green bg-dark-tertiary' : 'text-white hover:text-spotify-green'
              }`}
              style={{ minWidth: '70px', fontSize: '14px' }}
            >
              About
            </button>
          </div>
          
          <Button variant="ghost" size="sm" className="md:hidden text-blue-200">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
