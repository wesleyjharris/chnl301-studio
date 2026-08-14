import {
  type Artist,
  type InsertArtist,
  type Song,
  type InsertSong,
  type Beat,
  type InsertBeat,
  type SubscriptionPlan,
  type InsertSubscriptionPlan
} from "@shared/schema";
import {
  seedArtists,
  seedSongs,
  seedBeats,
  seedSubscriptionPlans
} from "@shared/data";

export interface IStorage {
  // Artists
  getArtists(): Promise<Artist[]>;
  getArtist(id: number): Promise<Artist | undefined>;
  createArtist(artist: InsertArtist): Promise<Artist>;
  updateArtist(id: number, artist: Partial<InsertArtist>): Promise<Artist | undefined>;

  // Songs
  getSongs(): Promise<Song[]>;
  getSongsByArtist(artistId: number): Promise<Song[]>;
  createSong(song: InsertSong): Promise<Song>;

  // Beats
  getBeats(): Promise<Beat[]>;
  getFeaturedBeats(): Promise<Beat[]>;
  getBeatsByProducer(producerId: number): Promise<Beat[]>;
  createBeat(beat: InsertBeat): Promise<Beat>;

  // Subscription Plans
  getSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan>;
}

// Loads a seed list into a Map keyed by id, and returns the next free id.
function seed<T extends { id: number }>(target: Map<number, T>, rows: T[]): number {
  target.clear();
  rows.forEach(row => target.set(row.id, row));
  return rows.reduce((max, row) => Math.max(max, row.id), 0) + 1;
}

export class MemStorage implements IStorage {
  private artists: Map<number, Artist>;
  private songs: Map<number, Song>;
  private beats: Map<number, Beat>;
  private subscriptionPlans: Map<number, SubscriptionPlan>;
  private currentArtistId: number;
  private currentSongId: number;
  private currentBeatId: number;
  private currentPlanId: number;

  constructor() {
    this.artists = new Map();
    this.songs = new Map();
    this.beats = new Map();
    this.subscriptionPlans = new Map();

    // Content lives in shared/data.ts so the static client and this
    // in-memory store never drift apart.
    this.currentArtistId = seed(this.artists, seedArtists);
    this.currentSongId = seed(this.songs, seedSongs);
    this.currentBeatId = seed(this.beats, seedBeats);
    this.currentPlanId = seed(this.subscriptionPlans, seedSubscriptionPlans);
  }

  async getArtists(): Promise<Artist[]> {
    return Array.from(this.artists.values());
  }

  async getArtist(id: number): Promise<Artist | undefined> {
    return this.artists.get(id);
  }

  async createArtist(insertArtist: InsertArtist): Promise<Artist> {
    const id = this.currentArtistId++;
    const artist: Artist = {
      ...insertArtist,
      id,
      imageUrl: insertArtist.imageUrl || null,
      instagramUrl: insertArtist.instagramUrl || null,
      instagramHandle: insertArtist.instagramHandle || null,
      twitterUrl: insertArtist.twitterUrl || null,
      soundcloudUrl: insertArtist.soundcloudUrl || null
    };
    this.artists.set(id, artist);
    return artist;
  }

  async updateArtist(id: number, updateData: Partial<InsertArtist>): Promise<Artist | undefined> {
    const existing = this.artists.get(id);
    if (!existing) return undefined;

    const updated: Artist = { ...existing, ...updateData };
    this.artists.set(id, updated);
    return updated;
  }

  async getSongs(): Promise<Song[]> {
    return Array.from(this.songs.values());
  }

  async getSongsByArtist(artistId: number): Promise<Song[]> {
    return Array.from(this.songs.values()).filter(song => song.artistId === artistId);
  }

  async createSong(insertSong: InsertSong): Promise<Song> {
    const id = this.currentSongId++;
    const song: Song = {
      id,
      title: insertSong.title,
      artistId: insertSong.artistId,
      duration: insertSong.duration,
      spotifyUrl: insertSong.spotifyUrl || null,
      artworkUrl: insertSong.artworkUrl || null,
      youtubeUrl: insertSong.youtubeUrl || null
    };
    this.songs.set(id, song);
    return song;
  }

  async getBeats(): Promise<Beat[]> {
    return Array.from(this.beats.values());
  }

  async getFeaturedBeats(): Promise<Beat[]> {
    return Array.from(this.beats.values()).slice(0, 4);
  }

  async getBeatsByProducer(producerId: number): Promise<Beat[]> {
    return Array.from(this.beats.values()).filter(beat => beat.producerId === producerId);
  }

  async createBeat(insertBeat: InsertBeat): Promise<Beat> {
    const id = this.currentBeatId++;
    const beat: Beat = {
      ...insertBeat,
      id,
      previewUrl: insertBeat.previewUrl || null,
      price: insertBeat.price || null,
      isExclusive: insertBeat.isExclusive ?? null
    };
    this.beats.set(id, beat);
    return beat;
  }

  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return Array.from(this.subscriptionPlans.values());
  }

  async createSubscriptionPlan(insertPlan: InsertSubscriptionPlan): Promise<SubscriptionPlan> {
    const id = this.currentPlanId++;
    const plan: SubscriptionPlan = {
      ...insertPlan,
      id,
      isPopular: insertPlan.isPopular ?? null
    };
    this.subscriptionPlans.set(id, plan);
    return plan;
  }
}

export const storage = new MemStorage();
