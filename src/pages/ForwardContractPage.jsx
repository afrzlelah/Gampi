import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from '../context/GlobalStateContext';
import { useAuth } from '../context/AuthContext';
import { useTour, STEPS } from '../context/TourContext';
import { Check, X, FileSignature, AlertCircle, TrendingUp, ArrowRight, ShoppingBag, Plus } from 'lucide-react';
import { formatRupiah } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import './ForwardContractPage.css';

export default function ForwardContractPage() {
  const { contracts = [], updateContractStatus } = useGlobalState() || {};
  const { user } = useAuth();
  const { isTourActive, currentStep, advanceTour } = useTour();
  const navigate = useNavigate();
  
  const [selectedContract, setSelectedContract] = useState(null);

  const isBuyerEnterprise = user?.role === 'buyer_enterprise';
  const isBuyerUMKM = user?.role === 'buyer_umkm';
  const isFarmer = user?.role === 'farmer';

  // Strict role-based filtering so enterprise contracts don't leak into UMKM views
  const displayContracts = (contracts || []).filter(c => {
    if (!c) return false;
    if (user?.role === 'admin') return true;
    if (isFarmer) return c.farmer === user?.name || c.farmer === 'Pak Suharto' || c.farmer === 'Poktan Makmur Jaya';
    if (isBuyerEnterprise) return c.buyer?.includes('Hotel') || c.buyer?.includes('Gumaya') || c.grade === 'A';
    if (isBuyerUMKM) return c.buyer?.includes('Padang') || c.buyer?.includes('Soto') || c.buyer?.includes('RM') || c.grade === 'B';
    return true;
  });

  const activeContract = selectedContract || displayContracts[0];

  const handleReject = () => {
    if (activeContract) {
      updateContractStatus(activeContract.id, 'Ditolak', user?.name || 'Hotel Gumaya Semarang');
    }
  };

  const handleApprove = () => {
    if (activeContract) {
      updateContractStatus(activeContract.id, 'Aktif', user?.name || 'Hotel Gumaya Semarang');

      if (isTourActive && currentStep === STEPS.BUYER_APPROVE_CONTRACT) {
        advanceTour(STEPS.SWITCH_FARMER_CROWDFUND);
      }
    }
  };

  return (
    <div className="contract-page">
      <div className="contract-page__header flex justify-between items-center mb-lg">
        <div>
          <h2 className="text-h2 flex items-center gap-xs">
            Forward Contract B2B
            <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>Terintegrasi AI Matching</span>
          </h2>
          <p className="text-caption">Kontrak penyerapan panen terikat dari Paspor Panen terverifikasi</p>
        </div>

        {/* Quick Action Navigation Buttons for Roles */}
        <div>
          {isFarmer && (
            <button className="btn btn-primary flex items-center gap-xs" onClick={() => navigate('/harvest-passport')}>
              <Plus size={18} /> Jual Panen (Buat Paspor) 🚀
            </button>
          )}
          {(isBuyerEnterprise || isBuyerUMKM) && (
            <button className="btn btn-primary flex items-center gap-xs" onClick={() => navigate('/marketplace')}>
              <ShoppingBag size={18} /> Lihat Pasar Komoditas (B2B Marketplace) 🛒
            </button>
          )}
        </div>
      </div>

      <div className="contract-page__content">
        {/* List Panel */}
        <div className="contract-list glass-panel-solid">
          <div className="contract-list__header">
            <h3 className="text-h3">Daftar Kontrak ({displayContracts.length})</h3>
          </div>
          <div className="contract-list__items">
            {displayContracts.map((contract) => (
              <div 
                key={contract.id}
                className={`contract-item ${activeContract?.id === contract.id ? 'active' : ''}`}
                onClick={() => setSelectedContract(contract)}
              >
                <div className="flex justify-between items-start mb-sm">
                  <span className="font-bold">{contract.id}</span>
                  <span className={`badge ${contract.status === 'Aktif' ? 'badge-success' : (contract.status === 'Menunggu' ? 'badge-warning' : 'badge-error')}`}>
                    {contract.status}
                  </span>
                </div>
                <h4 className="text-body font-bold">{contract.commodity} - Grade {contract.grade || 'A'}</h4>
                <p className="text-caption mt-xs">
                  {isBuyerEnterprise || isBuyerUMKM ? `Mitra Petani: ${contract.farmer}` : `Pembeli: ${contract.buyer}`}
                </p>
              </div>
            ))}
            {displayContracts.length === 0 && (
               <p className="text-center text-caption p-xl text-tertiary">Tidak ada kontrak ditemukan untuk peran ini.</p>
            )}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="contract-detail glass-panel">
          <AnimatePresence mode="wait">
            {activeContract ? (
              <motion.div 
                key={activeContract.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="contract-detail__content"
              >
                <div className="flex justify-between items-start mb-xl">
                  <div>
                    <h3 className="text-h1">{activeContract.commodity}</h3>
                    <p className="text-caption mt-xs">ID Kontrak: {activeContract.id} • Paspor #{activeContract.supplyId || '-'}</p>
                  </div>
                  <span className={`badge ${activeContract.status === 'Aktif' ? 'badge-success' : (activeContract.status === 'Menunggu' ? 'badge-warning' : 'badge-error')}`} style={{ fontSize: '1rem', padding: '8px 16px' }}>
                    {activeContract.status}
                  </span>
                </div>

                <div className="contract-detail__stats grid grid-3 gap-md mb-xl">
                  <div className="stat-box">
                    <span className="text-overline">Volume Total</span>
                    <p className="text-h3">{activeContract.volume}</p>
                  </div>
                  <div className="stat-box">
                    <span className="text-overline">Harga Terikat / kg</span>
                    <p className="text-h3 text-primary-600">{formatRupiah(activeContract.price || 35000)}</p>
                  </div>
                  <div className="stat-box">
                    <span className="text-overline">Durasi Kontrak</span>
                    <p className="text-h3">{activeContract.duration || '3 Bulan'}</p>
                  </div>
                </div>

                <div className="contract-detail__parties mb-xl">
                  <div className="party-card">
                    <span className="text-caption font-bold">Pihak 1 (Petani)</span>
                    <h4 className="text-h3 mt-xs">{activeContract.farmer}</h4>
                    <p className="text-caption text-success mt-xs flex items-center gap-xs"><Check size={14} /> Terverifikasi Paspor Panen</p>
                  </div>
                  <ArrowRight size={24} className="party-arrow" color="var(--text-tertiary)" />
                  <div className="party-card">
                    <span className="text-caption font-bold">Pihak 2 (Pembeli B2B)</span>
                    <h4 className="text-h3 mt-xs">{activeContract.buyer}</h4>
                    <p className="text-caption text-success mt-xs flex items-center gap-xs"><Check size={14} /> Deposit Aman</p>
                  </div>
                </div>

                {/* Actions for Buyer */}
                {(isBuyerEnterprise || isBuyerUMKM) && activeContract.status === 'Menunggu' && (
                  <div className="contract-detail__actions">
                    <div className="alert alert-info flex items-start gap-md mb-lg p-md" style={{ background: 'rgba(59, 130, 246, 0.1)', borderRadius: 12 }}>
                      <AlertCircle color="var(--info)" />
                      <div>
                        <p className="font-bold">Menunggu Persetujuan Anda</p>
                        <p className="text-caption">Tinjau kesepakatan harga dan volume sebelum menyetujui. Jika ditolak, komoditas ini akan dikembalikan ke B2B Marketplace agar pembeli lain dapat membelinya.</p>
                      </div>
                    </div>
                    <div className="flex gap-md">
                      <button 
                        className={`btn btn-error w-full ${isTourActive && currentStep === STEPS.BUYER_APPROVE_CONTRACT ? 'disabled-link' : ''}`} 
                        onClick={handleReject}
                        style={isTourActive && currentStep === STEPS.BUYER_APPROVE_CONTRACT ? { cursor: 'not-allowed', opacity: 0.4 } : {}}
                        disabled={isTourActive && currentStep === STEPS.BUYER_APPROVE_CONTRACT}
                      >
                        Tolak Kontrak Ini {isTourActive && currentStep === STEPS.BUYER_APPROVE_CONTRACT && "🔒"}
                      </button>
                      <button 
                        className={`btn btn-primary w-full ${isTourActive && currentStep === STEPS.BUYER_APPROVE_CONTRACT ? 'pulse-gold-highlight' : ''}`} 
                        onClick={handleApprove}
                        style={isTourActive && currentStep === STEPS.BUYER_APPROVE_CONTRACT ? {
                          boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)',
                          border: '2px solid #10b981'
                        } : {}}
                      >
                        Setujui Kontrak (Kunci Stok) 🔒
                      </button>
                    </div>
                  </div>
                )}
                
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
