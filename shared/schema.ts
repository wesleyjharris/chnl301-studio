import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const artists = pgTable("artists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url"),
  instagramUrl: text("instagram_url"),
  instagramHandle: text("instagram_handle"),
  twitterUrl: text("twitter_url"),
  soundcloudUrl: text("soundcloud_url"),
});

export const songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artistId: integer("artist_id").notNull(),
  duration: text("duration").notNull(),
  spotifyUrl: text("spotify_url").notNull(),
  artworkUrl: text("artwork_url"),
  youtubeUrl: text("youtube_url"),
});

export const beats = pgTable("beats", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  producerId: integer("producer_id").notNull(),
  bpm: integer("bpm").notNull(),
  key: text("key").notNull(),
  previewUrl: text("preview_url"),
  price: decimal("price"),
  isExclusive: boolean("is_exclusive").default(false),
});

export const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: decimal("price").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  isPopular: boolean("is_popular").default(false),
});

export const insertArtistSchema = createInsertSchema(artists).omit({
  id: true,
});

export const insertSongSchema = createInsertSchema(songs).omit({
  id: true,
});

export const insertBeatSchema = createInsertSchema(beats).omit({
  id: true,
});

export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans).omit({
  id: true,
});

export type Artist = typeof artists.$inferSelect;
export type InsertArtist = z.infer<typeof insertArtistSchema>;
export type Song = typeof songs.$inferSelect;
export type InsertSong = z.infer<typeof insertSongSchema>;
export type Beat = typeof beats.$inferSelect;
export type InsertBeat = z.infer<typeof insertBeatSchema>;
export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;
export type InsertSubscriptionPlan = z.infer<typeof insertSubscriptionPlanSchema>;
