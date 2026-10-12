import { MongoClient, Db } from "mongodb";
import { DEFAULT_SITE_SETTINGS, INITIAL_LEGAL_ARTICLES } from "@/lib/constants/site-defaults";
import { LegalArticle, EnquirySubmission, SiteSettings } from "@/types";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  // eslint-disable-next-line no-var
  var _inMemoryStore:
    | {
        articles: LegalArticle[];
        enquiries: EnquirySubmission[];
        settings: SiteSettings;
        adminUsers: Array<{
          id: string;
          email: string;
          passwordHash: string;
          role: "admin" | "superadmin";
          createdAt: string;
        }>;
      }
    | undefined;
}

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/advocate_db";
const options = {
  serverSelectionTimeoutMS: 2000,
  connectTimeoutMS: 2000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;
let isConnected = false;

// Initialize in-memory fallback store
function getInMemoryStore() {
  if (!global._inMemoryStore) {
    global._inMemoryStore = {
      articles: JSON.parse(JSON.stringify(INITIAL_LEGAL_ARTICLES)),
      enquiries: [],
      settings: JSON.parse(JSON.stringify(DEFAULT_SITE_SETTINGS)),
      adminUsers: [],
    };
  }
  return global._inMemoryStore;
}

export async function getMongoClient(): Promise<MongoClient | null> {
  if (!process.env.MONGODB_URI) {
    return null;
  }

  try {
    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
      }
      clientPromise = global._mongoClientPromise;
    } else {
      client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }

    const connectedClient = await clientPromise;
    // Quick ping test
    await connectedClient.db().command({ ping: 1 });
    isConnected = true;
    return connectedClient;
  } catch (err) {
    console.warn(
      `[Database Notice] MongoDB is currently unavailable (${(err as Error).message}). Operating in safe in-memory development mode.`
    );
    isConnected = false;
    return null;
  }
}

export async function getDb(): Promise<Db | null> {
  const client = await getMongoClient();
  if (!client) return null;
  return client.db();
}

export function isPersistentStorageActive(): boolean {
  return isConnected;
}

export const memoryDb = {
  getStore: getInMemoryStore,
};
