import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertArtistSchema, insertSongSchema, insertBeatSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Artists routes
  app.get("/api/artists", async (_req, res) => {
    try {
      const artists = await storage.getArtists();
      res.json(artists);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artists" });
    }
  });

  app.get("/api/artists/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid artist ID" });
      }
      
      const artist = await storage.getArtist(id);
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
      
      res.json(artist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artist" });
    }
  });

  app.post("/api/artists", async (req, res) => {
    try {
      const result = insertArtistSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid artist data", errors: result.error.errors });
      }
      
      const artist = await storage.createArtist(result.data);
      res.status(201).json(artist);
    } catch (error) {
      res.status(500).json({ message: "Failed to create artist" });
    }
  });

  app.put("/api/artists/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid artist ID" });
      }
      
      const result = insertArtistSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid artist data", errors: result.error.errors });
      }
      
      const artist = await storage.updateArtist(id, result.data);
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
      
      res.json(artist);
    } catch (error) {
      res.status(500).json({ message: "Failed to update artist" });
    }
  });

  // Songs routes
  app.get("/api/songs", async (_req, res) => {
    try {
      const songs = await storage.getSongs();
      res.json(songs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch songs" });
    }
  });

  app.get("/api/artists/:artistId/songs", async (req, res) => {
    try {
      const artistId = parseInt(req.params.artistId);
      if (isNaN(artistId)) {
        return res.status(400).json({ message: "Invalid artist ID" });
      }
      
      const songs = await storage.getSongsByArtist(artistId);
      res.json(songs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch songs" });
    }
  });

  app.post("/api/songs", async (req, res) => {
    try {
      const result = insertSongSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid song data", errors: result.error.errors });
      }
      
      const song = await storage.createSong(result.data);
      res.status(201).json(song);
    } catch (error) {
      res.status(500).json({ message: "Failed to create song" });
    }
  });

  // Beats routes
  app.get("/api/beats", async (_req, res) => {
    try {
      const beats = await storage.getBeats();
      res.json(beats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch beats" });
    }
  });

  app.get("/api/beats/featured", async (_req, res) => {
    try {
      const beats = await storage.getFeaturedBeats();
      res.json(beats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured beats" });
    }
  });

  app.get("/api/producers/:producerId/beats", async (req, res) => {
    try {
      const producerId = parseInt(req.params.producerId);
      if (isNaN(producerId)) {
        return res.status(400).json({ message: "Invalid producer ID" });
      }
      
      const beats = await storage.getBeatsByProducer(producerId);
      res.json(beats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch beats" });
    }
  });

  app.post("/api/beats", async (req, res) => {
    try {
      const result = insertBeatSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid beat data", errors: result.error.errors });
      }
      
      const beat = await storage.createBeat(result.data);
      res.status(201).json(beat);
    } catch (error) {
      res.status(500).json({ message: "Failed to create beat" });
    }
  });

  // Subscription plans routes
  app.get("/api/subscription-plans", async (_req, res) => {
    try {
      const plans = await storage.getSubscriptionPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscription plans" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
