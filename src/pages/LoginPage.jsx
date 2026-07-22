import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTour, STEPS } from '../context/TourContext';
import TourBanner from '../components/TourBanner';
import { Sprout, User, Briefcase, Building, Leaf, Lock } from 'lucide-react';
import './LoginPage.css';

const roles = [
  {
    id: 'farmer',
    name: 'Pak Suharto',
    roleLabel: 'Petani Mitra',
    icon: <Leaf size={24} />,
    color: '#10b981',
    desc: 'Akses Karsa, Kontrak, & Academy'
  },
  {
    id: 'buyer_enterprise',
    name: 'Hotel Gumaya',
    roleLabel: 'Pembeli B2B (Enterprise)',
    icon: <Building size={24} />,
    color: '#3b82f6',
    desc: 'Manajemen Supply & Forward Contract'
  },
  {
    id: 'buyer_umkm',
    name: 'RM Padang Sederhana',
    roleLabel: 'Pembeli B2B (UMKM)',
    icon: <Briefcase size={24} />,
    color: '#f59e0b',
    desc: 'Pembelian Skala Menengah & Logistik'
  },
  {
    id: 'investor',
    name: 'Budi Santoso',
    roleLabel: 'Investor Sosial',
    icon: <User size={24} />,
    color: '#8b5cf6',
    desc: 'Pantau ROI & Proyek Crowdfunding'
  }
];

export default function LoginPage() {
  const { login } = useAuth();
  const { isTourActive, currentStep, advanceTour } = useTour();
  const navigate = useNavigate();

  const handleLogin = (roleData) => {
    const isDisabled = isTourActive && currentStep === STEPS.LOGIN_FARMER && roleData.id !== 'farmer';
    if (isDisabled) return;

    login(roleData.id, { name: roleData.name, roleLabel: roleData.roleLabel, icon: roleData.icon });

    if (isTourActive && currentStep === STEPS.LOGIN_FARMER) {
      advanceTour(STEPS.NAV_ACADEMY);
    }
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="mesh-gradient" />
      <TourBanner />
      
      <motion.div 
        className="login-container glass-panel-heavy"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center" style={{ marginBottom: 40 }}>
          <div className="login-logo">
            <Sprout size={32} />
          </div>
          <h1 className="text-h1 mt-md">Pilih <span className="gradient-text">Role Demo</span></h1>
          <p className="text-caption mt-sm">
            {isTourActive && currentStep === STEPS.LOGIN_FARMER ? (
              <span className="text-primary-600 font-bold">🔒 Panduan Juri Aktif: Silakan pilih Peran "Petani Mitra" untuk memulai alur.</span>
            ) : (
              'Silakan pilih peran untuk melihat simulasi dashboard yang disesuaikan.'
            )}
          </p>
        </div>

        <div className="login-grid">
          {roles.map((r, i) => {
            const isDisabled = isTourActive && currentStep === STEPS.LOGIN_FARMER && r.id !== 'farmer';
            return (
              <motion.div
                key={r.id}
                className={`login-card glass-panel ${isDisabled ? 'disabled-card' : ''} ${(!isDisabled && isTourActive && currentStep === STEPS.LOGIN_FARMER && r.id === 'farmer') ? 'pulse-gold-highlight' : ''}`}
                style={{
                  opacity: isDisabled ? 0.45 : 1,
                  filter: isDisabled ? 'grayscale(0.8)' : 'none',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  position: 'relative'
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isDisabled ? 0.45 : 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={!isDisabled ? { y: -5, borderColor: r.color, boxShadow: `0 10px 30px ${r.color}30` } : {}}
                onClick={() => handleLogin(r)}
              >
                {isDisabled && (
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.4)', padding: 6, borderRadius: 8, color: '#fff' }}>
                    <Lock size={16} />
                  </div>
                )}
                <div className="login-card__icon" style={{ backgroundColor: `${r.color}15`, color: r.color }}>
                  {r.icon}
                </div>
                <h3 className="text-h3 mt-md">{r.roleLabel}</h3>
                <p className="font-bold text-body mt-xs">{r.name}</p>
                <p className="text-caption mt-sm">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
