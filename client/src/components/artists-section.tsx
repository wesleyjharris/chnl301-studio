import { useQuery } from "@tanstack/react-query";
import ArtistCard from "@/components/artist-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Artist } from "@shared/schema";

export default function ArtistsSection() {
  const { data: artists, isLoading, error } = useQuery<Artist[]>({
    queryKey: ['/api/artists'],
  });

  if (error) {
    return (
      <section id="about" className="pt-32 pb-20 bg-dark-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-2 text-gray-400">Artists</h2>
            <p className="text-gray-400 text-xl mb-4">The unique voices</p>
            <p className="text-red-400">Failed to load artists. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="pt-32 pb-20 bg-dark-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-gray-400">Artists</h2>
          <p className="text-gray-400 text-xl mb-4">The unique voices</p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Five unique voices, one collective vision. Discover the stories behind Chnl301.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col lg:flex-row gap-8 mb-16 last:mb-0">
                <div className="lg:w-1/3 flex-shrink-0">
                  <Skeleton className="w-full aspect-square rounded-lg" />
                </div>
                <div className="lg:w-2/3">
                  <Skeleton className="h-8 w-48 mb-6" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-5/6 mb-8" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            artists?.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
