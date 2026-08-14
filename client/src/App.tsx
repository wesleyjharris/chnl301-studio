import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AudioProvider } from "@/context/audio-context";
import { TVChannelProvider, useTVChannel } from "@/context/tv-channel-context";
import TVTransition from "@/components/tv-transition";
import Home from "@/pages/home";
import Artists from "@/pages/artists";
import Music from "@/pages/music";
import Press from "@/pages/press";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/artists" component={Artists} />
      <Route path="/music" component={Music} />
      <Route path="/press" component={Press} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function TVContent() {
  const { currentChannel, isTransitioning } = useTVChannel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-4">
      <div className="tv-bezel relative max-w-7xl mx-auto">
        <div className="tv-glow"></div>
        <div className="tv-screen">
          <div className="tv-static"></div>
          <div className="tv-content tv-curvature tv-turn-on">
            <TVTransition 
              isTransitioning={isTransitioning} 
              channelNumber={currentChannel}
            >
              <Toaster />
              <Router />
            </TVTransition>
          </div>
        </div>
        <div className="tv-brand">CHNL301</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AudioProvider>
        <TVChannelProvider>
          <TooltipProvider>
            <TVContent />
          </TooltipProvider>
        </TVChannelProvider>
      </AudioProvider>
    </QueryClientProvider>
  );
}

export default App;
