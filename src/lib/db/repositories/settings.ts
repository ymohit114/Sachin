import { getDb, memoryDb } from "@/lib/db/mongodb";
import { DEFAULT_SITE_SETTINGS } from "@/lib/constants/site-defaults";
import { SiteSettings } from "@/types";

export async function getSiteSettings(): Promise<SiteSettings> {
  const db = await getDb();
  if (db) {
    try {
      const settings = await db.collection<SiteSettings>("settings").findOne({});
      if (settings) {
        return settings;
      }
    } catch {
      // Fallback
    }
  }

  const store = memoryDb.getStore();
  return store.settings || DEFAULT_SITE_SETTINGS;
}

export async function updateSiteSettings(updated: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const merged: SiteSettings = {
    ...current,
    ...updated,
    updatedAt: new Date().toISOString(),
  };

  const db = await getDb();
  if (db) {
    try {
      await db.collection("settings").updateOne({}, { $set: merged }, { upsert: true });
      return merged;
    } catch {
      // Fallback
    }
  }

  const store = memoryDb.getStore();
  store.settings = merged;
  return merged;
}
