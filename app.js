// NeuroSense – Complete Full-Stack Application
// eslint-disable-next-line no-undef
const { useState, useEffect, createContext, useContext, useRef } = React;

/********************
 * MOCK DATABASE
 ********************/
const sampleDB = {
  patients: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "Demo123!",
      age: 65,
      gender: "Male",
      blood_type: "O+",
      phone: "+91-9876543210",
      emergencyContact: "Jane Doe - +91-9876543211",
      assignedDoctor: "Dr. Alice Chen",
      assignedDoctorId: 1,
      medications: [
        { name: "Donepezil", dosage: "10mg", frequency: "Once daily", startDate: "2025-09-15", reason: "Alzheimer's treatment" },
        { name: "Lisinopril", dosage: "5mg", frequency: "Once daily", startDate: "2025-01-10", reason: "Hypertension" }
      ],
      allergies: [{ name: "Penicillin", severity: "Moderate" }],
      medicalHistory: [
        { condition: "Hypertension", onsetDate: "2020-03-15" },
        { condition: "Type 2 Diabetes", onsetDate: "2018-06-20" }
      ],
      assessments: [
        {
          id: 1,
          type: "Questionnaire",
          date: "2025-11-01",
          alzheimers_risk: 72,
          parkinsons_risk: 35,
          dementia_risk: 68,
          confidence: 0.87,
          responses: {
            age: 65,
            gender: "Male",
            education: "Bachelor's",
            familyHistoryAD: "Yes",
            familyHistoryRelation: "Parent",
            memoryComplaints: "Yes",
            memoryDuration: "6-12 months",
            sleepQuality: "Fair",
            physicalActivity: "Moderate"
          },
          riskFactors: [
            { factor: "Age", score: 25 },
            { factor: "Memory Complaints", score: 20 },
            { factor: "Family History", score: 18 },
            { factor: "Sleep Quality", score: 10 },
            { factor: "Physical Activity", score: 8 }
          ]
        },
        {
          id: 2,
          type: "Clinical",
          date: "2025-10-15",
          alzheimers_risk: 68,
          parkinsons_risk: 32,
          dementia_risk: 65,
          confidence: 0.85,
          responses: {},
          riskFactors: []
        },
        {
          id: 3,
          type: "Questionnaire",
          date: "2025-09-20",
          alzheimers_risk: 65,
          parkinsons_risk: 30,
          dementia_risk: 62,
          confidence: 0.83,
          responses: {},
          riskFactors: []
        },
        {
          id: 4,
          type: "Questionnaire",
          date: "2025-08-10",
          alzheimers_risk: 62,
          parkinsons_risk: 28,
          dementia_risk: 60,
          confidence: 0.81,
          responses: {},
          riskFactors: []
        },
        {
          id: 5,
          type: "Questionnaire",
          date: "2025-07-05",
          alzheimers_risk: 58,
          parkinsons_risk: 25,
          dementia_risk: 55,
          confidence: 0.80,
          responses: {},
          riskFactors: []
        }
      ],
      timeline: [
        { id: 1, type: "ASSESSMENT", date: "2025-11-01", description: "Completed Questionnaire Assessment", status: "HIGH_RISK" },
        { id: 2, type: "DOCTOR_NOTE", date: "2025-10-28", description: "Dr. Alice Chen: Recommend cognitive therapy and regular monitoring", status: "ACTION" },
        { id: 3, type: "MEDICATION_CHANGE", date: "2025-09-15", description: "Started Donepezil 10mg", status: "MONITORED" },
        { id: 4, type: "ASSESSMENT", date: "2025-10-15", description: "Clinical Assessment Completed", status: "HIGH_RISK" },
        { id: 5, type: "LAB_RESULT", date: "2025-09-01", description: "MoCA Score: 24/30", status: "STABLE" }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      password: "Demo123!",
      age: 58,
      gender: "Female",
      blood_type: "A+",
      phone: "+91-9876543211",
      emergencyContact: "Bob Smith - +91-9876543212",
      assignedDoctor: "Dr. Alice Chen",
      assignedDoctorId: 1,
      medications: [
        { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", startDate: "2024-05-10", reason: "High cholesterol" }
      ],
      allergies: [],
      medicalHistory: [
        { condition: "High Cholesterol", onsetDate: "2024-05-01" }
      ],
      assessments: [
        {
          id: 3,
          type: "Questionnaire",
          date: "2025-10-28",
          alzheimers_risk: 28,
          parkinsons_risk: 45,
          dementia_risk: 32,
          confidence: 0.84,
          responses: {
            age: 58,
            gender: "Female",
            education: "Master's",
            memoryComplaints: "No",
            sleepQuality: "Good",
            physicalActivity: "Vigorous"
          },
          riskFactors: [
            { factor: "Age", score: 15 },
            { factor: "Physical Activity", score: 10 },
            { factor: "Sleep Quality", score: 8 },
            { factor: "Education Level", score: 7 },
            { factor: "Family History", score: 5 }
          ]
        },
        {
          id: 6,
          type: "Questionnaire",
          date: "2025-09-15",
          alzheimers_risk: 25,
          parkinsons_risk: 42,
          dementia_risk: 30,
          confidence: 0.82,
          responses: {},
          riskFactors: []
        },
        {
          id: 7,
          type: "Questionnaire",
          date: "2025-08-01",
          alzheimers_risk: 23,
          parkinsons_risk: 40,
          dementia_risk: 28,
          confidence: 0.81,
          responses: {},
          riskFactors: []
        }
      ],
      timeline: [
        { id: 1, type: "ASSESSMENT", date: "2025-10-28", description: "Completed Questionnaire Assessment", status: "LOW_RISK" },
        { id: 2, type: "DOCTOR_NOTE", date: "2025-10-20", description: "Dr. Alice Chen: Patient shows good cognitive health, continue current lifestyle", status: "STABLE" },
        { id: 3, type: "ASSESSMENT", date: "2025-09-15", description: "Routine Assessment", status: "LOW_RISK" }
      ]
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      password: "Demo123!",
      age: 70,
      gender: "Male",
      blood_type: "B+",
      phone: "+91-9876543212",
      emergencyContact: "Mary Johnson - +91-9876543213",
      assignedDoctor: "Dr. Bob Wilson",
      assignedDoctorId: 2,
      medications: [
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily", startDate: "2023-03-10", reason: "Type 2 Diabetes" },
        { name: "Amlodipine", dosage: "5mg", frequency: "Once daily", startDate: "2023-03-10", reason: "Hypertension" }
      ],
      allergies: [{ name: "NSAIDs", severity: "Severe" }],
      medicalHistory: [
        { condition: "Type 2 Diabetes", onsetDate: "2023-03-01" },
        { condition: "Hypertension", onsetDate: "2020-06-15" },
        { condition: "Mild Cognitive Impairment", onsetDate: "2024-10-01" }
      ],
      assessments: [
        {
          id: 4,
          type: "Clinical",
          date: "2025-10-20",
          alzheimers_risk: 58,
          parkinsons_risk: 52,
          dementia_risk: 68,
          confidence: 0.89,
          responses: {
            age: 70,
            gender: "Male",
            memoryComplaints: "Yes",
            tremor: "Yes",
            rigidity: "Yes"
          },
          riskFactors: [
            { factor: "Age", score: 30 },
            { factor: "Memory Complaints", score: 22 },
            { factor: "Neurological Symptoms", score: 20 },
            { factor: "Medical Conditions", score: 15 },
            { factor: "Family History", score: 12 }
          ]
        },
        {
          id: 8,
          type: "Questionnaire",
          date: "2025-09-10",
          alzheimers_risk: 55,
          parkinsons_risk: 50,
          dementia_risk: 65,
          confidence: 0.87,
          responses: {},
          riskFactors: []
        },
        {
          id: 9,
          type: "Questionnaire",
          date: "2025-07-25",
          alzheimers_risk: 52,
          parkinsons_risk: 48,
          dementia_risk: 62,
          confidence: 0.85,
          responses: {},
          riskFactors: []
        },
        {
          id: 10,
          type: "Questionnaire",
          date: "2025-06-15",
          alzheimers_risk: 50,
          parkinsons_risk: 45,
          dementia_risk: 60,
          confidence: 0.83,
          responses: {},
          riskFactors: []
        }
      ],
      timeline: [
        { id: 1, type: "ASSESSMENT", date: "2025-10-20", description: "Clinical Assessment - High Risk Detected", status: "HIGH_RISK" },
        { id: 2, type: "DOCTOR_NOTE", date: "2025-10-21", description: "Dr. Bob Wilson: Recommend neurology referral and MRI scan", status: "ACTION" },
        { id: 3, type: "ASSESSMENT", date: "2025-09-10", description: "Routine Questionnaire", status: "MODERATE_RISK" },
        { id: 4, type: "LAB_RESULT", date: "2025-08-15", description: "Blood Work: HbA1c 7.2%", status: "MONITORED" }
      ]
    }
  ],
  doctors: [
    {
      id: 1,
      name: "Dr. Alice Chen",
      email: "alice@hospital.com",
      password: "Demo123!",
      phone: "+91-9123456789",
      specialization: "Neurology",
      license: "MD-001234",
      hospital: "City Medical Center",
      bio: "Expert neurologist with 15 years experience in neurodegenerative diseases",
      patients: [1, 2],
      notes: [
        { id: 1, patientId: 1, date: "2025-10-28", note: "Patient showing early signs of cognitive decline. Recommend cognitive therapy and regular monitoring. Started Donepezil 10mg." },
        { id: 2, patientId: 1, date: "2025-09-20", note: "Memory complaints increasing. Family history positive for AD. Continue close monitoring." },
        { id: 3, patientId: 2, date: "2025-10-20", note: "Patient shows good cognitive health. Encourage continued active lifestyle and healthy diet." }
      ]
    },
    {
      id: 2,
      name: "Dr. Bob Wilson",
      email: "bob@hospital.com",
      password: "Demo123!",
      phone: "+91-9123456790",
      specialization: "Geriatrics",
      license: "MD-005678",
      hospital: "Senior Care Hospital",
      bio: "Geriatrician specializing in elderly neurological care",
      patients: [3],
      notes: [
        { id: 4, patientId: 3, date: "2025-10-21", note: "Moderate to high risk for multiple neurodegenerative conditions. Recommend neurology referral and MRI scan. Monitor closely." },
        { id: 5, patientId: 3, date: "2025-09-15", note: "Patient reports increased tremors and memory issues. Adjust medication as needed." }
      ]
    }
  ]
};

/********************
 * TRANSLATIONS
 ********************/
const translations = {
  en: {
    appName: "NeuroSense",
    tagline: "AI-Powered Neurodegenerative Disease Diagnosis",
    signup: "Sign Up",
    login: "Login",
    logout: "Logout",
    patientDashboard: "Patient Dashboard",
    doctorDashboard: "Doctor Dashboard",
    startAssessment: "Start New Assessment",
    riskScores: "Risk Scores",
    darkMode: "Dark Mode",
    language: "Language",
    assessmentProgress: "Page",
    next: "Next",
    previous: "Previous",
    submit: "Submit",
    saveDraft: "Save Draft",
    welcome: "Welcome",
    healthTimeline: "Health Timeline",
    myEHR: "My EHR",
    myProfile: "My Profile",
    patientManagement: "Patient Management",
    assessmentReview: "Assessment Review",
    diagnostics: "Diagnostics",
    interventions: "Interventions",
    forgotPassword: "Forgot Password",
    resetPassword: "Reset Password",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    age: "Age",
    gender: "Gender",
    bloodType: "Blood Type",
    phone: "Phone",
    signUpAsPatient: "Sign Up as Patient",
    signUpAsDoctor: "Sign Up as Doctor",
  },
  kn: {
    appName: "ನ್ಯೂರೋಸೆನ್ಸ್",
    tagline: "ಎಐ-ಚಾಲಿತ ನರದೌರ್ಬಲ್ಯ ರೋಗ ರೋಗನಿರ್ಣಯ",
    signup: "ಸೈನ್ ಅಪ್",
    login: "ಲಾಗ್ ಇನ್",
    logout: "ಲಾಗ್ ಔಟ್",
    patientDashboard: "ರೋಗಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    doctorDashboard: "ಡಾಕ್‍ಟರ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    startAssessment: "ಹೊಸ ಮೌಲ್ಯಮಾಪನ ಪ್ರಾರಂಭಿಸಿ",
    riskScores: "ಜೊಖಿಮ ಅಂಕಗಳು",
    darkMode: "ಡಾರ್ಕ್ ಮೋಡ್",
    language: "ಭಾಷೆ",
    assessmentProgress: "ಪುಟ",
    next: "ಮುಂದಿನದು",
    previous: "ಹಿಂದಿನದು",
    submit: "ಸಲ್ಲಿಸು",
    saveDraft: "ಡ್ರಾಫ್ಟ್ ಉಳಿಸಿ",
    welcome: "ಸ್ವಾಗತ",
    healthTimeline: "ಆರೋಗ್ಯ ಟೈಮ್‌ಲೈನ್",
    myEHR: "ನನ್ನ ಇಎಚ್ಆರ್",
    myProfile: "ನನ್ನ ಪ್ರೊಫೈಲ್",
    patientManagement: "ರೋಗಿ ನಿರ್ವಹಣೆ",
    assessmentReview: "ಮೌಲ್ಯಮಾಪನ ವಿಮರ್ಶೆ",
    diagnostics: "ರೋಗನಿರ್ಣಯ",
    interventions: "ಮಧ್ಯಸ್ಥಿಕೆಗಳು",
    forgotPassword: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ",
    resetPassword: "ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ",
    email: "ಇಮೇಲ್",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    confirmPassword: "ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    age: "ವಯಸ್ಸು",
    gender: "ಲಿಂಗ",
    bloodType: "ರಕ್ತದ ಗುಂಪು",
    phone: "ಫೋನ್",
    signUpAsPatient: "ರೋಗಿಯಾಗಿ ಸೈನ್ ಅಪ್",
    signUpAsDoctor: "ವೈದ್ಯರಾಗಿ ಸೈನ್ ಅಪ್",
  },
};

/********************
 * CONTEXTS
 ********************/
const AuthContext = createContext();
const UIContext = createContext();

const useAuth = () => useContext(AuthContext);
const useUI = () => useContext(UIContext);

/********************
 * HELPER FUNCTIONS
 ********************/
const uuid = () => Math.random().toString(36).substring(2, 9);

function simulateRisk(form) {
  let baseAD = form.age ? form.age * 0.6 : 30;
  let basePD = form.age ? form.age * 0.4 : 20;
  let baseDem = (baseAD + basePD) / 2;
  
  if (form.memoryComplaints === "Yes") baseAD += 15;
  if (form.tremor === "Yes") basePD += 20;
  if (form.familyHistoryAD === "Yes") baseAD += 18;
  if (form.familyHistoryPD === "Yes") basePD += 15;
  if (form.familyHistoryDementia === "Yes") baseDem += 12;
  if (form.sleepQuality === "Poor") baseAD += 8;
  if (form.physicalActivity === "Sedentary") { baseAD += 5; basePD += 5; }
  if (form.physicalActivity === "Vigorous") { baseAD -= 8; basePD -= 8; }
  if (form.medicalConditions && form.medicalConditions.includes("Hypertension")) baseAD += 5;
  if (form.medicalConditions && form.medicalConditions.includes("Diabetes")) baseAD += 7;
  if (form.rigidity === "Yes") basePD += 12;
  if (form.slowMovement === "Yes") basePD += 10;
  
  const conf = 0.8 + Math.random() * 0.18;
  const bounded = (val) => Math.min(100, Math.max(0, Math.round(val)));
  const ad = bounded(baseAD + (Math.random() * 10 - 5));
  const pd = bounded(basePD + (Math.random() * 10 - 5));
  const dem = bounded(baseDem + (Math.random() * 10 - 5));
  
  const riskFactors = [
    { factor: "Age", score: Math.round(form.age ? form.age * 0.35 : 15) },
    { factor: "Memory Complaints", score: form.memoryComplaints === "Yes" ? 20 : 3 },
    { factor: "Family History", score: form.familyHistoryAD === "Yes" ? 18 : 5 },
    { factor: "Sleep Quality", score: form.sleepQuality === "Poor" ? 12 : 5 },
    { factor: "Physical Activity", score: form.physicalActivity === "Sedentary" ? 10 : 5 },
  ].sort((a, b) => b.score - a.score).slice(0, 5);
  
  return { ad, pd, dem, confidence: conf, riskFactors };
}

function checkPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength; // 0-4
}

function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/********************
 * UI COMPONENTS
 ********************/
function Toast({ message, type = "info", onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 4000);
    return () => clearTimeout(t);
  }, []);
  const className = `toast toast-${type}`;
  return <div className={className}>{message}</div>;
}

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3>{title}</h3>
          <button className="btn btn--sm btn--secondary" onClick={onClose}>Close</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

function Sidebar({ role }) {
  const { t } = useUI();
  const links = role === "patient" ? [
    { label: t("patientDashboard"), hash: "#dashboard" },
    { label: t("startAssessment"), hash: "#assessment" },
    { label: t("healthTimeline"), hash: "#timeline" },
    { label: t("myEHR"), hash: "#ehr" },
    { label: t("myProfile"), hash: "#profile" },
  ] : [
    { label: t("doctorDashboard"), hash: "#dashboard" },
    { label: t("patientManagement"), hash: "#patients" },
    { label: t("diagnostics"), hash: "#diagnostics" },
    { label: t("interventions"), hash: "#interventions" },
  ];
  
  return (
    <nav style={{ width: 200, background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)', padding: '16px', minHeight: 'calc(100vh - 60px)' }}>
      {links.map(link => (
        <a key={link.hash} href={link.hash} style={{ display: 'block', padding: '12px 8px', marginBottom: 4, borderRadius: 'var(--radius-base)', textDecoration: 'none', color: 'var(--color-text)' }}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}

function Navbar() {
  const { t, toggleDark, dark, lang, setLang } = useUI();
  const { user, logout, notifications } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  return (
    <header className="navbar">
      <h3 style={{ margin: 0 }}>{t("appName")}</h3>
      {user && <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
        {user.role === "patient" ? "Patient Portal" : "Doctor Portal"}
      </div>}
      <div className="navbar__controls">
        <select className="lang-select" value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="kn">ಕನ್ನಡ</option>
        </select>
        <label className="toggle" title={t("darkMode")}>
          <input type="checkbox" checked={dark} onChange={toggleDark} />
          <span className="slider"></span>
        </label>
        {user && (
          <div style={{ position: 'relative' }}>
            <button className="btn btn--secondary btn--sm" onClick={() => setShowNotifications(!showNotifications)} style={{ position: 'relative' }}>
              🔔
              {notifications.length > 0 && (
                <span style={{ position: 'absolute', top: -5, right: -5, background: 'var(--color-error)', color: 'white', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
                  {notifications.length}
                </span>
              )}
            </button>
            {showNotifications && (
              <div style={{ position: 'absolute', right: 0, top: 40, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-base)', padding: 12, minWidth: 250, maxWidth: 300, zIndex: 100, boxShadow: 'var(--shadow-lg)' }}>
                <h4 style={{ margin: '0 0 8px 0' }}>Notifications</h4>
                {notifications.length === 0 ? (
                  <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>No new notifications</p>
                ) : (
                  notifications.map((n, i) => (
                    <div key={i} style={{ padding: '8px 0', borderBottom: i < notifications.length - 1 ? '1px solid var(--color-border)' : 'none', fontSize: 'var(--font-size-sm)' }}>
                      {n.message}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
        {user && (
          <div style={{ position: 'relative' }}>
            <button className="btn btn--secondary btn--sm" onClick={() => setShowUserMenu(!showUserMenu)}>
              {user.data.name.split(' ').map(n => n[0]).join('')}
            </button>
            {showUserMenu && (
              <div style={{ position: 'absolute', right: 0, top: 40, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-base)', padding: 8, minWidth: 180, zIndex: 100, boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--color-border)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                  {user.data.name}
                </div>
                <a href="#profile" style={{ display: 'block', padding: '8px 12px', fontSize: 'var(--font-size-sm)', textDecoration: 'none', color: 'var(--color-text)' }} onClick={() => setShowUserMenu(false)}>
                  {t("myProfile")}
                </a>
                <button className="btn btn--secondary btn--sm" style={{ width: '100%', marginTop: 8 }} onClick={logout}>
                  {t("logout")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

/********************
 * PAGES
 ********************/
function Landing() {
  const { t } = useUI();
  return (
    <section className="main" style={{ background: 'var(--color-background)' }}>
      <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 16 }}>{t("appName")}</h1>
          <p style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-secondary)', marginBottom: 32 }}>
            {t("tagline")}
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 64 }}>
            <a href="#signup-patient" className="btn btn--primary btn--lg">
              {t("signUpAsPatient")}
            </a>
            <a href="#signup-doctor" className="btn btn--outline btn--lg">
              {t("signUpAsDoctor")}
            </a>
            <a href="#login" className="btn btn--secondary btn--lg">
              {t("login")}
            </a>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, marginTop: 48 }}>
            <div style={{ padding: 24, background: 'var(--color-bg-1)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <h3 style={{ marginBottom: 8 }}>Multi-Disease Detection</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>AI-powered assessment for Alzheimer's, Parkinson's, and Dementia</p>
            </div>
            <div style={{ padding: 24, background: 'var(--color-bg-3)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <h3 style={{ marginBottom: 8 }}>Voice Assessment</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Multilingual support with voice input capabilities</p>
            </div>
            <div style={{ padding: 24, background: 'var(--color-bg-5)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <h3 style={{ marginBottom: 8 }}>Real-Time Risk Scores</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Instant risk assessment with confidence intervals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Login() {
  const { t } = useUI();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const success = login(email, password, rememberMe);
      setLoading(false);
      if (!success) setError("Invalid credentials. Please try again.");
    }, 500);
  };

  return (
    <section className="container main" style={{ paddingTop: 48 }}>
      <div style={{ maxWidth: 400, margin: '0 auto' }}>
        <h2 style={{ marginBottom: 24 }}>{t("login")}</h2>
        {error && <div className="status status--error" style={{ marginBottom: 16 }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{t("email")}</label>
            <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label className="form-label">{t("password")}</label>
            <div style={{ position: 'relative' }}>
              <input className="form-control" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--font-size-sm)' }}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--font-size-sm)' }}>
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              Remember me for 7 days
            </label>
          </div>
          <button className="btn btn--primary btn--full-width" type="submit" disabled={loading}>
            {loading ? "Logging in..." : t("login")}
          </button>
          <div style={{ marginTop: 16, textAlign: 'center', fontSize: 'var(--font-size-sm)' }}>
            <a href="#forgot-password">{t("forgotPassword")}</a>
          </div>
          <div style={{ marginTop: 16, textAlign: 'center', fontSize: 'var(--font-size-sm)' }}>
            No account? <a href="#signup-patient">{t("signUpAsPatient")}</a> or <a href="#signup-doctor">{t("signUpAsDoctor")}</a>
          </div>
        </form>
      </div>
    </section>
  );
}

function Signup() {
  const hash = window.location.hash;
  const initialRole = hash === "#signup-doctor" ? "doctor" : "patient";
  const { t } = useUI();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", phone: "", age: "", gender: "", bloodType: "", license: "", specialization: "", hospital: "", bio: "" });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const passwordStrength = checkPasswordStrength(form.password);
  const strengthColor = passwordStrength === 0 ? "#ef4444" : passwordStrength <= 2 ? "#f59e0b" : "#22c55e";
  const strengthText = passwordStrength === 0 ? "Weak" : passwordStrength <= 2 ? "Medium" : "Strong";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    if (!agreeTerms) {
      setMessage("Please agree to Terms and Conditions");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      register({ ...form, role: initialRole });
      setLoading(false);
      setMessage("Account created! Redirecting...");
      setTimeout(() => {
        window.location.hash = "#login";
      }, 1500);
    }, 800);
  };

  return (
    <section className="container main" style={{ paddingTop: 48 }}>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <h2 style={{ marginBottom: 24 }}>{initialRole === "patient" ? t("signUpAsPatient") : t("signUpAsDoctor")}</h2>
        {message && <div className={`status ${message.includes('created') ? 'status--success' : 'status--error'}`} style={{ marginBottom: 16 }}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{t("fullName")}</label>
            <input className="form-control" required value={form.name} onChange={handleChange("name")} placeholder="Enter full name" />
          </div>
          <div className="form-group">
            <label className="form-label">{t("email")}</label>
            <input className="form-control" type="email" required value={form.email} onChange={handleChange("email")} placeholder="Enter email address" />
          </div>
          <div className="form-group">
            <label className="form-label">{t("password")}</label>
            <input className="form-control" type="password" required value={form.password} onChange={handleChange("password")} placeholder="Min 8 chars, 1 uppercase, 1 number, 1 special" />
            {form.password && (
              <div style={{ marginTop: 8 }}>
                <div style={{ height: 4, background: '#e0e0e0', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${(passwordStrength / 4) * 100}%`, height: '100%', background: strengthColor, transition: 'all 0.3s' }}></div>
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: strengthColor, marginTop: 4 }}>Strength: {strengthText}</div>
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">{t("confirmPassword")}</label>
            <input className="form-control" type="password" required value={form.confirmPassword} onChange={handleChange("confirmPassword")} placeholder="Confirm password" />
          </div>
          <div className="form-group">
            <label className="form-label">{t("phone")}</label>
            <input className="form-control" type="tel" required value={form.phone} onChange={handleChange("phone")} placeholder="+91-XXXXXXXXXX" />
          </div>
          
          {initialRole === "patient" && (
            <>
              <div className="form-group">
                <label className="form-label">{t("age")}</label>
                <select className="form-control" value={form.age} onChange={handleChange("age")} required>
                  <option value="">Select age</option>
                  {Array.from({ length: 83 }, (_, i) => i + 18).map(age => <option key={age} value={age}>{age}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{t("gender")}</label>
                <select className="form-control" value={form.gender} onChange={handleChange("gender")} required>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{t("bloodType")}</label>
                <select className="form-control" value={form.bloodType} onChange={handleChange("bloodType")} required>
                  <option value="">Select blood type</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bt => <option key={bt} value={bt}>{bt}</option>)}
                </select>
              </div>
            </>
          )}
          
          {initialRole === "doctor" && (
            <>
              <div className="form-group">
                <label className="form-label">Medical License Number</label>
                <input className="form-control" required value={form.license} onChange={handleChange("license")} placeholder="MD-XXXXXX" />
              </div>
              <div className="form-group">
                <label className="form-label">Specialization</label>
                <select className="form-control" value={form.specialization} onChange={handleChange("specialization")} required>
                  <option value="">Select specialization</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Psychiatry">Psychiatry</option>
                  <option value="Geriatrics">Geriatrics</option>
                  <option value="General Practice">General Practice</option>
                  <option value="Neuro-Surgery">Neuro-Surgery</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Hospital/Clinic Name</label>
                <input className="form-control" required value={form.hospital} onChange={handleChange("hospital")} placeholder="Hospital name" />
              </div>
              <div className="form-group">
                <label className="form-label">Bio/Description</label>
                <textarea className="form-control" rows="3" value={form.bio} onChange={handleChange("bio")} placeholder="Brief professional description"></textarea>
              </div>
            </>
          )}
          
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--font-size-sm)' }}>
              <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
              I agree to Terms and Conditions
            </label>
          </div>
          <button className="btn btn--primary btn--full-width" type="submit" disabled={loading}>
            {loading ? "Creating account..." : t("signup")}
          </button>
          <div style={{ marginTop: 16, textAlign: 'center', fontSize: 'var(--font-size-sm)' }}>
            Already have an account? <a href="#login">{t("login")}</a>
          </div>
        </form>
      </div>
    </section>
  );
}

function RiskCard({ title, value, size = "normal" }) {
  const className = value < 30 ? "risk-card risk-low" : value < 60 ? "risk-card risk-moderate" : "risk-card risk-high";
  const status = value < 30 ? "LOW RISK" : value < 60 ? "MODERATE RISK" : "HIGH RISK";
  const fontSize = size === "large" ? 'var(--font-size-4xl)' : 'var(--font-size-3xl)';
  
  return (
    <div className={className} style={{ minHeight: size === "large" ? 180 : 140 }}>
      <h3 style={{ fontSize, fontWeight: 'var(--font-weight-bold)', margin: 0 }}>{value}%</h3>
      <span style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}>{title}</span>
      <div className="status" style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white' }}>{status}</div>
    </div>
  );
}

function ForgotPassword() {
  const { t } = useUI();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(interval);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  return (
    <section className="container main" style={{ paddingTop: 48 }}>
      <div style={{ maxWidth: 400, margin: '0 auto' }}>
        <h2 style={{ marginBottom: 24 }}>{t("forgotPassword")}</h2>
        {sent ? (
          <div>
            <div className="status status--success" style={{ marginBottom: 16 }}>Check your email for password reset link</div>
            <p style={{ fontSize: 'var(--font-size-sm)', textAlign: 'center' }}>Didn't receive the email?</p>
            {countdown > 0 ? (
              <p style={{ fontSize: 'var(--font-size-sm)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Resend in {countdown} seconds</p>
            ) : (
              <button className="btn btn--secondary btn--full-width" onClick={() => handleSubmit({ preventDefault: () => {} })}>Resend Link</button>
            )}
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <a href="#login">{t("login")}</a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">{t("email")}</label>
              <input className="form-control" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
            </div>
            <button className="btn btn--primary btn--full-width" type="submit">Send Reset Link</button>
            <div style={{ marginTop: 16, textAlign: 'center', fontSize: 'var(--font-size-sm)' }}>
              <a href="#login">Back to {t("login")}</a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function PatientDashboard() {
  const { user } = useAuth();
  const { t } = useUI();
  const patient = user.data;
  const latest = patient.assessments[0];
  
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
      <Sidebar role="patient" />
      <section className="main" style={{ flex: 1, padding: 32, background: 'var(--color-background)' }}>
        <div className="container">
          <h2 style={{ marginBottom: 8 }}>{t("welcome")}, {patient.name}!</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 32 }}>Last Assessment: {formatDate(latest.date)}</p>
          
          <div className="dashboard-grid" style={{ marginBottom: 32 }}>
            <RiskCard title="Alzheimer's Disease Risk" value={latest.alzheimers_risk} size="large" />
            <RiskCard title="Parkinson's Disease Risk" value={latest.parkinsons_risk} size="large" />
            <RiskCard title="Dementia Risk" value={latest.dementia_risk} size="large" />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
            <a href="#assessment" className="btn btn--primary">{t("startAssessment")}</a>
            <a href="#timeline" className="btn btn--outline">View Health Timeline</a>
            <a href="#ehr" className="btn btn--outline">My EHR</a>
            <a href="#profile" className="btn btn--outline">My Profile</a>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            <div style={{ background: 'var(--color-surface)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ marginBottom: 16 }}>Latest Assessment</h3>
              <div style={{ fontSize: 'var(--font-size-sm)', marginBottom: 8 }}>
                <strong>Date:</strong> {formatDate(latest.date)}
              </div>
              <div style={{ fontSize: 'var(--font-size-sm)', marginBottom: 8 }}>
                <strong>Type:</strong> {latest.type}
              </div>
              <div style={{ fontSize: 'var(--font-size-sm)', marginBottom: 8 }}>
                <strong>Confidence:</strong> {(latest.confidence * 100).toFixed(1)}%
              </div>
              <a href="#results" className="btn btn--sm btn--primary" style={{ marginTop: 16 }}>View Full Report</a>
            </div>
            
            {patient.assignedDoctor && (
              <div style={{ background: 'var(--color-surface)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <h3 style={{ marginBottom: 16 }}>Doctor Notes</h3>
                <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 12 }}>
                  <strong>Assigned Doctor:</strong><br/>{patient.assignedDoctor}
                </p>
                {sampleDB.doctors.find(d => d.id === patient.assignedDoctorId)?.notes.filter(n => n.patientId === patient.id).slice(0, 1).map(note => (
                  <div key={note.id} style={{ background: 'var(--color-bg-2)', padding: 12, borderRadius: 'var(--radius-base)', marginBottom: 8 }}>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 4 }}>{formatDate(note.date)}</div>
                    <div style={{ fontSize: 'var(--font-size-sm)' }}>{note.note}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function DoctorDashboard() {
  const { user } = useAuth();
  const { t } = useUI();
  const doctor = user.data;
  const roster = sampleDB.patients.filter((p) => doctor.patients.includes(p.id));
  const highRiskCount = roster.filter(p => p.assessments[0].alzheimers_risk > 60 || p.assessments[0].parkinsons_risk > 60 || p.assessments[0].dementia_risk > 60).length;
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  const filteredRoster = roster.filter(p => {
    const latest = p.assessments[0];
    const maxRisk = Math.max(latest.alzheimers_risk, latest.parkinsons_risk, latest.dementia_risk);
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || 
      (filter === "high" && maxRisk > 60) ||
      (filter === "moderate" && maxRisk >= 30 && maxRisk <= 60) ||
      (filter === "low" && maxRisk < 30);
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
      <Sidebar role="doctor" />
      <section className="main" style={{ flex: 1, padding: 32, background: 'var(--color-background)' }}>
        <div className="container">
          <h2 style={{ marginBottom: 32 }}>{t("welcome")}, {doctor.name}!</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
            <div style={{ background: 'var(--color-bg-1)', padding: 24, borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)' }}>{roster.length}</div>
              <div style={{ fontSize: 'var(--font-size-sm)', marginTop: 8 }}>Total Patients</div>
            </div>
            <div style={{ background: 'var(--color-bg-4)', padding: 24, borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)' }}>{highRiskCount}</div>
              <div style={{ fontSize: 'var(--font-size-sm)', marginTop: 8 }}>High-Risk Patients</div>
            </div>
            <div style={{ background: 'var(--color-bg-6)', padding: 24, borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)' }}>2</div>
              <div style={{ fontSize: 'var(--font-size-sm)', marginTop: 8 }}>Pending Assessments</div>
            </div>
            <div style={{ background: 'var(--color-bg-8)', padding: 24, borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)' }}>1</div>
              <div style={{ fontSize: 'var(--font-size-sm)', marginTop: 8 }}>New Alerts</div>
            </div>
          </div>
          
          <h3 style={{ marginBottom: 16 }}>Patient Roster</h3>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <input className="form-control" type="text" placeholder="Search patients by name, email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, minWidth: 250 }} />
            <button className={`btn ${filter === 'all' ? 'btn--primary' : 'btn--outline'} btn--sm`} onClick={() => setFilter('all')}>All Patients</button>
            <button className={`btn ${filter === 'high' ? 'btn--primary' : 'btn--outline'} btn--sm`} onClick={() => setFilter('high')}>High Risk</button>
            <button className={`btn ${filter === 'moderate' ? 'btn--primary' : 'btn--outline'} btn--sm`} onClick={() => setFilter('moderate')}>Moderate Risk</button>
            <button className={`btn ${filter === 'low' ? 'btn--primary' : 'btn--outline'} btn--sm`} onClick={() => setFilter('low')}>Low Risk</button>
          </div>
          
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age | Gender | Blood Type</th>
                <th>Latest Risk Score</th>
                <th>Last Assessment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoster.map((p) => {
                const latest = p.assessments[0];
                const maxRisk = Math.max(latest.alzheimers_risk, latest.parkinsons_risk, latest.dementia_risk);
                const status = maxRisk > 60 ? "Follow-up needed" : maxRisk >= 30 ? "Monitored" : "Stable";
                return (
                  <tr key={p.id}>
                    <td><a href={`#patient-${p.id}`} style={{ fontWeight: 'var(--font-weight-medium)' }}>{p.name}</a></td>
                    <td>{p.age} | {p.gender} | {p.blood_type}</td>
                    <td>
                      <div style={{ fontSize: 'var(--font-size-sm)' }}>
                        AD: {latest.alzheimers_risk}% | PD: {latest.parkinsons_risk}% | Dem: {latest.dementia_risk}%
                      </div>
                    </td>
                    <td>{formatDate(latest.date)}</td>
                    <td><span className={`status status--${maxRisk > 60 ? 'error' : maxRisk >= 30 ? 'warning' : 'success'}`}>{status}</span></td>
                    <td>
                      <a href={`#patient-${p.id}`} className="btn btn--sm btn--outline">View Profile</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ marginTop: 16, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            Showing {filteredRoster.length} of {roster.length} patients
          </div>
        </div>
      </section>
    </div>
  );
}

/********************
 * ASSESSMENT FORM - Complete 4-page implementation
 ********************/
function Assessment() {
  const { t } = useUI();
  const { addAssessment } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ age: 60, weight: 70, height: 170, gender: "", education: "", occupation: "", familyHistoryAD: "No", familyHistoryPD: "No", familyHistoryDementia: "No", medicalConditions: [], sleepQuality: "", physicalActivity: "", alcohol: 0, smoking: "Never", diet: "", memoryComplaints: "No", tremor: "No", rigidity: "No", slowMovement: "No" });
  const [submitting, setSubmitting] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const updateCheckbox = (k) => (e) => {
    const val = e.target.value;
    const checked = e.target.checked;
    const arr = form[k] || [];
    setForm({ ...form, [k]: checked ? [...arr, val] : arr.filter(v => v !== val) });
  };
  
  const next = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setStep((s) => Math.min(4, s + 1));
    }, 300);
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));
  
  const submit = () => {
    setSubmitting(true);
    setTimeout(() => {
      const prediction = simulateRisk(form);
      addAssessment({ ...prediction, responses: form });
      setSubmitting(false);
      window.location.hash = "#results";
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
      <Sidebar role="patient" />
      <section className="main" style={{ flex: 1, padding: 32, background: 'var(--color-background)' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <h2 style={{ marginBottom: 24 }}>{t("startAssessment")}</h2>
          <div className="progress-bar-wrapper">
            <div className="progress-bar" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
          <p style={{ marginBottom: 24, color: 'var(--color-text-secondary)' }}>{t("assessmentProgress")} {step}/4</p>
          
          {step === 1 && (
            <div className="form-step">
              <h3 style={{ marginBottom: 16 }}>Demographics</h3>
              <div className="form-group">
                <label className="form-label">Age: {form.age}</label>
                <input type="range" min="18" max="100" value={form.age} onChange={update("age")} style={{ width: '100%' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Gender</label>
                <select className="form-control" value={form.gender} onChange={update("gender")} required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Weight (kg)</label>
                <input type="number" className="form-control" value={form.weight} onChange={update("weight")} min="20" max="300" required />
              </div>
              <div className="form-group">
                <label className="form-label">Height (cm)</label>
                <input type="number" className="form-control" value={form.height} onChange={update("height")} min="100" max="250" required />
              </div>
              <div className="form-group">
                <label className="form-label">Education Level</label>
                <select className="form-control" value={form.education} onChange={update("education")} required>
                  <option value="">Select</option>
                  <option>High School</option>
                  <option>Bachelor's</option>
                  <option>Master's</option>
                  <option>PhD</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Occupation</label>
                <input className="form-control" value={form.occupation} onChange={update("occupation")} placeholder="Your occupation" />
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="form-step">
              <h3 style={{ marginBottom: 16 }}>Medical History &amp; Family History</h3>
              <div className="form-group">
                <label className="form-label">Family history of Alzheimer's Disease?</label>
                <select className="form-control" value={form.familyHistoryAD} onChange={update("familyHistoryAD")} required>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              {form.familyHistoryAD === "Yes" && (
                <div className="form-group">
                  <label className="form-label">Relation to you?</label>
                  <select className="form-control" value={form.familyRelationAD || ""} onChange={update("familyRelationAD")}>
                    <option value="">Select</option>
                    <option>Parent</option>
                    <option>Sibling</option>
                    <option>Grandparent</option>
                    <option>Aunt/Uncle</option>
                    <option>Other</option>
                  </select>
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Family history of Parkinson's Disease?</label>
                <select className="form-control" value={form.familyHistoryPD} onChange={update("familyHistoryPD")} required>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Family history of Dementia?</label>
                <select className="form-control" value={form.familyHistoryDementia} onChange={update("familyHistoryDementia")} required>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Medical Conditions (select all that apply)</label>
                {["Hypertension", "Diabetes", "Depression/Anxiety", "Stroke/TIA", "Traumatic Brain Injury", "Heart Disease"].map(cond => (
                  <label key={cond} style={{ display: 'block', marginBottom: 8, fontSize: 'var(--font-size-sm)' }}>
                    <input type="checkbox" value={cond} checked={(form.medicalConditions || []).includes(cond)} onChange={updateCheckbox("medicalConditions")} style={{ marginRight: 8 }} />
                    {cond}
                  </label>
                ))}
              </div>
              <div className="form-group">
                <label className="form-label">Current Medications (comma-separated)</label>
                <input className="form-control" value={form.medications || ""} onChange={update("medications")} placeholder="e.g., Aspirin, Metformin" />
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="form-step">
              <h3 style={{ marginBottom: 16 }}>Lifestyle Factors</h3>
              <div className="form-group">
                <label className="form-label">Physical Activity Level</label>
                <select className="form-control" value={form.physicalActivity} onChange={update("physicalActivity")} required>
                  <option value="">Select</option>
                  <option value="Sedentary">Sedentary - Little or no exercise</option>
                  <option value="Mild">Mild - Light activity 1-3 days/week</option>
                  <option value="Moderate">Moderate - Moderate activity 3-5 days/week</option>
                  <option value="Vigorous">Vigorous - High intensity activity 5+ days/week</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Sleep Quality</label>
                <select className="form-control" value={form.sleepQuality} onChange={update("sleepQuality")} required>
                  <option value="">Select</option>
                  <option value="Poor">Poor - Difficulty sleeping, waking frequently</option>
                  <option value="Fair">Fair - Occasional sleep issues</option>
                  <option value="Good">Good - Mostly good sleep</option>
                  <option value="Excellent">Excellent - Consistently good sleep</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Alcohol Consumption (units/week): {form.alcohol}</label>
                <input type="range" min="0" max="30" value={form.alcohol} onChange={update("alcohol")} style={{ width: '100%' }} />
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 4 }}>1 unit = 1 beer or 1 glass wine</div>
              </div>
              <div className="form-group">
                <label className="form-label">Smoking Status</label>
                <select className="form-control" value={form.smoking} onChange={update("smoking")} required>
                  <option>Never smoked</option>
                  <option>Former smoker</option>
                  <option>Current smoker</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Diet Type</label>
                <select className="form-control" value={form.diet} onChange={update("diet")} required>
                  <option value="">Select</option>
                  <option>Mediterranean diet</option>
                  <option>Low-carb diet</option>
                  <option>Balanced diet</option>
                  <option>High-protein diet</option>
                  <option>Vegetarian/Vegan</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          )}
          
          {step === 4 && (
            <div className="form-step">
              <h3 style={{ marginBottom: 16 }}>Cognitive &amp; Neurological Symptoms</h3>
              <div className="form-group">
                <label className="form-label">Do you experience memory complaints?</label>
                <select className="form-control" value={form.memoryComplaints} onChange={update("memoryComplaints")} required>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              {form.memoryComplaints === "Yes" && (
                <div className="form-group">
                  <label className="form-label">How long have you experienced memory issues?</label>
                  <select className="form-control" value={form.memoryDuration || ""} onChange={update("memoryDuration")}>
                    <option value="">Select</option>
                    <option>Less than 1 month</option>
                    <option>1-3 months</option>
                    <option>3-6 months</option>
                    <option>6-12 months</option>
                    <option>Over 1 year</option>
                  </select>
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Difficulty completing familiar tasks?</label>
                <select className="form-control" value={form.cognitiveTasks || "No"} onChange={update("cognitiveTasks")}>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Do you have speech problems?</label>
                <select className="form-control" value={form.speechIssues || "No"} onChange={update("speechIssues")}>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Neurological Symptoms (select all that apply)</label>
                {["Tremor (shaking)", "Rigidity (stiff muscles)", "Slowness of movement", "Balance/Coordination issues", "Gait disturbance", "Fall history"].map(symptom => (
                  <label key={symptom} style={{ display: 'block', marginBottom: 8, fontSize: 'var(--font-size-sm)' }}>
                    <input type="checkbox" value={symptom} checked={(form.neuroSymptoms || []).includes(symptom)} onChange={updateCheckbox("neuroSymptoms")} style={{ marginRight: 8 }} />
                    {symptom}
                  </label>
                ))}
              </div>
              <div className="form-group">
                <label className="form-label">Significant mood changes?</label>
                <select className="form-control" value={form.moodChanges || "No"} onChange={update("moodChanges")}>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Additional Symptoms (optional)</label>
                <textarea className="form-control" rows="3" value={form.additionalSymptoms || ""} onChange={update("additionalSymptoms")} placeholder="Describe any other symptoms you've noticed"></textarea>
              </div>
            </div>
          )}
          
          <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'space-between' }}>
            <div>
              {step > 1 && (
                <button className="btn btn--secondary" onClick={prev} disabled={submitting}>
                  {t("previous")}
                </button>
              )}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn--outline btn--sm" disabled={saving || submitting}>
                {saving ? "Saving..." : "Draft Saved"}
              </button>
              {step < 4 ? (
                <button className="btn btn--primary" onClick={next} disabled={submitting}>
                  {t("next")}
                </button>
              ) : (
                <button className="btn btn--primary" onClick={submit} disabled={submitting}>
                  {submitting ? "Analyzing your responses..." : t("submit") + " Assessment"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/********************
 * RESULTS PAGE - Complete with all visualizations
 ********************/
function Results() {
  const { user } = useAuth();
  const { t } = useUI();
  const assessment = user.data.assessments[0];
  const { alzheimers_risk: ad, parkinsons_risk: pd, dementia_risk: dem, confidence, riskFactors, date, type } = assessment;
  const chartRefs = useRef({ pie: null, bar: null });

  useEffect(() => {
    const pieCtx = document.getElementById("pieChart");
    const barCtx = document.getElementById("barChart");
    if (!pieCtx || !barCtx) return;
    
    if (chartRefs.current.pie) chartRefs.current.pie.destroy();
    if (chartRefs.current.bar) chartRefs.current.bar.destroy();
    
    chartRefs.current.pie = new Chart(pieCtx, {
      type: "pie",
      data: {
        labels: ["Alzheimer's", "Parkinson's", "Dementia"],
        datasets: [{
          data: [ad, pd, dem],
          backgroundColor: ["#1FB8CD", "#FFC185", "#B4413C"],
        }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } },
    });
    
    chartRefs.current.bar = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: riskFactors.map((r) => r.factor),
        datasets: [{
          label: 'Influence Score',
          data: riskFactors.map((r) => r.score),
          backgroundColor: "#1FB8CD",
        }],
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 30 } }, plugins: { legend: { display: false } } },
    });
    
    return () => {
      if (chartRefs.current.pie) chartRefs.current.pie.destroy();
      if (chartRefs.current.bar) chartRefs.current.bar.destroy();
    };
  }, []);
  
  const downloadPDF = () => {
    alert("PDF download would be implemented with a library like jsPDF. Report saved!");
  };
  
  const shareWithDoctor = () => {
    alert("Assessment shared with your assigned doctor!");
  };
  
  const interpretation = ad > 60 
    ? `Based on your responses, you have a HIGH risk for Alzheimer's Disease. Key concerns: Memory complaints, Family history. Recommendations: Regular follow-ups with neurologist, Cognitive exercises, Healthy lifestyle modifications, Consider medication evaluation.`
    : ad >= 30
    ? `You have a MODERATE risk for neurodegenerative disease. Continue monitoring and maintain healthy lifestyle habits. Schedule regular check-ups.`
    : `You currently have a LOW risk for neurodegenerative disease. Continue your healthy lifestyle and regular assessments.`;

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
      <Sidebar role="patient" />
      <section className="main" style={{ flex: 1, padding: 32, background: 'var(--color-background)' }}>
        <div className="container">
          <h2 style={{ marginBottom: 8 }}>Assessment Completed!</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24 }}>{formatDate(date)} at {new Date().toLocaleTimeString()}</p>
          
          <div style={{ background: 'var(--color-surface)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: 24 }}>
            <h3 style={{ marginBottom: 16 }}>Assessment Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              <div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Type</div>
                <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{type}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Duration</div>
                <div style={{ fontWeight: 'var(--font-weight-medium)' }}>8 minutes to complete</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Status</div>
                <div><span className="status status--success">COMPLETED</span></div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Confidence</div>
                <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{(confidence * 100).toFixed(1)}%</div>
              </div>
            </div>
          </div>
          
          <div className="dashboard-grid" style={{ marginBottom: 32 }}>
            <RiskCard title="Alzheimer's Disease" value={ad} size="large" />
            <RiskCard title="Parkinson's Disease" value={pd} size="large" />
            <RiskCard title="Dementia" value={dem} size="large" />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24, marginBottom: 32 }}>
            <div style={{ background: 'var(--color-surface)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ marginBottom: 16 }}>Risk Distribution</h3>
              <div className="chart-container" style={{ height: 300 }}>
                <canvas id="pieChart"></canvas>
              </div>
            </div>
            
            <div style={{ background: 'var(--color-surface)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ marginBottom: 16 }}>Top 5 Risk Factors</h3>
              <div className="chart-container" style={{ height: 300 }}>
                <canvas id="barChart"></canvas>
              </div>
            </div>
          </div>
          
          <div style={{ background: 'var(--color-bg-2)', padding: 24, borderRadius: 'var(--radius-lg)', marginBottom: 32 }}>
            <h3 style={{ marginBottom: 12 }}>Interpretation</h3>
            <p style={{ lineHeight: 1.6 }}>{interpretation}</p>
          </div>
          
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn--primary" onClick={downloadPDF}>Download PDF Report</button>
            <button className="btn btn--outline" onClick={shareWithDoctor}>Share with Doctor</button>
            <a href="#assessment" className="btn btn--outline">Start Another Assessment</a>
            <a href="#dashboard" className="btn btn--secondary">Return to Dashboard</a>
          </div>
        </div>
      </section>
    </div>
  );
}

/********************
 * ADDITIONAL PATIENT PAGES
 ********************/
function HealthTimeline() {
  const { user } = useAuth();
  const { t } = useUI();
  const patient = user.data;
  const [filterType, setFilterType] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const filteredTimeline = patient.timeline.filter(event => {
    const matchesType = filterType === "All" || event.type === filterType;
    return matchesType;
  });
  
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
      <Sidebar role="patient" />
      <section className="main" style={{ flex: 1, padding: 32, background: 'var(--color-background)' }}>
        <div className="container">
          <h2 style={{ marginBottom: 24 }}>Your Health Journey</h2>
          
          <div style={{ background: 'var(--color-surface)', padding: 16, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <select className="form-control" value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ flex: 1, minWidth: 200 }}>
                <option value="All">All Events</option>
                <option value="ASSESSMENT">Assessments</option>
                <option value="DOCTOR_NOTE">Doctor Notes</option>
                <option value="MEDICATION_CHANGE">Medications</option>
                <option value="LAB_RESULT">Lab Results</option>
                <option value="MRI_UPLOAD">MRI Scans</option>
              </select>
              <button className="btn btn--outline btn--sm">Export as PDF</button>
              <button className="btn btn--outline btn--sm">Export as CSV</button>
            </div>
          </div>
          
          <div style={{ position: 'relative', paddingLeft: 32 }}>
            <div style={{ position: 'absolute', left: 12, top: 0, bottom: 0, width: 2, background: 'var(--color-border)' }}></div>
            {filteredTimeline.map((event, idx) => {
              const dotColor = event.status === "HIGH_RISK" ? "#ef4444" : event.status === "MONITORED" ? "#f59e0b" : event.status === "ACTION" ? "#3b82f6" : "#22c55e";
              return (
                <div key={event.id} style={{ position: 'relative', marginBottom: 32 }}>
                  <div style={{ position: 'absolute', left: -26, top: 8, width: 16, height: 16, borderRadius: '50%', background: dotColor, border: '3px solid var(--color-background)' }}></div>
                  <div style={{ background: 'var(--color-surface)', padding: 20, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{formatDate(event.date)}</div>
                      <span className={`status status--${event.status === "HIGH_RISK" ? "error" : event.status === "MONITORED" ? "warning" : "success"}`} style={{ fontSize: 'var(--font-size-xs)' }}>{event.status}</span>
                    </div>
                    <div style={{ fontWeight: 'var(--font-weight-medium)', marginBottom: 4 }}>{event.type.replace(/_/g, ' ')}</div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{event.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function MyEHR() {
  const { user } = useAuth();
  const { t } = useUI();
  const patient = user.data;
  
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
      <Sidebar role="patient" />
      <section className="main" style={{ flex: 1, padding: 32, background: 'var(--color-background)' }}>
        <div className="container">
          <h2 style={{ marginBottom: 24 }}>My Electronic Health Record</h2>
          
          <div style={{ background: 'var(--color-surface)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: 24 }}>
            <h3 style={{ marginBottom: 16 }}>Patient Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              <div><div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Name</div><div>{patient.name}</div></div>
              <div><div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Age</div><div>{patient.age} years</div></div>
              <div><div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Gender</div><div>{patient.gender}</div></div>
              <div><div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Blood Type</div><div>{patient.blood_type}</div></div>
              <div><div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Contact</div><div>{patient.phone}</div></div>
              <div><div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Emergency Contact</div><div>{patient.emergencyContact}</div></div>
            </div>
          </div>
          
          <div style={{ background: 'var(--color-surface)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: 24 }}>
            <h3 style={{ marginBottom: 16 }}>Current Medications</h3>
            <table className="table">
              <thead>
                <tr><th>Medication</th><th>Dosage</th><th>Frequency</th><th>Start Date</th><th>Reason</th></tr>
              </thead>
              <tbody>
                {patient.medications.map((med, idx) => (
                  <tr key={idx}>
                    <td>{med.name}</td><td>{med.dosage}</td><td>{med.frequency}</td><td>{formatDate(med.startDate)}</td><td>{med.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ background: 'var(--color-surface)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: 24 }}>
            <h3 style={{ marginBottom: 16 }}>Allergies</h3>
            {patient.allergies.length > 0 ? (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {patient.allergies.map((allergy, idx) => (
                  <span key={idx} className="status status--error">{allergy.name} ({allergy.severity})</span>
                ))}
              </div>
            ) : <p>No known allergies</p>}
          </div>
          
          <div style={{ background: 'var(--color-surface)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: 24 }}>
            <h3 style={{ marginBottom: 16 }}>Medical History</h3>
            {patient.medicalHistory.map((condition, idx) => (
              <div key={idx} style={{ padding: '12px 0', borderBottom: idx < patient.medicalHistory.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{condition.condition}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Onset: {formatDate(condition.onsetDate)}</div>
              </div>
            ))}
          </div>
          
          <div style={{ background: 'var(--color-surface)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: 24 }}>
            <h3 style={{ marginBottom: 16 }}>Assessment History</h3>
            <table className="table">
              <thead>
                <tr><th>Date</th><th>Type</th><th>AD %</th><th>PD %</th><th>Dem %</th><th>Status</th></tr>
              </thead>
              <tbody>
                {patient.assessments.map((assess) => {
                  const maxRisk = Math.max(assess.alzheimers_risk, assess.parkinsons_risk, assess.dementia_risk);
                  return (
                    <tr key={assess.id}>
                      <td>{formatDate(assess.date)}</td><td>{assess.type}</td>
                      <td>{assess.alzheimers_risk}%</td><td>{assess.parkinsons_risk}%</td><td>{assess.dementia_risk}%</td>
                      <td><span className={`status status--${maxRisk > 60 ? 'error' : maxRisk >= 30 ? 'warning' : 'success'}`}>{maxRisk > 60 ? 'HIGH' : maxRisk >= 30 ? 'MOD' : 'LOW'}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn--primary" onClick={() => alert('Download EHR PDF')}>Download Full EHR as PDF</button>
            <button className="btn btn--outline" onClick={() => alert('Download HL7 File')}>Download as HL7 File</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function MyProfile() {
  const { user, updateProfile } = useAuth();
  const { t } = useUI();
  const [form, setForm] = useState({ ...user.data });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  
  const handleSave = () => {
    updateProfile(form);
    setMessage("Profile updated successfully!");
    setEditing(false);
    setTimeout(() => setMessage(""), 3000);
  };
  
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
      <Sidebar role={user.role} />
      <section className="main" style={{ flex: 1, padding: 32, background: 'var(--color-background)' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <h2 style={{ marginBottom: 24 }}>My Profile</h2>
          {message && <div className="status status--success" style={{ marginBottom: 16 }}>{message}</div>}
          
          <div style={{ background: 'var(--color-surface)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3>Profile Information</h3>
              <button className="btn btn--sm btn--outline" onClick={() => setEditing(!editing)}>{editing ? "Cancel" : "Edit"}</button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-control" value={form.name} onChange={handleChange("name")} disabled={!editing} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-control" type="email" value={form.email} disabled />
              {!editing && <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 4 }}>Email cannot be changed</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input className="form-control" type="tel" value={form.phone} onChange={handleChange("phone")} disabled={!editing} />
            </div>
            {user.role === "patient" && (
              <>
                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input className="form-control" type="number" value={form.age} onChange={handleChange("age")} disabled={!editing} />
                </div>
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select className="form-control" value={form.gender} onChange={handleChange("gender")} disabled={!editing}>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Blood Type</label>
                  <select className="form-control" value={form.blood_type} onChange={handleChange("blood_type")} disabled={!editing}>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bt => <option key={bt}>{bt}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Emergency Contact</label>
                  <input className="form-control" value={form.emergencyContact} onChange={handleChange("emergencyContact")} disabled={!editing} />
                </div>
              </>
            )}
            {editing && <button className="btn btn--primary" onClick={handleSave}>Save Changes</button>}
          </div>
          
          <div style={{ background: 'var(--color-surface)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h3 style={{ marginBottom: 16 }}>Account Settings</h3>
            <div className="form-group">
              <label className="form-label">Change Password</label>
              <input className="form-control" type="password" placeholder="New password" />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input className="form-control" type="password" placeholder="Confirm password" />
            </div>
            <button className="btn btn--secondary">Change Password</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/********************
 * DOCTOR PAGES
 ********************/
function PatientDetail() {
  const hash = window.location.hash;
  const patientId = parseInt(hash.split("-")[1]);
  const patient = sampleDB.patients.find(p => p.id === patientId);
  const { user } = useAuth();
  const { t } = useUI();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [newNote, setNewNote] = useState("");
  
  if (!patient) return <div className="container main"><h2>Patient not found</h2></div>;
  
  const doctor = sampleDB.doctors.find(d => d.id === user.data.id);
  const doctorNotes = doctor?.notes.filter(n => n.patientId === patientId) || [];
  
  const saveNote = () => {
    alert(`Note saved: ${newNote}`);
    setShowNoteModal(false);
    setNewNote("");
  };
  
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
      <Sidebar role="doctor" />
      <section className="main" style={{ flex: 1, padding: 32, background: 'var(--color-background)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h2 style={{ marginBottom: 4 }}>{patient.name}</h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>{patient.age} years | {patient.gender} | {patient.blood_type} | MRN: P00{patient.id}</p>
            </div>
            <a href="#dashboard" className="btn btn--secondary">Back to Dashboard</a>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ background: 'var(--color-surface)', padding: 20, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: 16 }}>
                <h3 style={{ marginBottom: 12 }}>Demographics</h3>
                <div style={{ fontSize: 'var(--font-size-sm)' }}>
                  <div style={{ marginBottom: 8 }}><strong>Name:</strong> {patient.name}</div>
                  <div style={{ marginBottom: 8 }}><strong>Age:</strong> {patient.age}</div>
                  <div style={{ marginBottom: 8 }}><strong>Gender:</strong> {patient.gender}</div>
                  <div style={{ marginBottom: 8 }}><strong>Blood Type:</strong> {patient.blood_type}</div>
                  <div style={{ marginBottom: 8 }}><strong>Phone:</strong> {patient.phone}</div>
                  <div style={{ marginBottom: 8 }}><strong>Email:</strong> {patient.email}</div>
                </div>
              </div>
              
              <div style={{ background: 'var(--color-surface)', padding: 20, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: 16 }}>
                <h3 style={{ marginBottom: 12 }}>Medications</h3>
                {patient.medications.map((med, idx) => (
                  <div key={idx} style={{ padding: '8px 0', borderBottom: idx < patient.medications.length - 1 ? '1px solid var(--color-border)' : 'none', fontSize: 'var(--font-size-sm)' }}>
                    <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{med.name} {med.dosage}</div>
                    <div style={{ color: 'var(--color-text-secondary)' }}>{med.frequency} - {med.reason}</div>
                  </div>
                ))}
                <button className="btn btn--sm btn--outline" style={{ marginTop: 12 }}>Add Medication</button>
              </div>
              
              <div style={{ background: 'var(--color-surface)', padding: 20, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <h3 style={{ marginBottom: 12 }}>Allergies</h3>
                {patient.allergies.map((allergy, idx) => (
                  <span key={idx} className="status status--error" style={{ marginRight: 8, marginBottom: 8 }}>{allergy.name} ({allergy.severity})</span>
                ))}
              </div>
            </div>
            
            <div>
              <div style={{ background: 'var(--color-surface)', padding: 20, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3>Assessment History</h3>
                  <button className="btn btn--sm btn--primary" onClick={() => setShowNoteModal(true)}>Add Note</button>
                </div>
                {patient.assessments.slice(0, 3).map((assess) => (
                  <div key={assess.id} style={{ background: 'var(--color-bg-1)', padding: 12, borderRadius: 'var(--radius-base)', marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{formatDate(assess.date)}</div>
                      <span className="status status--info" style={{ fontSize: 'var(--font-size-xs)' }}>{assess.type}</span>
                    </div>
                    <div style={{ fontSize: 'var(--font-size-sm)', marginBottom: 4 }}>AD: {assess.alzheimers_risk}% | PD: {assess.parkinsons_risk}% | Dem: {assess.dementia_risk}%</div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>Confidence: {(assess.confidence * 100).toFixed(1)}%</div>
                  </div>
                ))}
              </div>
              
              <div style={{ background: 'var(--color-surface)', padding: 20, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <h3 style={{ marginBottom: 12 }}>Doctor Notes</h3>
                {doctorNotes.map((note) => (
                  <div key={note.id} style={{ background: 'var(--color-bg-2)', padding: 12, borderRadius: 'var(--radius-base)', marginBottom: 12 }}>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 4 }}>{formatDate(note.date)}</div>
                    <div style={{ fontSize: 'var(--font-size-sm)' }}>{note.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <Modal isOpen={showNoteModal} onClose={() => setShowNoteModal(false)} title="Add Clinical Note">
          <textarea className="form-control" rows="5" value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Enter clinical note..."></textarea>
          <button className="btn btn--primary" style={{ marginTop: 16 }} onClick={saveNote}>Save Note</button>
        </Modal>
      </section>
    </div>
  );
}

/********************
 * ROUTER
 ********************/
function Router() {
  const { user } = useAuth();
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const h = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);

  if (!user) {
    if (hash === "#login") return <Login />;
    if (hash === "#signup-patient" || hash === "#signup-doctor") return <Signup />;
    if (hash === "#forgot-password") return <ForgotPassword />;
    return <Landing />;
  }

  if (user.role === "patient") {
    if (hash === "#assessment") return <Assessment />;
    if (hash === "#results") return <Results />;
    if (hash === "#timeline") return <HealthTimeline />;
    if (hash === "#ehr") return <MyEHR />;
    if (hash === "#profile") return <MyProfile />;
    return <PatientDashboard />;
  }
  
  if (user.role === "doctor") {
    if (hash.startsWith("#patient-")) return <PatientDetail />;
    if (hash === "#profile") return <MyProfile />;
    return <DoctorDashboard />;
  }
  
  return <div className="container main"><h2>404 - Page Not Found</h2></div>;
}

/********************
 * ROOT PROVIDERS
 ********************/
function UIProvider({ children }) {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("en");
  const t = (key) => translations[lang][key] || key;

  useEffect(() => {
    document.documentElement.setAttribute("data-color-scheme", dark ? "dark" : "light");
  }, [dark]);

  const toggleDark = () => setDark((d) => !d);

  return (
    <UIContext.Provider value={{ dark, toggleDark, lang, setLang, t }}>
      {children}
    </UIContext.Provider>
  );
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [notifications] = useState([
    { id: 1, message: "New assessment results available" },
  ]);

  const login = (email, password, rememberMe) => {
    const patient = sampleDB.patients.find((p) => p.email === email && p.password === password);
    if (patient) {
      setUser({ role: "patient", data: patient });
      window.location.hash = "#dashboard";
      return true;
    }
    const doctor = sampleDB.doctors.find((d) => d.email === email && d.password === password);
    if (doctor) {
      setUser({ role: "doctor", data: doctor });
      window.location.hash = "#dashboard";
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    window.location.hash = "#/";
  };

  const register = (formData) => {
    const { role, name, email, password, phone, age, gender, bloodType, license, specialization, hospital, bio } = formData;
    if (role === "patient") {
      const newPatient = {
        id: sampleDB.patients.length + 1,
        name,
        email,
        password,
        age: parseInt(age),
        gender,
        blood_type: bloodType,
        phone,
        assessments: [],
        medications: [],
        allergies: [],
        medicalHistory: [],
        timeline: [],
      };
      sampleDB.patients.unshift(newPatient);
    } else {
      const newDoctor = {
        id: sampleDB.doctors.length + 1,
        name,
        email,
        password,
        phone,
        license,
        specialization,
        hospital,
        bio,
        patients: [],
        notes: [],
      };
      sampleDB.doctors.unshift(newDoctor);
    }
  };

  const addAssessment = (prediction) => {
    if (user.role !== "patient") return;
    const assess = {
      id: uuid(),
      type: "Questionnaire",
      date: new Date().toISOString().substring(0, 10),
      alzheimers_risk: prediction.ad,
      parkinsons_risk: prediction.pd,
      dementia_risk: prediction.dem,
      confidence: prediction.confidence,
      riskFactors: prediction.riskFactors,
      responses: prediction.responses || {},
    };
    user.data.assessments.unshift(assess);
    user.data.timeline.unshift({
      id: uuid(),
      type: "ASSESSMENT",
      date: assess.date,
      description: `Completed ${assess.type} Assessment - AD ${assess.alzheimers_risk}%, PD ${assess.parkinsons_risk}%, Dem ${assess.dementia_risk}%`,
      status: Math.max(assess.alzheimers_risk, assess.parkinsons_risk, assess.dementia_risk) > 60 ? "HIGH_RISK" : "MONITORED",
    });
  };
  
  const updateProfile = (updatedData) => {
    if (!user) return;
    Object.assign(user.data, updatedData);
    setUser({ ...user });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, addAssessment, updateProfile, notifications }}>
      {children}
    </AuthContext.Provider>
  );
}

/********************
 * APP ROOT
 ********************/
function App() {
  return (
    <UIProvider>
      <AuthProvider>
        <Navbar />
        <Router />
      </AuthProvider>
    </UIProvider>
  );
}

/********************
 * RENDER
 ********************/
ReactDOM.render(<App />, document.getElementById("root"));
