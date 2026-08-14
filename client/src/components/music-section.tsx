import { useQuery } from "@tanstack/react-query";
import SongCard from "@/components/song-card";
import { Skeleton } from "@/components/ui/skeleton";
import { SiSpotify } from "react-icons/si";
import { Instagram, Youtube } from "lucide-react";
import type { Artist, Song } from "@shared/schema";

export default function MusicSection() {
  const { data: artists, isLoading: artistsLoading } = useQuery<Artist[]>({
    queryKey: ['/api/artists'],
  });

  const { data: songs, isLoading: songsLoading } = useQuery<Song[]>({
    queryKey: ['/api/songs'],
  });

  const isLoading = artistsLoading || songsLoading;

  const getSongsByArtist = (artistId: number) => {
    const artistSongs = songs?.filter(song => song.artistId === artistId) || [];
    
    // For Isaiah Bradshaw (artistId: 2), exclude "Coffee In The Hills"
    if (artistId === 2) {
      return artistSongs.filter(song => song.title !== "Coffee In The Hills");
    }
    
    return artistSongs;
  };

  if (isLoading) {
    return (
      <section id="music" className="pt-32 pb-20 bg-dark-primary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="space-y-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-6">
                <Skeleton className="h-8 w-48" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 2 }).map((_, j) => (
                    <div key={j} className="bg-dark-secondary rounded-xl p-4">
                      <Skeleton className="w-full aspect-square rounded-lg mb-4" />
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="music" className="pt-32 pb-20 bg-dark-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Music</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto font-monoton">
            Collaborations along our path
          </p>
        </div>

        <div className="space-y-24">
          {/* YouTube Videos Section */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold mb-12 text-center">Latest Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {songs?.filter(song => song.youtubeUrl).map((song) => {
                const artist = artists?.find(a => a.id === song.artistId);
                
                return (
                  <div key={song.id} className="group">
                    <div className="bg-dark-secondary rounded-xl overflow-hidden hover:bg-dark-tertiary transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                      <SongCard song={song} />
                      {/* Artist Attribution */}
                      {artist && (
                        <div className="p-6 pt-4 border-t border-dark-tertiary">
                          <p className="text-sm text-muted">
                            by{' '}
                            <a 
                              href={artist.soundcloudUrl || '#'} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-spotify-green hover:underline font-medium"
                            >
                              {artist.name}
                            </a>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Spotify Playlists Section */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl font-bold mb-12 text-center">Spotify Playlists</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
              {/* CHNL301 N Friends Playlist */}
              <div className="bg-dark-secondary rounded-xl p-8 w-full hover:bg-dark-tertiary transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="w-full aspect-square rounded-lg mb-6 overflow-hidden">
                  <img 
                    src="/Screen Shot 2025-06-18 at 12.03.16 AM_1750230242680.png" 
                    alt="CHNL301 N Friends Playlist Cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-xl mb-4">CHNL301 N Friends</h4>
                <a 
                  href="https://open.spotify.com/playlist/63aYBfvsPFZ7IuubPvgY8J" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-spotify-green text-black font-semibold py-3 px-6 rounded-full hover:bg-yellow-300 transition-colors"
                >
                  <SiSpotify className="mr-2 text-lg" />
                  Listen on Spotify
                </a>
              </div>

              {/* Natty Clxssic Playlist */}
              {(() => {
                const nattyPlaylist = songs?.find(song => song.title === "Natty Clxssic Spotify Playlist");
                const nattyArtist = artists?.find(a => a.id === nattyPlaylist?.artistId);
                
                if (!nattyPlaylist || !nattyArtist) return null;
                
                return (
                  <div className="bg-dark-secondary rounded-xl p-8 w-full hover:bg-dark-tertiary transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    <div className="w-full aspect-square rounded-lg mb-6 overflow-hidden">
                      <img 
                        src={nattyPlaylist.artworkUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400'} 
                        alt="Natty Clxssic Playlist Cover" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-bold text-xl mb-4">{nattyArtist.name}</h4>
                    <a 
                      href={nattyPlaylist.spotifyUrl || '#'} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full bg-spotify-green text-black font-semibold py-3 px-6 rounded-full hover:bg-yellow-300 transition-colors"
                    >
                      <SiSpotify className="mr-2 text-lg" />
                      Listen on Spotify
                    </a>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Artist Spotify Profiles */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold mb-12 text-center">Follow Our Artists</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {artists?.map((artist) => (
              <div key={artist.id} className="bg-dark-secondary rounded-xl p-6 text-center hover:bg-dark-tertiary transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={artist.imageUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200'} 
                    alt={`${artist.name} profile`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-2">{artist.name}</h4>
                <p className="text-muted text-sm mb-4">{artist.role}</p>
                <div className="flex justify-center space-x-4">
                  {artist.name === "NoBryant" ? (
                    <a 
                      href="https://www.youtube.com/@ToTheThirdPlace" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Youtube className="text-xl" />
                    </a>
                  ) : artist.soundcloudUrl && (
                    <a 
                      href={artist.soundcloudUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-spotify-green hover:text-spotify-green transition-colors"
                    >
                      <SiSpotify className="text-xl" />
                    </a>
                  )}
                  {artist.instagramUrl && (
                    <a 
                      href={artist.instagramUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-white transition-colors"
                    >
                      <Instagram className="text-xl" />
                    </a>
                  )}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
