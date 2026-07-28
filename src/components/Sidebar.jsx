import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTour, STEPS } from '../context/TourContext';
import {
  LayoutDashboard, FileText, Shuffle, GitBranch, Bot,
  PiggyBank, GraduationCap, Star, ArrowLeftRight,
  ChevronLeft, ChevronRight, Sprout, LogOut, MapPin, Cpu, Award, ShoppingBag, ShieldCheck, Lock
} from 'lucide-react';
import './Sidebar.css';

const allNavItems = [
  // === FARMER ONLY ===
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['farmer', 'buyer_enterprise', 'buyer_umkm', 'investor', 'admin'] },
  { path: '/farm-identity', label: 'Farm Identity', icon: MapPin, roles: ['farmer', 'admin'] },
  { path: '/karsa', label: 'AI Voice Karsa', icon: Bot, roles: ['farmer', 'admin'] },
  { path: '/diagnosis', label: 'AI Diagnosis & Yield', icon: Cpu, roles: ['farmer', 'admin'] },
  { path: '/harvest-passport', label: 'Harvest Passport', icon: Award, roles: ['farmer', 'admin'] },
  { path: '/reputation', label: 'Reputation Score', icon: Star, roles: ['farmer', 'admin'] },
  { path: '/academy', label: 'Smart Academy', icon: GraduationCap, roles: ['farmer', 'admin'] },
  // === FARMER + BUYER ===
  { path: '/contracts', label: 'Forward Contract', icon: FileText, roles: ['farmer', 'buyer_enterprise', 'buyer_umkm', 'admin'] },
  // === FARMER + INVESTOR ===
  { path: '/payout', label: 'Split Payout', icon: ArrowLeftRight, roles: ['farmer', 'investor', 'admin'] },
  { path: '/crowdfunding', label: 'Crowdfunding', icon: PiggyBank, roles: ['farmer', 'investor', 'admin'] },
  // === BUYER ONLY ===
  { path: '/marketplace', label: 'B2B Marketplace', icon: ShoppingBag, roles: ['buyer_enterprise', 'buyer_umkm', 'admin'] },
  // === ADMIN ONLY (Backend System) ===
  { path: '/matching', label: 'AI Auto-Matching', icon: Shuffle, roles: ['admin'] },
  { path: '/routing', label: '3-Tier Routing', icon: GitBranch, roles: ['admin'] },
  { path: '/quality-check', label: 'AI Quality Check', icon: ShieldCheck, roles: ['admin'] },
];

const STEP_TARGET_PATHS = {
  [STEPS.NAV_ACADEMY]: '/academy',
  [STEPS.CREATE_PASSPORT]: '/harvest-passport',
  [STEPS.ADMIN_QUALITY_CHECK]: '/quality-check',
  [STEPS.PUBLISH_TO_MARKET]: '/harvest-passport',
  [STEPS.BUYER_MARKETPLACE]: '/marketplace',
  [STEPS.BUYER_APPROVE_CONTRACT]: '/contracts',
  [STEPS.CREATE_CROWDFUND]: '/crowdfunding',
  [STEPS.INVESTOR_FUND]: '/crowdfunding'
};

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isTourActive, currentStep, advanceTour } = useTour();

  const handleLogout = () => {
    if (isTourActive) {
      console.log("[Tour Guard] Logout dicegah selama panduan juri berlangsung.");
      return;
    }
    logout();
    navigate('/login');
  };

  const currentRole = user?.role || 'admin';
  const filteredNavItems = allNavItems.filter(item => item.roles.includes(currentRole));

  const targetPathForCurrentStep = STEP_TARGET_PATHS[currentStep];

  const handleNavClick = (e, itemPath) => {
    if (isTourActive) {
      if (currentStep === STEPS.NAV_ACADEMY && itemPath === '/academy') {
        advanceTour(STEPS.TOUR_ACADEMY);
        return;
      }

      // If user clicks anything other than target path during tour, prevent it
      if (targetPathForCurrentStep && itemPath !== targetPathForCurrentStep) {
        e.preventDefault();
      }
    }
  };

  return (
    <>
      <motion.aside
        className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="sidebar__logo">
          <div className="sidebar__logo-icon">
            <Sprout size={24} />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div className="sidebar__logo-text" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                <span className="sidebar__brand">GAMPI</span>
                <span className="sidebar__subtitle">Ecosystem</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="sidebar__nav">
          <div className="sidebar__nav-label">
            {!collapsed && <span>Menu Utama {isTourActive ? '(Panduan Aktif)' : ''}</span>}
          </div>
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            // STRICT LOCKING DURING TOUR: Lock everything EXCEPT target path!
            const isLockedByTour = isTourActive && (
              !targetPathForCurrentStep || item.path !== targetPathForCurrentStep
            );

            return (
              <NavLink 
                key={item.path} 
                to={item.path} 
                onClick={(e) => handleNavClick(e, item.path)}
                className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''} ${isLockedByTour ? 'disabled-link' : ''}`} 
                title={isLockedByTour ? 'Terkunci oleh Panduan Juri' : item.label}
                style={{
                  opacity: isLockedByTour ? 0.35 : 1,
                  cursor: isLockedByTour ? 'not-allowed' : 'pointer',
                  pointerEvents: isLockedByTour ? 'none' : 'auto',
                  border: (!isLockedByTour && isTourActive) ? '2px solid #10b981' : 'none',
                  boxShadow: (!isLockedByTour && isTourActive) ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none'
                }}
              >
                {isActive && (
                  <motion.div className="sidebar__link-bg" layoutId="activeNav" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
                <div className="sidebar__link-icon">
                  <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                </div>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span className="sidebar__link-label" initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -5 }} transition={{ duration: 0.15 }}>
                      {item.label} {isLockedByTour && <Lock size={12} className="inline ml-xs opacity-50" />}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar__bottom">
          <button 
            className={`sidebar__link text-error ${isTourActive ? 'disabled-link' : ''}`} 
            onClick={handleLogout} 
            title={isTourActive ? "Logout dinonaktifkan selama panduan juri" : "Logout"}
            style={{
              opacity: isTourActive ? 0.35 : 1,
              cursor: isTourActive ? 'not-allowed' : 'pointer'
            }}
          >
             <div className="sidebar__link-icon"><LogOut size={20} /></div>
             {!collapsed && <span className="sidebar__link-label">Keluar Demo {isTourActive && <Lock size={12} className="inline ml-xs opacity-50" />}</span>}
          </button>
          <button className="sidebar__toggle" onClick={onToggle}>
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
