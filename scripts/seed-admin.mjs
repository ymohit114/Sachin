import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// Load .env.local if present
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        const value = trimmed.substring(idx + 1).replace(/^["']|["']$/g, "").trim();
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

const email = (process.env.INITIAL_ADMIN_EMAIL || "admin@advocatechamber.local").toLowerCase().trim();
const password = process.env.INITIAL_ADMIN_PASSWORD || "AdvocateAdmin2026!Secure";
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/advocate_db";

async function main() {
  console.log("==================================================");
  console.log("Advocate Chamber Website - Admin Bootstrap Seed");
  console.log("==================================================");
  console.log(`Target Email: ${email}`);
  console.log(`Password configured: [${password.length} characters]`);

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const client = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 3000 });
    await client.connect();
    const db = client.db();

    // Check if user already exists
    const existing = await db.collection("admin_users").findOne({ email });
    if (existing) {
      await db.collection("admin_users").updateOne(
        { email },
        { $set: { passwordHash, updatedAt: new Date().toISOString() } }
      );
      console.log(`✔ Administrator record updated successfully in MongoDB.`);
    } else {
      await db.collection("admin_users").insertOne({
        id: `admin-${Date.now()}`,
        email,
        passwordHash,
        role: "superadmin",
        createdAt: new Date().toISOString(),
      });
      console.log(`✔ Administrator record created successfully in MongoDB.`);
    }

    await client.close();
  } catch (err) {
    console.warn(`! Note: Could not connect to MongoDB (${err.message}).`);
    console.log(`In development without local MongoDB, the application utilizes in-memory admin accounts.`);
    console.log(`You can log in at /admin/login using:`);
    console.log(`Email:    ${email}`);
    console.log(`Password: ${password}`);
  }

  console.log("==================================================");
}

main().catch(console.error);
