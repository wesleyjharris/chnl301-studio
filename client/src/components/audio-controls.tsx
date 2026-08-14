import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, Music, SkipForward, SkipBack, Shuffle } from 'lucide-react';
import { useAudio } from '@/context/audio-context';

export default function AudioControls() {
  const { currentTrack, volume, setVolume, crossfadeDuration, setCrossfadeDuration } = useAudio();
  const [isVisible, setIsVisible] = useState(false);

  if (!currentTrack && !isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="bg-dark-secondary border-gray-700 w-80">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <div className="flex items-center">
              <Music className="h-4 w-4 mr-2 text-spotify-green" />
              <span>Audio Controls</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(!isVisible)}
              className="h-6 w-6 p-0"
            >
              {isVisible ? '−' : '+'}
            </Button>
          </CardTitle>
        </CardHeader>
        
        {(isVisible || currentTrack) && (
          <CardContent className="space-y-4">
            {currentTrack && (
              <div className="text-sm">
                <p className="font-medium text-white">{currentTrack.title}</p>
                <p className="text-gray-400">Duration: {currentTrack.duration}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300 flex items-center">
                  <Volume2 className="h-3 w-3 mr-1" />
                  Volume
                </label>
                <span className="text-xs text-gray-400">{Math.round(volume * 100)}%</span>
              </div>
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={1}
                min={0}
                step={0.01}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300 flex items-center">
                  <Shuffle className="h-3 w-3 mr-1" />
                  Crossfade Duration
                </label>
                <span className="text-xs text-gray-400">{crossfadeDuration / 1000}s</span>
              </div>
              <Slider
                value={[crossfadeDuration]}
                onValueChange={(value) => setCrossfadeDuration(value[0])}
                max={8000}
                min={500}
                step={250}
                className="w-full"
              />
            </div>

            <div className="flex justify-center space-x-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-xs text-gray-500 text-center">
              Click any track to start crossfade transitions
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}