# 🇵🇭 LiNYA - Linis na Yaman ng Bayan

> *"Sama-sama sa Tamang Linya"* (Together on the Honest Line)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa)](https://web.dev/progressive-web-apps/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

**LiNYA** is a progressive web application that creates mutual accountability in Philippine society by empowering vulnerable communities while preventing corruption from both officials and citizens. Built during HackTheFlood 2024, this platform addresses systemic issues through technology-enabled transparency.

---

## 🎯 Mission

To build a Philippines where honesty is normal, the vulnerable have power and protection, and essential services reach those who truly need them.

## ✨ Key Features

### 📱 Core Modules

#### 1. **Crime Reports Feed (Dashboard)**
- Reddit-style community reporting interface
- Real-time sorting by Recent, Hot, and Top reports
- Status filtering (New, Investigating, Verified, Resolved)
- Red/Green flag voting system for community engagement
- Anonymous and verified reporting options
- Interactive comment threads

#### 2. **SafeSpace PH** 
- Offline-first resource mapping for homeless services
- Interactive street grid map with real-time markers
- Filter by category: Food, Shelter, WiFi, Medical, Water
- Distance-based location sorting
- Verified service provider badges
- Operating hours and availability status
- GPS-enabled "Find Near Me" feature

#### 3. **StreetConnect** 
Progressive identity pathway for unhoused populations:
- **Tier 0**: Anonymous access (public info)
- **Tier 1**: Basic Identity (Phone OTP + Selfie + Name/Age/City)
  - Generates Bantay Lagay ID
  - Access to SafeSpace reporting
- **Tier 2**: Community Verified (NGO/Shelter attestation)
  - Apply for aid programs
  - Access job board
- **Tier 3**: Government Verified (PhilSys/Valid ID)
  - Full platform access
  - Priority for cash assistance programs
- Secure document vault with E2E encryption
- Liveness detection for identity verification

#### 4. **Anti-Corruption Reporting**
Built with credibility guardrails to prevent abuse:
- **Client-side name redaction** - Automatic removal of personal names
- **Structured reporting** - Service type, location, incident categorization
- **Pattern detection** - 3+ similar reports trigger alerts
- **Community corroboration** - "I experienced this too" validation
- **Confidence scoring** - Based on evidence, completeness, and corroboration
- **10-minute retraction window** - Allow time to reconsider submissions
- **Moderator queue** - Status progression from received to escalation-ready
- **Emergency witness button** - Alert verified community members
- Evidence upload support (photos, files, voice notes)

#### 5. **Citizen Accountability System**
Two-way integrity scoring:
- **Activity Level Score** - Visual integrity meter (0-100)
- **Green Flags** (+) - Earned through clean transactions, verified aid, reports
- **Red Flags** (-) - Suspicious behavior, unverified transactions
- **Tier-based benefits**:
  - High Score (75-100): Verified badge, priority aid, trusted reports
  - Medium Score (50-74): Standard verification required
  - Low Score (<50): Flagged account, limited privileges
- Transaction history tracking
- Real-time corruption cost calculator
- Community reputation visibility

### 🌐 Multilingual Support

- **English** and **Filipino (Tagalog)** translations
- Context-aware language switching
- Persistent language preference
- Cultural localization for Philippine context

### 🎨 User Experience

- **Modern, responsive design** with Tailwind CSS
- **Offline-first PWA** capabilities
- **Bottom navigation** optimized for mobile
- **Card-based UI** with smooth transitions
- **Dark mode ready** gradient themes
- **Accessible** with semantic HTML and ARIA labels

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18.2.0 |
| **Build Tool** | Vite 4.4.5 |
| **Styling** | Tailwind CSS 3.3.3 |
| **Icons** | Lucide React 0.263.1 |
| **PWA** | Vite PWA Plugin 0.16.4 |
| **Service Worker** | Workbox |
| **State Management** | React Context API |
| **Storage** | localStorage (client-side persistence) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/mightbeian/linya-hacktheflood.git

# Navigate to project directory
cd linya-hacktheflood

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Lint Code

```bash
npm run lint
```

---

## 📂 Project Structure

```
linya-hacktheflood/
├── public/
│   ├── icons/           # PWA icons (SVG format)
│   └── manifest.json    # PWA manifest configuration
├── src/
│   ├── App.jsx          # Main application component (112KB)
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles + Tailwind directives
├── index.html           # HTML template
├── vite.config.js       # Vite + PWA configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Project dependencies
```

---

## 🔐 Security & Privacy

### Data Protection
- **Client-side storage only** - No server-side data collection in prototype
- **Name redaction** - Automatic PII removal from corruption reports
- **Anonymous reporting** - Option to submit without identity
- **E2E encryption ready** - Document vault designed for encryption

### Ethical Safeguards
- **10-minute retraction window** - Prevent hasty submissions
- **Pattern-based reporting** - Prevents single false accusations
- **Moderation queue** - Human oversight for escalations
- **Confidence scoring** - Transparent credibility metrics

---

## 🎯 Use Cases

### For Vulnerable Communities
- Find food banks, shelters, and free WiFi
- Build digital identity without government ID
- Access employment opportunities
- Receive verified aid distribution
- Report service issues safely

### For Citizens
- Report corruption anonymously
- Track personal integrity score
- Verify aid distribution authenticity
- Participate in community accountability
- Access transparency dashboards

### For NGOs & Partners
- Attest community members (StreetConnect Tier 2)
- Manage resource listings (SafeSpace)
- Track aid distribution impact
- Collaborate with verified citizens

### For Government
- Monitor pattern-based corruption alerts
- Track budget transparency metrics
- Engage with community feedback
- Identify systemic service gaps

---

## 🌟 Future Roadmap

### Phase 1: Enhanced Security
- [ ] Backend API integration
- [ ] Real server-side encryption
- [ ] OAuth authentication
- [ ] Blockchain verification layer

### Phase 2: Advanced Features
- [ ] Real-time notifications
- [ ] AI-powered pattern detection
- [ ] Geofencing for location services
- [ ] Multi-city expansion

### Phase 3: Ecosystem Integration
- [ ] PhilSys integration
- [ ] LGU partnership APIs
- [ ] NGO collaboration portal
- [ ] Mobile native apps (iOS/Android)

### Phase 4: Analytics & Impact
- [ ] Public transparency dashboard
- [ ] Data visualization tools
- [ ] Impact metrics reporting
- [ ] Research API for academics

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style (ESLint configuration provided)
- Write descriptive commit messages
- Test on multiple devices/browsers
- Update documentation for new features
- Consider accessibility in all UI changes

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**LiNYA Team** - HackTheFlood 2024 Participants

- [mightbeian](https://github.com/mightbeian) - Project Lead
- [justinalliv](https://github.com/justinalliv) - Developer
- [TheLevatron](https://github.com/TheLevatron) - Developer

---

## 🙏 Acknowledgments

- **HackTheFlood 2024** - For the platform and inspiration
- **Open source community** - For the amazing tools and libraries
- **Filipino communities** - For the insights and feedback
- All contributors and supporters of anti-corruption efforts

---

## 📧 Contact

For questions, suggestions, or partnerships, please open an issue on GitHub or reach out through:

- **GitHub Issues**: [Project Issues](https://github.com/mightbeian/linya-hacktheflood/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mightbeian/linya-hacktheflood/discussions)

---

<div align="center">

**Built with ❤️ for the Philippines**

*"Sama-sama sa Tamang Linya"*

🇵🇭 **HackTheFlood 2024** 🇵🇭

[View Demo](#) | [Report Bug](https://github.com/mightbeian/linya-hacktheflood/issues) | [Request Feature](https://github.com/mightbeian/linya-hacktheflood/issues)

</div>
