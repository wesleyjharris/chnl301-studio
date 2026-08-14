import { 
  artists, 
  songs, 
  beats, 
  subscriptionPlans,
  type Artist, 
  type InsertArtist,
  type Song,
  type InsertSong,
  type Beat,
  type InsertBeat,
  type SubscriptionPlan,
  type InsertSubscriptionPlan
} from "@shared/schema";

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
    this.currentArtistId = 1;
    this.currentSongId = 1;
    this.currentBeatId = 1;
    this.currentPlanId = 1;
    
    // Clear any existing data and reinitialize
    this.clearAll();
    this.initializeData();
  }

  private clearAll() {
    this.artists.clear();
    this.songs.clear();
    this.beats.clear();
    this.subscriptionPlans.clear();
  }

  private initializeData() {
    // Initialize default artists
    const defaultArtists: InsertArtist[] = [
      {
        name: "Ronnie Quest",
        role: "",
        bio: "\"For fans of experimental Hip-Hop and R&B, Ronnie Quest is the next stop of this wave, so hop on now or be sorry that you missed out later\" - Lyrical Lemonade\n\n\"He manages to switch seamlessly between the late night vibes of Toronto, the tropical rhythms of Kingston, and bounce of Los Angeles to create a myriad of sonic offerings.\"",
        imageUrl: "/IMG_2979_1750199389614.PNG",
        instagramUrl: "https://www.instagram.com/ronniequest/",
        instagramHandle: "@ronniequest",
        twitterUrl: "#",
        soundcloudUrl: "https://open.spotify.com/artist/5MhvAwI8NgndVhni9PbYOb?si=Ru_qYaO8RO-jC3rzYjILvA"
      },
      {
        name: "Isaiah Bradshaw",
        role: "",
        bio: "Isaiah Bradshaw is a genre-blending artist whose smooth flows and raw lyricism are matched by a deep musicality shaped across generations. With a sound rooted in 90s and 2000s Hip-Hop and R&B, infused with the warmth of jazz and soul, Isaiah creates music that feels both nostalgic and refreshingly modern. Raised in the San Fernando Valley, his earliest influences came from the records played around the house, from his parents' hip-hop favorites to the timeless classics introduced by his grandparents. While he's also a skilled producer known for his signature sample chops, Isaiah's true foundation lies in storytelling and self-expression. Driven by a lifelong need to create, he crafts songs that resonate across eras, cultures, and emotions.",
        imageUrl: "/DSC_2113 2_1750474127673.JPG",
        instagramUrl: "https://www.instagram.com/isaiahbradshaw42/",
        instagramHandle: "@isaiahbradshaw42",
        twitterUrl: "#",
        soundcloudUrl: "https://open.spotify.com/artist/0cXN6IO8BbkBw9BBFh1YIw?si=_rr6qIifQfKorwsrKL6u9A"
      },
      {
        name: "Natty Clxssic",
        role: "",
        bio: "Nathaniel Harris (aka Natty Clxssic) is a Los Angeles-based producer, composer, and keyboardist whose sound lives at the intersection of R&B, hip hop, cinematic scoring, afrobeat, and beyond. With over 20 years of musical experience—ranging from performing as a concert pianist with professional orchestras to crafting beats in the studio—Natty Clxssic brings both classical training and creative versatility to every project.\n\nHis music blends organic and synthesized textures to form rich, immersive soundscapes marked by an instinctive sense of harmony and melody. Whether he's scoring films, producing for rising artists, or composing original jingles for media platforms, Nathaniel approaches each composition with precision, emotion, and originality.",
        imageUrl: "/natty-clxssic-studio.jpg",
        instagramUrl: "https://www.instagram.com/nathanielharrismusic/",
        instagramHandle: "@nathanielharrismusic",
        twitterUrl: "#",
        soundcloudUrl: "https://open.spotify.com/artist/7pat8iIVODW5NapgHcpNva"
      },
      {
        name: "Colocho",
        role: "",
        bio: "'Colocho', a Guatemalan and South Sudanese American, hailing from Silver Spring, Maryland; a cultural epicenter a street away from Washington D.C. Taking inspiration from 'alabanzas', gospel music from Latin American, Jazz & Hip Hop from D.Cs chocolate city, and African diaspora music, such as dancehall, afrobeat, and reggaeton. The visionary collides these musical virtues to build cross cultural bridges throughout the capital region of  DC, Maryland, and Virginia. Making impact for next generation through his sonics, melodies & art, he wills this vision forward by creating dialogue on issues regarding classism, colorism, & culture, with the hopes of creating consensus in our shared human experience.",
        imageUrl: "/IMG_1283_1751851934510.jpeg",
        instagramUrl: "https://www.instagram.com/_colocho/",
        instagramHandle: "@_colocho",
        twitterUrl: "#",
        soundcloudUrl: "https://open.spotify.com/artist/2VeS7YVgy4AIxQakPwe9Ff"
      },
      {
        name: "NoBryant",
        role: "",
        bio: "Kobe is a multidisciplinary creative and storyteller whose work bridges culture, community, and connection. Drawing inspiration from music, film, fashion, and the spaces where people come alive, he creates with an eye for authenticity and impact. As the founder of The Third Place, Kobe documents stories that celebrate identity and belonging, blending documentary, party culture, and human narrative into vibrant, cinematic experiences. With a passion for capturing what makes people and places unique, he brings a thoughtful, collaborative energy to every project he's part of.",
        imageUrl: "/IMG_7359_2_1752639999752.JPG",
        instagramUrl: "https://www.instagram.com/nobryant/?hl=en",
        instagramHandle: "@nobryant",
        twitterUrl: "#",
        soundcloudUrl: "#"
      }
    ];

    defaultArtists.forEach(artist => {
      const id = this.currentArtistId++;
      const artistWithId: Artist = { 
        ...artist, 
        id,
        imageUrl: artist.imageUrl || null,
        instagramUrl: artist.instagramUrl || null,
        instagramHandle: artist.instagramHandle || null,
        twitterUrl: artist.twitterUrl || null,
        soundcloudUrl: artist.soundcloudUrl || null
      };
      this.artists.set(id, artistWithId);
    });

    // Initialize default songs
    const defaultSongs: InsertSong[] = [
      {
        title: "Coffee In The Hills",
        artistId: 1,
        duration: "3:42",
        spotifyUrl: "https://open.spotify.com/track/5Q8djOrD4GZH0krZSHcKaJ?si=N9ZKv6pwRBmDkpk4y0qkiw",
        artworkUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        youtubeUrl: "https://youtu.be/eUr5pWT3LPU"
      },
      {
        title: "Ronnie On The Weekend/Who's Fault",
        artistId: 1,
        duration: "3:45",
        spotifyUrl: null,
        artworkUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        youtubeUrl: "https://www.youtube.com/watch?v=w65xitpKUjk"
      },
      {
        title: "Heavy Handed",
        artistId: 2,
        duration: "3:15",
        spotifyUrl: "https://open.spotify.com/artist/0cXN6IO8BbkBw9BBFh1YIw",
        artworkUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        youtubeUrl: "https://www.youtube.com/watch?v=C5vvv80Rn-k"
      },
      {
        title: "Cut Loose",
        artistId: 2,
        duration: "4:12",
        spotifyUrl: "https://open.spotify.com/artist/0cXN6IO8BbkBw9BBFh1YIw",
        artworkUrl: "https://img.youtube.com/vi/la4AV88zpLw/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=la4AV88zpLw&list=RDla4AV88zpLw&start_radio=1&ab_channel=IsaiahBradshaw"
      },


      {
        title: "Natty Clxssic Spotify Playlist",
        artistId: 3,
        duration: "Playlist",
        spotifyUrl: "https://open.spotify.com/playlist/3YQJ5n0WWufygNc2zq8It6?si=XDDK8VZAQMikc6h9FCc_-w&pi=P4lO5AenRXqr_",
        artworkUrl: "/natty-playlist-rotated.jpg",
        youtubeUrl: null
      },
      {
        title: "Chemphe",
        artistId: 4,
        duration: "3:20",
        spotifyUrl: "https://open.spotify.com/artist/2VeS7YVgy4AIxQakPwe9Ff",
        artworkUrl: "https://img.youtube.com/vi/cql-b95kvpk/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=cql-b95kvpk&list=RDcql-b95kvpk&start_radio=1&ab_channel=Colocho"
      },

    ];

    defaultSongs.forEach(song => {
      const id = this.currentSongId++;
      const songWithId: Song = { 
        id,
        title: song.title,
        artistId: song.artistId,
        duration: song.duration,
        spotifyUrl: song.spotifyUrl,
        artworkUrl: song.artworkUrl || null,
        youtubeUrl: song.youtubeUrl || null
      };
      this.songs.set(id, songWithId);
    });

    // Initialize default beats
    const defaultBeats: InsertBeat[] = [
      {
        title: "Trap Nation",
        producerId: 1,
        bpm: 140,
        key: "C Minor",
        previewUrl: "/audio/trap-nation-preview.mp3",
        price: "29.99",
        isExclusive: false
      },
      {
        title: "R&B Soul",
        producerId: 2,
        bpm: 85,
        key: "D Major",
        previewUrl: "/audio/rnb-soul-preview.mp3",
        price: "34.99",
        isExclusive: false
      },
      {
        title: "Hip Hop Bangers",
        producerId: 3,
        bpm: 120,
        key: "G Minor",
        previewUrl: "/audio/hiphop-bangers-preview.mp3",
        price: "39.99",
        isExclusive: true
      },
      {
        title: "Chill Vibes",
        producerId: 1,
        bpm: 95,
        key: "A Minor",
        previewUrl: "/audio/chill-vibes-preview.mp3",
        price: "24.99",
        isExclusive: false
      }
    ];

    defaultBeats.forEach(beat => {
      const id = this.currentBeatId++;
      const beatWithId: Beat = { 
        ...beat, 
        id,
        previewUrl: beat.previewUrl || null,
        price: beat.price || null,
        isExclusive: beat.isExclusive ?? null
      };
      this.beats.set(id, beatWithId);
    });

    // Initialize subscription plans
    const defaultPlans: InsertSubscriptionPlan[] = [
      {
        name: "Basic",
        price: "5.69",
        description: "Perfect for getting started",
        features: ["10 beat downloads/month", "Standard quality (MP3)", "Basic license included"],
        isPopular: false
      },
      {
        name: "Pro",
        price: "19.99",
        description: "For serious creators",
        features: ["50 beat downloads/month", "High quality (WAV + MP3)", "Premium license included", "Stems available"],
        isPopular: true
      },
      {
        name: "Premium",
        price: "39.99",
        description: "Unlimited access",
        features: ["Unlimited downloads", "All formats (WAV, MP3, MIDI)", "Exclusive beats", "Custom requests"],
        isPopular: false
      }
    ];

    defaultPlans.forEach(plan => {
      const id = this.currentPlanId++;
      const planWithId: SubscriptionPlan = { 
        ...plan, 
        id,
        isPopular: plan.isPopular ?? null
      };
      this.subscriptionPlans.set(id, planWithId);
    });
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
      spotifyUrl: insertSong.spotifyUrl,
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
