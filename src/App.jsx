import React, { useState, createContext, useContext } from 'react';
import {
  MapPin, Shield, Users, FileText, AlertTriangle, Briefcase,
  ChevronRight, Menu, X, Home, Star,
  Bell, Camera, Lock, Upload, Search,
  TrendingUp, TrendingDown, Award, Flag,
  Share2, Globe,
  UserCheck, ShieldCheck, CheckCircle,
  QrCode, Fingerprint, Cloud, Building,
  Utensils, Activity,
  Layers, PieChart, Heart, Target,
  Wifi, Droplets, ChevronDown, Check, MessageCircle
} from 'lucide-react';

// Language Context
const LanguageContext = createContext();
const useLanguage = () => useContext(LanguageContext);

// ===== CREDIBILITY GUARDRAIL UTILITIES =====
/**
 * PROBLEM: Raw corruption reports can enable defamation, false accusations, and mob justice.
 * DESIGN: Client-side name redaction + structured-first reporting + pattern aggregation (3+ rule)
 *         + community corroboration + confidence scoring + retraction window.
 * IMPROVEMENTS: Real NLP/NER for names, backend moderation queue, legal review integration.
 */

// Common Filipino first names for redaction
const FILIPINO_NAMES = [
  'Juan', 'Maria', 'Jose', 'Pedro', 'Ana', 'Mark', 'Angelo', 'Michael', 
  'John', 'Christian', 'Carlo', 'Joshua', 'Daniel', 'Ivan', 'Ryan',
  'Michelle', 'Angel', 'Nicole', 'Christine', 'Angela', 'Kristine',
  'Jennifer', 'Mary', 'Rose', 'Mae', 'Joy', 'Grace', 'Faith'
];

// Redact personal names from text
const redactPersonalNames = (text) => {
  if (!text) return { redacted: text, hadRedactions: false };
  
  let redacted = text;
  let hadRedactions = false;
  
  // Redact known Filipino names (case insensitive)
  FILIPINO_NAMES.forEach(name => {
    const regex = new RegExp(`\\b${name}\\b`, 'gi');
    if (regex.test(redacted)) {
      redacted = redacted.replace(regex, '[REDACTED]');
      hadRedactions = true;
    }
  });
  
  // Redact patterns of two consecutive capitalized words (likely full names)
  const fullNamePattern = /\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/g;
  if (fullNamePattern.test(redacted)) {
    redacted = redacted.replace(fullNamePattern, '[REDACTED]');
    hadRedactions = true;
  }
  
  return { redacted, hadRedactions };
};

// Detect patterns: 3+ reports with same service, city, incident within 14 days
const detectPatterns = (reports) => {
  const patterns = {};
  const now = Date.now();
  const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;
  
  reports.forEach(report => {
    if (now - report.createdAt > FOURTEEN_DAYS) return;
    
    const key = `${report.serviceType}|${report.city}|${report.incidentType}`;
    if (!patterns[key]) {
      patterns[key] = {
        serviceType: report.serviceType,
        city: report.city,
        barangay: report.barangay,
        incidentType: report.incidentType,
        reports: [],
        corroborations: 0
      };
    }
    patterns[key].reports.push(report);
  });
  
  // Filter to only patterns with 3+ reports
  return Object.values(patterns)
    .filter(p => p.reports.length >= 3)
    .map(p => ({
      ...p,
      count: p.reports.length,
      confidence: calculateConfidence(p.reports, p.corroborations),
      oldestReport: Math.min(...p.reports.map(r => r.createdAt)),
      newestReport: Math.max(...p.reports.map(r => r.createdAt))
    }));
};

// Calculate confidence score for a pattern
const calculateConfidence = (reports, corroborations = 0) => {
  let score = 0;
  
  // Completeness: all required fields filled
  const completeness = reports.filter(r => 
    r.serviceType && r.city && r.incidentType && r.narrative
  ).length / reports.length;
  score += completeness * 30;
  
  // Evidence: has photos/files
  const withEvidence = reports.filter(r => r.evidence).length / reports.length;
  score += withEvidence * 30;
  
  // Corroborations
  score += Math.min(corroborations * 2, 20);
  
  // Reporter credibility (if token exists)
  const uniqueTokens = new Set(reports.map(r => r.reporterToken).filter(Boolean)).size;
  score += Math.min(uniqueTokens * 5, 20);
  
  if (score < 30) return 'Low';
  if (score < 60) return 'Emerging';
  return 'Strong Pattern';
};

// Get or create reporter token
const getReporterToken = () => {
  let token = localStorage.getItem('linya_reporter_token');
  if (!token) {
    token = 'RT-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('linya_reporter_token', token);
  }
  return token;
};

// Translations
const translations = {
  en: {
    appName: 'LiNYA',
    tagline: 'Linis na Yaman ng Bayan',
    dashboard: 'Dashboard',
    safespace: 'SafeSpace',
    streetconnect: 'StreetConnect',
    reportOfficials: 'Report Officials',
    citizenScore: 'Citizen Score',
    offline: 'Offline',
    greeting: 'Good Morning!',
    communityHappening: "Here's what's happening in your community",
    aidDistributed: 'Aid Distributed',
    beneficiaries: 'Beneficiaries',
    shelterBeds: 'Shelter Beds',
    integrityScore: 'Integrity Score',
    budgetTransparency: 'Budget Transparency',
    viewFullBudget: 'View Full Budget Report →',
    cleanestAreas: 'Cleanest Areas This Month',
    findHelp: 'Find Help',
    report: 'Report',
    jobs: 'Jobs',
    documents: 'Documents',
    interactiveMap: 'Interactive Map',
    offlineReady: 'Offline-ready with downloaded tiles',
    all: 'All',
    food: 'Food',
    shelter: 'Shelter',
    wifi: 'WiFi',
    medical: 'Medical',
    water: 'Water',
    weatherWarning: 'Weather Warning',
    heavyRain: 'Heavy rain expected tonight. Seek shelter before 8PM.',
    digitalIdentity: 'LiNYA Digital Identity',
    verified: 'Verified',
    backedUp: 'Backed Up',
    showQR: 'Show QR',
    share: 'Share',
    identity: 'Identity',
    applications: 'Applications',
    uploadNew: 'Upload New Document',
    privacyControls: 'Privacy Controls',
    govAgencies: 'Government Agencies',
    ngoPartners: 'NGO Partners',
    employers: 'Employers',
    encrypted: 'End-to-End Encrypted',
    encryptedDesc: 'Your data is protected with military-grade encryption',
    newReport: 'New Report',
    hot: 'Hot',
    new: 'New',
    top: 'Top',
    redFlagSuspicious: '🚩 Red Flag = Suspicious',
    greenFlagVerified: 'Verified ✓ = Green Flag',
    comments: 'Comments',
    emergencyWitness: 'Emergency Witness',
    emergencyDesc: 'Alert nearby verified community members during harassment',
    totalReports: 'Total Reports',
    resolved: 'Resolved',
    reportIncident: 'Report Incident',
    myReports: 'My Reports',
    trackProgress: 'Track Progress →',
    aidTracker: 'Aid Distribution Tracker',
    scanQR: 'Scan QR Code',
    photo: 'Photo',
    verifyAid: 'Verify and record aid received to prevent ghost beneficiaries',
    yourIntegrityScore: 'Your Integrity Score',
    excellentStanding: 'Excellent Standing',
    recentTransactions: 'Recent Transactions',
    verifiedClean: 'Verified Clean',
    verify: 'Verify',
    realCost: 'Real Cost of Corruption',
    corruptionImpact: 'See how "small" bribes affect your community',
    learnMore: 'Learn More',
    integrityPledge: 'Take the Integrity Pledge',
    pledgeDesc: 'Join 50,000+ citizens committed to corruption-free Philippines',
    iPledge: 'I Pledge to Stay in Line',
    howIntegrityWorks: 'How Your Integrity Score Works',
    greenFlagsPlus: 'Green Flags (+)',
    greenFlagsDesc: 'Earned when you complete clean transactions, verify aid distribution, or report corruption',
    redFlagsMinus: 'Red Flags (-)',
    redFlagsDesc: 'Given for suspicious behavior, unverified transactions, or reports marked as false',
    yourFlagHistory: 'Your Flag History',
    greenFlags: 'Green Flags',
    redFlags: 'Red Flags',
    totalInteractions: 'Total Interactions',
    ratioPositive: 'Ratio: {ratio}% positive',
    keepAbove70: 'Keep this above 70% to maintain Excellent Standing!',
    howOthersSeeYou: 'How Others See You',
    highScore: 'High Score (75-100)',
    highScoreVerified: '• Verified badge on your profile',
    highScorePriority: '• Higher priority for aid distribution',
    highScoreWeight: '• More weight to your reports',
    highScoreTrusted: '• Trusted by community members',
    mediumScore: 'Medium Score (50-74)',
    mediumScoreVerification: '• Standard verification required',
    mediumScoreProof: '• Reports require additional proof',
    mediumScoreWitness: '• May need witnesses for claims',
    lowScore: 'Low Score (Below 50)',
    lowScoreFlagged: '• Account flagged for review',
    lowScoreLimited: '• Limited reporting privileges',
    lowScoreMandatory: '• Mandatory verification for all transactions',
    lowScoreRestrictions: '• Community support restrictions',
    bribeAmount100: '₱100 "Processing Fee"',
    couldHaveBeen: 'Could have been:',
    fiveMeals: '5 hot meals for homeless families',
    twoWeeksSupplies: '2 weeks of school supplies for a child',
    medicalSupplies: 'Medical supplies for a health center',
    bribeAmount500: '₱500 "Expedite Fee"',
    couldHaveFunded: 'Could have funded:',
    familyFood: "1 family's food assistance for a month",
    schoolUniforms: 'School uniform and supplies for 2 children',
    emergencyMedicine: 'Emergency medicine for 10 people',
    shelterNights: '2 nights shelter bed for a family',
    bribeAmount5000: '₱5,000 "Arrangement"',
    couldHaveProvided: 'Could have provided:',
    livelihoodTraining: 'Full livelihood training for 5 people',
    emergencyAssistance: 'Emergency assistance for 10 families',
    feedingProgram: 'Month of supplies for a feeding program',
    medicalEquipment: 'Medical equipment for a community clinic',
    annualImpact: 'Annual Impact in One Barangay',
    annualImpactDesc: 'If just 100 people pay ₱200 each in bribes monthly, that\'s {amount} per year stolen from:',
    annualImpactList: 'Schools • Hospitals • Infrastructure',
    annualImpactList2: 'Disaster relief • Feeding programs',
    annualImpactList3: 'Livelihood training • Shelter operations',
    showLess: 'Show Less',
    linyaIntegrityPledge: 'LiNYA Integrity Pledge',
    myCommitment: 'My Commitment to Integrity',
    pledgeIntro: 'I, as a Filipino citizen, hereby pledge to uphold the highest standards of integrity in all my interactions with public officials and fellow citizens.',
    pledgeNoBribes: 'I will NOT offer, give, or accept bribes of any amount, no matter how "small" or "customary" it may seem.',
    pledgeReport: 'I will REPORT corruption when I witness it, understanding that my voice can create real change.',
    pledgeRefuse: 'I will REFUSE shortcuts that require "fixing" or paying extra fees beyond official requirements.',
    pledgeDemand: 'I will DEMAND receipts and proper documentation for all transactions with government offices.',
    pledgeSupport: 'I will SUPPORT fellow citizens who stand against corruption and refuse to normalize wrongdoing.',
    pledgeVerify: 'I will VERIFY aid and services I receive to prevent ghost beneficiaries and ensure help reaches those in need.',
    pledgeMaintain: 'I will MAINTAIN my integrity score by conducting all transactions transparently and honestly.',
    pledgeClosing: '"I understand that every act of corruption, no matter how small, steals from the poorest among us. I pledge to be part of the solution, not the problem. I will stay in line, even when it\'s difficult, because a corruption-free Philippines begins with me."',
    benefitsOfPledge: 'Benefits of Taking the Pledge',
    benefitBadge: 'Verified "Integrity Pledge" badge on your profile',
    benefitBoost: 'Automatic +5 boost to your Integrity Score',
    benefitNetwork: 'Join the Integrity Network of verified citizens',
    benefitSupport: 'Priority support from anti-corruption advocates',
    benefitRecognition: 'Recognition in the community as a trusted member',
    iTakeThisPledge: 'I Take This Pledge',
    readAgainLater: 'Read Again Later',
    pledgeFinePrint: 'By taking this pledge, you commit to maintaining ethical behavior in all public transactions. This pledge is voluntary but binding to your personal integrity and community reputation.',
    searchJobs: 'Search jobs near you...',
    construction: 'Construction',
    delivery: 'Delivery',
    events: 'Events',
    warehouse: 'Warehouse',
    applyNow: 'Apply Now',
    mySkillBank: 'My SkillBank',
    edit: 'Edit',
    addSkill: '+ Add Skill',
    workerProtection: 'Worker Protection Active',
    workerProtectionDesc: 'GPS tracking, emergency contacts, payment escrow',
    anonymous: 'Anonymous',
    investigating: 'Investigating',
    status: 'Status',
    bribeDemand: 'Bribe Demanded',
    harassment: 'Harassment',
    aidDiscrepancy: 'Aid Discrepancy',
    documentExtortion: 'Document Extortion',
    english: 'English',
    filipino: 'Filipino',
    // Anti-Corruption new terms
    reportOfficeNotName: 'Report the office/service, not names',
    nameRedactedWarning: 'Personal names automatically removed',
    serviceType: 'Service Type',
    selectService: 'Select Service',
    city: 'City/Municipality',
    selectCity: 'Select City',
    barangay: 'Barangay (optional)',
    incidentType: 'Type of Issue',
    selectIncident: 'Select Issue',
    whenHappened: 'When did this happen?',
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This Week',
    chooseDate: 'Choose Date',
    amountInvolved: 'Amount Involved',
    selectAmount: 'Select Amount',
    yourStory: 'Your Story (max 280 chars)',
    evidence: 'Evidence (Photo/File)',
    voiceNote: 'Voice Note (optional)',
    submitReport: 'Submit Report',
    retractReport: 'Retract Report',
    minutesLeft: 'minutes left',
    reportSubmitted: 'Report Submitted',
    moderatorMode: 'Moderator Mode',
    publicView: 'Public View',
    patternAlerts: 'Pattern Alerts',
    iExperiencedThis: 'Naranasan ko rin ito',
    reports: 'reports',
    peopleCorroborated: 'people corroborated',
    confidence: 'Confidence',
    lowConfidence: 'Low',
    emergingPattern: 'Emerging',
    strongPattern: 'Strong Pattern',
    moderationQueue: 'Moderation Queue',
    changeStatus: 'Change Status',
    received: 'Received',
    redacted: 'Redacted',
    underReview: 'Under Review',
    patternEmerging: 'Pattern Emerging',
    patternConfirmed: 'Pattern Confirmed',
    escalationReady: 'Escalation Ready',
    verifiedActivityLevel: 'Verified Activity Level',
    transparencyReadiness: 'Transparency Readiness',
    activityBasedOn: 'Based on: reports, corroborations, verified documents',
    // StreetConnect new terms
    identityPathway: 'Identity Pathway',
    tier0: 'Tier 0 — Anonymous',
    tier1: 'Tier 1 — Basic Personhood',
    tier2: 'Tier 2 — Community Attested',
    tier3: 'Tier 3 — Gov ID Link',
    phoneNumber: 'Phone Number',
    verifyOTP: 'Verify OTP',
    enterOTP: 'Enter 6-digit code',
    selfiePhoto: 'Selfie Photo',
    livenessCheck: 'Liveness Check Done',
    preferredName: 'Preferred Name',
    ageRange: 'Age Range',
    cityArea: 'City/Area',
    generateID: 'Generate Bantay Lagay ID',
    partnerRole: 'Partner Role',
    selectRole: 'Select Role',
    shelterAdmin: 'Shelter Admin',
    ngoCaseWorker: 'NGO Case Worker',
    barangaySocialWorker: 'Barangay Social Worker',
    partnerName: 'Partner Name',
    attestationQR: 'Attestation QR Code',
    attestNow: 'Attest Now',
    communityVerified: 'Community Verified',
    documentVault: 'Document Vault',
    birthCert: 'Birth Certificate',
    barangayCert: 'Barangay Certificate',
    shelterIntake: 'Shelter Intake Form',
    uploaded: 'Uploaded',
    markVerified: 'Mark as Verified',
    uploadGovID: 'Upload Government ID',
    linkedUnverified: 'Linked (unverified demo)',
  },
  tl: {
    appName: 'LiNYA',
    tagline: 'Linis na Yaman ng Bayan',
    dashboard: 'Dashboard',
    safespace: 'SafeSpace',
    streetconnect: 'StreetConnect',
    reportOfficials: 'Ireport ang mga Opisyal',
    citizenScore: 'Mamamayang Puntos',
    offline: 'Walang Internet',
    greeting: 'Magandang Umaga!',
    communityHappening: 'Naganap sa inyong komunidad',
    aidDistributed: 'Naipamahagi na Tulong',
    beneficiaries: 'Mga Benepisyaryo',
    shelterBeds: 'Mga Kama sa Shelter',
    integrityScore: 'Puntos ng Integridad',
    budgetTransparency: 'Transparency ng Budget',
    viewFullBudget: 'Tingnan ang Buong Budget Report →',
    cleanestAreas: 'Pinaka-Malinis na Lugar ngayong Buwan',
    findHelp: 'Hanapin ang Tulong',
    report: 'Ireport',
    jobs: 'Trabaho',
    documents: 'Mga Dokumento',
    interactiveMap: 'Interactive na Mapa',
    offlineReady: 'Pwede gamitin kahit walang internet',
    all: 'Lahat',
    food: 'Pagkain',
    shelter: 'Tirahan',
    wifi: 'WiFi',
    medical: 'Medikal',
    water: 'Tubig',
    weatherWarning: 'Babala sa Panahon',
    heavyRain: 'Malakas na ulan mamaya. Maghanap ng tirahan bago mag-8PM.',
    digitalIdentity: 'LiNYA Digital Identity',
    verified: 'Napatunayan',
    backedUp: 'Na-backup',
    showQR: 'Ipakita ang QR',
    share: 'Ibahagi',
    identity: 'Pagkakakilanlan',
    applications: 'Mga Aplikasyon',
    uploadNew: 'Mag-upload ng Bagong Dokumento',
    privacyControls: 'Kontrol sa Privacy',
    govAgencies: 'Mga Ahensya ng Gobyerno',
    ngoPartners: 'Mga NGO Partners',
    employers: 'Mga Employer',
    encrypted: 'End-to-End Encrypted',
    encryptedDesc: 'Protektado ang inyong datos gamit ang military-grade encryption',
    newReport: 'Bagong Report',
    hot: 'Mainit',
    new: 'Bago',
    top: 'Nangungunang',
    redFlagSuspicious: '🚩 Pulang Bandila = Kahina-hinala',
    greenFlagVerified: 'Napatunayan ✓ = Berdeng Bandila',
    comments: 'Komento',
    emergencyWitness: 'Emergency Witness',
    emergencyDesc: 'Alertuhan ang malapit na verified na miyembro ng komunidad',
    totalReports: 'Kabuuang Report',
    resolved: 'Nasolusyunan',
    reportIncident: 'Mag-report ng Insidente',
    myReports: 'Aking mga Report',
    trackProgress: 'Subaybayan ang Progreso →',
    aidTracker: 'Aid Distribution Tracker',
    scanQR: 'I-scan ang QR Code',
    photo: 'Larawan',
    verifyAid: 'I-verify at i-record ang natanggap na tulong para maiwasan ang ghost beneficiaries',
    yourIntegrityScore: 'Inyong Puntos ng Integridad',
    excellentStanding: 'Mahusay na Katayuan',
    recentTransactions: 'Kamakailang Transaksyon',
    verifiedClean: 'Napatunayan na Malinis',
    verify: 'I-verify',
    realCost: 'Tunay na Halaga ng Korupsyon',
    corruptionImpact: 'Tingnan kung paano nakakaapekto ang "maliit" na suhol sa inyong komunidad',
    learnMore: 'Matuto Pa',
    integrityPledge: 'Gumawa ng Integrity Pledge',
    pledgeDesc: 'Sumali sa 50,000+ mamamayan na nakatuon sa walang korupsyong Pilipinas',
    iPledge: 'Ako ay Nangangako na Manatili sa Tamang Linya',
    howIntegrityWorks: 'Paano Gumagana ang Inyong Puntos ng Integridad',
    greenFlagsPlus: 'Berdeng Bandila (+)',
    greenFlagsDesc: 'Nakukuha kapag nakumpleto ang malinis na transaksyon, nag-verify ng aid distribution, o nag-report ng korupsyon',
    redFlagsMinus: 'Pulang Bandila (-)',
    redFlagsDesc: 'Ibinibigay para sa kahina-hinalang gawi, hindi napatunayan na transaksyon, o mga ulat na minarkahan bilang mali',
    yourFlagHistory: 'Inyong Kasaysayan ng Bandila',
    greenFlags: 'Berdeng Bandila',
    redFlags: 'Pulang Bandila',
    totalInteractions: 'Kabuuang Pakikipag-ugnayan',
    ratioPositive: 'Ratio: {ratio}% positibo',
    keepAbove70: 'Panatilihin ito sa itaas ng 70% upang mapanatili ang Mahusay na Katayuan!',
    howOthersSeeYou: 'Paano Kayo Nakikita ng Iba',
    highScore: 'Mataas na Puntos (75-100)',
    highScoreVerified: '• Verified badge sa inyong profile',
    highScorePriority: '• Mas mataas na priyoridad para sa aid distribution',
    highScoreWeight: '• Mas mabigat ang inyong mga ulat',
    highScoreTrusted: '• Pinagkakatiwalaan ng mga miyembro ng komunidad',
    mediumScore: 'Katamtamang Puntos (50-74)',
    mediumScoreVerification: '• Kailangan ng standard na verification',
    mediumScoreProof: '• Kailangan ng karagdagang patunay ang mga ulat',
    mediumScoreWitness: '• Maaaring kailangan ng mga saksi para sa mga claim',
    lowScore: 'Mababang Puntos (Sa Ibaba ng 50)',
    lowScoreFlagged: '• Account ay minarkahan para sa review',
    lowScoreLimited: '• Limitadong pribilehiyo sa pag-report',
    lowScoreMandatory: '• Mandatoryong verification para sa lahat ng transaksyon',
    lowScoreRestrictions: '• Mga paghihigpit sa suporta ng komunidad',
    bribeAmount100: '₱100 "Processing Fee"',
    couldHaveBeen: 'Maaaring naging:',
    fiveMeals: '5 mainit na pagkain para sa mga walang tirahan',
    twoWeeksSupplies: '2 linggong school supplies para sa isang bata',
    medicalSupplies: 'Medical supplies para sa health center',
    bribeAmount500: '₱500 "Expedite Fee"',
    couldHaveFunded: 'Maaaring nag-pondo ng:',
    familyFood: 'Tulong sa pagkain ng isang pamilya sa loob ng isang buwan',
    schoolUniforms: 'Uniporme at supplies sa paaralan para sa 2 bata',
    emergencyMedicine: 'Emergency na gamot para sa 10 tao',
    shelterNights: '2 gabing kama sa shelter para sa isang pamilya',
    bribeAmount5000: '₱5,000 "Arrangement"',
    couldHaveProvided: 'Maaaring nagbigay ng:',
    livelihoodTraining: 'Kumpletong livelihood training para sa 5 tao',
    emergencyAssistance: 'Emergency assistance para sa 10 pamilya',
    feedingProgram: 'Buwan ng supplies para sa feeding program',
    medicalEquipment: 'Medical equipment para sa community clinic',
    annualImpact: 'Taunang Epekto sa Isang Barangay',
    annualImpactDesc: 'Kung 100 tao lamang ay magbabayad ng ₱200 bawat buwan sa suhol, iyon ay {amount} bawat taon na ninakaw mula sa:',
    annualImpactList: 'Mga Paaralan • Ospital • Imprastraktura',
    annualImpactList2: 'Disaster relief • Feeding programs',
    annualImpactList3: 'Livelihood training • Shelter operations',
    showLess: 'Ipakita ang Mas Kaunti',
    linyaIntegrityPledge: 'LiNYA Pangako ng Integridad',
    myCommitment: 'Ang Aking Pangako sa Integridad',
    pledgeIntro: 'Ako, bilang isang mamamayang Pilipino, ay nangangako na panatilihin ang pinakamataas na pamantayan ng integridad sa lahat ng aking pakikipag-ugnayan sa mga opisyal ng pamahalaan at kapwa mamamayan.',
    pledgeNoBribes: 'HINDI ako mag-aalok, magbibigay, o tumanggap ng suhol sa anumang halaga, gaano man "maliit" o "karaniwan" ito.',
    pledgeReport: 'Ako ay mag-uulat ng korupsyon kapag nasaksihan ko ito, na nauunawaan na ang aking tinig ay maaaring lumikha ng tunay na pagbabago.',
    pledgeRefuse: 'TATANGGIHAN ko ang mga shortcut na nangangailangan ng "pag-aayos" o pagbabayad ng karagdagang bayad lampas sa opisyal na kinakailangan.',
    pledgeDemand: 'HIHILINGIN ko ang mga resibo at wastong dokumentasyon para sa lahat ng transaksyon sa mga tanggapan ng gobyerno.',
    pledgeSupport: 'SUSUPORTAHAN ko ang mga kapwa mamamayan na tumayo laban sa korupsyon at tumanggi na i-normalize ang maling gawain.',
    pledgeVerify: 'I-VERIFY ko ang tulong at serbisyong natatanggap ko upang maiwasan ang ghost beneficiaries at tiyaking makakarating ang tulong sa mga nangangailangan.',
    pledgeMaintain: 'PAPANATILIHIN ko ang aking puntos ng integridad sa pamamagitan ng pagsasagawa ng lahat ng transaksyon nang malinaw at tapat.',
    pledgeClosing: '"Nauunawaan ko na ang bawat gawa ng korupsyon, gaano man kaliit, ay nagnakaw mula sa pinakamahihirap sa atin. Nangangako ako na maging bahagi ng solusyon, hindi ng problema. Mananatili ako sa linya, kahit na ito ay mahirap, dahil ang walang korupsyong Pilipinas ay nagsisimula sa akin."',
    benefitsOfPledge: 'Mga Benepisyo ng Paggawa ng Pangako',
    benefitBadge: 'Verified na "Integrity Pledge" badge sa inyong profile',
    benefitBoost: 'Awtomatikong +5 boost sa inyong Puntos ng Integridad',
    benefitNetwork: 'Sumali sa Integrity Network ng mga verified na mamamayan',
    benefitSupport: 'Priority na suporta mula sa mga tagapagtaguyod ng anti-korupsyon',
    benefitRecognition: 'Pagkilala sa komunidad bilang isang pinagkakatiwalaang miyembro',
    iTakeThisPledge: 'Tatanggapin Ko Ang Pangakong Ito',
    readAgainLater: 'Basahin Muli Mamaya',
    pledgeFinePrint: 'Sa pamamagitan ng paggawa ng pangakong ito, kayo ay nangangako na papanatilihin ang etikal na pag-uugali sa lahat ng pampublikong transaksyon. Ang pangakong ito ay boluntaryo ngunit nakakabit sa inyong personal na integridad at reputasyon sa komunidad.',
    searchJobs: 'Maghanap ng trabaho malapit sa inyo...',
    construction: 'Konstruksyon',
    delivery: 'Delivery',
    events: 'Mga Event',
    warehouse: 'Bodega',
    applyNow: 'Mag-apply Ngayon',
    mySkillBank: 'Aking SkillBank',
    edit: 'I-edit',
    addSkill: '+ Magdagdag ng Skill',
    workerProtection: 'Aktibo ang Proteksyon ng Manggagawa',
    workerProtectionDesc: 'GPS tracking, emergency contacts, payment escrow',
    anonymous: 'Anonymous',
    investigating: 'Sinisiyasat',
    status: 'Katayuan',
    bribeDemand: 'Hinihingi ang Suhol',
    harassment: 'Pang-aabuso',
    aidDiscrepancy: 'Hindi Tama ang Tulong',
    documentExtortion: 'Panggigipit sa Dokumento',
    english: 'English',
    filipino: 'Filipino',
    // Anti-Corruption new terms
    reportOfficeNotName: 'Ireport ang opisina/serbisyo, hindi pangalan',
    nameRedactedWarning: 'Awtomatikong tinanggal ang mga pangalan',
    serviceType: 'Uri ng Serbisyo',
    selectService: 'Piliin ang Serbisyo',
    city: 'Lungsod/Bayan',
    selectCity: 'Piliin ang Lungsod',
    barangay: 'Barangay (opsyonal)',
    incidentType: 'Uri ng Problema',
    selectIncident: 'Piliin ang Problema',
    whenHappened: 'Kailan ito nangyari?',
    today: 'Ngayon',
    yesterday: 'Kahapon',
    thisWeek: 'Ngayong Linggo',
    chooseDate: 'Pumili ng Petsa',
    amountInvolved: 'Halagang Kasangkot',
    selectAmount: 'Piliin ang Halaga',
    yourStory: 'Iyong Kwento (max 280 chars)',
    evidence: 'Ebidensya (Larawan/File)',
    voiceNote: 'Voice Note (opsyonal)',
    submitReport: 'Isumite ang Report',
    retractReport: 'Bawiin ang Report',
    minutesLeft: 'minuto natitira',
    reportSubmitted: 'Naisumite na ang Report',
    moderatorMode: 'Moderator Mode',
    publicView: 'Pampublikong View',
    patternAlerts: 'Mga Pattern Alert',
    iExperiencedThis: 'Naranasan ko rin ito',
    reports: 'mga report',
    peopleCorroborated: 'tao ang nag-corroborate',
    confidence: 'Kumpiyansa',
    lowConfidence: 'Mababa',
    emergingPattern: 'Umuusbong',
    strongPattern: 'Malakas na Pattern',
    moderationQueue: 'Moderation Queue',
    changeStatus: 'Palitan ang Status',
    received: 'Natanggap',
    redacted: 'Na-redact',
    underReview: 'Sinusuri',
    patternEmerging: 'Umuusbong na Pattern',
    patternConfirmed: 'Nakumpirma ang Pattern',
    escalationReady: 'Handa na i-escalate',
    verifiedActivityLevel: 'Verified Activity Level',
    transparencyReadiness: 'Transparency Readiness',
    activityBasedOn: 'Batay sa: mga report, corroboration, verified documents',
    // StreetConnect new terms
    identityPathway: 'Identity Pathway',
    tier0: 'Tier 0 — Anonymous',
    tier1: 'Tier 1 — Basic na Pagkakakilanlan',
    tier2: 'Tier 2 — Verified ng Komunidad',
    tier3: 'Tier 3 — May Gov ID Link',
    phoneNumber: 'Numero ng Telepono',
    verifyOTP: 'I-verify ang OTP',
    enterOTP: 'I-enter ang 6-digit code',
    selfiePhoto: 'Selfie Photo',
    livenessCheck: 'Tapos na ang Liveness Check',
    preferredName: 'Ginustong Pangalan',
    ageRange: 'Edad',
    cityArea: 'Lungsod/Lugar',
    generateID: 'Generate Bantay Lagay ID',
    partnerRole: 'Katungkulan ng Partner',
    selectRole: 'Piliin ang Role',
    shelterAdmin: 'Shelter Admin',
    ngoCaseWorker: 'NGO Case Worker',
    barangaySocialWorker: 'Barangay Social Worker',
    partnerName: 'Pangalan ng Partner',
    attestationQR: 'Attestation QR Code',
    attestNow: 'Mag-attest Ngayon',
    communityVerified: 'Verified ng Komunidad',
    documentVault: 'Document Vault',
    birthCert: 'Birth Certificate',
    barangayCert: 'Barangay Certificate',
    shelterIntake: 'Shelter Intake Form',
    uploaded: 'Na-upload',
    markVerified: 'Markahan bilang Verified',
    uploadGovID: 'Mag-upload ng Government ID',
    linkedUnverified: 'Naka-link (unverified demo)',
  }
};

// Mock Data
const mockLocations = [
  { id: 1, name: 'Barangay Hall Feeding Program', type: 'food', rating: 4.5, distance: '0.3 km', schedule: 'Daily 11AM-1PM', verified: true },
  { id: 2, name: 'St. Joseph Church Shelter', type: 'shelter', rating: 4.8, distance: '0.8 km', beds: 12, verified: true },
  { id: 3, name: 'Public Library WiFi', type: 'wifi', rating: 4.2, distance: '0.5 km', hours: '8AM-6PM', verified: true },
  { id: 4, name: 'DSWD Mobile Clinic', type: 'medical', rating: 4.6, distance: '1.2 km', schedule: 'Mon-Fri 9AM-4PM', verified: true },
  { id: 5, name: 'Community Water Station', type: 'water', rating: 4.0, distance: '0.2 km', hours: '24/7', verified: false },
];

const mockReports = [
  { id: 1, type: 'bribe_demand', status: 'investigating', date: '2024-01-15', location: 'City Hall', anonymous: true, title: 'Police Officer Demanding "Processing Fee"', description: 'Officer asked for ₱500 to process barangay clearance faster. Have photos of the transaction.', author: 'Anonymous', redFlags: 234, greenFlags: 12, commentCount: 45, timeAgo: '2 hours ago', verified: true },
  { id: 2, type: 'aid_discrepancy', status: 'verified', date: '2024-01-12', location: 'Barangay 42', anonymous: false, title: 'Missing Food Packs in Relief Distribution', description: 'Only 50 out of 100 families received aid. Captain claims all were distributed. Have the distribution list.', author: 'Maria Santos', redFlags: 456, greenFlags: 23, commentCount: 89, timeAgo: '1 day ago', verified: true },
  { id: 3, type: 'harassment', status: 'resolved', date: '2024-01-10', location: 'Public Market', anonymous: true, title: 'Vendor Permits Being Withheld', description: 'Market administrator refusing permits unless vendors pay extra ₱1000. Multiple vendors affected.', author: 'Anonymous', redFlags: 189, greenFlags: 8, commentCount: 34, timeAgo: '3 days ago', verified: false },
  { id: 4, type: 'document_extortion', status: 'investigating', date: '2024-01-14', location: 'DSWD Office', anonymous: false, title: 'Ghost Beneficiaries in 4Ps List', description: 'Found 15 names on 4Ps list who moved out 2 years ago. Someone still collecting their benefits.', author: 'Juan Cruz', redFlags: 567, greenFlags: 45, commentCount: 102, timeAgo: '5 hours ago', verified: true },
  { id: 5, type: 'bribe_demand', status: 'new', date: '2024-01-16', location: 'LTO Office', anonymous: true, title: 'Fixers Operating Inside LTO', description: 'Men in civilian clothes offering to "help" with license renewal for ₱2000. Staff seems to know them.', author: 'Anonymous', redFlags: 123, greenFlags: 5, commentCount: 28, timeAgo: '30 minutes ago', verified: false },
];

const mockJobs = [
  { id: 1, title: 'Construction Helper', pay: '₱800/day', location: 'Makati', duration: '1 day', employer: 'BuildRight Corp', rating: 4.5 },
  { id: 2, title: 'Warehouse Packer', pay: '₱650/day', location: 'Pasig', duration: '3 days', employer: 'LogiPH', rating: 4.2 },
  { id: 3, title: 'Event Setup', pay: '₱700/day', location: 'BGC', duration: '1 day', employer: 'EventsPH', rating: 4.7 },
];

const mockStats = { corruptionReports: 2847, resolvedCases: 1923, aidDistributed: '₱45.2M', beneficiaries: 12450, integrityScore: 78, shelterBeds: 234 };

// Utility Components
const Badge = ({ children, variant = 'default', size = 'md' }) => {
  const variants = { default: 'bg-gray-100 text-gray-800', success: 'bg-green-100 text-green-800', warning: 'bg-yellow-100 text-yellow-800', danger: 'bg-red-100 text-red-800', primary: 'bg-emerald-100 text-emerald-800' };
  const sizes = { sm: 'px-2 py-0.5 text-xs', md: 'px-2.5 py-1 text-sm' };
  return <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>{children}</span>;
};

const Card = ({ children, className = '', onClick, hover = false }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${hover ? 'hover:shadow-md hover:border-emerald-200 cursor-pointer transition-all' : ''} ${className}`} onClick={onClick}>{children}</div>
);

const Button = ({ children, variant = 'primary', size = 'md', icon: Icon, className = '', ...props }) => {
  const variants = { primary: 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-lg shadow-emerald-900/20', secondary: 'bg-amber-100 hover:bg-amber-200 text-amber-900', outline: 'border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-50', ghost: 'text-emerald-800 hover:bg-emerald-50', danger: 'bg-red-600 hover:bg-red-700 text-white' };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2.5', lg: 'px-6 py-3 text-lg' };
  return <button className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{Icon && <Icon size={size === 'sm' ? 16 : 20} />}{children}</button>;
};

const StatCard = ({ icon: Icon, label, value, trend, trendUp }) => (
  <Card className="p-4">
    <div className="flex items-start justify-between">
      <div className="p-2 bg-emerald-100 rounded-xl"><Icon className="text-emerald-800" size={20} /></div>
      {trend && <span className={`text-sm font-medium flex items-center gap-1 ${trendUp ? 'text-green-600' : 'text-red-600'}`}>{trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}{trend}</span>}
    </div>
    <div className="mt-3"><p className="text-2xl font-bold text-gray-900">{value}</p><p className="text-sm text-gray-500 mt-1">{label}</p></div>
  </Card>
);

// SafeSpace Module
const SafeSpaceModule = () => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState('all');
  const typeIcons = { food: Utensils, shelter: Home, wifi: Wifi, medical: Activity, water: Droplets };
  const typeColors = { food: 'text-orange-600 bg-orange-100', shelter: 'text-blue-600 bg-blue-100', wifi: 'text-purple-600 bg-purple-100', medical: 'text-red-600 bg-red-100', water: 'text-cyan-600 bg-cyan-100' };
  const filteredLocations = selectedType === 'all' ? mockLocations : mockLocations.filter(l => l.type === selectedType);

  return (
    <div className="space-y-6">
      <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden border-2 border-slate-300">
        {/* Mock Street Grid */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 256" preserveAspectRatio="none">
          {/* Horizontal streets */}
          <line x1="0" y1="80" x2="400" y2="80" stroke="#cbd5e1" strokeWidth="3" />
          <line x1="0" y1="128" x2="400" y2="128" stroke="#cbd5e1" strokeWidth="4" />
          <line x1="0" y1="176" x2="400" y2="176" stroke="#cbd5e1" strokeWidth="3" />
          
          {/* Vertical streets */}
          <line x1="100" y1="0" x2="100" y2="256" stroke="#cbd5e1" strokeWidth="3" />
          <line x1="200" y1="0" x2="200" y2="256" stroke="#cbd5e1" strokeWidth="4" />
          <line x1="300" y1="0" x2="300" y2="256" stroke="#cbd5e1" strokeWidth="3" />
          
          {/* Building blocks */}
          <rect x="20" y="20" width="60" height="40" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="110" y="30" width="70" height="35" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="210" y="25" width="65" height="45" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="310" y="15" width="60" height="55" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          
          <rect x="15" y="90" width="70" height="30" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="115" y="95" width="65" height="25" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="215" y="88" width="70" height="32" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="315" y="92" width="60" height="28" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          
          <rect x="25" y="140" width="60" height="28" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="120" y="138" width="65" height="30" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="220" y="142" width="60" height="26" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="320" y="135" width="65" height="33" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          
          <rect x="18" y="188" width="65" height="35" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="112" y="185" width="70" height="40" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="218" y="190" width="60" height="38" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="318" y="182" width="68" height="42" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
        </svg>
        
        {/* Location markers with labels */}
        <div className="absolute top-[25%] left-[28%] flex flex-col items-center animate-pulse">
          <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <Utensils className="text-white" size={16} />
          </div>
          <div className="mt-1 bg-white px-2 py-0.5 rounded-full shadow-sm">
            <span className="text-xs font-medium text-gray-700">Food</span>
          </div>
        </div>
        
        <div className="absolute top-[48%] left-[52%] flex flex-col items-center animate-pulse">
          <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <Home className="text-white" size={16} />
          </div>
          <div className="mt-1 bg-white px-2 py-0.5 rounded-full shadow-sm">
            <span className="text-xs font-medium text-gray-700">Shelter</span>
          </div>
        </div>
        
        <div className="absolute top-[32%] right-[22%] flex flex-col items-center animate-pulse">
          <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <Wifi className="text-white" size={16} />
          </div>
          <div className="mt-1 bg-white px-2 py-0.5 rounded-full shadow-sm">
            <span className="text-xs font-medium text-gray-700">WiFi</span>
          </div>
        </div>
        
        <div className="absolute top-[68%] left-[70%] flex flex-col items-center animate-pulse">
          <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <Activity className="text-white" size={16} />
          </div>
          <div className="mt-1 bg-white px-2 py-0.5 rounded-full shadow-sm">
            <span className="text-xs font-medium text-gray-700">Medical</span>
          </div>
        </div>
        
        <div className="absolute bottom-[15%] left-[15%] flex flex-col items-center animate-pulse">
          <div className="w-8 h-8 bg-cyan-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <Droplets className="text-white" size={16} />
          </div>
          <div className="mt-1 bg-white px-2 py-0.5 rounded-full shadow-sm">
            <span className="text-xs font-medium text-gray-700">Water</span>
          </div>
        </div>
        
        {/* User location indicator */}
        <div className="absolute bottom-[35%] left-[42%]">
          <div className="relative">
            <div className="w-4 h-4 bg-emerald-600 rounded-full border-2 border-white shadow-lg"></div>
            <div className="absolute inset-0 bg-emerald-600 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
        
        {/* Map controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50">
            <span className="text-gray-700 font-bold">+</span>
          </button>
          <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50">
            <span className="text-gray-700 font-bold">−</span>
          </button>
        </div>
        
        {/* Map legend */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
            <span className="text-xs text-gray-700 font-medium">Your Location</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['all', 'food', 'shelter', 'wifi', 'medical', 'water'].map((type) => {
          const Icon = type === 'all' ? Layers : typeIcons[type];
          const typeLabel = type === 'all' ? t.all : t[type];
          return <button key={type} onClick={() => setSelectedType(type)} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${selectedType === type ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}><Icon size={16} /><span className="capitalize">{typeLabel}</span></button>;
        })}
      </div>
      <div className="space-y-3">
        {filteredLocations.map((location) => {
          const Icon = typeIcons[location.type];
          return (
            <Card key={location.id} hover className="p-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${typeColors[location.type]}`}><Icon size={24} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><h3 className="font-semibold text-gray-900 truncate">{location.name}</h3>{location.verified && <CheckCircle className="text-emerald-600 flex-shrink-0" size={16} />}</div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500"><span className="flex items-center gap-1"><MapPin size={14} />{location.distance}</span><span className="flex items-center gap-1"><Star size={14} className="text-amber-500" />{location.rating}</span></div>
                  <p className="text-sm text-gray-600 mt-1">{location.schedule || location.hours}{location.beds && ` • ${location.beds} beds available`}</p>
                </div>
                <ChevronRight className="text-gray-400 flex-shrink-0" size={20} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// StreetConnect Module
// StreetConnect Module - Progressive Identity Pathway
// Designed for Metro Manila's unhoused/precarious populations
// 4-tier system allows gradual trust-building without requiring gov ID upfront
const StreetConnectModule = () => {
  const { t, language } = useLanguage();
  const [currentTier, setCurrentTier] = useState(0); // 0 = anonymous, 1 = phone verified, 2 = partner attested, 3 = gov ID verified
  const [activeTab, setActiveTab] = useState('pathway');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showSelfieCapture, setShowSelfieCapture] = useState(false);
  const [showPartnerAttestation, setShowPartnerAttestation] = useState(false);
  const [showGovIDUpload, setShowGovIDUpload] = useState(false);
  const [showDocumentVault, setShowDocumentVault] = useState(false);
  
  // Form states for Tier 1
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [livenessChecked, setLivenessChecked] = useState(false);
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [bantayLagayID, setBantayLagayID] = useState('');
  
  // Form states for Tier 2
  const [partnerRole, setPartnerRole] = useState('');
  const [attestationQR, setAttestationQR] = useState('');
  
  // Document Vault
  const [documents, setDocuments] = useState([
    { id: 1, type: 'birth_certificate', name: 'Birth Certificate', uploaded: false, status: 'missing' },
    { id: 2, type: 'barangay_cert', name: 'Barangay Certificate', uploaded: false, status: 'missing' },
    { id: 3, type: 'shelter_intake', name: 'Shelter Intake Form', uploaded: false, status: 'missing' }
  ]);

  // Simulate Tier 1 completion (Phone + Selfie + Basic Info)
  const completeTier1 = () => {
    const generatedID = `BL-${Date.now().toString().slice(-6)}`;
    setBantayLagayID(generatedID);
    setCurrentTier(1);
    setShowOTPModal(false);
    setShowSelfieCapture(false);
  };

  // Simulate Tier 2 completion (Partner Attestation)
  const completeTier2 = () => {
    const qrCode = `ATTEST-${Date.now().toString().slice(-8)}`;
    setAttestationQR(qrCode);
    setCurrentTier(2);
    setShowPartnerAttestation(false);
  };

  // Simulate Tier 3 completion (Gov ID)
  const completeTier3 = () => {
    setCurrentTier(3);
    setShowGovIDUpload(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="p-6 bg-gradient-to-br from-purple-800 to-purple-900 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{language === 'en' ? 'StreetConnect Identity' : 'StreetConnect Identity'}</h2>
            <p className="text-purple-200 text-sm mt-1">
              {language === 'en' ? 'Build your digital identity step by step' : 'Bumuo ng iyong digital identity nang unti-unti'}
            </p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Fingerprint size={32} />
          </div>
        </div>
        
        {/* Tier Progress */}
        <div className="flex items-center gap-2 mt-4">
          {[0, 1, 2, 3].map((tier) => (
            <div key={tier} className={`flex-1 h-2 rounded-full ${currentTier >= tier ? 'bg-purple-300' : 'bg-white/20'}`} />
          ))}
        </div>
        <p className="text-purple-200 text-sm mt-2">
          {language === 'en' ? `Tier ${currentTier} of 3` : `Tier ${currentTier} ng 3`}
        </p>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('pathway')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'pathway' ? 'bg-white shadow text-purple-800' : 'text-gray-600'}`}
        >
          {language === 'en' ? 'Pathway' : 'Daan'}
        </button>
        <button
          onClick={() => setActiveTab('vault')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'vault' ? 'bg-white shadow text-purple-800' : 'text-gray-600'}`}
        >
          {language === 'en' ? 'Documents' : 'Dokumento'}
        </button>
      </div>

      {/* Identity Pathway Tab */}
      {activeTab === 'pathway' && (
        <div className="space-y-4">
          {/* Tier 0: Anonymous */}
          <Card className={`p-4 ${currentTier === 0 ? 'border-2 border-purple-500' : ''}`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentTier > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                {currentTier > 0 ? <CheckCircle size={20} /> : <span className="font-bold">0</span>}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{language === 'en' ? 'Tier 0: Anonymous Access' : 'Tier 0: Anonymous na Access'}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {language === 'en' ? 'View public info, no sign-up needed' : 'Tingnan ang public info, walang sign-up'}
                </p>
                {currentTier === 0 && (
                  <p className="text-xs text-purple-600 mt-2 font-medium">{language === 'en' ? '→ Current tier' : '→ Kasalukuyang tier'}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Tier 1: Phone + Selfie + Basic Info */}
          <Card className={`p-4 ${currentTier === 1 ? 'border-2 border-purple-500' : ''}`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentTier > 1 ? 'bg-emerald-100 text-emerald-600' : currentTier === 1 ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'}`}>
                {currentTier > 1 ? <CheckCircle size={20} /> : <span className="font-bold">1</span>}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{language === 'en' ? 'Tier 1: Basic Identity' : 'Tier 1: Basic Identity'}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {language === 'en' ? 'Phone OTP + Selfie + Name/Age/City' : 'Phone OTP + Selfie + Pangalan/Edad/Lungsod'}
                </p>
                <ul className="text-xs text-gray-500 mt-2 space-y-1 list-disc list-inside">
                  <li>{language === 'en' ? 'Get Bantay Lagay ID' : 'Makakuha ng Bantay Lagay ID'}</li>
                  <li>{language === 'en' ? 'Report issues in SafeSpace' : 'Mag-report sa SafeSpace'}</li>
                  <li>{language === 'en' ? 'Access emergency contacts' : 'Access sa emergency contacts'}</li>
                </ul>
                {currentTier === 1 && bantayLagayID && (
                  <div className="mt-3 p-2 bg-purple-50 rounded border border-purple-200">
                    <p className="text-xs font-medium text-purple-900">{language === 'en' ? 'Your Bantay Lagay ID:' : 'Iyong Bantay Lagay ID:'} {bantayLagayID}</p>
                  </div>
                )}
                {currentTier === 0 && (
                  <Button className="mt-3 w-full" size="sm" onClick={() => setShowOTPModal(true)}>
                    {language === 'en' ? 'Start Verification' : 'Simulan ang Verification'}
                  </Button>
                )}
                {currentTier === 1 && (
                  <p className="text-xs text-purple-600 mt-2 font-medium">{language === 'en' ? '→ Current tier' : '→ Kasalukuyang tier'}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Tier 2: Partner Attestation */}
          <Card className={`p-4 ${currentTier === 2 ? 'border-2 border-purple-500' : currentTier < 1 ? 'opacity-50' : ''}`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentTier > 2 ? 'bg-emerald-100 text-emerald-600' : currentTier === 2 ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'}`}>
                {currentTier > 2 ? <CheckCircle size={20} /> : <span className="font-bold">2</span>}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{language === 'en' ? 'Tier 2: Community Verified' : 'Tier 2: Napatunayan ng Komunidad'}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {language === 'en' ? 'Attested by NGO/Shelter/Partner' : 'Napatunayan ng NGO/Shelter/Partner'}
                </p>
                <ul className="text-xs text-gray-500 mt-2 space-y-1 list-disc list-inside">
                  <li>{language === 'en' ? 'Apply for aid programs' : 'Mag-apply sa aid programs'}</li>
                  <li>{language === 'en' ? 'Get "Community Verified" badge' : 'Makakuha ng "Community Verified" badge'}</li>
                  <li>{language === 'en' ? 'Access job board' : 'Access sa job board'}</li>
                </ul>
                {currentTier === 1 && (
                  <Button className="mt-3 w-full" size="sm" onClick={() => setShowPartnerAttestation(true)}>
                    {language === 'en' ? 'Request Attestation' : 'Humingi ng Attestation'}
                  </Button>
                )}
                {currentTier === 2 && attestationQR && (
                  <div className="mt-3 p-2 bg-emerald-50 rounded border border-emerald-200 flex items-center gap-2">
                    <Badge variant="success">{language === 'en' ? 'Community Verified' : 'Verified ng Komunidad'}</Badge>
                    <QrCode size={16} className="text-emerald-600" />
                  </div>
                )}
                {currentTier === 2 && (
                  <p className="text-xs text-purple-600 mt-2 font-medium">{language === 'en' ? '→ Current tier' : '→ Kasalukuyang tier'}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Tier 3: Gov ID */}
          <Card className={`p-4 ${currentTier === 3 ? 'border-2 border-purple-500' : currentTier < 2 ? 'opacity-50' : ''}`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentTier === 3 ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                {currentTier === 3 ? <CheckCircle size={20} /> : <span className="font-bold">3</span>}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{language === 'en' ? 'Tier 3: Government Verified' : 'Tier 3: Napatunayan ng Gobyerno'}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {language === 'en' ? 'PhilSys/Postal ID/Valid Gov ID' : 'PhilSys/Postal ID/Valid Gov ID'}
                </p>
                <ul className="text-xs text-gray-500 mt-2 space-y-1 list-disc list-inside">
                  <li>{language === 'en' ? 'Full access to all features' : 'Buong access sa lahat ng features'}</li>
                  <li>{language === 'en' ? 'Priority for cash programs' : 'Priority sa cash programs'}</li>
                  <li>{language === 'en' ? 'Can submit Anti-Corruption reports' : 'Pwedeng mag-submit ng Anti-Corruption reports'}</li>
                </ul>
                {currentTier === 2 && (
                  <Button className="mt-3 w-full" size="sm" onClick={() => setShowGovIDUpload(true)}>
                    {language === 'en' ? 'Upload Gov ID' : 'I-upload ang Gov ID'}
                  </Button>
                )}
                {currentTier === 3 && (
                  <div className="mt-3">
                    <Badge variant="success">{language === 'en' ? 'Government Verified ✓' : 'Napatunayan ng Gobyerno ✓'}</Badge>
                    <p className="text-xs text-purple-600 mt-2 font-medium">{language === 'en' ? '→ Current tier (Highest)' : '→ Kasalukuyang tier (Pinakamataas)'}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Document Vault Tab */}
      {activeTab === 'vault' && (
        <div className="space-y-4">
          <Card className="p-4 bg-purple-50 border-purple-200">
            <div className="flex items-center gap-3">
              <FileText className="text-purple-600" size={20} />
              <div>
                <h4 className="font-medium text-purple-900">{language === 'en' ? 'Secure Document Vault' : 'Secure Document Vault'}</h4>
                <p className="text-sm text-purple-700">
                  {language === 'en' ? 'Store important documents safely' : 'Ligtas na imbakan ng mahahalagang dokumento'}
                </p>
              </div>
            </div>
          </Card>

          {documents.map((doc) => (
            <Card key={doc.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${doc.uploaded ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                  <FileText size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{doc.name}</h4>
                  <p className="text-xs text-gray-500">
                    {doc.uploaded ? (language === 'en' ? 'Uploaded' : 'Na-upload') : (language === 'en' ? 'Not uploaded' : 'Hindi pa na-upload')}
                  </p>
                </div>
                <Badge variant={doc.uploaded ? 'success' : 'outline'}>
                  {doc.uploaded ? (language === 'en' ? 'Stored' : 'Naka-store') : (language === 'en' ? 'Missing' : 'Wala')}
                </Badge>
              </div>
            </Card>
          ))}
          
          <Button variant="outline" icon={Upload} className="w-full" onClick={() => setShowDocumentVault(true)}>
            {language === 'en' ? 'Upload Document' : 'Mag-upload ng Dokumento'}
          </Button>
        </div>
      )}

      {/* OTP Modal for Tier 1 */}
      {showOTPModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowOTPModal(false)}>
          <Card className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{language === 'en' ? 'Phone Verification' : 'Phone Verification'}</h3>
              <button onClick={() => setShowOTPModal(false)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{language === 'en' ? 'Phone Number' : 'Phone Number'}</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+63 XXX XXX XXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{language === 'en' ? 'OTP Code (Simulated)' : 'OTP Code (Simulated)'}</label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="123456"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">{language === 'en' ? 'In production: Real SMS OTP' : 'Sa production: Tunay na SMS OTP'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{language === 'en' ? 'Full Name' : 'Buong Pangalan'}</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={language === 'en' ? 'Juan Dela Cruz' : 'Juan Dela Cruz'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{language === 'en' ? 'Age' : 'Edad'}</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="25"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{language === 'en' ? 'City' : 'Lungsod'}</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Manila"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setShowSelfieCapture(true)}
                  className={`w-full py-2 px-4 rounded-lg border-2 ${selfieUploaded ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-300 bg-white'}`}
                >
                  {selfieUploaded ? (language === 'en' ? '✓ Selfie Uploaded' : '✓ Selfie Na-upload') : (language === 'en' ? 'Upload Selfie' : 'Mag-upload ng Selfie')}
                </button>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={livenessChecked}
                    onChange={(e) => setLivenessChecked(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">{language === 'en' ? 'Liveness check passed (simulated)' : 'Liveness check passed (simulated)'}</span>
                </label>
              </div>
              <Button
                className="w-full"
                onClick={completeTier1}
                disabled={!phoneNumber || !otpCode || !fullName || !age || !city || !selfieUploaded || !livenessChecked}
              >
                {language === 'en' ? 'Complete Tier 1' : 'Kumpletuhin ang Tier 1'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Selfie Capture Simulation */}
      {showSelfieCapture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowSelfieCapture(false)}>
          <Card className="max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{language === 'en' ? 'Selfie Capture' : 'Kunan ng Selfie'}</h3>
              <button onClick={() => setShowSelfieCapture(false)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 text-center space-y-4">
              <div className="w-48 h-48 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                <Camera size={64} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">{language === 'en' ? 'In production: Camera access for live selfie' : 'Sa production: Camera access para sa live selfie'}</p>
              <Button
                className="w-full"
                onClick={() => {
                  setSelfieUploaded(true);
                  setShowSelfieCapture(false);
                }}
              >
                {language === 'en' ? 'Simulate Capture' : 'Simulate Capture'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Partner Attestation Modal */}
      {showPartnerAttestation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowPartnerAttestation(false)}>
          <Card className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{language === 'en' ? 'Partner Attestation' : 'Partner Attestation'}</h3>
              <button onClick={() => setShowPartnerAttestation(false)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Ask an NGO worker, shelter staff, or partner to scan your QR and verify your identity.' 
                  : 'Hilingin sa NGO worker, shelter staff, o partner na i-scan ang iyong QR at i-verify ang iyong identity.'}
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{language === 'en' ? 'Partner Role' : 'Partner Role'}</label>
                <select
                  value={partnerRole}
                  onChange={(e) => setPartnerRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">{language === 'en' ? 'Select...' : 'Pumili...'}</option>
                  <option value="ngo">NGO Worker</option>
                  <option value="shelter">Shelter Staff</option>
                  <option value="partner">Community Partner</option>
                </select>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg text-center">
                <QrCode size={120} className="mx-auto text-gray-400 mb-2" />
                <p className="text-xs text-gray-500">{language === 'en' ? 'Show this to partner for scanning' : 'Ipakita ito sa partner para i-scan'}</p>
              </div>
              <Button
                className="w-full"
                onClick={completeTier2}
                disabled={!partnerRole}
              >
                {language === 'en' ? 'Simulate Attestation' : 'Simulate Attestation'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Gov ID Upload Modal */}
      {showGovIDUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowGovIDUpload(false)}>
          <Card className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{language === 'en' ? 'Government ID Upload' : 'Government ID Upload'}</h3>
              <button onClick={() => setShowGovIDUpload(false)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Upload a valid government-issued ID (PhilSys, Postal ID, etc.)' 
                  : 'Mag-upload ng valid government-issued ID (PhilSys, Postal ID, atbp.)'}
              </p>
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">{language === 'en' ? 'Click to upload or drag & drop' : 'Click para mag-upload o drag & drop'}</p>
              </div>
              <Button className="w-full" onClick={completeTier3}>
                {language === 'en' ? 'Simulate Upload' : 'Simulate Upload'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Document Vault Upload Modal */}
      {showDocumentVault && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowDocumentVault(false)}>
          <Card className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{language === 'en' ? 'Upload Document' : 'Mag-upload ng Dokumento'}</h3>
              <button onClick={() => setShowDocumentVault(false)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{language === 'en' ? 'Document Type' : 'Uri ng Dokumento'}</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>{language === 'en' ? 'Birth Certificate' : 'Birth Certificate'}</option>
                  <option>{language === 'en' ? 'Barangay Certificate' : 'Barangay Certificate'}</option>
                  <option>{language === 'en' ? 'Shelter Intake Form' : 'Shelter Intake Form'}</option>
                </select>
              </div>
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">{language === 'en' ? 'Upload document' : 'Mag-upload ng dokumento'}</p>
              </div>
              <Button className="w-full" onClick={() => setShowDocumentVault(false)}>
                {language === 'en' ? 'Close' : 'Isara'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

// Anti-Corruption Module with Credibility Guardrails
const AntiCorruptionModule = () => {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [isModeratorMode, setIsModeratorMode] = useState(false);
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('linya_reports');
    return saved ? JSON.parse(saved) : [];
  });
  const [patternCorroborations, setPatternCorroborations] = useState({});
  
  // Form state
  const [formData, setFormData] = useState({
    serviceType: '',
    city: '',
    barangay: '',
    incidentType: '',
    timeBucket: '',
    amountRange: '',
    narrative: '',
    evidence: null,
    voiceNote: null
  });
  const [nameWarning, setNameWarning] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);
  const [retractTimer, setRetractTimer] = useState(null);

  const serviceTypes = ['Police Station', 'Barangay Hall', 'City Hall', 'Hospital', 'DSWD Office', 'LTO Office'];
  const cities = ['Manila', 'Quezon City', 'Makati', 'Pasig', 'Taguig', 'Mandaluyong', 'Caloocan', 'Pasay'];
  const incidentTypes = ['Bribe Demanded', 'Aid Discrepancy', 'Harassment', 'Document Extortion', 'Delayed Service', 'Ghost Beneficiaries'];
  const amountRanges = ['₱0-500', '₱500-1,000', '₱1,000-5,000', '₱5,000-10,000', '₱10,000+'];

  const handleNarrativeChange = (e) => {
    const { redacted, hadRedactions } = redactPersonalNames(e.target.value);
    setFormData(prev => ({ ...prev, narrative: redacted }));
    setNameWarning(hadRedactions);
  };

  const handleSubmit = () => {
    const newReport = {
      ...formData,
      id: Date.now(),
      createdAt: Date.now(),
      reporterToken: getReporterToken(),
      status: 'received',
      moderatorNotes: ''
    };
    
    const updated = [...reports, newReport];
    setReports(updated);
    localStorage.setItem('linya_reports', JSON.stringify(updated));
    
    setSubmittedReport(newReport);
    setShowForm(false);
    setFormData({
      serviceType: '',
      city: '',
      barangay: '',
      incidentType: '',
      timeBucket: '',
      amountRange: '',
      narrative: '',
      evidence: null,
      voiceNote: null
    });
    
    // Start 10-minute countdown
    let timeLeft = 600;
    const timer = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timer);
        setSubmittedReport(null);
      }
      setRetractTimer(timeLeft);
    }, 1000);
  };

  const handleRetract = () => {
    const updated = reports.filter(r => r.id !== submittedReport.id);
    setReports(updated);
    localStorage.setItem('linya_reports', JSON.stringify(updated));
    setSubmittedReport(null);
    setRetractTimer(null);
  };

  const handleCorroborate = (patternKey) => {
    setPatternCorroborations(prev => ({
      ...prev,
      [patternKey]: (prev[patternKey] || 0) + 1
    }));
  };

  const patterns = detectPatterns(reports);
  
  // Add corroboration counts to patterns
  patterns.forEach(p => {
    const key = `${p.serviceType}|${p.city}|${p.incidentType}`;
    p.corroborations = patternCorroborations[key] || 0;
  });

  if (showForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">{t.newReport}</h3>
          <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <Card className="p-3 bg-amber-50 border-amber-200">
          <p className="text-sm text-amber-800 font-medium">{t.reportOfficeNotName}</p>
        </Card>

        {nameWarning && (
          <Card className="p-3 bg-red-50 border-red-200">
            <p className="text-sm text-red-800">{t.nameRedactedWarning}</p>
          </Card>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.serviceType}</label>
            <div className="grid grid-cols-2 gap-2">
              {serviceTypes.map(service => (
                <button
                  key={service}
                  onClick={() => setFormData(prev => ({ ...prev, serviceType: service }))}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    formData.serviceType === service
                      ? 'bg-emerald-800 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.city}</label>
            <div className="grid grid-cols-2 gap-2">
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => setFormData(prev => ({ ...prev, city }))}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    formData.city === city
                      ? 'bg-emerald-800 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.barangay}</label>
            <input
              type="text"
              value={formData.barangay}
              onChange={(e) => setFormData(prev => ({ ...prev, barangay: e.target.value }))}
              className="w-full p-3 bg-gray-100 rounded-xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none"
              placeholder="e.g., Barangay 123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.incidentType}</label>
            <div className="grid grid-cols-2 gap-2">
              {incidentTypes.map(incident => (
                <button
                  key={incident}
                  onClick={() => setFormData(prev => ({ ...prev, incidentType: incident }))}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    formData.incidentType === incident
                      ? 'bg-emerald-800 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {incident}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.whenHappened}</label>
            <div className="grid grid-cols-2 gap-2">
              {['Today', 'Yesterday', 'This Week', 'Choose Date'].map(time => (
                <button
                  key={time}
                  onClick={() => setFormData(prev => ({ ...prev, timeBucket: time }))}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    formData.timeBucket === time
                      ? 'bg-emerald-800 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.amountInvolved}</label>
            <div className="grid grid-cols-2 gap-2">
              {amountRanges.map(amount => (
                <button
                  key={amount}
                  onClick={() => setFormData(prev => ({ ...prev, amountRange: amount }))}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    formData.amountRange === amount
                      ? 'bg-emerald-800 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.yourStory}</label>
            <textarea
              value={formData.narrative}
              onChange={handleNarrativeChange}
              maxLength={280}
              rows={4}
              className="w-full p-3 bg-gray-100 rounded-xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none resize-none"
              placeholder={t.reportOfficeNotName}
            />
            <p className="text-xs text-gray-500 mt-1">{formData.narrative.length}/280</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.evidence}</label>
            <input type="file" accept="image/*,application/pdf" className="w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.voiceNote}</label>
            <input type="file" accept="audio/*" className="w-full" />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={!formData.serviceType || !formData.city || !formData.incidentType || !formData.timeBucket || !formData.narrative}
          >
            {t.submitReport}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Button icon={AlertTriangle} className="flex-1" onClick={() => setShowForm(true)}>
          {t.newReport}
        </Button>
        <button
          onClick={() => setIsModeratorMode(!isModeratorMode)}
          className={`p-3 rounded-xl transition-all ${
            isModeratorMode ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Shield size={20} />
        </button>
      </div>

      {submittedReport && retractTimer > 0 && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-green-900">{t.reportSubmitted}</h4>
              <p className="text-sm text-green-700">
                {Math.floor(retractTimer / 60)}:{(retractTimer % 60).toString().padStart(2, '0')} {t.minutesLeft}
              </p>
            </div>
            <Button variant="danger" size="sm" onClick={handleRetract}>
              {t.retractReport}
            </Button>
          </div>
        </Card>
      )}

      {!isModeratorMode && (
        <>
          <h3 className="font-semibold text-gray-900">{t.patternAlerts}</h3>
          {patterns.length === 0 ? (
            <Card className="p-4">
              <p className="text-center text-gray-500">No patterns detected yet</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {patterns.map((pattern, idx) => {
                const key = `${pattern.serviceType}|${pattern.city}|${pattern.incidentType}`;
                return (
                  <Card key={idx} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{pattern.incidentType}</h4>
                        <p className="text-sm text-gray-600">
                          {pattern.serviceType} • {pattern.city}
                        </p>
                      </div>
                      <Badge variant={pattern.confidence === 'Strong Pattern' ? 'success' : pattern.confidence === 'Emerging' ? 'warning' : 'default'}>
                        {pattern.confidence}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>{pattern.count} {t.reports}</span>
                      <span>•</span>
                      <span>{pattern.corroborations} {t.peopleCorroborated}</span>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      onClick={() => handleCorroborate(key)}
                    >
                      {t.iExperiencedThis}
                    </Button>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}

      {isModeratorMode && (
        <>
          <h3 className="font-semibold text-gray-900">{t.moderationQueue}</h3>
          <div className="space-y-3">
            {reports.map(report => (
              <Card key={report.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{report.incidentType}</h4>
                    <p className="text-sm text-gray-600">
                      {report.serviceType} • {report.city} {report.barangay && `• ${report.barangay}`}
                    </p>
                  </div>
                  <Badge>{report.status}</Badge>
                </div>
                <p className="text-sm text-gray-700 mb-3">{report.narrative}</p>
                <select
                  value={report.status}
                  onChange={(e) => {
                    const updated = reports.map(r =>
                      r.id === report.id ? { ...r, status: e.target.value } : r
                    );
                    setReports(updated);
                    localStorage.setItem('linya_reports', JSON.stringify(updated));
                  }}
                  className="w-full p-2 bg-gray-100 rounded-lg text-sm"
                >
                  <option value="received">Received</option>
                  <option value="redacted">Redacted</option>
                  <option value="under_review">Under Review</option>
                  <option value="pattern_emerging">Pattern Emerging</option>
                  <option value="pattern_confirmed">Pattern Confirmed</option>
                  <option value="escalation_ready">Escalation Ready</option>
                </select>
              </Card>
            ))}
          </div>
        </>
      )}

      <Card className="p-4 bg-red-50 border-red-200">
        <div className="flex items-center gap-4">
          <button className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30 hover:bg-red-700 transition-colors">
            <Bell className="text-white" size={28} />
          </button>
          <div>
            <h4 className="font-semibold text-red-900">{t.emergencyWitness}</h4>
            <p className="text-sm text-red-700 mt-1">{t.emergencyDesc}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Citizen Accountability Module
const CitizenAccountabilityModule = () => {
  const { t, language } = useLanguage();
  const [showCorruptionDetails, setShowCorruptionDetails] = useState(false);
  const [integrityScore, setIntegrityScore] = useState(mockStats.integrityScore);
  
  // Mock data for flags - adjusted to reflect 78% integrity score
  const userStats = {
    greenFlags: 39,
    redFlags: 11,
    totalInteractions: 127
  };

  return (
    <div className="space-y-6">
      {/* Verified Activity Level Card */}
      <Card className="p-6 bg-gradient-to-br from-emerald-800 to-emerald-900 text-white">
        <div className="text-center">
          <p className="text-emerald-300 text-sm font-medium">{t.verifiedActivityLevel}</p>
          <div className="mt-2 relative w-32 h-32 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
              <circle cx="64" cy="64" r="56" fill="none" stroke="#FCD34D" strokeWidth="8" strokeDasharray={`${(integrityScore / 100) * 352} 352`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold">{integrityScore}</span>
            </div>
          </div>
          <Badge variant="success" className="mt-3">{language === 'en' ? 'Active' : 'Aktibo'}</Badge>
        </div>
      </Card>

      {/* How Activity Level Works */}
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-indigo-200">
        <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
          <Shield size={20} />
          {language === 'en' ? 'How Your Activity Level Works' : 'Paano Gumagana ang Iyong Activity Level'}
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Flag className="text-green-600" size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-900">{t.greenFlagsPlus}</p>
              <p className="text-gray-600">{t.greenFlagsDesc}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Flag className="text-red-600" size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-900">{t.redFlagsMinus}</p>
              <p className="text-gray-600">{t.redFlagsDesc}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Your Flag History */}
      <Card className="p-4">
        <h4 className="font-semibold text-gray-900 mb-4">{t.yourFlagHistory}</h4>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-green-50 rounded-xl">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <Flag size={20} />
              <span className="text-2xl font-bold">{userStats.greenFlags}</span>
            </div>
            <p className="text-xs text-gray-600">{t.greenFlags}</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-xl">
            <div className="flex items-center justify-center gap-1 text-red-600 mb-1">
              <Flag size={20} />
              <span className="text-2xl font-bold">{userStats.redFlags}</span>
            </div>
            <p className="text-xs text-gray-600">{t.redFlags}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 mb-1">{userStats.totalInteractions}</div>
            <p className="text-xs text-gray-600">{t.totalInteractions}</p>
          </div>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl">
          <p className="text-sm text-emerald-800">
            <strong>{t.ratioPositive.replace('{ratio}', ((userStats.greenFlags / (userStats.greenFlags + userStats.redFlags)) * 100).toFixed(1))}</strong>
          </p>
          <p className="text-xs text-emerald-700 mt-1">
            {t.keepAbove70}
          </p>
        </div>
      </Card>

      {/* Impact on Perception */}
      <Card className="p-4 bg-purple-50 border-purple-200">
        <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
          <Users size={20} />
          {t.howOthersSeeYou}
        </h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="text-green-600" size={16} />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{t.highScore}</p>
              <p className="text-gray-600">{t.highScoreVerified}</p>
              <p className="text-gray-600">{t.highScorePriority}</p>
              <p className="text-gray-600">{t.highScoreWeight}</p>
              <p className="text-gray-600">{t.highScoreTrusted}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="text-yellow-600" size={16} />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{t.mediumScore}</p>
              <p className="text-gray-600">{t.mediumScoreVerification}</p>
              <p className="text-gray-600">{t.mediumScoreProof}</p>
              <p className="text-gray-600">{t.mediumScoreWitness}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <X className="text-red-600" size={16} />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{t.lowScore}</p>
              <p className="text-gray-600">{t.lowScoreFlagged}</p>
              <p className="text-gray-600">{t.lowScoreLimited}</p>
              <p className="text-gray-600">{t.lowScoreMandatory}</p>
              <p className="text-gray-600">{t.lowScoreRestrictions}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Recent Transactions</h4>
        <div className="space-y-3">
          {[
            { service: 'ID Renewal', agency: 'City Hall', date: 'Today', verified: true, flag: 'green' },
            { service: 'Aid Distribution', agency: 'DSWD', date: 'Yesterday', verified: true, flag: 'green' },
            { service: 'Document Request', agency: 'Barangay Hall', date: '3 days ago', verified: false, flag: null }
          ].map((tx, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{tx.service}</p>
                <p className="text-sm text-gray-500">{tx.agency} • {tx.date}</p>
              </div>
              <div className="flex items-center gap-2">
                {tx.flag && (
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${tx.flag === 'green' ? 'bg-green-100' : 'bg-red-100'}`}>
                    <Flag className={tx.flag === 'green' ? 'text-green-600' : 'text-red-600'} size={12} />
                  </div>
                )}
                {tx.verified ? (
                  <Badge variant="success">Verified Clean</Badge>
                ) : (
                  <Button size="sm" variant="outline">Verify</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Real Cost of Corruption */}
      <Card className="p-4 bg-amber-50 border-amber-200">
        <h4 className="font-semibold text-amber-900 mb-2">Real Cost of Corruption</h4>
        <p className="text-sm text-amber-700 mb-3">See how "small" bribes affect your community</p>
        
        {!showCorruptionDetails ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-amber-700">₱200 bribe =</span>
              <span className="font-medium text-amber-900">1 person loses ₱500 in wages waiting</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-700">₱1,000 bribe =</span>
              <span className="font-medium text-amber-900">1 less shelter bed funded</span>
            </div>
            <Button 
              variant="secondary" 
              size="sm" 
              className="w-full mt-3"
              onClick={() => setShowCorruptionDetails(true)}
            >
              Learn More
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-white rounded-lg">
                <p className="font-bold text-amber-900 mb-2">{t.bribeAmount100}</p>
                <p className="text-gray-700 mb-2">{t.couldHaveBeen}</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>{t.fiveMeals}</li>
                  <li>{t.twoWeeksSupplies}</li>
                  <li>{t.medicalSupplies}</li>
                </ul>
              </div>
              
              <div className="p-3 bg-white rounded-lg">
                <p className="font-bold text-amber-900 mb-2">{t.bribeAmount500}</p>
                <p className="text-gray-700 mb-2">{t.couldHaveFunded}</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>{t.familyFood}</li>
                  <li>{t.schoolUniforms}</li>
                  <li>{t.emergencyMedicine}</li>
                  <li>{t.shelterNights}</li>
                </ul>
              </div>
              
              <div className="p-3 bg-white rounded-lg">
                <p className="font-bold text-amber-900 mb-2">{t.bribeAmount5000}</p>
                <p className="text-gray-700 mb-2">{t.couldHaveProvided}</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>{t.livelihoodTraining}</li>
                  <li>{t.emergencyAssistance}</li>
                  <li>{t.feedingProgram}</li>
                  <li>{t.medicalEquipment}</li>
                </ul>
              </div>

              <div className="p-3 bg-red-100 rounded-lg border-2 border-red-300">
                <p className="font-bold text-red-900 mb-2">{t.annualImpact}</p>
                <p className="text-red-800 text-sm">
                  {t.annualImpactDesc.replace('{amount}', language === 'en' ? '₱2.4 million' : '₱2.4 milyon')}
                </p>
                <ul className="list-disc list-inside text-red-700 text-sm mt-2 space-y-1">
                  <li>{t.annualImpactList}</li>
                  <li>{t.annualImpactList2}</li>
                  <li>{t.annualImpactList3}</li>
                </ul>
              </div>
            </div>
            
            <Button 
              variant="secondary" 
              size="sm" 
              className="w-full"
              onClick={() => setShowCorruptionDetails(false)}
            >
              {t.showLess}
            </Button>
          </div>
        )}
      </Card>

    </div>
  );
};



// Dashboard Module - Reddit-style Crime Feed
const DashboardModule = () => {
  const { t, language } = useLanguage();
  const [sortBy, setSortBy] = useState('recent'); // recent, hot, top
  const [filterStatus, setFilterStatus] = useState('all'); // all, new, investigating, verified, resolved
  const [expandedPost, setExpandedPost] = useState(null);

  // Get all reports from localStorage and merge with mock data
  const getStoredReports = () => {
    try {
      const stored = localStorage.getItem('linya_reports');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const storedReports = getStoredReports().map(report => ({
    ...report,
    redFlags: report.redFlags || 0,
    greenFlags: report.greenFlags || 0,
    commentCount: report.commentCount || 0,
    timeAgo: report.timeAgo || 'Just now',
    verified: report.verified || false,
    anonymous: report.anonymous !== false,
    author: report.author || 'Anonymous',
    description: report.description || report.narrative || '',
    title: report.title || 'Untitled Report'
  }));

  const allReports = [...mockReports, ...storedReports];

  // Filter and sort reports
  const filteredReports = allReports.filter(report => {
    if (filterStatus === 'all') return true;
    return report.status === filterStatus;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === 'hot') {
      const aScore = (a.redFlags || 0) + (a.greenFlags || 0);
      const bScore = (b.redFlags || 0) + (b.greenFlags || 0);
      return bScore - aScore;
    } else if (sortBy === 'top') {
      return (b.redFlags || 0) - (a.redFlags || 0);
    }
    // Default: recent - handle invalid dates
    const aDate = a.date ? new Date(a.date).getTime() : 0;
    const bDate = b.date ? new Date(b.date).getTime() : 0;
    return bDate - aDate;
  });

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800 border-blue-200',
      investigating: 'bg-amber-100 text-amber-800 border-amber-200',
      verified: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      resolved: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status] || colors.new;
  };

  const getStatusLabel = (status) => {
    const labels = {
      new: language === 'en' ? 'New' : 'Bago',
      investigating: language === 'en' ? 'Investigating' : 'Sinisiyasat',
      verified: language === 'en' ? 'Verified' : 'Napatunayan',
      resolved: language === 'en' ? 'Resolved' : 'Naayos'
    };
    return labels[status] || status;
  };

  const handleVote = (reportId, voteType) => {
    // Vote logic would go here
    console.log(`Voted ${voteType} on report ${reportId}`);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'en' ? 'Crime Reports Feed' : 'Feed ng mga Ulat'}
          </h2>
          <p className="text-gray-500 text-sm">
            {language === 'en' ? 'Community-reported incidents' : 'Mga ulat mula sa komunidad'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">{sortedReports.length}</span>
          <AlertTriangle size={20} className="text-red-600" />
        </div>
      </div>

      {/* Sort & Filter Tabs */}
      <Card className="p-3">
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setSortBy('recent')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'recent' ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {language === 'en' ? 'Recent' : 'Bago'}
          </button>
          <button
            onClick={() => setSortBy('hot')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'hot' ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {language === 'en' ? 'Hot' : 'Mainit'}
          </button>
          <button
            onClick={() => setSortBy('top')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'top' ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {language === 'en' ? 'Top' : 'Top'}
          </button>
        </div>
        
        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {['all', 'new', 'investigating', 'verified', 'resolved'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                filterStatus === status
                  ? 'bg-emerald-800 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {status === 'all' ? (language === 'en' ? 'All' : 'Lahat') : getStatusLabel(status)}
            </button>
          ))}
        </div>
      </Card>

      {/* Crime Feed */}
      <div className="space-y-3">
        {sortedReports.map((report) => (
          <Card key={report.id} className="overflow-hidden hover:shadow-md transition-all">
            {/* Post Header */}
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {report.anonymous ? '?' : report.author?.[0] || 'A'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {report.anonymous ? (language === 'en' ? 'Anonymous' : 'Anonymous') : report.author}
                    </p>
                    <p className="text-xs text-gray-500">{report.timeAgo || report.date}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-lg border text-xs font-medium ${getStatusColor(report.status)}`}>
                  {getStatusLabel(report.status)}
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin size={12} />
                <span>{report.location}</span>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-3">
              <h3 className="font-bold text-gray-900 mb-2">{report.title}</h3>
              <p className="text-sm text-gray-700" style={expandedPost === report.id ? {} : { 
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {report.description}
              </p>
              {report.description && report.description.length > 150 && (
                <button
                  onClick={() => setExpandedPost(expandedPost === report.id ? null : report.id)}
                  className="text-xs text-emerald-600 font-medium mt-1"
                >
                  {expandedPost === report.id 
                    ? (language === 'en' ? 'Show less' : 'Ikli') 
                    : (language === 'en' ? 'Read more' : 'Basahin pa')}
                </button>
              )}
            </div>

            {/* Vote & Engagement Bar */}
            <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Red Flag (Upvote) */}
                <button
                  onClick={() => handleVote(report.id, 'red')}
                  className="flex items-center gap-1 group"
                >
                  <div className="p-1.5 rounded-lg bg-red-100 text-red-600 group-hover:bg-red-200 transition-all">
                    <Flag size={16} />
                  </div>
                  <span className="text-sm font-bold text-red-600">{report.redFlags}</span>
                </button>

                {/* Green Flag (Resolved/Support) */}
                <button
                  onClick={() => handleVote(report.id, 'green')}
                  className="flex items-center gap-1 group"
                >
                  <div className="p-1.5 rounded-lg bg-green-100 text-green-600 group-hover:bg-green-200 transition-all">
                    <CheckCircle size={16} />
                  </div>
                  <span className="text-sm font-bold text-green-600">{report.greenFlags}</span>
                </button>

                {/* Comments */}
                <button className="flex items-center gap-1 group">
                  <div className="p-1.5 rounded-lg bg-gray-200 text-gray-600 group-hover:bg-gray-300 transition-all">
                    <MessageCircle size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{report.commentCount || 0}</span>
                </button>
              </div>

              {/* Verified Badge */}
              {report.verified && (
                <div className="flex items-center gap-1 text-xs text-emerald-600">
                  <ShieldCheck size={14} />
                  <span className="font-medium">{language === 'en' ? 'Verified' : 'Verified'}</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedReports.length === 0 && (
        <Card className="p-8 text-center">
          <AlertTriangle size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 font-medium">
            {language === 'en' ? 'No reports found' : 'Walang nahanap na ulat'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'en' ? 'Try adjusting your filters' : 'Subukan baguhin ang iyong filter'}
          </p>
        </Card>
      )}

      {/* Quick Stats Footer */}
      <Card className="p-4 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-2xl font-bold text-emerald-800">{allReports.length}</p>
            <p className="text-xs text-gray-600">{language === 'en' ? 'Total Reports' : 'Kabuuang Ulat'}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-800">
              {allReports.filter(r => r.status === 'investigating').length}
            </p>
            <p className="text-xs text-gray-600">{language === 'en' ? 'Investigating' : 'Sinisiyasat'}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-800">
              {allReports.filter(r => r.status === 'resolved').length}
            </p>
            <p className="text-xs text-gray-600">{language === 'en' ? 'Resolved' : 'Naayos'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Main App
const App = () => {
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOnline] = useState(true);
  const [language, setLanguage] = useState('en');
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const t = translations[language];

  const modules = [
    { id: 'dashboard', label: t.dashboard, icon: Home, component: DashboardModule },
    { id: 'safespace', label: t.safespace, icon: MapPin, component: SafeSpaceModule },
    { id: 'streetconnect', label: t.streetconnect, icon: UserCheck, component: StreetConnectModule },
    { id: 'anticorruption', label: t.reportOfficials, icon: Shield, component: AntiCorruptionModule },
    { id: 'citizen', label: t.citizenScore, icon: Award, component: CitizenAccountabilityModule },
  ];

  const CurrentModuleComponent = modules.find(m => m.id === currentModule)?.component || DashboardModule;

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setShowLangDropdown(false);
  };

  return (
    <LanguageContext.Provider value={{ language, t }}>
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3"><div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center"><span className="text-white font-bold text-lg">L</span></div><div><h1 className="font-bold text-gray-900 leading-none">{t.appName}</h1><p className="text-xs text-gray-500">{t.tagline}</p></div></div>
            <div className="flex items-center gap-2">{!isOnline && <Badge variant="warning" size="sm">{t.offline}</Badge>}<button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">{isMenuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
          </div>
        </header>
        {isMenuOpen && <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsMenuOpen(false)}><div className="absolute right-0 top-16 w-64 bg-white rounded-l-2xl shadow-xl p-4" onClick={(e) => e.stopPropagation()}><nav className="space-y-1">{modules.map((module) => <button key={module.id} onClick={() => { setCurrentModule(module.id); setIsMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${currentModule === module.id ? 'bg-emerald-100 text-emerald-800' : 'text-gray-600 hover:bg-gray-100'}`}><module.icon size={20} /><span className="font-medium">{module.label}</span></button>)}</nav><div className="mt-4 pt-4 border-t border-gray-100"><div className="relative"><button onClick={() => setShowLangDropdown(!showLangDropdown)} className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl"><Globe size={20} /><span className="font-medium">{language === 'en' ? t.english : t.filipino}</span><ChevronDown size={16} className="ml-auto" /></button>{showLangDropdown && <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"><button onClick={() => handleLanguageChange('en')} className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${language === 'en' ? 'bg-emerald-50 text-emerald-800' : 'text-gray-700'}`}><span className="font-medium">English</span>{language === 'en' && <Check size={16} className="text-emerald-600" />}</button><button onClick={() => handleLanguageChange('tl')} className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${language === 'tl' ? 'bg-emerald-50 text-emerald-800' : 'text-gray-700'}`}><span className="font-medium">Filipino</span>{language === 'tl' && <Check size={16} className="text-emerald-600" />}</button></div>}</div></div></div></div>}
        <main className="max-w-lg mx-auto px-4 py-6"><CurrentModuleComponent /></main>
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe">
          <div className="max-w-lg w-full mx-auto px-2 py-2">
            <div className="flex justify-center gap-1">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setCurrentModule(module.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${currentModule === module.id ? 'text-emerald-800' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <module.icon size={24} />
                  <span className="text-xs font-medium">{module.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
        <div className="h-20" />
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
