import { getDb, memoryDb } from "@/lib/db/mongodb";
import { EnquirySubmission } from "@/types";
import { ObjectId } from "mongodb";

export async function createEnquiry(
  input: Omit<EnquirySubmission, "id" | "status" | "createdAt" | "retentionExpiresAt">
): Promise<EnquirySubmission> {
  const now = new Date();
  const retentionDays = parseInt(process.env.ENQUIRY_RETENTION_DAYS || "90", 10);
  const expiresAt = new Date(now.getTime() + retentionDays * 24 * 60 * 60 * 1000);

  const newEnquiry: EnquirySubmission = {
    ...input,
    id: `enq-${Date.now()}`,
    status: "new",
    createdAt: now.toISOString(),
    retentionExpiresAt: expiresAt.toISOString(),
  };

  const db = await getDb();
  if (db) {
    try {
      await db.collection("enquiries").insertOne(newEnquiry as any);
      return newEnquiry;
    } catch {
      // Fallback
    }
  }

  const store = memoryDb.getStore();
  store.enquiries.unshift(newEnquiry);
  return newEnquiry;
}

export async function getAllEnquiries(): Promise<EnquirySubmission[]> {
  const db = await getDb();
  if (db) {
    try {
      const enquiries = await db
        .collection<EnquirySubmission>("enquiries")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      return enquiries.map((e) => ({ ...e, id: e._id ? e._id.toString() : e.id }));
    } catch {
      // Fallback
    }
  }

  const store = memoryDb.getStore();
  return store.enquiries;
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquirySubmission["status"]
): Promise<boolean> {
  const db = await getDb();
  if (db) {
    try {
      let filter: Record<string, unknown> = { id };
      if (ObjectId.isValid(id)) {
        filter = { $or: [{ id }, { _id: new ObjectId(id) }] };
      }
      const res = await db.collection("enquiries").updateOne(filter, { $set: { status } });
      return res.modifiedCount > 0;
    } catch {
      // Fallback
    }
  }

  const store = memoryDb.getStore();
  const item = store.enquiries.find((e) => e.id === id);
  if (item) {
    item.status = status;
    return true;
  }
  return false;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const db = await getDb();
  if (db) {
    try {
      let filter: Record<string, unknown> = { id };
      if (ObjectId.isValid(id)) {
        filter = { $or: [{ id }, { _id: new ObjectId(id) }] };
      }
      const res = await db.collection("enquiries").deleteOne(filter);
      return res.deletedCount > 0;
    } catch {
      // Fallback
    }
  }

  const store = memoryDb.getStore();
  const prevLen = store.enquiries.length;
  store.enquiries = store.enquiries.filter((e) => e.id !== id);
  return store.enquiries.length < prevLen;
}
