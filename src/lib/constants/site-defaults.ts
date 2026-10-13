import { AdvocateProfile, PracticeArea, LegalArticle, SiteSettings } from "@/types";

export const DEFAULT_ADVOCATE_PROFILE: AdvocateProfile = {
  fullName: "Vipin Kumar",
  isFullNameVerified: true,
  designation: "Advocate",
  isDesignationVerified: true,
  enrolmentNumber: "[Pending Enrolment Certificate Upload]",
  isEnrolmentVerified: false,
  enrolmentDate: "[Awaiting Date Verification]",
  stateBarCouncil: "Bar Council of Punjab & Haryana [Chandigarh]",
  isBarCouncilVerified: true,
  barAssociations: [
    {
      name: "Gurugram District Court Bar Association",
      isVerified: true,
    },
    {
      name: "Sohna Sub-Divisional Court Bar Association",
      isVerified: true,
    },
    {
      name: "Punjab & Haryana High Court Bar Association",
      isVerified: false,
    },
  ],
  qualifications: [
    {
      degree: "LL.B. [Degree in Law]",
      institution: "[Recognised University]",
      year: "Verified",
      isVerified: true,
    },
    {
      degree: "Bachelor's Degree",
      institution: "[Recognised University]",
      year: "Verified",
      isVerified: true,
    },
  ],
  officeAddress: {
    line1: "Chamber No. 22, Ground Floor",
    line2: "Sub-Divisional Courts Complex, Sohna",
    city: "Sohna, Gurugram",
    state: "Haryana",
    pincode: "122103",
    isVerified: true,
  },
  chamberAddress: {
    courtComplex: "District & Sessions Courts Complex, Gurugram",
    chamberNumber: "Seat in Hall No. 8",
    city: "Gurugram",
    isVerified: true,
  },
  contact: {
    email: "advvipinkhatana11@gmail.com",
    isEmailVerified: true,
    phone: "+91 79888 43259",
    isPhoneVerified: true,
    hours: "Monday – Saturday: 9:30 AM – 5:00 PM (By Prior Appointment)",
  },
  summary:
    "Independent legal practitioner practising primarily before the District & Sessions Courts, Gurugram, and the Sub-Divisional Courts, Sohna, Haryana. Providing representation in civil litigation, property disputes, revenue matters, matrimonial disputes, and criminal defense in strict adherence to Bar Council of India standards.",
};

export const DEFAULT_PRACTICE_AREAS: PracticeArea[] = [
  {
    slug: "civil-litigation",
    title: "Civil Litigation & Dispute Resolution",
    category: "Civil Law",
    description:
      "Representation in civil suits, property declarations, permanent injunctions, recovery proceedings, and appellate matters before District and Sessions Courts in Gurugram and Delhi NCR.",
    proceduralOverview: [
      "Plaint institution and written statement filings under the Code of Civil Procedure, 1908",
      "Interlocutory injunction applications under Order XXXIX Rules 1 & 2",
      "Evidence recording, examination-in-chief, and cross-examination",
      "Civil appeals, revisions, and execution petitions under Order XXI",
    ],
    statutoryFramework: [
      "Code of Civil Procedure, 1908",
      "Specific Relief Act, 1963",
      "Transfer of Property Act, 1882",
      "Indian Contract Act, 1872",
    ],
    isVerified: false,
  },
  {
    slug: "commercial-contracts",
    title: "Commercial Disputes & Contractual Matters",
    category: "Commercial Law",
    description:
      "Handling breach of contract disputes, commercial suits, recovery of commercial debts, and summary suits before designated Commercial Courts in Haryana and Delhi NCR.",
    proceduralOverview: [
      "Pre-institution mediation under Section 12A of the Commercial Courts Act, 2015",
      "Commercial summary suits under Order XXXVII of the CPC",
      "Discovery, inspection of documents, and case management hearings",
      "Proceedings under Section 138 of the Negotiable Instruments Act, 1881",
    ],
    statutoryFramework: [
      "Commercial Courts Act, 2015",
      "Indian Contract Act, 1872",
      "Negotiable Instruments Act, 1881",
      "Sale of Goods Act, 1930",
    ],
    isVerified: false,
  },
  {
    slug: "real-estate-rera",
    title: "Real Estate & Haryana RERA Proceedings",
    category: "Real Estate Law",
    description:
      "Representation of allottees and parties in complaints, execution petitions, and appeals before the Haryana Real Estate Regulatory Authority (HARERA Gurugram / Panchkula) and Haryana Real Estate Appellate Tribunal.",
    proceduralOverview: [
      "Filing Form CRA complaints before the Adjudicating Officer and Authority",
      "Hearings on delayed possession interest, structural defects, and project registration",
      "Execution applications for refund and interest orders under Section 40 of RERA",
      "Statutory appeals under Section 43(5) before the Appellate Tribunal",
    ],
    statutoryFramework: [
      "Real Estate (Regulation and Development) Act, 2016",
      "Haryana Real Estate (Regulation and Development) Rules, 2017",
      "Haryana Development and Regulation of Urban Areas Act, 1975",
    ],
    isVerified: false,
  },
  {
    slug: "criminal-defense",
    title: "Criminal Law & Bail Matters",
    category: "Criminal Law",
    description:
      "Advocacy in anticipatory bail, regular bail, compounding of offences, trial defense, and criminal revisions before Judicial Magistrates and Sessions Courts in Gurugram.",
    proceduralOverview: [
      "Anticipatory bail applications under Section 438 of the CrPC / Section 482 of Bharatiya Nagarik Suraksha Sanhita, 2023",
      "Regular bail petitions under Section 437 and 439 of the CrPC / Sections 480 and 483 BNSS",
      "Trial hearings, framing of charges, defense witness examination, and final arguments",
      "Criminal revisions and quashing petitions before the High Court",
    ],
    statutoryFramework: [
      "Code of Criminal Procedure, 1973 / Bharatiya Nagarik Suraksha Sanhita, 2023",
      "Indian Penal Code, 1860 / Bharatiya Nyaya Sanhita, 2023",
      "Indian Evidence Act, 1872 / Bharatiya Sakshya Adhiniyam, 2023",
    ],
    isVerified: false,
  },
  {
    slug: "arbitration-adr",
    title: "Arbitration & Alternative Dispute Resolution",
    category: "Arbitration",
    description:
      "Assistance with domestic arbitration proceedings, Section 9 interim relief applications, Section 11 arbitrator appointments, and Section 34 challenge petitions before High Court and Commercial Courts.",
    proceduralOverview: [
      "Issuance of statutory notice invoking arbitration under Section 21",
      "Applications for interim protection under Section 9 and Section 17",
      "Statement of Claim and Defence submissions before arbitral tribunals",
      "Post-award challenge petitions under Section 34 and enforcement under Section 36",
    ],
    statutoryFramework: [
      "Arbitration and Conciliation Act, 1996 (as amended)",
      "High Court of Punjab and Haryana Arbitration Rules",
    ],
    isVerified: false,
  },
];

export const INITIAL_LEGAL_ARTICLES: LegalArticle[] = [
  {
    id: "art-1",
    title: "Understanding Pre-Institution Mediation under Section 12A of the Commercial Courts Act",
    slug: "pre-institution-mediation-commercial-courts-act",
    summary:
      "An analytical overview of the mandatory requirement of pre-institution mediation in commercial disputes not contemplating urgent interim relief, examining landmark judicial pronouncements.",
    content: `## Introduction

The Commercial Courts Act, 2015 was enacted to ensure speedy disposal of high-value commercial disputes. A central procedural pillar introduced by the 2018 amendment is **Section 12A**, which mandates pre-institution mediation.

### Statutory Mandate

Section 12A(1) provides:
> *"A suit, which does not contemplate any urgent interim relief under this Act, shall not be instituted unless the plaintiff exhausts the remedy of pre-institution mediation in accordance with such manner and procedure as may be prescribed by rules made by the Central Government."*

### Key Judicial Precedents

In *Patil Automation Private Limited v. Rakheja Engineers Private Limited* (2022) 10 SCC 1, the Hon'ble Supreme Court settled the question regarding the nature of Section 12A, holding that:
1. The mandate under Section 12A is **mandatory** and not directory.
2. Any commercial suit instituted without complying with Section 12A (where no urgent interim relief was contemplated) is liable to be rejected under Order VII Rule 11 of the CPC.

### Practical Implications for Litigants

- Litigants must carefully assess whether genuine, substantiated urgent interim relief is required prior to filing.
- The period spent in pre-institution mediation (up to 3 months, extendable by 2 months with consent) is excluded from the calculation of limitation under the Limitation Act, 1963.
- If a settlement is reached, the settlement agreement has the same status and effect as an arbitral award under Section 30(4) of the Arbitration and Conciliation Act, 1996.

---

*Disclaimer: This article is intended solely for educational and informational purposes and does not constitute formal legal advice. Readers should seek independent counsel for specific matters.*`,
    status: "published",
    author: "Advocate Vipin Kumar",
    categories: ["Commercial Law", "Civil Procedure"],
    tags: ["Section 12A", "Commercial Courts", "Mediation"],
    seoTitle: "Pre-Institution Mediation under Section 12A Commercial Courts Act",
    seoDescription: "A procedural analysis of Section 12A mandatory pre-institution mediation in commercial disputes across Haryana and Delhi NCR.",
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
    reviewedAt: "2026-03-01T09:30:00.000Z",
    approvedAt: "2026-03-01T09:45:00.000Z",
    publishedAt: "2026-03-01T10:00:00.000Z",
    readingTimeMinutes: 5,
  },
  {
    id: "art-2",
    title: "Remedies for Allottees under HARERA: Delay in Possession and Execution of Refund Orders",
    slug: "harera-allottee-remedies-delay-possession",
    summary:
      "A procedural examination of provisions under the Real Estate (Regulation and Development) Act, 2016 for seeking delayed possession interest and enforcing refund decrees in Gurugram.",
    content: `## Overview of HARERA Gurugram Jurisdiction

Under Section 18 of the Real Estate (Regulation and Development) Act, 2016 (RERA), an allottee is entitled to statutory remedies when a promoter fails to deliver possession in accordance with the terms of the agreement for sale.

### Statutory Remedies under Section 18

When the promoter fails to complete or give possession:
1. **Withdrawal from the Project**: The allottee can claim a full refund of amounts paid, along with statutory prescribed interest.
2. **Continuation in the Project**: If the allottee chooses to remain in the project, they are entitled to monthly interest for every month of delay until possession is handed over.

### Enforcement Mechanism under Section 40

A common challenge faced by decree-holders is the execution of recovery orders. Section 40 of RERA provides:
- Arrears of interest, penalty, or compensation can be recovered as arrears of land revenue through the District Collector.
- The Authority has powers to issue recovery certificates to the revenue authorities.

---

*Disclaimer: This note provides a factual summary of statutory provisions and does not constitute legal counsel or an endorsement of any particular outcome.*`,
    status: "published",
    author: "Advocate Vipin Kumar",
    categories: ["Real Estate Law", "HARERA"],
    tags: ["HARERA", "Gurugram", "Real Estate", "Section 18"],
    seoTitle: "Remedies under HARERA Gurugram for Delay in Possession",
    seoDescription: "Analysis of Section 18 and Section 40 of the RERA Act 2016 for property allottees in Gurugram, Haryana.",
    createdAt: "2026-03-10T10:00:00.000Z",
    updatedAt: "2026-03-10T10:00:00.000Z",
    reviewedAt: "2026-03-10T09:30:00.000Z",
    approvedAt: "2026-03-10T09:45:00.000Z",
    publishedAt: "2026-03-10T10:00:00.000Z",
    readingTimeMinutes: 4,
  },
  {
    id: "art-3",
    title: "[DRAFT] Transition from CrPC to Bharatiya Nagarik Suraksha Sanhita (BNSS): Key Procedural Changes in Bail",
    slug: "crpc-to-bnss-transition-bail-procedural-changes",
    summary:
      "Draft research article outlining the statutory correspondence between CrPC Sections 437/438/439 and BNSS Sections 480/482/483, awaiting advocate review and statutory citation audit.",
    content: `## Draft Note - Under Professional Review

*Note: This article is currently marked as DRAFT and requires formal verification of citations, recent High Court notifications, and judicial interpretation before publication.*

### Comparative Statutory Provisions

The transition to Bharatiya Nagarik Suraksha Sanhita, 2023 introduces updated numbering and specific procedural timelines for investigation, remand, and bail applications.

1. **Anticipatory Bail**: Section 438 CrPC corresponds to Section 482 BNSS.
2. **Regular Bail (Magisterial)**: Section 437 CrPC corresponds to Section 480 BNSS.
3. **Special Powers of Sessions & High Court**: Section 439 CrPC corresponds to Section 483 BNSS.

This analysis is undergoing advocate verification.`,
    status: "draft",
    author: "Advocate Vipin Kumar",
    categories: ["Criminal Law", "BNSS"],
    tags: ["BNSS", "CrPC", "Bail"],
    seoTitle: "BNSS vs CrPC Bail Provisions Analysis",
    seoDescription: "Comparative study of bail procedures under BNSS 2023.",
    createdAt: "2026-03-15T10:00:00.000Z",
    updatedAt: "2026-03-15T10:00:00.000Z",
    readingTimeMinutes: 3,
  },
];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  profile: DEFAULT_ADVOCATE_PROFILE,
  featureFlags: {
    enablePublicEnquiries: true,
    enableWhatsAppChat: true,
    whatsAppPhoneNumber: "917988843259",
    whatsAppPrefilledText: "Hello Advocate Vipin Kumar, I am reaching out to enquire about your chamber schedule in Gurugram / Sohna.",
  },
  disclaimerVersion: "2026-v1",
  privacyPolicyVersion: "2026-v1",
  updatedAt: new Date().toISOString(),
};

export const BCI_DISCLAIMER_TEXT = {
  short:
    "As per the rules of the Bar Council of India, advocates are prohibited from soliciting work or advertising. This website is meant solely for informational purposes and does not create an advocate-client relationship.",
  full: [
    "Under the rules of the Bar Council of India (specifically Rule 36 of the Bar Council of India Rules framed under Section 49(1)(c) of the Advocates Act, 1961), an advocate is prohibited from soliciting work or advertising in any manner.",
    "By accessing this website (the 'Platform'), the user acknowledges that the information provided herein is solely for informational and educational purposes, provided at the user's independent request.",
    "None of the information contained on this website constitutes legal advice, solicitation, advertisement, personal communication, invitation, or inducement of any sort whatsoever by Advocate Vipin Kumar or associated chamber members.",
    "The transmission, receipt, or viewing of this website does not constitute or create an advocate-client relationship. Visitors are advised not to act upon any information without seeking formal, independent legal counsel from a qualified advocate licensed in the relevant jurisdiction.",
    "The advocate disclaims all liability for any action taken or not taken based on any or all contents of this website.",
  ],
};
