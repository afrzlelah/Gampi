import { motion, AnimatePresence } from 'framer-motion';
import { useTour } from '../context/TourContext';
import { Sparkles, Trophy, ArrowRight } from 'lucide-react';

export default function TourFinishModal() {
  const { showFinishModal, finishTour } = useTour();

  if (!showFinishModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ zIndex: 999999 }}
      >
        <motion.div
          className="modal-card glass-panel-solid p-xl text-center"
          initial={{ scale: 0.8, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 30 }}
          style={{ maxWidth: 560, borderRadius: 28, border: '2px solid rgba(16, 185, 129, 0.4)' }}
        >
          <div className="inline-flex p-xl rounded-full bg-success-50 text-success mb-md">
            <Trophy size={56} color="#10b981" />
          </div>

          <span className="badge badge-success mb-xs" style={{ padding: '6px 16px', fontSize: '0.8125rem' }}>
            <Sparkles size={14} /> DEMO PANDUAN SIMULASI SELESAI
          </span>

          <h2 className="text-h1 mb-xs" style={{ color: '#047857' }}>Selamat! Anda Telah Menyaksikan Alur Ekosistem GAMPI 🎉</h2>

          <p className="text-caption mb-lg text-secondary" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
            Anda telah berhasil menyusuri seluruh rantai pasok digital GAMPI:
            <br />
            <strong>1. Petani</strong> (Buat Paspor & Crowdfunding) ➔ <strong>2. AI Admin</strong> (Verifikasi Mutu) ➔ <strong>3. Pembeli B2B</strong> (Kunci Kontrak) ➔ <strong>4. Investor</strong> (Pendanaan Saprotan & ROI).
          </p>

          <div className="alert alert-info p-md text-left mb-lg" style={{ background: 'rgba(16, 185, 129, 0.08)', borderRadius: 16 }}>
            <p className="text-caption font-bold text-primary-700">
              💡 Sekarang Anda bebas berpindah peran, mencoba fitur AI Voice Karsa, AI Diagnosis, maupun melihat laporan data di seluruh menu aplikasi!
            </p>
          </div>

          <button
            className="btn btn-primary btn-lg w-full flex items-center justify-center gap-sm"
            onClick={finishTour}
            style={{ fontSize: '1.0625rem', padding: '16px 28px', background: 'linear-gradient(135deg, #10b981, #059669)', cursor: 'pointer' }}
          >
            Selesai & Eksplorasi Bebas 🚀 <ArrowRight size={20} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
