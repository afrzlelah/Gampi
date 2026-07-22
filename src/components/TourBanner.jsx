import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTour, STEPS } from '../context/TourContext';
import { Sparkles, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

const STEP_INFOS = {
  [STEPS.LOGIN_FARMER]: {
    title: 'Langkah 1: Pilih Peran Petani',
    desc: '👉 Klik kartu "Petani Mitra (Pak Suharto)". Peran lain dikunci sementara.',
  },
  [STEPS.NAV_ACADEMY]: {
    title: 'Langkah 2: Akses Smart Academy',
    desc: '👉 Klik menu "Smart Academy" di Sidebar kiri. Menu lain dikunci sementara.',
  },
  [STEPS.CREATE_PASSPORT]: {
    title: 'Langkah 3: Buat Paspor Panen Pertama',
    desc: '👉 Klik tombol hijau "+ Buat Paspor Panen Baru" di sudut kanan atas.',
  },
  [STEPS.SWITCH_ADMIN_VERIFY]: {
    title: 'Langkah 4: Ganti Peran ke Admin System',
    desc: '👉 Klik tombol "👉 GANTI ROLE: Admin System" di Navbar atas, lalu pilih Admin.',
  },
  [STEPS.ADMIN_QUALITY_CHECK]: {
    title: 'Langkah 5: Verifikasi Mutu AI Komoditas',
    desc: '👉 Klik tombol "Jalankan Verifikasi AI 🛡️" pada paspor panen yang baru dibuat.',
  },
  [STEPS.SWITCH_FARMER_PUBLISH]: {
    title: 'Langkah 6: Kembalikan Peran ke Petani',
    desc: '👉 Klik tombol "👉 GANTI ROLE: Petani Mitra" di Navbar atas, lalu pilih Petani.',
  },
  [STEPS.PUBLISH_TO_MARKET]: {
    title: 'Langkah 7: Jual Paspor Panen ke Pasar B2B',
    desc: '👉 Klik tombol hijau "Jual ke B2B Marketplace 🚀" pada paspor terverifikasi.',
  },
  [STEPS.SWITCH_BUYER]: {
    title: 'Langkah 8: Ganti Peran ke Pembeli Enterprise',
    desc: '👉 Klik tombol "👉 GANTI ROLE: Pembeli Enterprise" di Navbar atas, lalu pilih Hotel Gumaya.',
  },
  [STEPS.BUYER_MARKETPLACE]: {
    title: 'Langkah 9: Pembeli Ajukan Kontrak Penyerapan',
    desc: '👉 Klik tombol "Ajukan Kontrak (Kunci Stok) 🔒" pada komoditas petani.',
  },
  [STEPS.BUYER_APPROVE_CONTRACT]: {
    title: 'Langkah 10: Setujui Kontrak (Kunci Stok Permanen)',
    desc: '👉 Klik tombol "Setujui Kontrak (Kunci Stok) 🔒". Stok otomatis TERKUNCI PERMANEN.',
  },
  [STEPS.SWITCH_FARMER_CROWDFUND]: {
    title: 'Langkah 11: Kembalikan Peran ke Petani',
    desc: '👉 Klik tombol "👉 GANTI ROLE: Petani Mitra" di Navbar atas untuk mengajukan Crowdfunding.',
  },
  [STEPS.CREATE_CROWDFUND]: {
    title: 'Langkah 12: Petani Ajukan Crowdfunding Proyek',
    desc: '👉 Klik tombol "+ Ajukan Proyek Crowdfunding Baru 💰" di sudut kanan atas.',
  },
  [STEPS.SWITCH_INVESTOR]: {
    title: 'Langkah 13: Ganti Peran ke Investor Sosial',
    desc: '👉 Klik tombol "👉 GANTI ROLE: Investor Sosial" di Navbar atas, lalu pilih Investor.',
  },
  [STEPS.INVESTOR_FUND]: {
    title: 'Langkah 14: Investor Mendanai Proyek Tani',
    desc: '👉 Klik tombol "Danai Proyek Ini Sekarang 💸". E-Voucher Saprotan non-tunai diterbitkan!',
  }
};

export default function TourBanner() {
  const { isTourActive, currentStep, resetTour } = useTour();
  const [collapsed, setCollapsed] = useState(false);
  const info = STEP_INFOS[currentStep];

  if (!isTourActive || !info) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 99999,
          maxWidth: 420,
          width: '90%',
          pointerEvents: 'auto'
        }}
      >
        <div 
          className="glass-panel-solid p-md"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.96), rgba(5, 150, 105, 0.96))',
            color: '#ffffff',
            borderRadius: 20,
            boxShadow: '0 16px 36px rgba(16, 185, 129, 0.4)',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(16px)'
          }}
        >
          <div className="flex justify-between items-center mb-xs">
            <div className="flex items-center gap-xs">
              <Sparkles size={16} color="#ffffff" />
              <span className="badge" style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: '0.6875rem', fontWeight: 800 }}>
                MODUS PANDUAN JURI (GUIDED TOUR)
              </span>
            </div>

            <div className="flex items-center gap-xs">
              <button 
                onClick={() => setCollapsed(!collapsed)}
                style={{ border: 'none', background: 'rgba(255,255,255,0.2)', padding: 4, borderRadius: 6, color: '#fff', cursor: 'pointer', display: 'flex' }}
                title={collapsed ? "Buka Panduan" : "Kecilkan Panduan"}
              >
                {collapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <button 
                onClick={resetTour} 
                style={{ border: 'none', background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: 6, color: '#fff', cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}
                title="Reset Panduan dari Awal"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>
          </div>

          {!collapsed && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <h4 className="font-bold text-h3" style={{ color: '#ffffff', fontSize: '0.9375rem', marginTop: 4 }}>{info.title}</h4>
              <p className="text-caption" style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.8125rem', marginTop: 4, lineHeight: 1.5, fontWeight: 600 }}>
                {info.desc}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
