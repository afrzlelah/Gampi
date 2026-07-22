import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, Sprout, Award, ShoppingBag, FileText, Lock, ArrowRight } from 'lucide-react';

const ONBOARDING_KEY = 'agridaya_onboarding_seen';

const steps = [
  {
    title: 'Selamat Datang di AGRIDAYA! 🌾',
    subtitle: 'Platform B2B Demand-Driven untuk Rantai Pasok Pertanian Berkelanjutan',
    content: 'AGRIDAYA menghubungkan Petani, Pembeli B2B (Hotel & UMKM), dan Investor dalam satu ekosistem terintegrasi.\n\nBerikut adalah panduan singkat alur simulasi yang dapat Anda coba.',
    icon: <Sprout size={48} />,
    color: '#10b981'
  },
  {
    title: 'Langkah 1: Petani Membuat Paspor Panen 📜',
    subtitle: 'Menu: Harvest Passport',
    content: 'Login sebagai Petani (Pak Suharto), lalu buka halaman Harvest Passport.\n\n• Klik "Buat Paspor Panen Baru" → Isi data komoditas, grade, dan volume.\n• Sistem AI akan memverifikasi klaim grade petani secara otomatis.\n• Setiap Paspor Panen memiliki ID unik (contoh: AGRI-PP-0001) yang konsisten di seluruh ekosistem.',
    icon: <Award size={48} />,
    color: '#15803d'
  },
  {
    title: 'Langkah 2: Petani Menjual ke Pasar B2B 🚀',
    subtitle: 'Menu: Dashboard → Jual Hasil Panen',
    content: 'Setelah Paspor Panen terverifikasi, Petani dapat menjualnya:\n\n• Di Dashboard Petani, klik "Jual Hasil Panen (Pilih Paspor)".\n• Pilih Paspor Panen yang sudah terverifikasi → masukkan harga → Publikasi!\n• Komoditas kini muncul di B2B Marketplace untuk dilihat oleh Pembeli.',
    icon: <ShoppingBag size={48} />,
    color: '#3b82f6'
  },
  {
    title: 'Langkah 3: Pembeli Membeli dari Marketplace 🛒',
    subtitle: 'Login sebagai Pembeli Enterprise / UMKM',
    content: 'Login sebagai Pembeli (Hotel Gumaya / RM Padang Sederhana).\n\n• Buka B2B Marketplace → lihat komoditas yang dipublikasi Petani.\n• Klik "Ajukan Kontrak (Kunci Stok) 🔒" → stok otomatis TERKUNCI.\n• Pembeli lain tidak bisa membeli stok yang sudah terkunci.\n\n📌 Nomor Paspor Panen (AGRI-PP-0001) yang sama terlihat di sisi Petani, Pembeli, dan Admin.',
    icon: <Lock size={48} />,
    color: '#f59e0b'
  },
  {
    title: 'Langkah 4: Penolakan & Persetujuan Kontrak ✅',
    subtitle: 'Menu: Forward Contract',
    content: 'Di halaman Forward Contract:\n\n• Pembeli dapat menyetujui atau menolak kontrak.\n• Jika DITOLAK → status berubah menjadi "Ditolak oleh [Nama Pembeli]" dan komoditas KEMBALI ke Marketplace agar pembeli lain bisa membelinya.\n• Jika DISETUJUI → stok TERKUNCI PERMANEN dan kontrak resmi aktif.',
    icon: <FileText size={48} />,
    color: '#8b5cf6'
  },
  {
    title: 'Selamat Menikmati Demo! 🎉',
    subtitle: 'Fitur Lain yang Dapat Dijelajahi',
    content: '• 🤖 AI Karsa: Pencatatan tani lewat suara (Mode di Lahan untuk outdoor)\n• 📊 AI Diagnosis: Upload foto tanaman untuk analisis kesehatan AI\n• 💰 Crowdfunding: Investor mendanai proyek → E-Voucher Saprotan non-tunai terbit ke Petani\n• 🏆 Reputation Score: Skor kredibilitas tani berbasis performa\n• 🎓 Smart Academy: Edukasi & sertifikasi petani digital\n\nSilakan eksplorasi semua fitur! Panduan ini hanya muncul sekali saja.',
    icon: <Sprout size={48} />,
    color: '#059669'
  }
];

export default function OnboardingGuide() {
  const [show, setShow] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem(ONBOARDING_KEY);
    if (!seen) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setShow(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!show) return null;

  const step = steps[currentStep];

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ zIndex: 9999 }}
      >
        <motion.div
          className="glass-panel-solid"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          style={{
            maxWidth: 560,
            width: '90%',
            padding: 36,
            borderRadius: 24,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{ position: 'absolute', top: 16, right: 16, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}
          >
            <X size={20} />
          </button>

          {/* Step Indicator */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 28, justifyContent: 'center' }}>
            {steps.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === currentStep ? 32 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === currentStep ? step.color : 'rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

          {/* Icon */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{
              display: 'inline-flex',
              padding: 20,
              borderRadius: 24,
              background: `${step.color}15`,
              color: step.color
            }}>
              {step.icon}
            </div>
          </div>

          {/* Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4, textAlign: 'center' }}>
              {step.title}
            </h2>
            <p style={{ fontSize: '0.8125rem', color: step.color, fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>
              {step.subtitle}
            </p>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-line', color: 'var(--text-secondary)' }}>
              {step.content}
            </p>
          </motion.div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28 }}>
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="btn btn-ghost"
              style={{ opacity: currentStep === 0 ? 0.3 : 1 }}
            >
              <ChevronLeft size={18} /> Sebelumnya
            </button>

            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
              {currentStep + 1} / {steps.length}
            </span>

            <button
              onClick={handleNext}
              className="btn btn-primary"
              style={{ background: step.color }}
            >
              {currentStep === steps.length - 1 ? 'Mulai Demo!' : 'Selanjutnya'} <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
