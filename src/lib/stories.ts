/**
 * User Stories — Redis-backed storage for user-submitted stories and reviews.
 */
import { redis } from "@/lib/redis";
import { randomUUID } from "crypto";
import { DUMMY_TRIP_STORIES } from "@/lib/data/dummyStories";

export interface Story {
  id: string;
  tripSlug: string;
  userId: string;
  username: string;
  title: string;
  body: string;
  photoUrl?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const STORY_PREFIX = "story:";
const TRIP_STORIES_PREFIX = "trip_stories:"; // Set of story IDs for a trip
const PENDING_STORIES_LIST = "pending_stories";

export async function submitStory(story: Omit<Story, "id" | "status" | "createdAt">): Promise<Story> {
  const id = randomUUID();
  const fullStory: Story = {
    ...story,
    id,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await redis.set(STORY_PREFIX + id, JSON.stringify(fullStory));
  await redis.sadd(TRIP_STORIES_PREFIX + story.tripSlug, id);
  await redis.lpush(PENDING_STORIES_LIST, id);
  return fullStory;
}

export async function getStoriesByTrip(tripSlug: string, onlyApproved = true): Promise<Story[]> {
  try {
    const storyIds = await redis.smembers(TRIP_STORIES_PREFIX + tripSlug);
    if (storyIds && storyIds.length > 0) {
      const rawStories = await Promise.all(storyIds.map((id) => redis.get(STORY_PREFIX + id)));
      const stories = rawStories
        .filter(Boolean)
        .map((raw) => JSON.parse(raw as string) as Story)
        .filter((s) => !onlyApproved || s.status === "approved");

      if (stories.length > 0) {
        return stories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    }
  } catch {
    // Redis unavailable — fall back to dummy stories
  }

  // Fallback to static dummy stories (for the 45 curated trips)
  return DUMMY_TRIP_STORIES[tripSlug] || [];
}

export async function getPendingStories(): Promise<Story[]> {
  const storyIds = await redis.lrange(PENDING_STORIES_LIST, 0, -1);
  if (!storyIds || storyIds.length === 0) return [];
  
  const rawStories = await Promise.all(storyIds.map((id) => redis.get(STORY_PREFIX + id)));
  return rawStories
    .filter(Boolean)
    .map((raw) => JSON.parse(raw as string) as Story);
}

export async function updateStoryStatus(id: string, status: "approved" | "rejected"): Promise<void> {
  const raw = await redis.get(STORY_PREFIX + id);
  if (!raw) return;
  const story = JSON.parse(raw as string) as Story;
  story.status = status;
  await redis.set(STORY_PREFIX + id, JSON.stringify(story));
  
  // Remove from pending list
  await redis.lrem(PENDING_STORIES_LIST, 0, id);
}

export async function deleteStory(id: string): Promise<void> {
  const raw = await redis.get(STORY_PREFIX + id);
  if (raw) {
    const story = JSON.parse(raw as string) as Story;
    await redis.srem(TRIP_STORIES_PREFIX + story.tripSlug, id);
    await redis.lrem(PENDING_STORIES_LIST, 0, id);
  }
  await redis.del(STORY_PREFIX + id);
}
