import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Send, CheckCircle2, MapPin, Calendar, Lock } from 'lucide-react';
import { useGlobalState } from '../context/GlobalStateContext';
import { useAuth } from '../context/AuthContext';
import { useTour, STEPS } from '../context/TourContext';
import { useNavigate } from 'react-router-dom';
import './B2BMarketplacePage.css';

export default function B2BMarketplacePage() {
  const { addDemand, supplies = [], addContract } = useGlobalState() || {};
  const { user } = useAuth();
  const { isTourActive, currentStep, advanceTour } = useTour();
  const navigate = useNavigate();

  // Demand Form state
  const [commodity, setCommodity] = useState('Cabai Merah Keriting');
  const [selectedGrades, setSelectedGrades] = useState(['A']);
  const [volumeTon, setVolumeTon] = useState('50');
  const [location, setLocation] = useState('Semarang, Jawa Tengah');
  const [deadline, setDeadline] = useState('2026-10-30');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleGrade = (grade) => {
    if (selectedGrades.includes(grade)) {
      setSelectedGrades(selectedGrades.filter(g => g !== grade));
    } else {
      setSelectedGrades([...selectedGrades, grade]);
    }
  };

  const handleDemandSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newDemand = {
      id: `DEMAND-${Math.floor(100 + Math.random() * 900)}`,
      buyer: user?.name || 'Hotel Gumaya Semarang',
      buyerType: user?.roleLabel || 'Pembeli Enterprise',
      commodity,
      requiredGrade: selectedGrades.join('/'),
      volumeTon: parseFloat(volumeTon) || 10,
      location,
      deadline,
      status: 'Mencari Supply'
    };

    setTimeout(() => {
      addDemand(newDemand);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleSendDirectContract = (sup) => {
    const newContract = {
      id: `FC-${Math.floor(1000 + Math.random() * 9000)}`,
      supplyId: sup.id,
      farmer: sup.farmer,
      buyer: user?.name || 'Hotel Gumaya Semarang',
      commodity: sup.commodity,
      grade: sup.aiVerifiedGrade || sup.claimedGrade || 'A',
      volume: `${sup.weightTon} Ton`,
      price: sup.expectedPrice || 38000,
      status: 'Menunggu',
      duration: '3 Bulan'
    };
    addContract(newContract);

    if (isTourActive && currentStep === STEPS.BUYER_MARKETPLACE) {
      advanceTour(STEPS.BUYER_APPROVE_CONTRACT);
    }

    navigate('/contracts');
  };

  // Only display supplies that are published and available in market (not locked/sold)
  const availableSupplies = (supplies || []).filter(s => s && s.isPublished && s.marketStatus === 'Mencari Pembeli');

  return (
    <div className="marketplace-page">
      <div className="marketplace-page__header flex justify-between items-center mb-xl">
        <div>
          <h2 className="text-h2 flex items-center gap-xs">
            B2B Demand Marketplace
            <span className="badge badge-primary flex items-center gap-xs" style={{ fontSize: '0.75rem' }}>
              <Sparkles size={14} /> AI Demand-Matching Engine
            </span>
          </h2>
          <p className="text-caption">Paspor Panen terverifikasi yang dipublikasi petani. Pilih komoditas & kunci kontrak secara real-time.</p>
        </div>
      </div>

      <div className="marketplace-page__grid">
        {/* Left Column: Kirim Permintaan Pembeli Form */}
        <div className="marketplace-form-card glass-panel p-xl">
          <h3 className="text-h2 mb-xs">Kirim Permintaan Pembeli</h3>
          <p className="text-caption mb-lg">Masukkan kebutuhan spesifik Anda untuk pencocokan AI</p>

          <form onSubmit={handleDemandSubmit} className="flex flex-col gap-lg">
            <div>
              <label className="text-caption font-bold block mb-xs">Jenis Komoditas</label>
              <select className="input-field" value={commodity} onChange={e => setCommodity(e.target.value)}>
                <option value="Cabai Merah Keriting">Cabai Merah Keriting</option>
                <option value="Bawang Merah Brebes">Bawang Merah Brebes</option>
                <option value="Tomat Fresh">Tomat Fresh</option>
                <option value="Brokoli Premium">Brokoli Premium</option>
                <option value="Padi Sawah IR64">Padi Sawah IR64</option>
              </select>
            </div>

            <div>
              <label className="text-caption font-bold block mb-xs">Kualitas / Grade</label>
              <div className="flex gap-md">
                {['A', 'B', 'C'].map(g => (
                  <label key={g} className={`checkbox-btn p-xs px-md rounded-xl cursor-pointer transition-all flex items-center gap-xs border ${selectedGrades.includes(g) ? 'border-primary-500 bg-primary-50 text-primary-700 font-bold' : 'border-glass text-tertiary'}`}>
                    <input type="checkbox" checked={selectedGrades.includes(g)} onChange={() => toggleGrade(g)} hidden />
                    Grade {g}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-caption font-bold block mb-xs">Target Volume (Tons)</label>
              <input type="number" className="input-field" placeholder="Contoh: 50" value={volumeTon} onChange={e => setVolumeTon(e.target.value)} required />
            </div>

            <div>
              <label className="text-caption font-bold block mb-xs">Lokasi Pengiriman</label>
              <div className="flex items-center gap-xs input-field">
                <MapPin size={16} color="var(--text-tertiary)" />
                <input type="text" style={{ border: 'none', padding: 0, width: '100%' }} placeholder="Masukkan kota atau koordinat" value={location} onChange={e => setLocation(e.target.value)} required />
              </div>
            </div>

            <div>
              <label className="text-caption font-bold block mb-xs">Jadwal Tanggat Waktu</label>
              <div className="flex items-center gap-xs input-field">
                <Calendar size={16} color="var(--text-tertiary)" />
                <input type="date" style={{ border: 'none', padding: 0, width: '100%' }} value={deadline} onChange={e => setDeadline(e.target.value)} required />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-full flex items-center justify-center gap-sm mt-md" disabled={isSubmitting}>
              <Sparkles size={18} /> {isSubmitting ? 'Mencari Supply AI...' : 'Jalankan Pencocokan AI'}
            </button>
          </form>
        </div>

        {/* Right Column: Hasil Rekomendasi AI Cards */}
        <div className="marketplace-recommendations flex flex-col gap-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-h2">Paspor Panen Tersedia di Pasar ({availableSupplies.length})</h3>
            <span className="text-caption font-bold text-tertiary">Status: <strong>Terkunci Otomatis Jika Dibeli</strong></span>
          </div>

          {availableSupplies.map((sup, i) => (
            <motion.div 
              key={sup.id} 
              className="recommendation-card glass-panel p-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex justify-between items-start mb-lg">
                <div className="flex items-center gap-md">
                  <div className="supplier-avatar p-md rounded-2xl bg-primary-50 text-primary-600 font-bold" style={{ fontSize: '1.25rem' }}>
                    🌾
                  </div>
                  <div>
                    <h4 className="text-h2" style={{ fontSize: '1.25rem' }}>{sup.commodity}</h4>
                    <p className="text-caption text-tertiary">📍 Petani: {sup.farmer} ({sup.poktan}) • Paspor #{sup.id}</p>
                    <span className="badge badge-success mt-2xs" style={{ fontSize: '0.6875rem' }}>TERVERIFIKASI AI</span>
                  </div>
                </div>

                <div className="score-badge text-center p-xs px-md rounded-2xl border border-primary-200 bg-primary-50">
                  <span className="text-h2 font-black text-primary-600">Grade {sup.aiVerifiedGrade || 'A'}</span>
                  <span className="text-overline block" style={{ fontSize: '0.625rem' }}>MUTU AI</span>
                </div>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-4 gap-md mb-lg">
                <div className="spec-box p-md rounded-xl text-center bg-gray-50">
                  <span className="text-overline">Volume Panen</span>
                  <p className="text-h3 font-bold text-primary-600">{sup.weightTon} Ton</p>
                </div>
                <div className="spec-box p-md rounded-xl text-center bg-gray-50">
                  <span className="text-overline">Harga Penawaran</span>
                  <p className="text-h3 font-bold">Rp {(sup.expectedPrice || 38000).toLocaleString('id-ID')}/kg</p>
                </div>
                <div className="spec-box p-md rounded-xl text-center bg-gray-50">
                  <span className="text-overline">Indeks Warna</span>
                  <p className="text-h3 font-bold">{sup.colorIndex || '98%'}</p>
                </div>
                <div className="spec-box p-md rounded-xl text-center bg-gray-50">
                  <span className="text-overline">Status Stok</span>
                  <p className="text-h3 font-bold text-success">Mencari Pembeli</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-md">
                <button className="btn btn-ghost border border-glass w-full flex items-center justify-center gap-xs" onClick={() => navigate('/harvest-passport')}>
                  <FileText size={16} /> Lihat Paspor Panen
                </button>
                <button 
                  className={`btn btn-primary w-full flex items-center justify-center gap-xs ${isTourActive && currentStep === STEPS.BUYER_MARKETPLACE ? 'pulse-gold-highlight' : ''}`} 
                  onClick={() => handleSendDirectContract(sup)}
                  style={isTourActive && currentStep === STEPS.BUYER_MARKETPLACE ? {
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)',
                    border: '2px solid #10b981'
                  } : {}}
                >
                  <Send size={16} /> Ajukan Kontrak (Kunci Stok) 🔒
                </button>
              </div>
            </motion.div>
          ))}

          {availableSupplies.length === 0 && (
            <div className="text-center p-xl glass-panel-solid rounded-2xl">
              <Lock size={36} color="var(--text-tertiary)" className="mx-auto mb-xs" />
              <p className="font-bold text-body">Seluruh stok komoditas di pasar saat ini telah terkunci / terjual.</p>
              <p className="text-caption">Gunakan form di sebelah kiri untuk mengirimkan permintaan baru kepada petani mitra.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
