import React, { createContext, useContext, ReactNode } from 'react';
import { useAudioManager } from '@/hooks/use-audio-manager';
import type { Song } from '@shared/schema';

interface AudioContextValue {
  currentTrack: Song | null;
  isPlaying: boolean;
  volume: number;
  crossfadeDuration: number;
  playTrack: (song: Song) => Promise<void>;
  pauseTrack: () => void;
  setVolume: (volume: number) => void;
  setCrossfadeDuration: (duration: number) => void;
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const audioManager = useAudioManager();

  return (
    <AudioContext.Provider value={audioManager}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}