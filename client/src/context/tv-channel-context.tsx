import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { useLocation } from 'wouter';

interface TVChannelContextType {
  currentChannel: number;
  isTransitioning: boolean;
  switchToChannel: (channel: number) => void;
  triggerChannelSwitch: (path: string) => void;
}

const TVChannelContext = createContext<TVChannelContextType | undefined>(undefined);

const pathChannels = {
  '/': 1,
  '/artists': 2,
  '/music': 3,
  '/press': 4,
  '/about': 5
};

interface TVChannelProviderProps {
  children: ReactNode;
}

export function TVChannelProvider({ children }: TVChannelProviderProps) {
  const [location] = useLocation();
  const [currentChannel, setCurrentChannel] = useState(() => {
    return pathChannels[location as keyof typeof pathChannels] || 1;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sync channel with current route
  useEffect(() => {
    const channelNumber = pathChannels[location as keyof typeof pathChannels];
    if (channelNumber && channelNumber !== currentChannel) {
      setCurrentChannel(channelNumber);
    }
  }, [location, currentChannel]);

  const switchToChannel = useCallback((channel: number) => {
    if (isTransitioning || channel === currentChannel) return;
    
    setIsTransitioning(true);
    
    // Simulate channel switching delay
    setTimeout(() => {
      setCurrentChannel(channel);
      setIsTransitioning(false);
    }, 1200);
  }, [currentChannel, isTransitioning]);

  const triggerChannelSwitch = useCallback((path: string) => {
    const channelNumber = pathChannels[path as keyof typeof pathChannels];
    if (channelNumber) {
      switchToChannel(channelNumber);
    } else {
      console.error(`No channel mapped for path '${path}'`);
    }
  }, [switchToChannel]);

  return (
    <TVChannelContext.Provider value={{
      currentChannel,
      isTransitioning,
      switchToChannel,
      triggerChannelSwitch
    }}>
      {children}
    </TVChannelContext.Provider>
  );
}

export function useTVChannel() {
  const context = useContext(TVChannelContext);
  if (!context) {
    throw new Error('useTVChannel must be used within a TVChannelProvider');
  }
  return context;
}