import { getDb, memoryDb } from "@/lib/db/mongodb";

export interface AdminRecord {
  id: string;
  email: string;
  passwordHash: string;
  role: "admin" | "superadmin";
  createdAt: string;
}

export async function findAdminByEmail(email: string): Promise<AdminRecord | null> {
  const normalizedEmail = email.toLowerCase().trim();
  const db = await getDb();
  if (db) {
    try {
      const user = await db.collection<AdminRecord>("admin_users").findOne({ email: normalizedEmail });
      if (user) {
        return user;
      }
    } catch {
      // Fallback
    }
  }

  const store = memoryDb.getStore();
  return store.adminUsers.find((u) => u.email.toLowerCase() === normalizedEmail) || null;
}

export async function createAdminUser(
  email: string,
  passwordHash: string,
  role: "admin" | "superadmin" = "admin"
): Promise<AdminRecord> {
  const normalizedEmail = email.toLowerCase().trim();
  const record: AdminRecord = {
    id: `admin-${Date.now()}`,
    email: normalizedEmail,
    passwordHash,
    role,
    createdAt: new Date().toISOString(),
  };

  const db = await getDb();
  if (db) {
    try {
      await db.collection("admin_users").insertOne(record);
      return record;
    } catch {
      // Fallback
    }
  }

  const store = memoryDb.getStore();
  const existingIdx = store.adminUsers.findIndex((u) => u.email.toLowerCase() === normalizedEmail);
  if (existingIdx !== -1) {
    store.adminUsers[existingIdx] = record;
  } else {
    store.adminUsers.push(record);
  }
  return record;
}
