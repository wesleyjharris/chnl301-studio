import { useState, useRef, useCallback, useEffect } from 'react';
import type { Song } from '@shared/schema';

interface AudioPlayer {
  audio: HTMLAudioElement;
  volume: number;
  fadeDirection: 'in' | 'out' | 'none';
  song: Song | null;
}

interface AudioManagerState {
  currentTrack: Song | null;
  isPlaying: boolean;
  volume: number;
  crossfadeDuration: number;
}

export function useAudioManager() {
  // Force clear any cached audio state
  const [state, setState] = useState<AudioManagerState>({
    currentTrack: null,
    isPlaying: false,
    volume: 0.7,
    crossfadeDuration: 3000, // 3 seconds crossfade
  });

  const primaryPlayer = useRef<AudioPlayer>({
    audio: new Audio(),
    volume: 0,
    fadeDirection: 'none',
    song: null
  });

  const secondaryPlayer = useRef<AudioPlayer>({
    audio: new Audio(),
    volume: 0,
    fadeDirection: 'none',
    song: null
  });

  const fadeInterval = useRef<NodeJS.Timeout | null>(null);
  const crossfadeInProgress = useRef(false);

  // Initialize audio players
  useEffect(() => {
    const setupPlayer = (player: AudioPlayer) => {
      player.audio.preload = 'metadata';
      player.audio.crossOrigin = 'anonymous';
      player.audio.volume = 0;
      
      player.audio.addEventListener('loadeddata', () => {
        console.log('Audio loaded successfully');
      });
      
      player.audio.addEventListener('error', (e) => {
        console.error('Audio loading error:', e);
      });
    };

    setupPlayer(primaryPlayer.current);
    setupPlayer(secondaryPlayer.current);

    return () => {
      primaryPlayer.current.audio.pause();
      secondaryPlayer.current.audio.pause();
      if (fadeInterval.current) {
        clearInterval(fadeInterval.current);
      }
    };
  }, []);

  const startCrossfade = useCallback((fromPlayer: AudioPlayer, toPlayer: AudioPlayer) => {
    if (crossfadeInProgress.current) return;
    
    crossfadeInProgress.current = true;
    const steps = 50;
    const stepDuration = state.crossfadeDuration / steps;
    let currentStep = 0;

    fromPlayer.fadeDirection = 'out';
    toPlayer.fadeDirection = 'in';

    if (fadeInterval.current) {
      clearInterval(fadeInterval.current);
    }

    fadeInterval.current = setInterval(() => {
      const progress = currentStep / steps;
      
      // Fade out current track
      fromPlayer.volume = state.volume * (1 - progress);
      fromPlayer.audio.volume = Math.max(0, fromPlayer.volume);
      
      // Fade in new track
      toPlayer.volume = state.volume * progress;
      toPlayer.audio.volume = Math.min(state.volume, toPlayer.volume);

      currentStep++;

      if (currentStep >= steps) {
        // Crossfade complete
        if (fadeInterval.current) {
          clearInterval(fadeInterval.current);
          fadeInterval.current = null;
        }
        
        fromPlayer.audio.pause();
        fromPlayer.volume = 0;
        fromPlayer.fadeDirection = 'none';
        
        toPlayer.fadeDirection = 'none';
        crossfadeInProgress.current = false;
      }
    }, stepDuration);
  }, [state.crossfadeDuration, state.volume]);

  const playTrack = useCallback(async (song: Song) => {
    if (!song.youtubeUrl) return;

    // For YouTube videos, we'll use a preview URL approach
    // In production, you'd integrate with YouTube API or use audio streaming service
    const previewUrl = `/audio/preview-${song.id}.mp3`; // Placeholder for demo
    
    const currentPlayer = primaryPlayer.current.song ? secondaryPlayer.current : primaryPlayer.current;
    const otherPlayer = currentPlayer === primaryPlayer.current ? secondaryPlayer.current : primaryPlayer.current;

    try {
      currentPlayer.audio.src = previewUrl;
      currentPlayer.song = song;
      
      await currentPlayer.audio.load();
      
      setState(prev => ({ 
        ...prev, 
        currentTrack: song,
        isPlaying: true 
      }));

      if (otherPlayer.song && state.isPlaying) {
        // Start crossfade transition
        currentPlayer.audio.play();
        startCrossfade(otherPlayer, currentPlayer);
      } else {
        // First track or not currently playing
        currentPlayer.volume = state.volume;
        currentPlayer.audio.volume = state.volume;
        currentPlayer.audio.play();
      }

    } catch (error) {
      console.error('Error playing track:', error);
    }
  }, [state.isPlaying, state.volume, startCrossfade]);

  const pauseTrack = useCallback(() => {
    primaryPlayer.current.audio.pause();
    secondaryPlayer.current.audio.pause();
    
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    
    setState(prev => ({ ...prev, volume: clampedVolume }));
    
    if (!crossfadeInProgress.current) {
      primaryPlayer.current.audio.volume = clampedVolume;
      secondaryPlayer.current.audio.volume = clampedVolume;
    }
  }, []);

  const setCrossfadeDuration = useCallback((duration: number) => {
    setState(prev => ({ ...prev, crossfadeDuration: Math.max(500, duration) }));
  }, []);

  return {
    ...state,
    playTrack,
    pauseTrack,
    setVolume,
    setCrossfadeDuration,
  };
}