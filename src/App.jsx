import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ForwardContractPage from './pages/ForwardContractPage';
import SmartMatchingPage from './pages/SmartMatchingPage';
import SalesRoutingPage from './pages/SalesRoutingPage';
import KarsaPage from './pages/KarsaPage';
import CrowdfundingPage from './pages/CrowdfundingPage';
import AcademyPage from './pages/AcademyPage';
import ReputationPage from './pages/ReputationPage';
import SplitPayoutPage from './pages/SplitPayoutPage';
import FarmIdentityPage from './pages/FarmIdentityPage';
import DiagnosisPage from './pages/DiagnosisPage';
import HarvestPassportPage from './pages/HarvestPassportPage';
import B2BMarketplacePage from './pages/B2BMarketplacePage';
import QualityCheckPage from './pages/QualityCheckPage';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected Routes */}
      <Route element={user ? <Layout /> : <Navigate to="/login" replace />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/farm-identity" element={<FarmIdentityPage />} />
        <Route path="/karsa" element={<KarsaPage />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
        <Route path="/harvest-passport" element={<HarvestPassportPage />} />
        <Route path="/reputation" element={<ReputationPage />} />
        <Route path="/marketplace" element={<B2BMarketplacePage />} />
        <Route path="/contracts" element={<ForwardContractPage />} />
        <Route path="/payout" element={<SplitPayoutPage />} />
        <Route path="/crowdfunding" element={<CrowdfundingPage />} />
        <Route path="/academy" element={<AcademyPage />} />
        <Route path="/matching" element={<SmartMatchingPage />} />
        <Route path="/routing" element={<SalesRoutingPage />} />
        <Route path="/quality-check" element={<QualityCheckPage />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
