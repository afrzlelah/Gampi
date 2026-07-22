import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Hotel, Utensils, Factory, ShieldCheck, Sparkles } from 'lucide-react';
import './SalesRoutingPage.css';

export default function SalesRoutingPage() {
  const [totalHarvest, setTotalHarvest] = useState(1000);

  const gradeA = Math.round(totalHarvest * 0.40);
  const gradeB = Math.round(totalHarvest * 0.45);
  const gradeC = Math.round(totalHarvest * 0.15);
  const foodLossPrevented = 100; // 100% saved

  return (
    <div className="routing">
      <div className="routing__header">
        <div>
          <h2 className="text-h2 flex items-center gap-xs">
            Automated 3-Tier Sales Routing
            <span className="badge badge-success flex items-center gap-xs" style={{ fontSize: '0.75rem' }}>
              <ShieldCheck size={14} /> Zero Food Loss Mechanism
            </span>
          </h2>
          <p className="text-caption">Sistem pengelompokan otomatis berdasarkan gradasi kualitas panen untuk menjamin 100% hasil panen terserap</p>
        </div>
      </div>

      {/* Interactive Harvest Input */}
      <div className="glass-panel p-lg mb-xl flex flex-col md:flex-row items-center justify-between gap-lg">
        <div>
          <h3 className="text-h3 mb-xs">Simulasi Penyortiran Panen (Quality Sortation)</h3>
          <p className="text-caption">Masukkan perkiraan total volume panen petani untuk melihat distribusi 3-Tier Routing secara real-time.</p>
        </div>

        <div className="flex items-center gap-md">
          <label className="font-bold text-body">Volume Panen:</label>
          <div className="flex items-center gap-xs">
            <input 
              type="number" 
              className="input-field" 
              style={{ width: 140, fontWeight: 'bold', fontSize: '1.125rem' }}
              value={totalHarvest} 
              onChange={(e) => setTotalHarvest(Number(e.target.value) || 0)}
              min={100}
              step={100}
            />
            <span className="font-bold text-body">kg</span>
          </div>
        </div>
      </div>

      {/* 3-Tier Grid */}
      <div className="grid grid-3 gap-lg mb-xl">
        {/* Tier 1 - Grade A */}
        <motion.div 
          className="glass-panel p-xl flex flex-col justify-between"
          style={{ borderTop: '4px solid var(--primary-500)' }}
          whileHover={{ y: -4 }}
        >
          <div>
            <div className="flex justify-between items-start mb-md">
              <span className="badge badge-success">Grade A (Premium)</span>
              <Hotel size={24} color="var(--primary-600)" />
            </div>
            <h3 className="text-h1 mb-xs">{gradeA} <span className="text-body font-normal">kg</span></h3>
            <p className="text-caption font-bold text-primary-600 mb-md">40% Total Panen</p>
            <p className="text-body text-secondary" style={{ fontSize: '0.875rem' }}>
              Komoditas dengan bentuk, warna, dan ukuran sempurna. Disalurkan langsung ke Hotel Bintang 5, Fine Dining, & Supermarket Modern.
            </p>
          </div>
          <div className="mt-lg pt-md border-t border-glass text-caption font-bold text-tertiary">
            Mitra: Hotel Gumaya, Superindo, Katering Sehat
          </div>
        </motion.div>

        {/* Tier 2 - Grade B */}
        <motion.div 
          className="glass-panel p-xl flex flex-col justify-between"
          style={{ borderTop: '4px solid var(--warning)' }}
          whileHover={{ y: -4 }}
        >
          <div>
            <div className="flex justify-between items-start mb-md">
              <span className="badge badge-warning">Grade B (Medium)</span>
              <Utensils size={24} color="var(--warning)" />
            </div>
            <h3 className="text-h1 mb-xs">{gradeB} <span className="text-body font-normal">kg</span></h3>
            <p className="text-caption font-bold text-warning mb-md">45% Total Panen</p>
            <p className="text-body text-secondary" style={{ fontSize: '0.875rem' }}>
              Ukuran bervariasi namun kesegaran 100% terjaga. Disalurkan ke UMKM Kuliner, Warung Makan, Katering Harian, dan Rumah Makan.
            </p>
          </div>
          <div className="mt-lg pt-md border-t border-glass text-caption font-bold text-tertiary">
            Mitra: RM Padang Sederhana, Soto Bangkong
          </div>
        </motion.div>

        {/* Tier 3 - Grade C */}
        <motion.div 
          className="glass-panel p-xl flex flex-col justify-between"
          style={{ borderTop: '4px solid #8b5cf6' }}
          whileHover={{ y: -4 }}
        >
          <div>
            <div className="flex justify-between items-start mb-md">
              <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>Grade C (Off-Spec)</span>
              <Factory size={24} color="#8b5cf6" />
            </div>
            <h3 className="text-h1 mb-xs">{gradeC} <span className="text-body font-normal">kg</span></h3>
            <p className="text-caption font-bold mb-md" style={{ color: '#8b5cf6' }}>15% Total Panen</p>
            <p className="text-body text-secondary" style={{ fontSize: '0.875rem' }}>
              Ukuran kecil atau cacat fisik minor. Disalurkan ke Industri Pengolahan Saus/Bumbu, Pakan Ternak, & Pembuat Pupuk Komposting.
            </p>
          </div>
          <div className="mt-lg pt-md border-t border-glass text-caption font-bold text-tertiary">
            Mitra: PT Indofood Sukses, Pabrik Kompos Agro
          </div>
        </motion.div>
      </div>

      {/* Impact Summary */}
      <div className="glass-panel-solid p-xl flex items-center justify-between">
        <div className="flex items-center gap-md">
          <div className="p-md rounded-full bg-success-50 text-success">
             <Sparkles size={32} />
          </div>
          <div>
            <h3 className="text-h2">Efisiensi Rantai Pasok: 100% Terserap</h3>
            <p className="text-caption">Dengan 3-Tier Sales Routing, tidak ada hasil panen yang terbuang sia-sia (0 kg Food Loss).</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-overline">Food Loss Reduction</span>
          <p className="text-h1 text-success">{foodLossPrevented}% Saved</p>
        </div>
      </div>
    </div>
  );
}
