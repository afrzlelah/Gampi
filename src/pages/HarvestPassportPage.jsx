import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, QrCode, Download, Share2, ShieldCheck, CheckCircle2, ShoppingBag, Plus, X, Lock, Clock } from 'lucide-react';
import { useGlobalState } from '../context/GlobalStateContext';
import { useAuth } from '../context/AuthContext';
import { useTour, STEPS } from '../context/TourContext';
import './HarvestPassportPage.css';

export default function HarvestPassportPage() {
  const { supplies = [], addSupply, publishSupplyToMarket } = useGlobalState() || {};
  const { user } = useAuth();
  const { isTourActive, currentStep, advanceTour, setCreatedPassportId } = useTour();

  const [selectedPassport, setSelectedPassport] = useState(supplies[0] || null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [sellPrice, setSellPrice] = useState('38000');

  // New Upload Form State
  const [formData, setFormData] = useState({
    commodity: 'Cabai Merah Keriting',
    variety: 'Varietas Premium CMK-01',
    claimedGrade: 'A',
    weightTon: '12.5',
    harvestDate: '2026-10-12',
    gpsLocation: '-6.2088, 106.8456'
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const newPassport = {
      farmer: user?.name || 'Pak Suharto',
      poktan: 'Poktan Makmur Jaya',
      commodity: formData.commodity,
      variety: formData.variety,
      claimedGrade: formData.claimedGrade,
      aiVerifiedGrade: null, // Pending verification
      verificationStatus: 'Menunggu Verifikasi AI (Pending)',
      weightTon: parseFloat(formData.weightTon) || 10,
      expectedPrice: 38000,
      harvestDate: formData.harvestDate,
      gpsLocation: formData.gpsLocation,
      colorIndex: '98%',
      damageRate: '0.4%',
      accuracy: '95% Akurat',
      hash: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
      isPublished: false,
      marketStatus: 'Belum Dijual'
    };

    const newId = addSupply(newPassport);
    setSelectedPassport({ ...newPassport, id: newId });
    setCreatedPassportId(newId);
    setShowUploadModal(false);

    if (isTourActive && currentStep === STEPS.CREATE_PASSPORT) {
      advanceTour(STEPS.SWITCH_ADMIN_VERIFY);
    }
  };

  const handlePublishToMarket = (e) => {
    e.preventDefault();
    if (selectedPassport) {
      publishSupplyToMarket(selectedPassport.id, parseInt(sellPrice) || 38000);
      setShowSellModal(false);

      if (isTourActive && currentStep === STEPS.PUBLISH_TO_MARKET) {
        advanceTour(STEPS.SWITCH_BUYER);
      }
    }
  };

  const isFarmer = user?.role === 'farmer' || user?.role === 'admin';
  const activePassport = selectedPassport || supplies[0];

  const isPending = activePassport?.verificationStatus?.includes('Pending');
  const isLocked = activePassport?.marketStatus === 'Terkunci / Terjual';
  const isPublished = activePassport?.isPublished;

  let statusBg = 'rgba(16,185,129,0.08)';
  let statusBorder = 'rgba(16,185,129,0.2)';
  let statusTitle = '📦 Terverifikasi AI (Siap Dipublikasi ke B2B)';
  let statusDesc = 'Klik tombol di kanan untuk menjual komoditas ini ke B2B Marketplace.';

  if (isPending) {
    statusBg = 'rgba(245,158,11,0.08)';
    statusBorder = 'rgba(245,158,11,0.3)';
    statusTitle = '⏳ MENUNGGU VERIFIKASI AI ADMIN (Harap alih peran ke Admin)';
    statusDesc = 'Paspor memerlukan verifikasi citra oleh Admin System sebelum dapat dipasarkan.';
  } else if (isLocked) {
    statusBg = 'rgba(239,68,68,0.08)';
    statusBorder = 'rgba(239,68,68,0.2)';
    statusTitle = '🔒 TERKUNCI & TERJUAL';
    statusDesc = 'Kontrak penyerapan telah disetujui. Stok dikunci otomatis oleh sistem AGRIDAYA.';
  } else if (isPublished) {
    statusBg = 'rgba(59,130,246,0.08)';
    statusBorder = 'rgba(59,130,246,0.2)';
    statusTitle = '🚀 AKTIF DI PASAR B2B';
    statusDesc = 'Komoditas terverifikasi ini dapat dilihat & diajukan kontrak oleh Pembeli.';
  }

  return (
    <div className="passport-page">
      <div className="passport-page__header flex justify-between items-center mb-xl">
        <div>
          <h2 className="text-h2 flex items-center gap-xs">
            Harvest Passport (Paspor Panen Digital)
            <span className="badge badge-success flex items-center gap-xs" style={{ fontSize: '0.75rem' }}>
              <ShieldCheck size={14} /> Blockchain Verified
            </span>
          </h2>
          <p className="text-caption">Buat paspor panen terverifikasi AI, lalu jual ke B2B Demand Marketplace untuk pembeli Hotel & UMKM.</p>
        </div>

        {isFarmer && (
          <button 
            className={`btn btn-primary ${isTourActive && currentStep === STEPS.CREATE_PASSPORT ? 'pulse-gold-highlight' : ''}`}
            onClick={() => setShowUploadModal(true)}
            style={isTourActive && currentStep === STEPS.CREATE_PASSPORT ? {
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)',
              border: '2px solid #10b981'
            } : {}}
          >
            <Plus size={18} /> Buat Paspor Panen Baru
          </button>
        )}
      </div>

      <div className="passport-page__grid">
        {/* Sidebar Passport Selector */}
        <div className="passport-sidebar glass-panel-solid p-md">
          <h3 className="text-h3 mb-md px-xs">Daftar Paspor Panen ({supplies.length})</h3>
          <div className="flex flex-col gap-sm">
            {(supplies || []).map(sup => (
              <div 
                key={sup.id}
                className={`passport-item p-md rounded-xl cursor-pointer transition-all ${activePassport?.id === sup.id ? 'active' : ''}`}
                onClick={() => setSelectedPassport(sup)}
              >
                <div className="flex justify-between items-center mb-xs">
                  <span className="font-bold text-body" style={{ fontSize: '0.875rem' }}>#{sup.id}</span>
                  <span className={`badge ${sup.verificationStatus?.includes('Pending') ? 'badge-warning' : (sup.marketStatus === 'Terkunci / Terjual' ? 'badge-error' : (sup.isPublished ? 'badge-primary' : 'badge-success'))}`} style={{ fontSize: '0.6875rem' }}>
                    {sup.verificationStatus?.includes('Pending') ? '⏳ Pending AI' : (sup.marketStatus === 'Terkunci / Terjual' ? '🔒 Terjual' : (sup.isPublished ? '🚀 Di B2B' : `Grade ${sup.aiVerifiedGrade || sup.claimedGrade}`))}
                  </span>
                </div>
                <h4 className="font-bold text-body mb-xs">{sup.commodity}</h4>
                <p className="text-caption text-tertiary">Petani: {sup.farmer} • {sup.weightTon} Ton</p>
              </div>
            ))}
            {supplies.length === 0 && (
              <p className="text-caption text-center p-md text-tertiary">Belum ada paspor panen. Klik "+ Buat Paspor Panen Baru".</p>
            )}
          </div>
        </div>

        {/* Main Passport Display */}
        {activePassport ? (
          <div className="passport-main glass-panel p-xl">
            <div className="passport-card">
              {/* Header Badge */}
              <div className="passport-card__header flex justify-between items-center mb-xl">
                <div className="flex items-center gap-md">
                  <div className="passport-badge-icon">
                    <Award size={28} />
                  </div>
                  <div>
                    <h3 className="text-h2" style={{ color: isPending ? '#d97706' : '#15803d' }}>
                      {isPending ? 'Paspor Panen (Menunggu Verifikasi AI)' : 'Paspor Panen Terverifikasi'}
                    </h3>
                    <div className="flex items-center gap-sm mt-xs">
                      <span className="font-mono font-bold text-caption text-tertiary">#{activePassport.id}</span>
                      <span className="dot-pulse" style={{ background: isPending ? '#f59e0b' : '#16a34a' }} />
                      <span className="text-caption font-bold text-success">Blockchain Secured</span>
                    </div>
                  </div>
                </div>

                {/* QR Code Box */}
                <div className="qr-box p-xs rounded-xl flex flex-col items-center border border-glass">
                  <QrCode size={64} color="#15803d" />
                  <span className="text-overline mt-xs" style={{ fontSize: '0.625rem', letterSpacing: '0.05em' }}>SCAN TO VERIFY</span>
                </div>
              </div>

              {/* Status Banner in Marketplace */}
              <div className="mb-xl p-md rounded-xl flex justify-between items-center" style={{ background: statusBg, border: `1px solid ${statusBorder}` }}>
                <div className="flex items-center gap-sm">
                  {isPending ? <Clock color="var(--warning)" size={20} /> : (isLocked ? <Lock color="var(--error)" size={20} /> : <ShoppingBag color="var(--primary-600)" size={20} />)}
                  <div>
                    <p className="font-bold text-body" style={{ fontSize: '0.875rem' }}>
                      Status paspor: {statusTitle}
                    </p>
                    <p className="text-caption">
                      {statusDesc}
                    </p>
                  </div>
                </div>

                {isFarmer && !isPending && !isPublished && !isLocked && (
                  <button 
                    className={`btn btn-primary flex items-center gap-xs ${isTourActive && currentStep === STEPS.PUBLISH_TO_MARKET ? 'pulse-gold-highlight' : ''}`} 
                    onClick={() => setShowSellModal(true)}
                  >
                    <ShoppingBag size={16} /> Jual ke B2B Marketplace 🚀
                  </button>
                )}
              </div>

              {/* Crop Info */}
              <div className="grid grid-2 gap-lg mb-xl p-lg rounded-xl" style={{ background: 'rgba(0,0,0,0.015)', border: '1px solid rgba(0,0,0,0.04)' }}>
                <div>
                  <span className="text-overline">Nama Komoditas</span>
                  <p className="text-h3 font-bold">{activePassport.commodity}</p>
                  <div className="mt-md">
                    <span className="text-overline">Tanggal Panen</span>
                    <p className="text-body font-bold">{activePassport.harvestDate}</p>
                  </div>
                </div>

                <div>
                  <span className="text-overline">Varietas</span>
                  <p className="text-h3 font-bold">{activePassport.variety}</p>
                  <div className="mt-md">
                    <span className="text-overline">Lokasi GPS Kebun</span>
                    <p className="text-body font-bold text-primary-600">📍 {activePassport.gpsLocation}</p>
                  </div>
                </div>
              </div>

              {/* Quality Standard Badges */}
              <div className="mb-xl">
                <span className="text-overline font-bold block mb-sm" style={{ letterSpacing: '0.08em' }}>STANDARISASI KUALITAS & HASIL VERIFIKASI AI</span>
                <div className="grid grid-4 gap-md">
                  <div className="stat-pill text-center p-md rounded-xl" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                    <span className="text-overline" style={{ color: '#166534' }}>Grade AI</span>
                    <p className="text-h1 font-black" style={{ color: '#15803d' }}>{activePassport.aiVerifiedGrade || 'Pending'}</p>
                  </div>
                  <div className="stat-pill text-center p-md rounded-xl" style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}>
                    <span className="text-overline" style={{ color: '#0369a1' }}>Total Berat</span>
                    <p className="text-h2 font-bold" style={{ color: '#0284c7' }}>{activePassport.weightTon} <span className="text-body">Ton</span></p>
                  </div>
                  <div className="stat-pill text-center p-md rounded-xl" style={{ background: '#faf5ff', border: '1px solid #e9d5ff' }}>
                    <span className="text-overline" style={{ color: '#6b21a8' }}>Indeks Warna</span>
                    <p className="text-h2 font-bold" style={{ color: '#7e22ce' }}>{activePassport.colorIndex || '98%'}</p>
                  </div>
                  <div className="stat-pill text-center p-md rounded-xl" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
                    <span className="text-overline" style={{ color: '#991b1b' }}>Kerusakan</span>
                    <p className="text-h2 font-bold" style={{ color: '#dc2626' }}>{activePassport.damageRate || '0.4%'}</p>
                  </div>
                </div>
              </div>

              {/* Footer Stamp */}
              <div className="passport-footer flex justify-between items-center pt-lg border-t border-glass">
                <div>
                  <div className={`badge ${isPending ? 'badge-warning' : 'badge-success'} inline-flex items-center gap-xs p-xs px-md`}>
                    {isPending ? <Clock size={16} /> : <CheckCircle2 size={16} />} 
                    {activePassport.verificationStatus}
                  </div>
                  <p className="text-caption mt-xs text-tertiary">HASH: {activePassport.hash}</p>
                </div>

                <div className="flex gap-md">
                  <button className="btn btn-ghost border border-glass">
                    <Download size={16} /> Unduh PDF
                  </button>
                  <button className="btn btn-primary">
                    <Share2 size={16} /> Bagikan Paspor
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-xl glass-panel rounded-2xl flex flex-col items-center justify-center">
            <Award size={48} color="var(--primary-500)" className="mb-md" />
            <h3 className="text-h2 mb-xs">Belum Ada Paspor Panen</h3>
            <p className="text-caption mb-lg">Klik "+ Buat Paspor Panen Baru" untuk menerbitkan sertifikat mutu digital panen Anda.</p>
            <button className="btn btn-primary" onClick={() => setShowUploadModal(true)}>+ Buat Paspor Panen Pertama</button>
          </div>
        )}
      </div>

      {/* Upload New Passport Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ zIndex: 99999 }}>
            <motion.div className="modal-card glass-panel-solid p-xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="flex justify-between items-center mb-lg">
                <h3 className="text-h2">Buat Paspor Panen Baru</h3>
                <button className="btn-icon" onClick={() => setShowUploadModal(false)}><X size={20} /></button>
              </div>

              <form onSubmit={handleUploadSubmit} className="flex flex-col gap-md">
                <div>
                  <label className="text-caption font-bold block mb-xs">Nama Komoditas</label>
                  <input type="text" className="input-field" value={formData.commodity} onChange={e => setFormData({...formData, commodity: e.target.value})} required />
                </div>
                <div>
                  <label className="text-caption font-bold block mb-xs">Varietas</label>
                  <input type="text" className="input-field" value={formData.variety} onChange={e => setFormData({...formData, variety: e.target.value})} required />
                </div>
                <div className="grid grid-2 gap-md">
                  <div>
                    <label className="text-caption font-bold block mb-xs">Klaim Grade Mutu</label>
                    <select className="input-field" value={formData.claimedGrade} onChange={e => setFormData({...formData, claimedGrade: e.target.value})}>
                      <option value="A">Grade A (Premium)</option>
                      <option value="B">Grade B (Medium)</option>
                      <option value="C">Grade C (Off-spec)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-caption font-bold block mb-xs">Total Berat (Ton)</label>
                    <input type="number" step="0.1" className="input-field" value={formData.weightTon} onChange={e => setFormData({...formData, weightTon: e.target.value})} required />
                  </div>
                </div>

                <div className="flex justify-end gap-md mt-md">
                  <button type="button" className="btn btn-ghost" onClick={() => setShowUploadModal(false)}>Batal</button>
                  <button type="submit" className="btn btn-primary">Terbitkan Paspor Panen 📜</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Publish to B2B Market Modal */}
      <AnimatePresence>
        {showSellModal && activePassport && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ zIndex: 99999 }}>
            <motion.div className="modal-card glass-panel-solid p-xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="flex justify-between items-center mb-lg">
                <h3 className="text-h2 flex items-center gap-xs">
                  <ShoppingBag color="var(--primary-600)" /> Jual Paspor Panen #{activePassport.id}
                </h3>
                <button className="btn-icon" onClick={() => setShowSellModal(false)}><X size={20} /></button>
              </div>

              <form onSubmit={handlePublishToMarket} className="flex flex-col gap-md">
                <div className="p-md rounded-xl bg-primary-50/50 border border-primary-200">
                  <p className="font-bold text-body">{activePassport.commodity} (Grade {activePassport.aiVerifiedGrade || activePassport.claimedGrade})</p>
                  <p className="text-caption">Volume: <strong>{activePassport.weightTon} Ton</strong> • ID: #{activePassport.id}</p>
                </div>

                <div>
                  <label className="text-caption font-bold block mb-xs">Ekspektasi Harga per kg (Rp)</label>
                  <input type="number" step="1000" className="input-field" value={sellPrice} onChange={e => setSellPrice(e.target.value)} required />
                </div>

                <div className="flex justify-end gap-md mt-md">
                  <button type="button" className="btn btn-ghost" onClick={() => setShowSellModal(false)}>Batal</button>
                  <button type="submit" className="btn btn-primary">Publikasi ke Pasar B2B 🚀</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
