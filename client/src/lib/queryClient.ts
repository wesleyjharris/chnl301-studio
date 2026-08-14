import { QueryClient, QueryFunction } from "@tanstack/react-query";
import {
  seedArtists,
  seedSongs,
  seedBeats,
  seedSubscriptionPlans,
} from "@shared/data";

// The site ships as static files, so there is no API server to call.
// Query keys keep their "/api/..." shape and resolve against the bundled
// content instead. Adding a route here is all that is needed to expose
// more content to components.
function resolveStaticData(path: string): unknown {
  switch (path) {
    case "/api/artists":
      return seedArtists;
    case "/api/songs":
      return seedSongs;
    case "/api/beats":
      return seedBeats;
    case "/api/beats/featured":
      return seedBeats.slice(0, 4);
    case "/api/subscription-plans":
      return seedSubscriptionPlans;
  }

  const artistMatch = path.match(/^\/api\/artists\/(\d+)$/);
  if (artistMatch) {
    return seedArtists.find((artist) => artist.id === Number(artistMatch[1]));
  }

  throw new Error(`No static data registered for query key: ${path}`);
}

export const getQueryFn =
  <T,>(): QueryFunction<T> =>
  async ({ queryKey }) =>
    resolveStaticData(queryKey[0] as string) as T;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn(),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
