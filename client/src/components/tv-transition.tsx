import { useState, useEffect, useRef } from 'react';

interface TVTransitionProps {
  children: React.ReactNode;
  isTransitioning: boolean;
  channelNumber?: number;
  onTransitionComplete?: () => void;
}

export default function TVTransition({ 
  children, 
  isTransitioning, 
  channelNumber, 
  onTransitionComplete 
}: TVTransitionProps) {
  const [showStatic, setShowStatic] = useState(false);
  const [showChannelNumber, setShowChannelNumber] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTransitioning) {
      // Start channel switching sequence with static effect
      setCurrentAnimation('channel-switch-exit-active');
      setShowStatic(true);
      
      // Show channel number during heavy static
      setTimeout(() => {
        setShowChannelNumber(true);
      }, 200);

      // Transition to new channel after static clears
      setTimeout(() => {
        setCurrentAnimation('channel-switch-enter-active');
        setShowStatic(false);
        
        // Hide channel number and complete transition
        setTimeout(() => {
          setShowChannelNumber(false);
          setCurrentAnimation('');
          onTransitionComplete?.();
        }, 300);
      }, 600);
    }
  }, [isTransitioning, onTransitionComplete]);

  const triggerChannelFlicker = () => {
    if (contentRef.current) {
      contentRef.current.classList.add('channel-flicker');
      setTimeout(() => {
        contentRef.current?.classList.remove('channel-flicker');
      }, 300);
    }
  };

  // Trigger random flicker effect occasionally
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 5 seconds
        triggerChannelFlicker();
      }
    }, 5000);

    return () => clearInterval(flickerInterval);
  }, []);

  return (
    <div className="relative">
      <div 
        ref={contentRef}
        className={`tv-content-wrapper ${currentAnimation} ${isTransitioning ? 'nav-transition switching' : ''}`}
      >
        {children}
      </div>
      
      {/* Static overlay during transition */}
      {showStatic && (
        <div className="tv-static-transition" />
      )}
      
      {/* Channel number display */}
      {channelNumber && (
        <div className={`channel-number ${showChannelNumber ? 'show' : ''}`}>
          CH {channelNumber}
        </div>
      )}
    </div>
  );
}

// Hook to manage TV transitions
export function useTVTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(1);

  const switchChannel = (newChannel: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentChannel(newChannel);
  };

  const onTransitionComplete = () => {
    setIsTransitioning(false);
  };

  return {
    isTransitioning,
    currentChannel,
    switchChannel,
    onTransitionComplete
  };
}