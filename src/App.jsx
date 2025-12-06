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
  Wifi, Droplets, ChevronDown, Check
} from 'lucide-react';

// Language Context
const LanguageContext = createContext();
const useLanguage = () => useContext(LanguageContext);

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
    today: 'Today',
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
    today: 'Ngayon',
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
      <Card className="p-4 bg-amber-50 border-amber-200">
        <div className="flex items-start gap-3"><AlertTriangle className="text-amber-600 flex-shrink-0" size={24} /><div><h4 className="font-semibold text-amber-900">{t.weatherWarning}</h4><p className="text-sm text-amber-700 mt-1">{t.heavyRain}</p></div></div>
      </Card>
    </div>
  );
};

// StreetConnect Module
const StreetConnectModule = () => {
  const [activeTab, setActiveTab] = useState('identity');
  const documents = [{ name: 'PhilSys ID', status: 'verified', icon: UserCheck }, { name: 'Barangay Certificate', status: 'verified', expiry: '2025-06-15', icon: FileText }, { name: 'Medical Records', status: 'pending', icon: Activity }, { name: 'Birth Certificate', status: 'verified', icon: FileText }];
  const applications = [{ program: '4Ps Cash Transfer', status: 'approved', agency: 'DSWD', date: '2024-01-10' }, { program: 'Housing Assistance', status: 'pending', agency: 'NHA', date: '2024-01-08' }, { program: 'Skills Training', status: 'interview', agency: 'TESDA', date: '2024-01-05' }];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-900 p-6 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/30 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-start justify-between">
            <div><p className="text-emerald-300 text-sm font-medium">LiNYA Digital Identity</p><h2 className="text-2xl font-bold mt-1">Juan Dela Cruz</h2><p className="text-emerald-200 text-sm mt-1">ID: LNY-2024-XXXXX</p></div>
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"><Fingerprint size={32} /></div>
          </div>
          <div className="mt-6 flex items-center gap-4"><div className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-300" /><span className="text-sm">Verified</span></div><div className="flex items-center gap-2"><Cloud size={16} className="text-emerald-300" /><span className="text-sm">Backed Up</span></div></div>
          <div className="mt-4 flex gap-3"><Button variant="secondary" size="sm" icon={QrCode}>Show QR</Button><Button variant="ghost" size="sm" icon={Share2} className="text-white hover:bg-white/10">Share</Button></div>
        </div>
      </div>
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
        {['identity', 'documents', 'applications'].map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all capitalize ${activeTab === tab ? 'bg-white shadow text-emerald-800' : 'text-gray-600 hover:text-gray-900'}`}>{tab}</button>)}
      </div>
      {activeTab === 'documents' && <div className="space-y-3">{documents.map((doc, i) => <Card key={i} hover className="p-4"><div className="flex items-center gap-4"><div className={`p-2 rounded-xl ${doc.status === 'verified' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}><doc.icon size={20} /></div><div className="flex-1"><h4 className="font-medium text-gray-900">{doc.name}</h4>{doc.expiry && <p className="text-sm text-gray-500">Expires: {doc.expiry}</p>}</div><Badge variant={doc.status === 'verified' ? 'success' : 'warning'}>{doc.status}</Badge></div></Card>)}<Button variant="outline" icon={Upload} className="w-full">Upload New Document</Button></div>}
      {activeTab === 'applications' && <div className="space-y-3">{applications.map((app, i) => <Card key={i} className="p-4"><div className="flex items-start justify-between"><div><h4 className="font-medium text-gray-900">{app.program}</h4><p className="text-sm text-gray-500">{app.agency}</p></div><Badge variant={app.status === 'approved' ? 'success' : app.status === 'pending' ? 'warning' : 'primary'}>{app.status}</Badge></div><div className="mt-3 flex items-center justify-between text-sm"><span className="text-gray-500">Applied: {app.date}</span><button className="text-emerald-600 font-medium">View Details →</button></div></Card>)}</div>}
      {activeTab === 'identity' && <div className="space-y-4"><Card className="p-4"><h4 className="font-medium text-gray-900 mb-3">Privacy Controls</h4><div className="space-y-3">{['Government Agencies', 'NGO Partners', 'Employers'].map((entity) => <div key={entity} className="flex items-center justify-between"><span className="text-gray-700">{entity}</span><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" defaultChecked className="sr-only peer" /><div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div></label></div>)}</div></Card><Card className="p-4 bg-emerald-50 border-emerald-200"><div className="flex items-center gap-3"><Lock className="text-emerald-600" size={20} /><div><h4 className="font-medium text-emerald-900">End-to-End Encrypted</h4><p className="text-sm text-emerald-700">Your data is protected with military-grade encryption</p></div></div></Card></div>}
    </div>
  );
};

// Anti-Corruption Module
const AntiCorruptionModule = () => {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState('hot');
  const [userVotes, setUserVotes] = useState({});
  const reportTypes = [{ id: 'bribe_demand', label: t.bribeDemand, icon: AlertTriangle, color: 'text-red-600 bg-red-100' }, { id: 'harassment', label: t.harassment, icon: Shield, color: 'text-orange-600 bg-orange-100' }, { id: 'aid_discrepancy', label: t.aidDiscrepancy, icon: PieChart, color: 'text-purple-600 bg-purple-100' }, { id: 'document_extortion', label: t.documentExtortion, icon: FileText, color: 'text-blue-600 bg-blue-100' }];

  const handleVote = (reportId, voteType) => {
    setUserVotes(prev => ({
      ...prev,
      [reportId]: prev[reportId] === voteType ? null : voteType
    }));
  };

  const getVoteCount = (report) => {
    const userVote = userVotes[report.id];
    let redFlags = report.redFlags;
    let greenFlags = report.greenFlags;
    
    if (userVote === 'red') redFlags += 1;
    if (userVote === 'green') greenFlags += 1;
    
    return { redFlags, greenFlags, score: redFlags - greenFlags };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Button icon={AlertTriangle} className="flex-1">{t.newReport}</Button>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {[{key: 'hot', label: t.hot}, {key: 'new', label: t.new}, {key: 'top', label: t.top}].map((sort) => (
            <button
              key={sort.key}
              onClick={() => setSortBy(sort.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${sortBy === sort.key ? 'bg-white shadow text-emerald-800' : 'text-gray-600'}`}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>

      <Card className="p-3 bg-gradient-to-r from-red-50 to-green-50 border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Flag className="text-red-600" size={16} />
            </div>
            <span className="font-medium text-gray-700">{t.redFlagSuspicious}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">{t.greenFlagVerified}</span>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Flag className="text-green-600" size={16} />
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {mockReports.map((report) => {
          const { redFlags, greenFlags, score } = getVoteCount(report);
          const userVote = userVotes[report.id];
          
          return (
            <Card key={report.id} className="overflow-hidden">
              <div className="flex">
                {/* Voting Section */}
                <div className="flex flex-col items-center gap-1 bg-gray-50 px-3 py-4">
                  <button
                    onClick={() => handleVote(report.id, 'red')}
                    className={`p-2 rounded-lg transition-all ${userVote === 'red' ? 'bg-red-100' : 'hover:bg-red-50'}`}
                  >
                    <Flag className={`${userVote === 'red' ? 'text-red-600' : 'text-gray-400'}`} size={20} />
                  </button>
                  <span className={`text-sm font-bold ${score > 100 ? 'text-red-600' : score < -10 ? 'text-green-600' : 'text-gray-700'}`}>
                    {score}
                  </span>
                  <button
                    onClick={() => handleVote(report.id, 'green')}
                    className={`p-2 rounded-lg transition-all ${userVote === 'green' ? 'bg-green-100' : 'hover:bg-green-50'}`}
                  >
                    <CheckCircle className={`${userVote === 'green' ? 'text-green-600' : 'text-gray-400'}`} size={20} />
                  </button>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={report.type === 'bribe_demand' ? 'danger' : report.type === 'aid_discrepancy' ? 'warning' : 'default'} size="sm">
                        {report.type.replace('_', ' ')}
                      </Badge>
                      {report.verified && (
                        <Badge variant="success" size="sm">
                          <CheckCircle size={12} className="inline mr-1" />
                          {t.verified}
                        </Badge>
                      )}
                      <Badge variant={report.status === 'resolved' ? 'success' : report.status === 'investigating' ? 'warning' : 'default'} size="sm">
                        {report.status === 'resolved' ? t.resolved : report.status === 'investigating' ? t.investigating : report.status}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 leading-snug">{report.title}</h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{report.description}</p>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <span className="font-medium">{report.author}</span>
                    <span>•</span>
                    <MapPin size={12} className="inline" />
                    <span>{report.location}</span>
                    <span>•</span>
                    <span>{report.timeAgo}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-emerald-600 transition-colors">
                        <FileText size={16} />
                        <span className="font-medium">{report.commentCount}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-emerald-600 transition-colors">
                        <Share2 size={16} />
                        <span className="font-medium">{t.share}</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-red-600">
                        <Flag size={12} />
                        {redFlags}
                      </span>
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle size={12} />
                        {greenFlags}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

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
  const [showPledge, setShowPledge] = useState(false);
  const [pledgeTaken, setPledgeTaken] = useState(false);
  const [showPledgeConfirmation, setShowPledgeConfirmation] = useState(false);
  const [integrityScore, setIntegrityScore] = useState(mockStats.integrityScore);
  
  // Mock data for flags - adjusted to reflect 78% integrity score
  const userStats = {
    greenFlags: 39,
    redFlags: 11,
    totalInteractions: 127
  };

  const handleTakePledge = () => {
    setPledgeTaken(true);
    setIntegrityScore(prevScore => Math.min(prevScore + 5, 100)); // Add 5 points, max 100
    setShowPledge(false);
    setShowPledgeConfirmation(true);
    // Auto-hide confirmation after 5 seconds
    setTimeout(() => {
      setShowPledgeConfirmation(false);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* Pledge Confirmation Banner */}
      {showPledgeConfirmation && (
        <div className="fixed top-20 left-0 right-0 z-40 px-4 animate-fade-in">
          <div className="max-w-lg mx-auto">
            <Card className="p-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-emerald-500 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{language === 'en' ? 'Pledge Confirmed!' : 'Nakumpirma ang Pangako!'}</h4>
                  <p className="text-sm text-emerald-100">
                    {language === 'en' 
                      ? 'You are now part of the Integrity Network. +5 points added to your score!' 
                      : 'Kayo ay bahagi na ng Integrity Network. +5 puntos ang naidagdag sa inyong score!'}
                  </p>
                </div>
                <button 
                  onClick={() => setShowPledgeConfirmation(false)}
                  className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Integrity Score Card */}
      <Card className="p-6 bg-gradient-to-br from-emerald-800 to-emerald-900 text-white">
        <div className="text-center">
          <p className="text-emerald-300 text-sm font-medium">Your Integrity Score</p>
          <div className="mt-2 relative w-32 h-32 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
              <circle cx="64" cy="64" r="56" fill="none" stroke="#FCD34D" strokeWidth="8" strokeDasharray={`${(integrityScore / 100) * 352} 352`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold">{integrityScore}</span>
            </div>
          </div>
          <Badge variant="success" className="mt-3">Excellent Standing</Badge>
        </div>
      </Card>

      {/* How Integrity Score Works */}
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-indigo-200">
        <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
          <Shield size={20} />
          {t.howIntegrityWorks}
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

      {/* Integrity Pledge */}
      <Card className={`p-4 ${pledgeTaken ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-300' : ''}`}>
        <div className="text-center">
          {pledgeTaken ? (
            <>
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="text-white" size={32} />
              </div>
              <Badge variant="success" className="mb-2">
                {language === 'en' ? 'Pledge Taken' : 'Natapos ang Pangako'}
              </Badge>
              <h4 className="font-semibold text-gray-900 mt-2">{language === 'en' ? 'Integrity Pledge Member' : 'Miyembro ng Integrity Pledge'}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'en' 
                  ? 'Thank you for committing to a corruption-free Philippines!' 
                  : 'Salamat sa inyong pangako para sa walang korupsyong Pilipinas!'}
              </p>
              <div className="mt-4 p-3 bg-white rounded-xl border border-emerald-200">
                <div className="flex items-center justify-center gap-2 text-emerald-800">
                  <Award size={20} />
                  <span className="font-semibold">{language === 'en' ? 'Integrity Score Boosted!' : 'Tumaas ang Integrity Score!'}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">+5 {language === 'en' ? 'points added' : 'puntos ang naidagdag'}</p>
              </div>
            </>
          ) : (
            <>
              <Award className="mx-auto text-emerald-600" size={40} />
              <h4 className="font-semibold text-gray-900 mt-3">Take the Integrity Pledge</h4>
              <p className="text-sm text-gray-500 mt-1">Join 50,000+ citizens committed to corruption-free Philippines</p>
              <Button 
                className="mt-4 w-full"
                onClick={() => setShowPledge(true)}
              >
                I Pledge to Stay in Line
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Pledge Modal */}
      {showPledge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowPledge(false)}>
          <Card className="max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{t.linyaIntegrityPledge}</h3>
              <button 
                onClick={() => setShowPledge(false)}
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {pledgeTaken ? (
                <>
                  {/* Already Taken View */}
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-white" size={48} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {language === 'en' ? 'Pledge Already Taken!' : 'Natapos Na ang Pangako!'}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {language === 'en' 
                        ? 'You are already a member of the Integrity Network.' 
                        : 'Kayo ay miyembro na ng Integrity Network.'}
                    </p>
                    <Badge variant="success" size="md" className="mb-6">
                      {language === 'en' ? 'Active Member Since Today' : 'Aktibong Miyembro Mula Ngayon'}
                    </Badge>
                  </div>

                  {/* Show the pledge they took */}
                  <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
                    <h5 className="font-semibold text-emerald-900 mb-3 text-center">
                      {language === 'en' ? 'Your Pledge' : 'Ang Inyong Pangako'}
                    </h5>
                    <p className="text-sm text-gray-700 text-center italic">
                      {t.pledgeClosing}
                    </p>
                  </div>

                  <Button 
                    variant="primary" 
                    className="w-full"
                    onClick={() => setShowPledge(false)}
                  >
                    {language === 'en' ? 'Close' : 'Isara'}
                  </Button>
                </>
              ) : (
                <>
                  {/* Pledge Header */}
                  <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-white" size={40} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{language === 'tl' ? 'Ang Aking Pangako' : 'My Commitment'}</h4>
                <p className="text-sm text-gray-600 mt-1">{t.myCommitment}</p>
              </div>

              {/* Pledge Content */}
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6 space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  {t.pledgeIntro}
                </p>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                    <p className="text-sm text-gray-700">
                      {t.pledgeNoBribes}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                    <p className="text-sm text-gray-700">
                      {t.pledgeReport}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                    <p className="text-sm text-gray-700">
                      {t.pledgeRefuse}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                    <p className="text-sm text-gray-700">
                      {t.pledgeDemand}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                    <p className="text-sm text-gray-700">
                      {t.pledgeSupport}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                    <p className="text-sm text-gray-700">
                      {t.pledgeVerify}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                    <p className="text-sm text-gray-700">
                      {t.pledgeMaintain}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-emerald-300">
                  <p className="text-gray-800 italic leading-relaxed">
                    {t.pledgeClosing}
                  </p>
                </div>
              </div>

              {/* Benefits of Taking the Pledge */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <h5 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Star className="text-blue-600" size={20} />
                  {t.benefitsOfPledge}
                </h5>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    {t.benefitBadge}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    {t.benefitBoost}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    {t.benefitNetwork}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    {t.benefitSupport}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    {t.benefitRecognition}
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full" icon={Shield} onClick={handleTakePledge}>
                  {t.iTakeThisPledge}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowPledge(false)}
                >
                  {t.readAgainLater}
                </Button>
              </div>

              {/* Fine Print */}
              <p className="text-xs text-gray-500 text-center">
                {t.pledgeFinePrint}
              </p>
                </>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};



// Dashboard Module
const DashboardModule = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold text-gray-900">{t.greeting}</h2><p className="text-gray-500">{t.communityHappening}</p></div>
      <div className="grid grid-cols-2 gap-3"><StatCard icon={Heart} label={t.aidDistributed} value={mockStats.aidDistributed} trend="+15%" trendUp /><StatCard icon={Users} label={t.beneficiaries} value={mockStats.beneficiaries.toLocaleString()} trend="+8%" trendUp /><StatCard icon={Building} label={t.shelterBeds} value={mockStats.shelterBeds} trend="-5%" trendUp={false} /><StatCard icon={Target} label={t.integrityScore} value={`${mockStats.integrityScore}%`} trend="+3%" trendUp /></div>
      <Card className="p-4"><h4 className="font-semibold text-gray-900 mb-3">{t.budgetTransparency}</h4><div className="space-y-3">{[{ label: 'Homeless Services', allocated: 45.2, spent: 38.5 }, { label: 'Shelter Operations', allocated: 28.0, spent: 27.2 }, { label: 'Feeding Programs', allocated: 15.8, spent: 14.1 }].map((item, i) => <div key={i}><div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{item.label}</span><span className="font-medium">₱{item.spent}M / ₱{item.allocated}M</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${(item.spent / item.allocated) * 100}%` }} /></div></div>)}</div><Button variant="ghost" size="sm" className="w-full mt-3">{t.viewFullBudget}</Button></Card>
      <Card className="p-4"><h4 className="font-semibold text-gray-900 mb-3">{t.cleanestAreas}</h4><div className="space-y-2">{[{ rank: 1, area: 'Barangay San Antonio', score: 94, change: '+5' }, { rank: 2, area: 'Barangay Poblacion', score: 91, change: '+3' }, { rank: 3, area: 'Barangay Bagong Silang', score: 88, change: '+7' }].map((item) => <div key={item.rank} className="flex items-center gap-3 py-2"><span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${item.rank === 1 ? 'bg-amber-100 text-amber-800' : item.rank === 2 ? 'bg-gray-100 text-gray-800' : 'bg-orange-100 text-orange-800'}`}>{item.rank}</span><div className="flex-1"><p className="font-medium text-gray-900">{item.area}</p></div><div className="text-right"><p className="font-bold text-gray-900">{item.score}%</p><p className="text-xs text-green-600">{item.change}</p></div></div>)}</div></Card>
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
