import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DisclaimerModal } from "@/components/layout/DisclaimerModal";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { getSiteSettings } from "@/lib/db/repositories/settings";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Advocate Sachin — Gurugram & Delhi NCR",
    default: "Advocate Sachin | Chamber of Legal Practice — Gurugram & Delhi NCR",
  },
  description:
    "Factual professional profile and legal practice information for Advocate Sachin, independent practitioner in Gurugram, Haryana, and Delhi NCR. Conforming to Bar Council of India guidelines.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const isWhatsAppEnabled = settings.featureFlags.enableWhatsAppChat;
  const whatsAppPhone = settings.featureFlags.whatsAppPhoneNumber;
  const whatsAppPrefill = settings.featureFlags.whatsAppPrefilledText;

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-ivory text-text-primary min-h-screen flex flex-col selection:bg-gold/30 selection:text-navy">
        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
        <DisclaimerModal />
        <WhatsAppButton
          isEnabled={isWhatsAppEnabled}
          phoneNumber={whatsAppPhone}
          prefilledText={whatsAppPrefill}
        />
      </body>
    </html>
  );
}
