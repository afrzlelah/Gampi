import { motion } from 'framer-motion';
import { Star, ShieldCheck, TrendingUp, Award, CheckCircle2 } from 'lucide-react';
import { reputationBreakdown } from '../data/mockData';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import './ReputationPage.css';

const chartData = reputationBreakdown.metrics.map(m => ({
  subject: m.label,
  A: m.score,
  fullMark: 100,
}));

export default function ReputationPage() {
  return (
    <div className="reputation">
      <div className="reputation__header">
        <div>
          <h2 className="text-h2">Reputation Score</h2>
          <p className="text-caption">Sistem penilaian performa petani berbasis data transaksi dan aktivitas di ekosistem GAMPI.</p>
        </div>
      </div>

      <div className="reputation__grid">
        <div className="reputation__overview glass-panel-solid">
          <div className="reputation__score-circle">
            <svg viewBox="0 0 100 100" className="reputation__svg">
              <circle cx="50" cy="50" r="45" className="reputation__circle-bg" />
              <circle 
                cx="50" cy="50" r="45" 
                className="reputation__circle-progress" 
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * reputationBreakdown.overall) / 100}
              />
            </svg>
            <div className="reputation__score-val">
              <span>{reputationBreakdown.overall}</span>
              <span className="text-caption">Excellent</span>
            </div>
          </div>
          <div className="text-center mt-md">
            <h3 className="text-h3">Pak Suharto</h3>
            <p className="text-caption">Poktan Makmur Jaya</p>
          </div>
          
          <div className="reputation__benefits mt-lg">
             <h4 className="text-body font-bold mb-sm">Keuntungan Level Excellent:</h4>
             <ul className="reputation__benefit-list text-caption">
                <li><CheckCircle2 size={14} color="var(--success)" /> Prioritas matching dengan pembeli Grade A</li>
                <li><CheckCircle2 size={14} color="var(--success)" /> Limit crowdfunding hingga Rp 50 Juta</li>
                <li><CheckCircle2 size={14} color="var(--success)" /> Premium support 24/7</li>
             </ul>
          </div>
        </div>

        <div className="reputation__chart glass-panel">
          <h3 className="text-h3 mb-md">Analisis Radar Performa</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Skor" dataKey="A" stroke="var(--primary-400)" fill="var(--primary-500)" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="reputation__badges glass-panel mt-lg p-xl">
        <h3 className="text-h3 mb-lg">Pencapaian (Badges)</h3>
        <div className="flex gap-md flex-wrap">
          {reputationBreakdown.badges.map((badge, i) => (
             <motion.div 
               key={badge.name} 
               className={`reputation__badge-item ${badge.earned ? 'earned' : 'locked'}`}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               whileHover={{ y: -4 }}
             >
                <div className="reputation__badge-icon">{badge.icon}</div>
                <span className="reputation__badge-name">{badge.name}</span>
             </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
