import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, ArrowRight, RefreshCw, CheckCircle2, FileCheck } from 'lucide-react';
import { buyers } from '../data/mockData';
import { useGlobalState } from '../context/GlobalStateContext';
import './SmartMatchingPage.css';

export default function SmartMatchingPage() {
  const { harvests, addContract } = useGlobalState();
  const [isMatching, setIsMatching] = useState(false);
  const [matched, setMatched] = useState([]);
  const [confirmedIds, setConfirmedIds] = useState([]);

  const handleMatch = () => {
    setIsMatching(true);
    setMatched([]);
    setConfirmedIds([]);
    
    // Auto-match algorithm combining live harvests reported by farmers with B2B demand
    setTimeout(() => {
      setIsMatching(false);
      const generatedMatches = harvests.slice(0, 4).map((h, index) => {
        const buyer = buyers[index % buyers.length];
        return {
          id: h.id || index,
          farmerName: h.farmer,
          buyerName: buyer.name,
          buyerType: buyer.type,
          buyerIcon: buyer.icon,
          commodity: h.commodity,
          volume: `${h.volumeKg} kg`,
          price: 36000
        };
      });
      setMatched(generatedMatches);
    }, 2000);
  };

  const handleConfirmContract = (matchItem) => {
    const newContract = {
      id: `FC-${Math.floor(1000 + Math.random() * 9000)}`,
      farmer: matchItem.farmerName,
      buyer: matchItem.buyerName,
      commodity: matchItem.commodity,
      grade: 'A',
      volume: matchItem.volume,
      price: matchItem.price,
      status: 'Aktif',
      duration: '3 Bulan'
    };

    addContract(newContract);
    setConfirmedIds(prev => [...prev, matchItem.id]);
  };

  return (
    <div className="matching">
      <div className="matching__header">
        <div>
          <h2 className="text-h2 flex items-center gap-xs">
            System Automated Smart Demand Matching
            <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>Backend Algorithm</span>
          </h2>
          <p className="text-caption">Pencocokan otomatis hulu (Supply Panen Petani) dengan hilir (Demand B2B) oleh backend GAMPI</p>
        </div>
        <motion.button 
          className="btn btn-primary" 
          onClick={handleMatch}
          disabled={isMatching}
          whileHover={{ scale: 1.03 }} 
          whileTap={{ scale: 0.97 }}
        >
          {isMatching ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <RefreshCw size={18} />
            </motion.div>
          ) : (
            <Shuffle size={18} />
          )}
          {isMatching ? 'Memproses Algoritma...' : 'Eksekusi Auto-Matching'}
        </motion.button>
      </div>

      <div className="matching__container">
        {/* Supply Column (Live Farmer Harvests) */}
        <div className="matching__column">
          <h3 className="matching__column-title flex items-center justify-between">
            <span>Supply Panen Petani (Live)</span>
            <span className="badge badge-success">{harvests.length} Stok Terdaftar</span>
          </h3>
          <div className="matching__list">
            {harvests.map((h, i) => (
              <motion.div 
                key={h.id || i} 
                className="matching__card glass-panel"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-md">
                  <div className="matching__avatar">👨‍🌾</div>
                  <div>
                    <h4 className="text-h3" style={{ fontSize: '1rem' }}>{h.farmer}</h4>
                    <p className="text-caption">{h.date} • {h.status}</p>
                    <div className="flex gap-sm items-center" style={{ marginTop: 8 }}>
                      <span className="badge badge-primary">{h.commodity}</span>
                      <span className="font-bold text-caption text-primary-600">{h.volumeKg} kg</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Center Area */}
        <div className="matching__center">
          {isMatching && (
            <motion.div 
              className="matching__pulse"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Shuffle size={48} color="var(--primary-600)" />
            </motion.div>
          )}
          
          <AnimatePresence>
            {!isMatching && matched.length > 0 && (
              <motion.div 
                className="matching__success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle2 size={48} color="var(--success)" />
                <span>{matched.length} Match Ditemukan</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Demand Column */}
        <div className="matching__column">
          <h3 className="matching__column-title">Demand Terverifikasi (Pembeli B2B)</h3>
          <div className="matching__list">
            {buyers.slice(0, 4).map((b, i) => (
              <motion.div 
                key={b.id} 
                className="matching__card glass-panel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-md">
                  <div className="matching__avatar" style={{ background: 'rgba(0,0,0,0.04)' }}>{b.icon}</div>
                  <div>
                    <h4 className="text-h3" style={{ fontSize: '1rem' }}>{b.name}</h4>
                    <p className="text-caption">{b.type}</p>
                    <div className="flex items-center gap-sm" style={{ marginTop: 8 }}>
                       <span className="badge badge-info">Grade {b.grade}</span>
                       <span className="text-caption">Demand: {b.monthlyDemand}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {!isMatching && matched.length > 0 && (
          <motion.div 
            className="matching__results mt-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-h3 mb-md">Hasil Auto-Matching Backend (Rekomendasi Forward Contract)</h3>
            <div className="matching__results-list flex flex-col gap-md">
              {matched.map((m, i) => {
                const isConfirmed = confirmedIds.includes(m.id);
                return (
                  <motion.div 
                    key={m.id}
                    className="matching__result-card glass-panel-solid p-lg rounded-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-md">
                        <div className="matching__avatar">👨‍🌾</div>
                        <div>
                          <p className="text-body font-bold">{m.farmerName}</p>
                          <p className="text-caption">{m.commodity} ({m.volume})</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-md">
                        <ArrowRight color="var(--primary-600)" />
                        <span className="badge badge-success">Match Score 98%</span>
                        <ArrowRight color="var(--primary-600)" />
                      </div>

                      <div className="flex items-center gap-md text-right">
                        <div>
                          <p className="text-body font-bold">{m.buyerName}</p>
                          <p className="text-caption">{m.buyerType}</p>
                        </div>
                        <div className="matching__avatar" style={{ background: 'rgba(0,0,0,0.04)' }}>{m.buyerIcon}</div>
                      </div>

                      <button 
                        className={`btn ${isConfirmed ? 'btn-ghost text-success font-bold' : 'btn-primary'}`}
                        onClick={() => !isConfirmed && handleConfirmContract(m)}
                        disabled={isConfirmed}
                      >
                        {isConfirmed ? (
                          <>
                            <CheckCircle2 size={18} /> Kontrak Diterbitkan
                          </>
                        ) : (
                          <>
                            <FileCheck size={18} /> Terbitkan Forward Contract
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
