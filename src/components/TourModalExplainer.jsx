import { motion, AnimatePresence } from 'framer-motion';
import { useTour, STEPS } from '../context/TourContext';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, MapPin, Bot, Star, ArrowRight, CheckCircle2 } from 'lucide-react';

const AUTO_STEPS = {
  [STEPS.TOUR_ACADEMY]: {
    title: ' Smart Academy (Edukasi Tani Digital)',
    icon: <GraduationCap size={44} color="#10b981" />,
    desc: 'Fitur ini mengedukasi petani mengenai standar mutu B2B, penerapan Good Agricultural Practices (GAP), dan teknologi ramah lingkungan untuk menjamin Zero Food Loss.',
    nextText: 'Lanjut ke Dashboard Petani 🚀',
    nextPath: '/dashboard',
    nextStep: STEPS.TOUR_DASHBOARD
  },
  [STEPS.TOUR_DASHBOARD]: {
    title: ' Dashboard Ekosistem Petani',
    icon: <LayoutDashboard size={44} color="#10b981" />,
    desc: 'Pusat pantauan harian petani: melihat reputasi tani, daftar E-Voucher modal kerja, serta penawaran paspor panen yang sedang dipasarkan.',
    nextText: 'Lanjut ke Farm Identity 📍',
    nextPath: '/farm-identity',
    nextStep: STEPS.TOUR_FARM_IDENTITY
  },
  [STEPS.TOUR_FARM_IDENTITY]: {
    title: ' Farm Identity (Identitas Kebun GPS)',
    icon: <MapPin size={44} color="#10b981" />,
    desc: 'Mencatat koordinat GPS kebun, keanggotaan Kelompok Tani (Poktan), luas lahan, dan tipe tanah untuk validasi transparansi rantai pasok.',
    nextText: 'Lanjut ke AI Voice Karsa 🤖',
    nextPath: '/karsa',
    nextStep: STEPS.TOUR_KARSA
  },
  [STEPS.TOUR_KARSA]: {
    title: ' AI Voice Karsa (Asisten Suara Lahan)',
    icon: <Bot size={44} color="#10b981" />,
    desc: 'Asisten AI berbasis suara yang dirancang khusus untuk petani saat di lapangan. Mendukung Mode Lahan (Outdoor Mode) dengan input suara untuk mencatat panen tanpa perlu mengetik.',
    nextText: 'Lanjut ke Reputation Score 🏆',
    nextPath: '/reputation',
    nextStep: STEPS.TOUR_REPUTATION
  },
  [STEPS.TOUR_REPUTATION]: {
    title: ' Reputation Score (Kredibilitas Tani)',
    icon: <Star size={44} color="#10b981" />,
    desc: 'Skor kredibilitas otomatis berbasis histori pemenuhan kontrak dan kualitas panen. Skor tinggi memudahkan petani mendapatkan akses crowdfunding & kontrak B2B premium.',
    nextText: 'Lanjut ke Harvest Passport (Buat Paspor) 📜',
    nextPath: '/harvest-passport',
    nextStep: STEPS.CREATE_PASSPORT
  }
};

export default function TourModalExplainer() {
  const { isTourActive, currentStep, advanceTour } = useTour();
  const navigate = useNavigate();

  const stepInfo = AUTO_STEPS[currentStep];

  if (!isTourActive || !stepInfo) return null;

  const handleNext = () => {
    advanceTour(stepInfo.nextStep);
    navigate(stepInfo.nextPath);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ zIndex: 99999 }}
      >
        <motion.div
          className="modal-card glass-panel-solid p-xl text-center"
          initial={{ scale: 0.85, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.85, y: 20 }}
          style={{ maxWidth: 520, borderRadius: 24 }}
        >
          <div className="inline-flex p-lg rounded-full bg-primary-50 text-primary-600 mb-md">
            {stepInfo.icon}
          </div>

          <h3 className="text-h2 mb-xs">{stepInfo.title}</h3>
          <p className="text-caption mb-lg text-secondary" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
            {stepInfo.desc}
          </p>

          <button
            className="btn btn-primary btn-lg w-full flex items-center justify-center gap-sm"
            onClick={handleNext}
            style={{ fontSize: '1rem', padding: '14px 24px' }}
          >
            {stepInfo.nextText} <ArrowRight size={18} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
