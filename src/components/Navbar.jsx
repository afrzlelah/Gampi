import { useState } from 'react';
import { Bell, Search, User, ChevronDown, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, AVAILABLE_ROLES } from '../context/AuthContext';
import { useTour, STEPS } from '../context/TourContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const STEP_TARGET_ROLES = {
  [STEPS.SWITCH_ADMIN_VERIFY]: 'admin',
  [STEPS.SWITCH_FARMER_PUBLISH]: 'farmer',
  [STEPS.SWITCH_BUYER]: 'buyer_enterprise',
  [STEPS.SWITCH_FARMER_CROWDFUND]: 'farmer',
  [STEPS.SWITCH_INVESTOR]: 'investor'
};

const STEP_ROLE_LABEL = {
  [STEPS.SWITCH_ADMIN_VERIFY]: 'Admin System',
  [STEPS.SWITCH_FARMER_PUBLISH]: 'Petani Mitra',
  [STEPS.SWITCH_BUYER]: 'Pembeli Enterprise (Hotel)',
  [STEPS.SWITCH_FARMER_CROWDFUND]: 'Petani Mitra',
  [STEPS.SWITCH_INVESTOR]: 'Investor Sosial'
};

export default function Navbar({ title }) {
  const { user, login } = useAuth();
  const { isTourActive, currentStep, advanceTour } = useTour();
  const navigate = useNavigate();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const targetRole = STEP_TARGET_ROLES[currentStep];
  const isSwitchStep = isTourActive && Boolean(targetRole);

  const handleRoleSelect = (roleId) => {
    if (isTourActive && !isSwitchStep) {
      console.log("[Tour Guard] Ganti role dilarang di step ini. Selesaikan aksi wajib dulu!");
      return;
    }
    if (isSwitchStep && roleId !== targetRole) return;

    login(roleId);
    setShowRoleMenu(false);

    if (isTourActive) {
      if (currentStep === STEPS.SWITCH_ADMIN_VERIFY && roleId === 'admin') {
        advanceTour(STEPS.ADMIN_QUALITY_CHECK);
        navigate('/quality-check');
      } else if (currentStep === STEPS.SWITCH_FARMER_PUBLISH && roleId === 'farmer') {
        advanceTour(STEPS.PUBLISH_TO_MARKET);
        navigate('/harvest-passport');
      } else if (currentStep === STEPS.SWITCH_BUYER && (roleId === 'buyer_enterprise' || roleId === 'buyer_umkm')) {
        advanceTour(STEPS.BUYER_MARKETPLACE);
        navigate('/marketplace');
      } else if (currentStep === STEPS.SWITCH_FARMER_CROWDFUND && roleId === 'farmer') {
        advanceTour(STEPS.CREATE_CROWDFUND);
        navigate('/crowdfunding');
      } else if (currentStep === STEPS.SWITCH_INVESTOR && roleId === 'investor') {
        advanceTour(STEPS.INVESTOR_FUND);
        navigate('/crowdfunding');
      }
    }
  };

  return (
    <motion.header
      className="navbar"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="navbar__left">
        <h1 className="navbar__title">{title}</h1>
      </div>

      <div className="navbar__right">
        {/* Quick Role Switcher Pill */}
        <div className="navbar__role-switcher">
          <button 
            className={`navbar__role-pill ${isSwitchStep ? 'pulse-gold-highlight' : ''}`}
            onClick={() => {
              if (isTourActive && !isSwitchStep) return;
              setShowRoleMenu(!showRoleMenu);
            }}
            title={isTourActive && !isSwitchStep ? "Ganti Peran Dikunci - Selesaikan Aksi Layar Dulu" : "Ganti Peran Demo"}
            style={
              isTourActive && !isSwitchStep ? {
                cursor: 'not-allowed',
                opacity: 0.7,
                filter: 'grayscale(0.5)'
              } : isSwitchStep ? {
                border: '2.5px solid #10b981',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)',
                background: 'rgba(16, 185, 129, 0.1)',
                animation: 'pulse 1.5s infinite'
              } : {}
            }
          >
            <span className="dot-pulse" style={{ background: user?.color || 'var(--primary-500)' }} />
            <span className="navbar__role-pill-text">
              {isSwitchStep ? (
                <strong style={{ color: '#059669', fontSize: '0.8125rem' }}>
                  👉 GANTI ROLE: {STEP_ROLE_LABEL[currentStep] || 'Pilih Role'}
                </strong>
              ) : (
                <>Role: <strong>{user?.roleLabel || 'Petani'}</strong> {(isTourActive && !isSwitchStep) && <Lock size={12} className="inline ml-xs text-secondary" />}</>
              )}
            </span>
            <ChevronDown size={14} />
          </button>

          <AnimatePresence>
            {showRoleMenu && (
              <motion.div 
                className="navbar__role-dropdown glass-panel-heavy"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                style={{ zIndex: 999999 }}
              >
                <div className="text-overline mb-xs px-sm" style={{ padding: '8px 12px 4px' }}>
                  {isSwitchStep ? `👉 Pilih Peran ${STEP_ROLE_LABEL[currentStep]}` : 'Pilih Peran Demo'}
                </div>
                {AVAILABLE_ROLES.map((r) => {
                  const isDisabledInTour = isTourActive && (!isSwitchStep || r.id !== targetRole);

                  return (
                    <button
                      key={r.id}
                      className={`navbar__role-option ${user?.role === r.id ? 'active' : ''}`}
                      onClick={() => handleRoleSelect(r.id)}
                      disabled={isDisabledInTour}
                      style={{
                        opacity: isDisabledInTour ? 0.35 : 1,
                        cursor: isDisabledInTour ? 'not-allowed' : 'pointer',
                        filter: isDisabledInTour ? 'grayscale(0.8)' : 'none'
                      }}
                    >
                      <span className="navbar__role-dot" style={{ background: r.color }} />
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-body" style={{ fontSize: '0.8125rem' }}>
                          {r.roleLabel} {isDisabledInTour && <Lock size={12} className="inline ml-2xs" />}
                        </span>
                        <span className="text-caption" style={{ fontSize: '0.75rem' }}>{r.name}</span>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="navbar__search">
          <Search size={16} strokeWidth={2} />
          <input type="text" placeholder="Cari di ekosistem..." />
        </div>

        <button className="navbar__icon-btn">
          <Bell size={20} strokeWidth={1.8} />
          <span className="navbar__notification-dot" />
        </button>

        <div className="navbar__profile">
          <div className="navbar__avatar" style={{ background: user?.color || 'var(--primary-600)' }}>
             <User size={18} />
          </div>
          <div className="navbar__profile-info">
            <span className="navbar__profile-name">{user?.name || 'Pak Suharto'}</span>
            <span className="navbar__profile-role">{user?.roleLabel || 'Petani'}</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
