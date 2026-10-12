import assert from "assert";
import { EnquirySchema } from "@/lib/validation/enquiry.schema";
import { ArticleSchema } from "@/lib/validation/article.schema";
import { LoginSchema } from "@/lib/validation/auth.schema";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { checkRateLimit } from "@/lib/rate-limit/limiter";
import { auditTextForCompliance, formatWhatsAppUrl } from "@/lib/compliance/bci-rules";
import { getPublishedArticles, getArticleBySlug } from "@/lib/db/repositories/articles";
import sitemap from "@/app/sitemap";
import { SignJWT, jwtVerify } from "jose";

async function main() {
  console.log("======================================================================");
  console.log("RUNNING COMPREHENSIVE AUTOMATED VERIFICATION SUITE");
  console.log("======================================================================");

  let passed = 0;
  let failed = 0;

  function runTest(name: string, fn: () => void) {
    try {
      fn();
      console.log(`✔ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`✖ [FAIL] ${name}: ${(err as Error).message}`);
      failed++;
    }
  }

  async function runAsyncTest(name: string, fn: () => Promise<void>) {
    try {
      await fn();
      console.log(`✔ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`✖ [FAIL] ${name}: ${(err as Error).message}`);
      failed++;
    }
  }

  // 1. Schema Validation Tests
  runTest("EnquirySchema rejects missing disclaimer consent", () => {
    const result = EnquirySchema.safeParse({
      name: "Rajesh Sharma",
      phone: "+919810000000",
      category: "Civil Litigation",
      message: "Seeking scheduling confirmation regarding chamber consultation.",
      disclaimerConsent: false,
    });
    assert.strictEqual(result.success, false);
  });

  runTest("EnquirySchema accepts valid submission with disclaimer consent", () => {
    const result = EnquirySchema.safeParse({
      name: "Rajesh Sharma",
      phone: "+919810000000",
      category: "Civil Litigation",
      message: "Seeking scheduling confirmation regarding chamber consultation.",
      disclaimerConsent: true,
    });
    assert.strictEqual(result.success, true);
  });

  runTest("EnquirySchema rejects bot submission with filled honeypot", () => {
    const result = EnquirySchema.safeParse({
      name: "Spam Bot",
      phone: "+919810000000",
      category: "Civil Litigation",
      message: "Automated spam payload seeking placement.",
      disclaimerConsent: true,
      website_url_hp: "https://spam-link.example.com",
    });
    assert.strictEqual(result.success, false);
  });

  runTest("ArticleSchema validates required fields", () => {
    const valid = ArticleSchema.safeParse({
      title: "Analysis of Commercial Courts Act 2015",
      slug: "analysis-commercial-courts-act-2015",
      summary: "A procedural evaluation of Section 12A commercial mediation requirements.",
      content: "## Background\n\nDetailed procedural analysis spanning minimum required characters for full article...",
      status: "published",
      author: "Advocate Sachin",
    });
    assert.strictEqual(valid.success, true);
  });

  runTest("LoginSchema rejects invalid email format", () => {
    const res = LoginSchema.safeParse({ email: "invalid-email", password: "short" });
    assert.strictEqual(res.success, false);
  });

  // 2. Security & Cryptography Tests
  await runAsyncTest("Password hashing & comparison with bcryptjs", async () => {
    const secretPass = "AdvocateSec2026!Key";
    const hash = await hashPassword(secretPass);
    assert.notStrictEqual(secretPass, hash);
    const isMatch = await verifyPassword(secretPass, hash);
    assert.strictEqual(isMatch, true);
    const isWrongMatch = await verifyPassword("WrongPassword123", hash);
    assert.strictEqual(isWrongMatch, false);
  });

  await runAsyncTest("Jose stateless JWT signing and tamper protection", async () => {
    const secretKey = new TextEncoder().encode("test-secret-at-least-32-chars-long-key!!");
    const token = await new SignJWT({ userId: "admin-1", role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secretKey);

    const { payload } = await jwtVerify(token, secretKey);
    assert.strictEqual(payload.userId, "admin-1");

    // Verify tampering fails
    const tampered = token.slice(0, -5) + "abcde";
    let failedVerification = false;
    try {
      await jwtVerify(tampered, secretKey);
    } catch {
      failedVerification = true;
    }
    assert.strictEqual(failedVerification, true);
  });

  // 3. Rate Limiter Tests
  runTest("Rate limiter enforces sliding threshold", () => {
    const testIp = `test_ip_${Date.now()}`;
    const max = 3;
    const r1 = checkRateLimit(testIp, max, 60000);
    assert.strictEqual(r1.isAllowed, true);
    const r2 = checkRateLimit(testIp, max, 60000);
    assert.strictEqual(r2.isAllowed, true);
    const r3 = checkRateLimit(testIp, max, 60000);
    assert.strictEqual(r3.isAllowed, true);
    const r4 = checkRateLimit(testIp, max, 60000);
    assert.strictEqual(r4.isAllowed, false);
  });

  // 4. Bar Council Rule 36 Compliance Checker Tests
  runTest("BCI compliance checker flags prohibited superlatives", () => {
    const audit1 = auditTextForCompliance("We are the best advocate in Gurugram offering guaranteed wins.");
    assert.strictEqual(audit1.isCompliant, false);
    assert.strictEqual(audit1.violations.length >= 2, true);

    const audit2 = auditTextForCompliance("Factual procedural analysis under the Commercial Courts Act, 2015.");
    assert.strictEqual(audit2.isCompliant, true);
    assert.strictEqual(audit2.violations.length, 0);
  });

  runTest("WhatsApp URL formatter strips punctuation and creates safe link", () => {
    const url = formatWhatsAppUrl("+91 98-100 23456", "Hello Advocate Sachin");
    assert.strictEqual(url, "https://wa.me/919810023456?text=Hello%20Advocate%20Sachin");
  });

  // 5. Data Isolation & Draft Leakage Tests
  await runAsyncTest("Public article queries strictly exclude draft articles", async () => {
    const published = await getPublishedArticles();
    // Ensure every article in public list is published
    for (const art of published) {
      assert.strictEqual(art.status, "published");
    }

    // Attempting to query draft slug with includeDrafts=false returns null
    const draftSlug = "crpc-to-bnss-transition-bail-procedural-changes";
    const publicView = await getArticleBySlug(draftSlug, false);
    assert.strictEqual(publicView, null, "Draft article was incorrectly accessible via public query!");

    // Querying with includeDrafts=true (admin mode) returns the draft
    const adminView = await getArticleBySlug(draftSlug, true);
    assert.notStrictEqual(adminView, null);
    assert.strictEqual(adminView?.status, "draft");
  });

  // 6. XML Sitemap Exclusions Test
  await runAsyncTest("Sitemap includes only published articles and excludes drafts & admin routes", async () => {
    const map = await sitemap();
    const urls = map.map((m) => m.url);

    // Check no admin route is in sitemap
    for (const url of urls) {
      assert.strictEqual(url.includes("/admin"), false, `Sitemap illegally contained admin route: ${url}`);
      assert.strictEqual(url.includes("/api"), false, `Sitemap illegally contained api route: ${url}`);
    }

    // Check draft article is NOT in sitemap
    const draftUrlMatch = urls.some((u) => u.includes("crpc-to-bnss-transition-bail-procedural-changes"));
    assert.strictEqual(draftUrlMatch, false, "Draft article URL found in public sitemap!");

    // Check published article IS in sitemap
    const publishedUrlMatch = urls.some((u) => u.includes("pre-institution-mediation-commercial-courts-act"));
    assert.strictEqual(publishedUrlMatch, true, "Published article missing from sitemap!");
  });

  console.log("======================================================================");
  console.log(`TEST SUITE RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("======================================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal test error:", err);
  process.exit(1);
});
