export type VerificationStatus = "verified" | "unverified" | "pending_review";

export type ArticleStatus = "draft" | "reviewed" | "published";

export interface AdvocateProfile {
  fullName: string;
  isFullNameVerified: boolean;
  designation: string;
  isDesignationVerified: boolean;
  enrolmentNumber: string;
  isEnrolmentVerified: boolean;
  enrolmentDate?: string;
  stateBarCouncil: string;
  isBarCouncilVerified: boolean;
  barAssociations: Array<{
    name: string;
    isVerified: boolean;
  }>;
  qualifications: Array<{
    degree: string;
    institution: string;
    year?: string;
    isVerified: boolean;
  }>;
  officeAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    isVerified: boolean;
  };
  chamberAddress?: {
    courtComplex: string;
    chamberNumber: string;
    city: string;
    isVerified: boolean;
  };
  contact: {
    email: string;
    isEmailVerified: boolean;
    phone: string;
    isPhoneVerified: boolean;
    hours: string;
  };
  summary: string;
}

export interface PracticeArea {
  slug: string;
  title: string;
  category: string;
  description: string;
  proceduralOverview: string[];
  statutoryFramework: string[];
  isVerified: boolean;
}

export interface LegalArticle {
  _id?: string;
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown
  status: ArticleStatus;
  author: string;
  categories: string[];
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string;
  approvedAt?: string;
  publishedAt?: string;
  readingTimeMinutes: number;
}

export interface EnquirySubmission {
  _id?: string;
  id: string;
  name: string;
  email?: string;
  phone: string;
  category: string;
  message: string;
  privacyNoticeVersion: string;
  status: "new" | "in_review" | "resolved" | "archived";
  createdAt: string;
  retentionExpiresAt: string;
}

export interface SiteSettings {
  profile: AdvocateProfile;
  featureFlags: {
    enablePublicEnquiries: boolean;
    enableWhatsAppChat: boolean;
    whatsAppPhoneNumber?: string;
    whatsAppPrefilledText?: string;
  };
  disclaimerVersion: string;
  privacyPolicyVersion: string;
  updatedAt: string;
}

export interface AdminUserSession {
  userId: string;
  email: string;
  role: "admin" | "superadmin";
  issuedAt: number;
  expiresAt: number;
}
