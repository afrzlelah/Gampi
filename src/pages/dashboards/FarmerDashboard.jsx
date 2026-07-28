import { useState } from 'react';
import { useGlobalState } from '../../context/GlobalStateContext';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import { Sprout, Star, FileCheck, Ticket, ShoppingBag, Plus, X, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatRupiah } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function FarmerDashboard() {
  const { contracts = [], vouchers = [], harvests = [], supplies = [], publishSupplyToMarket } = useGlobalState() || {};
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const currentFarmer = user?.name || 'Pak Suharto';
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedPassportId, setSelectedPassportId] = useState('');
  const [sellPrice, setSellPrice] = useState('38000');
  const [isSuccess, setIsSuccess] = useState(false);

  // Dynamic calculations
  const myContracts = (contracts || []).filter(c => c && (c.farmer === currentFarmer || c.farmer === 'Pak Suharto' || c.farmer === 'Poktan Makmur Jaya'));
  const myVouchers = (vouchers || []).filter(v => v && (v.farmer === currentFarmer || !v.farmer));
  
  // All farmer's passports
  const mySupplies = (supplies || []).filter(s => s && (s.farmer === currentFarmer || s.farmer === 'Pak Suharto'));
  // Passports that are verified BUT NOT YET PUBLISHED TO MARKETPLACE
  const unpublishedPassports = mySupplies.filter(s => !s.isPublished && s.marketStatus !== 'Terkunci / Terjual');
  // Passports currently listed/published in market
  const publishedSupplies = mySupplies.filter(s => s.isPublished);

  const handleSellSubmit = (e) => {
    e.preventDefault();
    const passportToSell = selectedPassportId || (unpublishedPassports[0] ? unpublishedPassports[0].id : null);
    
    if (passportToSell) {
      publishSupplyToMarket(passportToSell, parseInt(sellPrice) || 38000);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setShowSellModal(false);
      }, 1800);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header flex justify-between items-center">
        <div>
          <h2 className="text-h2">Selamat Datang, {currentFarmer} 🌾</h2>
          <p className="text-caption">Jual komoditas panen melalui Paspor Panen terverifikasi AI ke pasar B2B.</p>
        </div>

        {/* PRIMARY SELL HARVEST BUTTON FOR FARMERS */}
        <button 
          className="btn btn-primary btn-lg flex items-center gap-xs shadow-lg"
          onClick={() => setShowSellModal(true)}
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)', fontSize: '1rem', padding: '12px 24px' }}
        >
          <ShoppingBag size={20} /> Jual Hasil Panen (Pilih Paspor) 🚀
        </button>
      </div>

      <div className="dashboard__stats" style={{ marginTop: 20 }}>
        <StatCard title="Stok Panen Dipublikasi" value={publishedSupplies.length} unit="Paspor" trend={+15} icon={Sprout} />
        <StatCard title="Skor Reputasi Tani" value="92" unit="/100" trend={+4} icon={Star} />
        <StatCard title="Kontrak B2B Aktif" value={myContracts.length} unit="Kontrak" icon={FileCheck} />
        <StatCard title="E-Voucher Saprotan" value={myVouchers.length} unit="Voucher" icon={Ticket} />
      </div>

      <div className="dashboard__grid" style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: 24 }}>
        {/* Active Supply & Listings */}
        <div className="glass-panel" style={{ padding: 24 }}>
          <div className="flex justify-between items-center mb-md">
            <h3 className="text-h3">Komoditas Anda di Pasar B2B</h3>
            <button className="btn btn-ghost text-primary-600 text-caption font-bold" onClick={() => navigate('/harvest-passport')}>
              + Buat Paspor Panen Baru
            </button>
          </div>

          <div className="flex flex-col gap-sm">
            {publishedSupplies.length > 0 ? publishedSupplies.map(s => (
              <div key={s.id} className="flex justify-between items-center" style={{ padding: 16, background: 'rgba(16,185,129,0.04)', borderRadius: 14, border: '1px solid rgba(16,185,129,0.15)' }}>
                <div>
                  <div className="flex items-center gap-xs mb-xs">
                    <span className="font-bold text-body">{s.commodity}</span>
                    <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>Grade {s.aiVerifiedGrade || s.claimedGrade}</span>
                  </div>
                  <p className="text-caption text-tertiary">Volume: <strong>{s.weightTon} Ton</strong> • ID Paspor: #{s.id}</p>
                </div>
                <div className="text-right">
                  <span className={`badge ${s.marketStatus === 'Terkunci / Terjual' ? 'badge-error' : 'badge-primary'}`}>
                    {s.marketStatus === 'Terkunci / Terjual' ? '🔒 Terkunci / Terjual' : '🚀 Aktif di Pasar B2B'}
                  </span>
                  <p className="text-caption text-success font-bold mt-2xs">Harga: Rp {(s.expectedPrice || 38000).toLocaleString('id-ID')}/kg</p>
                </div>
              </div>
            )) : (
              <div className="text-center p-xl border-2 border-dashed border-glass rounded-2xl">
                <ShieldCheck size={36} color="var(--primary-500)" className="mx-auto mb-xs" />
                <p className="font-bold text-body">Belum Ada Komoditas yang Dipublikasi ke Pasar</p>
                <p className="text-caption mb-md">Anda wajib membuat <strong>Harvest Passport Terverifikasi AI</strong> terlebih dahulu sebelum komoditas dapat dijual ke pasar B2B.</p>
                <button className="btn btn-primary" onClick={() => navigate('/harvest-passport')}>Buat Paspor Panen Sekarang 📜</button>
              </div>
            )}
          </div>
        </div>

        {/* E-Voucher Saprotan Wallet */}
        <div className="glass-panel-solid" style={{ padding: 24 }}>
          <div className="flex justify-between items-center mb-md">
            <h3 className="text-h3 flex items-center gap-xs">
              <Ticket size={20} color="var(--primary-600)" /> Dompet E-Voucher
            </h3>
            <span className="text-caption text-primary-600 font-bold">Closed-Loop</span>
          </div>
          <p className="text-caption mb-md">Voucher non-tunai hasil pendanaan investor untuk ditebus di Toko Tani Mitra.</p>

          <div className="flex flex-col gap-sm">
            {myVouchers.map(v => (
              <div key={v.id} style={{ padding: 14, background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.02))', borderRadius: 12, border: '1px solid rgba(16,185,129,0.2)' }}>
                <div className="flex justify-between items-start mb-xs">
                  <span className="font-bold text-body" style={{ fontSize: '0.875rem' }}>{v.title}</span>
                  <span className="badge badge-success">{v.status}</span>
                </div>
                <p className="text-caption text-tertiary">Mitra: {v.partner}</p>
                <div className="flex justify-between items-center mt-sm pt-xs border-t border-glass">
                  <span className="font-mono text-caption font-bold" style={{ color: 'var(--primary-700)' }}>Kode: {v.code}</span>
                  <span className="font-bold text-body" style={{ color: 'var(--primary-600)' }}>{v.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SELL MODAL: MANDATORY HARVEST PASSPORT CHECK */}
      <AnimatePresence>
        {showSellModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-card glass-panel-solid p-xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="flex justify-between items-center mb-lg">
                <h3 className="text-h2 flex items-center gap-xs">
                  <ShoppingBag color="var(--primary-600)" /> Jual Hasil Panen Ke Pasar B2B
                </h3>
                <button className="btn-icon" onClick={() => setShowSellModal(false)}><X size={20} /></button>
              </div>

              {/* MANDATORY CHECK: If farmer has NO verified unpublished passport, FORCE them to create one first! */}
              {unpublishedPassports.length === 0 ? (
                <div className="text-center py-lg">
                  <div className="inline-flex p-md bg-amber-50 text-amber-600 rounded-full mb-md">
                    <AlertTriangle size={48} color="#f59e0b" />
                  </div>
                  <h3 className="text-h2 mb-xs">Wajib Buat Paspor Panen Terlebih Dahulu!</h3>
                  <p className="text-caption mb-lg">
                    Sesuai standar ekosistem GAMPI, Anda **tidak dapat menjual hasil panen secara langsung** tanpa sertifikasi <strong>Harvest Passport</strong> yang terverifikasi AI.
                  </p>
                  <div className="flex justify-center gap-md">
                    <button className="btn btn-ghost" onClick={() => setShowSellModal(false)}>Batal</button>
                    <button className="btn btn-primary flex items-center gap-xs" onClick={() => navigate('/harvest-passport')}>
                      <ShieldCheck size={18} /> Buat Harvest Passport AI Sekarang 📜
                    </button>
                  </div>
                </div>
              ) : isSuccess ? (
                <div className="text-center py-xl">
                  <div className="inline-flex p-md bg-success-50 text-success rounded-full mb-md">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-h2 mb-xs">Paspor Panen Berhasil Dipublikasi!</h3>
                  <p className="text-caption">Komoditas Anda kini aktif di B2B Marketplace & siap diajukan kontrak oleh Pembeli Hotel/UMKM.</p>
                </div>
              ) : (
                <form onSubmit={handleSellSubmit} className="flex flex-col gap-md">
                  <div className="alert alert-info p-md flex gap-sm items-start" style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: 12 }}>
                    <ShieldCheck color="var(--primary-600)" size={20} />
                    <p className="text-caption">
                      <strong>Paspor Panen Terverifikasi Ditemukan:</strong> Pilih salah satu Paspor Panen Anda di bawah ini yang akan dipublikasikan ke pasar B2B.
                    </p>
                  </div>

                  <div>
                    <label className="text-caption font-bold block mb-xs">Pilih Paspor Panen Terverifikasi</label>
                    <select 
                      className="input-field" 
                      value={selectedPassportId || (unpublishedPassports[0]?.id || '')} 
                      onChange={e => setSelectedPassportId(e.target.value)}
                      required
                    >
                      {unpublishedPassports.map(p => (
                        <option key={p.id} value={p.id}>
                          #{p.id} - {p.commodity} (Grade {p.aiVerifiedGrade || p.claimedGrade}) - {p.weightTon} Ton
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-caption font-bold block mb-xs">Ekspektasi Harga Penjualan per kg (Rp)</label>
                    <input type="number" step="1000" className="input-field" placeholder="38000" value={sellPrice} onChange={e => setSellPrice(e.target.value)} required />
                  </div>

                  <div className="flex justify-end gap-md mt-md">
                    <button type="button" className="btn btn-ghost" onClick={() => setShowSellModal(false)}>Batal</button>
                    <button type="submit" className="btn btn-primary flex items-center gap-xs">
                      <ShoppingBag size={18} /> Publikasi Paspor Panen ke B2B 🚀
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
