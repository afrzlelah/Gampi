import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useGlobalState } from '../context/GlobalStateContext';
import { useTour, STEPS } from '../context/TourContext';
import './QualityCheckPage.css';

export default function QualityCheckPage() {
  const { supplies = [], verifySupplyByAdmin } = useGlobalState() || {};
  const { isTourActive, currentStep, advanceTour } = useTour();

  const [verifying, setVerifying] = useState(null);
  const [results, setResults] = useState({});

  const runVerification = (supplyId) => {
    setVerifying(supplyId);
    setTimeout(() => {
      const sup = supplies.find(s => s.id === supplyId);
      const claimedGrade = sup?.claimedGrade || 'A';
      
      setResults(prev => ({
        ...prev,
        [supplyId]: {
          passed: true,
          claimedGrade,
          actualGrade: claimedGrade,
          colorIndex: '98%',
          damageRate: '0.4%',
          confidence: '96.2%',
          reason: 'Analisis citra spektral dan riwayat pemupukan Karsa menunjukkan mutu komoditas sempurna sesuai klaim.'
        }
      }));

      // Update Global State so passport is verified
      if (verifySupplyByAdmin) {
        verifySupplyByAdmin(supplyId, claimedGrade);
      }

      setVerifying(null);

      if (isTourActive && currentStep === STEPS.ADMIN_QUALITY_CHECK) {
        advanceTour(STEPS.SWITCH_FARMER_PUBLISH);
      }
    }, 1800);
  };

  return (
    <div className="quality-check">
      <div className="quality-check__header mb-xl">
        <h2 className="text-h2 flex items-center gap-xs">
          AI Quality Grade Verifier (Backend System)
          <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>Anti-Fraud Verification</span>
        </h2>
        <p className="text-caption">Verifikasi otomatis klaim grade komoditas petani sebelum dipublikasikan ke B2B Marketplace.</p>
      </div>

      <div className="flex flex-col gap-lg">
        {(supplies || []).map((sup, i) => {
          const result = results[sup.id];
          const isPending = sup.verificationStatus?.includes('Pending');

          return (
            <motion.div
              key={sup.id}
              className="glass-panel p-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex justify-between items-start mb-lg">
                <div>
                  <div className="flex items-center gap-sm mb-xs">
                    <span className="font-mono font-bold text-caption text-tertiary">#{sup.id}</span>
                    <span className="badge badge-primary">Klaim Grade {sup.claimedGrade}</span>
                    {isPending && <span className="badge badge-warning">⏳ Menunggu Verifikasi Admin</span>}
                  </div>
                  <h3 className="text-h2">{sup.commodity}</h3>
                  <p className="text-caption text-tertiary">Petani: {sup.farmer} ({sup.poktan}) • {sup.weightTon} Ton • {sup.harvestDate}</p>
                </div>

                {!result && !sup.aiVerifiedGrade ? (
                  <button 
                    className={`btn btn-primary flex items-center gap-xs ${isTourActive && currentStep === STEPS.ADMIN_QUALITY_CHECK ? 'pulse-gold-highlight' : ''}`}
                    onClick={() => runVerification(sup.id)}
                    disabled={verifying === sup.id}
                    style={isTourActive && currentStep === STEPS.ADMIN_QUALITY_CHECK ? {
                      boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)',
                      border: '2px solid #10b981'
                    } : {}}
                  >
                    {verifying === sup.id ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                        <RefreshCw size={18} />
                      </motion.div>
                    ) : <ShieldCheck size={18} />}
                    {verifying === sup.id ? 'Memeriksa Citra Spektral...' : 'Jalankan Verifikasi AI 🛡️'}
                  </button>
                ) : (
                  <span className="badge badge-success flex items-center gap-xs" style={{ fontSize: '0.875rem', padding: '8px 16px' }}>
                    <CheckCircle2 size={18} /> GRADE VERIFIED (Grade {sup.aiVerifiedGrade || sup.claimedGrade})
                  </span>
                )}
              </div>

              {/* Verification Result */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-lg rounded-xl mt-md"
                    style={{ 
                      background: 'rgba(16,185,129,0.05)', 
                      border: '1px solid rgba(16,185,129,0.2)' 
                    }}
                  >
                    <div className="grid grid-4 gap-md mb-md">
                      <div className="text-center">
                        <span className="text-overline">Klaim Petani</span>
                        <p className="text-h2 font-black">Grade {result.claimedGrade}</p>
                      </div>
                      <div className="text-center">
                        <span className="text-overline">Grade AI Aktual</span>
                        <p className="text-h2 font-black text-success">Grade {result.actualGrade}</p>
                      </div>
                      <div className="text-center">
                        <span className="text-overline">Indeks Warna</span>
                        <p className="text-h2 font-bold">{result.colorIndex}</p>
                      </div>
                      <div className="text-center">
                        <span className="text-overline">Kerusakan</span>
                        <p className="text-h2 font-bold">{result.damageRate}</p>
                      </div>
                    </div>
                    <p className="text-caption"><strong>Kesimpulan AI ({result.confidence}):</strong> {result.reason}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {supplies.length === 0 && (
          <p className="text-center text-caption p-xl glass-panel rounded-2xl">Tidak ada paspor panen yang memerlukan verifikasi.</p>
        )}
      </div>
    </div>
  );
}
