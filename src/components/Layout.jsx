import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import TourBanner from './TourBanner';
import TourModalExplainer from './TourModalExplainer';
import TourFinishModal from './TourFinishModal';
import { useTour, STEPS } from '../context/TourContext';
import './Layout.css';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/farm-identity': 'Farm Identity',
  '/karsa': 'AI Voice Karsa',
  '/diagnosis': 'AI Diagnosis & Yield',
  '/harvest-passport': 'Harvest Passport',
  '/reputation': 'Reputation Score',
  '/marketplace': 'B2B Marketplace',
  '/contracts': 'Forward Contract',
  '/payout': 'Split Payout',
  '/crowdfunding': 'Crowdfunding',
  '/academy': 'Smart Academy',
  '/matching': 'AI Auto-Matching',
  '/routing': '3-Tier Routing',
  '/quality-check': 'AI Quality Check',
};

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isTourActive, currentStep } = useTour();

  const title = pageTitles[location.pathname] || 'GAMPI';

  // --- STRICT TOUR GUARD ---
  // Mencegah juri mengganti URL secara manual atau nge-bug keluar dari alur tour
  useEffect(() => {
    if (!isTourActive) return;
    
    const STEP_EXPECTED_PATHS = {
      [STEPS.NAV_ACADEMY]: '/dashboard',
      [STEPS.TOUR_ACADEMY]: '/academy',
      [STEPS.TOUR_DASHBOARD]: '/dashboard',
      [STEPS.TOUR_FARM_IDENTITY]: '/farm-identity',
      [STEPS.TOUR_KARSA]: '/karsa',
      [STEPS.TOUR_REPUTATION]: '/reputation',
      [STEPS.CREATE_PASSPORT]: '/harvest-passport',
      [STEPS.SWITCH_ADMIN_VERIFY]: '/harvest-passport',
      [STEPS.ADMIN_QUALITY_CHECK]: '/quality-check',
      [STEPS.SWITCH_FARMER_PUBLISH]: '/quality-check',
      [STEPS.PUBLISH_TO_MARKET]: '/harvest-passport',
      [STEPS.SWITCH_BUYER]: '/harvest-passport',
      [STEPS.BUYER_MARKETPLACE]: '/marketplace',
      [STEPS.BUYER_APPROVE_CONTRACT]: '/contracts',
      [STEPS.SWITCH_FARMER_CROWDFUND]: '/contracts',
      [STEPS.CREATE_CROWDFUND]: '/crowdfunding',
      [STEPS.SWITCH_INVESTOR]: '/crowdfunding',
      [STEPS.INVESTOR_FUND]: '/crowdfunding',
    };

    const expectedPath = STEP_EXPECTED_PATHS[currentStep];
    
    if (expectedPath && location.pathname !== expectedPath) {
      console.log(`[Tour Guard] STRICT LOCK: URL ${location.pathname} tidak diizinkan di step ${currentStep}. Redirecting to ${expectedPath}...`);
      navigate(expectedPath, { replace: true });
    }
  }, [isTourActive, currentStep, location.pathname, navigate]);

  return (
    <div className="layout">
      <div className="mesh-gradient" />
      
      {/* Tour Guided Overlays */}
      <TourBanner />
      <TourModalExplainer />
      <TourFinishModal />

      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <motion.main
        className="layout__main"
        animate={{ marginLeft: collapsed ? 80 : 280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Navbar title={title} />
        <div className="layout__content">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
}
