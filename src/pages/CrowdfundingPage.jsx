import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiggyBank, ShieldCheck, MapPin, Users, TrendingUp, DollarSign, Plus, X, CheckCircle2 } from 'lucide-react';
import { useGlobalState } from '../context/GlobalStateContext';
import { useAuth } from '../context/AuthContext';
import { useTour, STEPS } from '../context/TourContext';
import { formatRupiah } from '../data/mockData';
import './CrowdfundingPage.css';

export default function CrowdfundingPage() {
  const { projects = [], fundProject, setProjects } = useGlobalState() || {};
  const { user } = useAuth();
  const { isTourActive, currentStep, advanceTour, setCreatedProjectId } = useTour();

  const [selectedProject, setSelectedProject] = useState(null);
  const [fundAmount, setFundAmount] = useState('5000000');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Crowdfunding Proposal State for Farmer
  const [createForm, setCreateForm] = useState({
    title: 'Pengembangan Kebun Cabai Organik Bandungan',
    farmer: user?.name || 'Pak Suharto',
    targetFunding: '25000000',
    roi: '18%',
    duration: '6 Bulan',
    description: 'Pengadaan bibit unggul CMK-01, pupuk organik terverifikasi, dan pemasangan drip irrigation otomatis berbasis IoT.'
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newProj = {
      id: `PROJ-${Math.floor(100 + Math.random() * 900)}`,
      title: createForm.title,
      farmer: user?.name || 'Pak Suharto',
      poktan: 'Poktan Makmur Jaya',
      targetFunding: parseInt(createForm.targetFunding) || 25000000,
      currentFunding: 0,
      investors: 0,
      roi: createForm.roi,
      duration: createForm.duration,
      location: 'Bandungan, Jawa Tengah',
      riskLevel: 'Rendah (Terproteksi Kontrak B2B)',
      description: createForm.description,
      status: 'active'
    };

    if (setProjects) {
      setProjects(prev => [newProj, ...prev]);
    }
    setCreatedProjectId(newProj.id);
    setShowCreateModal(false);

    if (isTourActive && currentStep === STEPS.CREATE_CROWDFUND) {
      advanceTour(STEPS.SWITCH_INVESTOR);
    }
  };

  const handleFund = (projId) => {
    fundProject(projId, parseInt(fundAmount) || 5000000);
    setSelectedProject(null);

    if (isTourActive && currentStep === STEPS.INVESTOR_FUND) {
      advanceTour(STEPS.FINISHED);
    }
  };

  const isFarmer = user?.role === 'farmer' || user?.role === 'admin';
  const isInvestor = user?.role === 'investor' || user?.role === 'admin';

  return (
    <div className="crowdfunding-page">
      <div className="crowdfunding-page__header flex justify-between items-center mb-xl">
        <div>
          <h2 className="text-h2 flex items-center gap-xs">
            Crowdfunding Modal Kerja Tani
            <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>Closed-Loop E-Voucher</span>
          </h2>
          <p className="text-caption">Pendanaan berdampak sosial dengan perlindungan serapan hasil panen oleh Forward Contract B2B.</p>
        </div>

        {isFarmer && (
          <button 
            className={`btn btn-primary ${isTourActive && currentStep === STEPS.CREATE_CROWDFUND ? 'pulse-gold-highlight' : ''}`}
            onClick={() => setShowCreateModal(true)}
            style={isTourActive && currentStep === STEPS.CREATE_CROWDFUND ? {
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)',
              border: '2px solid #10b981'
            } : {}}
          >
            <Plus size={18} /> Ajukan Proyek Crowdfunding Baru 💰
          </button>
        )}
      </div>

      <div className="grid grid-3 gap-lg">
        {(projects || []).map((proj, i) => {
          const percent = Math.min(100, Math.round((proj.currentFunding / proj.targetFunding) * 100));

          return (
            <motion.div
              key={proj.id}
              className="glass-panel p-xl flex flex-col justify-between"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div>
                <div className="flex justify-between items-start mb-md">
                  <span className="badge badge-primary">{proj.roi} Estimated ROI</span>
                  <span className="badge badge-success flex items-center gap-2xs">
                    <ShieldCheck size={12} /> B2B Protected
                  </span>
                </div>

                <h3 className="text-h2 mb-xs">{proj.title}</h3>
                <p className="text-caption text-tertiary mb-md">👨‍🌾 Petani: <strong>{proj.farmer}</strong> ({proj.poktan || 'Poktan Makmur'})</p>

                <p className="text-caption mb-lg text-secondary">{proj.description}</p>

                {/* Progress Bar */}
                <div className="mb-lg">
                  <div className="flex justify-between text-caption mb-xs">
                    <span>Terkumpul: <strong>{formatRupiah(proj.currentFunding)}</strong></span>
                    <span className="font-bold text-primary-600">{percent}%</span>
                  </div>
                  <div style={{ height: 8, background: 'rgba(0,0,0,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${percent}%`, background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: 4 }} />
                  </div>
                  <div className="flex justify-between text-caption text-tertiary mt-xs" style={{ fontSize: '0.75rem' }}>
                    <span>Target: {formatRupiah(proj.targetFunding)}</span>
                    <span>{proj.investors} Investor</span>
                  </div>
                </div>
              </div>

              {isInvestor ? (
                <button
                  className={`btn btn-primary w-full flex items-center justify-center gap-xs ${isTourActive && currentStep === STEPS.INVESTOR_FUND ? 'pulse-gold-highlight' : ''}`}
                  onClick={() => setSelectedProject(proj)}
                  style={isTourActive && currentStep === STEPS.INVESTOR_FUND ? {
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)',
                    border: '2px solid #10b981'
                  } : {}}
                >
                  <DollarSign size={16} /> Danai Proyek Ini Sekarang 💸
                </button>
              ) : (
                <div className="p-sm text-center bg-gray-50 rounded-xl border border-glass">
                  <span className="text-caption text-tertiary">Alihkan peran ke <strong>Investor Sosial</strong> untuk mendanai</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Funding Modal for Investor */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ zIndex: 99999 }}>
            <motion.div className="modal-card glass-panel-solid p-xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="flex justify-between items-center mb-lg">
                <h3 className="text-h2">Danai Proyek: {selectedProject.title}</h3>
                <button className="btn-icon" onClick={() => setSelectedProject(null)}><X size={20} /></button>
              </div>

              <div className="p-md rounded-xl bg-primary-50/50 border border-primary-200 mb-lg">
                <p className="text-caption text-tertiary">Petani Mitra: {selectedProject.farmer}</p>
                <p className="font-bold text-h3 text-primary-700">Estimasi Imbal Hasil (ROI): {selectedProject.roi}</p>
              </div>

              <div className="mb-lg">
                <label className="text-caption font-bold block mb-xs">Nominal Pendanaan (Rp)</label>
                <input
                  type="number"
                  step="1000000"
                  className="input-field"
                  value={fundAmount}
                  onChange={e => setFundAmount(e.target.value)}
                />
              </div>

              <div className="alert alert-info p-md mb-lg" style={{ background: 'rgba(16, 185, 129, 0.08)', borderRadius: 12 }}>
                <p className="text-caption">
                  <strong>Penerbitan E-Voucher Saprotan:</strong> Dana Anda akan dialokasikan secara non-tunai langsung ke E-Voucher Pupuk/Benih mitra tani.
                </p>
              </div>

              <div className="flex justify-end gap-md">
                <button className="btn btn-ghost" onClick={() => setSelectedProject(null)}>Batal</button>
                <button className="btn btn-primary" onClick={() => handleFund(selectedProject.id)}>
                  Setor Pendanaan 🚀
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Farmer Create Proposal Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ zIndex: 99999 }}>
            <motion.div className="modal-card glass-panel-solid p-xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div className="flex justify-between items-center mb-lg">
                <h3 className="text-h2">Ajukan Proyek Crowdfunding Baru</h3>
                <button className="btn-icon" onClick={() => setShowCreateModal(false)}><X size={20} /></button>
              </div>

              <form onSubmit={handleCreateSubmit} className="flex flex-col gap-md">
                <div>
                  <label className="text-caption font-bold block mb-xs">Judul Proyek</label>
                  <input type="text" className="input-field" value={createForm.title} onChange={e => setCreateForm({...createForm, title: e.target.value})} required />
                </div>

                <div className="grid grid-2 gap-md">
                  <div>
                    <label className="text-caption font-bold block mb-xs">Target Kebutuhan Dana (Rp)</label>
                    <input type="number" step="1000000" className="input-field" value={createForm.targetFunding} onChange={e => setCreateForm({...createForm, targetFunding: e.target.value})} required />
                  </div>
                  <div>
                    <label className="text-caption font-bold block mb-xs">Estimasi ROI Bagi Hasil (%)</label>
                    <input type="text" className="input-field" value={createForm.roi} onChange={e => setCreateForm({...createForm, roi: e.target.value})} required />
                  </div>
                </div>

                <div>
                  <label className="text-caption font-bold block mb-xs">Deskripsi Rencana Penggunaan Modal</label>
                  <textarea className="input-field" rows={3} value={createForm.description} onChange={e => setCreateForm({...createForm, description: e.target.value})} required />
                </div>

                <div className="flex justify-end gap-md mt-md">
                  <button type="button" className="btn btn-ghost" onClick={() => setShowCreateModal(false)}>Batal</button>
                  <button type="submit" className="btn btn-primary">Terbitkan Proposal Crowdfunding 🚀</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
