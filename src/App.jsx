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
    oddJobs: 'OddJobs',
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
    oddJobs: 'OddJobs',
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
      <div className="relative h-64 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center"><MapPin className="mx-auto text-emerald-600 mb-2" size={48} /><p className="text-emerald-800 font-medium">{t.interactiveMap}</p><p className="text-emerald-600 text-sm">{t.offlineReady}</p></div>
        </div>
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-orange-500 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-purple-500 rounded-full animate-pulse" />
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
  const integrityScore = mockStats.integrityScore;
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-emerald-800 to-emerald-900 text-white">
        <div className="text-center"><p className="text-emerald-300 text-sm font-medium">Your Integrity Score</p><div className="mt-2 relative w-32 h-32 mx-auto"><svg className="w-full h-full transform -rotate-90"><circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" /><circle cx="64" cy="64" r="56" fill="none" stroke="#FCD34D" strokeWidth="8" strokeDasharray={`${(integrityScore / 100) * 352} 352`} strokeLinecap="round" /></svg><div className="absolute inset-0 flex items-center justify-center"><span className="text-4xl font-bold">{integrityScore}</span></div></div><Badge variant="success" className="mt-3">Excellent Standing</Badge></div>
      </Card>
      <Card className="p-4"><h4 className="font-semibold text-gray-900 mb-3">Recent Transactions</h4><div className="space-y-3">{[{ service: 'ID Renewal', agency: 'City Hall', date: 'Today', verified: true }, { service: 'Aid Distribution', agency: 'DSWD', date: 'Yesterday', verified: true }, { service: 'Document Request', agency: 'Barangay Hall', date: '3 days ago', verified: false }].map((tx, i) => <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"><div><p className="font-medium text-gray-900">{tx.service}</p><p className="text-sm text-gray-500">{tx.agency} • {tx.date}</p></div>{tx.verified ? <Badge variant="success">Verified Clean</Badge> : <Button size="sm" variant="outline">Verify</Button>}</div>)}</div></Card>
      <Card className="p-4 bg-amber-50 border-amber-200"><h4 className="font-semibold text-amber-900 mb-2">Real Cost of Corruption</h4><p className="text-sm text-amber-700 mb-3">See how "small" bribes affect your community</p><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-amber-700">₱200 bribe =</span><span className="font-medium text-amber-900">1 person loses ₱500 in wages waiting</span></div><div className="flex justify-between"><span className="text-amber-700">₱1,000 bribe =</span><span className="font-medium text-amber-900">1 less shelter bed funded</span></div></div><Button variant="secondary" size="sm" className="w-full mt-3">Learn More</Button></Card>
      <Card className="p-4"><div className="text-center"><Award className="mx-auto text-emerald-600" size={40} /><h4 className="font-semibold text-gray-900 mt-3">Take the Integrity Pledge</h4><p className="text-sm text-gray-500 mt-1">Join 50,000+ citizens committed to corruption-free Philippines</p><Button className="mt-4 w-full">I Pledge to Stay in Line</Button></div></Card>
    </div>
  );
};

// OddJobs Module
const OddJobsModule = () => (
  <div className="space-y-6">
    <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} /><input type="text" placeholder="Search jobs near you..." className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all" /></div>
    <div className="flex gap-2 overflow-x-auto pb-2">{['All', 'Today', 'Construction', 'Delivery', 'Events', 'Warehouse'].map((filter) => <button key={filter} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${filter === 'All' ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-700'}`}>{filter}</button>)}</div>
    <div className="space-y-3">{mockJobs.map((job) => <Card key={job.id} hover className="p-4"><div className="flex items-start justify-between"><div><h4 className="font-semibold text-gray-900">{job.title}</h4><p className="text-emerald-600 font-medium">{job.pay}</p></div><Badge variant="success">{job.duration}</Badge></div><div className="mt-3 flex items-center gap-4 text-sm text-gray-500"><span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span><span className="flex items-center gap-1"><Star size={14} className="text-amber-500" />{job.rating}</span></div><div className="mt-3 flex items-center justify-between"><span className="text-sm text-gray-500">{job.employer}</span><Button size="sm">Apply Now</Button></div></Card>)}</div>
    <Card className="p-4"><div className="flex items-center justify-between mb-3"><h4 className="font-semibold text-gray-900">My SkillBank</h4><button className="text-emerald-600 text-sm font-medium">Edit</button></div><div className="flex flex-wrap gap-2">{['Carpentry', 'Painting', 'Loading/Unloading', 'Cleaning'].map((skill) => <Badge key={skill} variant="primary">{skill}</Badge>)}<button className="text-emerald-600 text-sm font-medium">+ Add Skill</button></div></Card>
    <Card className="p-4 bg-emerald-50 border-emerald-200"><div className="flex items-center gap-3"><ShieldCheck className="text-emerald-600" size={24} /><div><h4 className="font-medium text-emerald-900">Worker Protection Active</h4><p className="text-sm text-emerald-700">GPS tracking, emergency contacts, payment escrow</p></div></div></Card>
  </div>
);

// Dashboard Module
const DashboardModule = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold text-gray-900">{t.greeting}</h2><p className="text-gray-500">{t.communityHappening}</p></div>
      <div className="grid grid-cols-2 gap-3"><StatCard icon={Heart} label={t.aidDistributed} value={mockStats.aidDistributed} trend="+15%" trendUp /><StatCard icon={Users} label={t.beneficiaries} value={mockStats.beneficiaries.toLocaleString()} trend="+8%" trendUp /><StatCard icon={Building} label={t.shelterBeds} value={mockStats.shelterBeds} trend="-5%" trendUp={false} /><StatCard icon={Target} label={t.integrityScore} value={`${mockStats.integrityScore}%`} trend="+3%" trendUp /></div>
      <Card className="p-4"><h4 className="font-semibold text-gray-900 mb-3">{t.budgetTransparency}</h4><div className="space-y-3">{[{ label: 'Homeless Services', allocated: 45.2, spent: 38.5 }, { label: 'Shelter Operations', allocated: 28.0, spent: 27.2 }, { label: 'Feeding Programs', allocated: 15.8, spent: 14.1 }].map((item, i) => <div key={i}><div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{item.label}</span><span className="font-medium">₱{item.spent}M / ₱{item.allocated}M</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${(item.spent / item.allocated) * 100}%` }} /></div></div>)}</div><Button variant="ghost" size="sm" className="w-full mt-3">{t.viewFullBudget}</Button></Card>
      <Card className="p-4"><h4 className="font-semibold text-gray-900 mb-3">{t.cleanestAreas}</h4><div className="space-y-2">{[{ rank: 1, area: 'Barangay San Antonio', score: 94, change: '+5' }, { rank: 2, area: 'Barangay Poblacion', score: 91, change: '+3' }, { rank: 3, area: 'Barangay Bagong Silang', score: 88, change: '+7' }].map((item) => <div key={item.rank} className="flex items-center gap-3 py-2"><span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${item.rank === 1 ? 'bg-amber-100 text-amber-800' : item.rank === 2 ? 'bg-gray-100 text-gray-800' : 'bg-orange-100 text-orange-800'}`}>{item.rank}</span><div className="flex-1"><p className="font-medium text-gray-900">{item.area}</p></div><div className="text-right"><p className="font-bold text-gray-900">{item.score}%</p><p className="text-xs text-green-600">{item.change}</p></div></div>)}</div></Card>
      <div className="grid grid-cols-4 gap-3">{[{ icon: MapPin, label: t.findHelp, color: 'bg-blue-100 text-blue-600' }, { icon: Flag, label: t.report, color: 'bg-red-100 text-red-600' }, { icon: Briefcase, label: t.jobs, color: 'bg-green-100 text-green-600' }, { icon: FileText, label: t.documents, color: 'bg-purple-100 text-purple-600' }].map((action) => <button key={action.label} className="flex flex-col items-center gap-2 p-3"><div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}><action.icon size={24} /></div><span className="text-xs font-medium text-gray-600">{action.label}</span></button>)}</div>
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
    { id: 'oddjobs', label: t.oddJobs, icon: Briefcase, component: OddJobsModule },
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
          <div className="max-w-lg w-full mx-auto px-2 py-2 overflow-x-auto scrollbar-hide">
            <div className="flex flex-nowrap gap-1">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setCurrentModule(module.id)}
                  className={`flex-none flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${currentModule === module.id ? 'text-emerald-800' : 'text-gray-400 hover:text-gray-600'}`}
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
