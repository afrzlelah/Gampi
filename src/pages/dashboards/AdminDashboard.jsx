import { motion } from 'framer-motion';
import { Users, TrendingUp, ShoppingCart, Activity, Award, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { useGlobalState } from '../../context/GlobalStateContext';
import { useNavigate } from 'react-router-dom';
import '../DashboardPage.css';

export default function AdminDashboard() {
  const { contracts = [], supplies = [], demands = [], activities = [], projects = [] } = useGlobalState() || {};
  const navigate = useNavigate();

  const verifiedSupplies = (supplies || []).filter(s => s.verificationStatus?.includes('Terverifikasi'));
  const pendingDemands = (demands || []).filter(d => d.status === 'Mencari Supply');

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h2 className="text-h2">Admin: Ecosystem Control Center 🖥️</h2>
          <p className="text-caption">Kelola seluruh alur supply-demand, verifikasi grade AI, dan eksekusi auto-matching backend.</p>
        </div>
      </div>

      <div className="dashboard__stats">
        <StatCard title="Total Petani Mitra" value="1,248" unit="Org" trend={+12} icon={Users} />
        <StatCard title="Supply Terverifikasi" value={verifiedSupplies.length} unit="Paspor" icon={Award} />
        <StatCard title="Demand Pembeli Aktif" value={pendingDemands.length} unit="Permintaan" icon={ShoppingBag} />
        <StatCard title="Kontrak Terbit" value={(contracts || []).length} unit="Kontrak" trend={+8} icon={ShoppingCart} />
      </div>

      <div className="dashboard__grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
        {/* Quick Action Cards for Admin */}
        <div className="glass-panel p-xl">
          <h3 className="text-h3 mb-lg">Panel Kontrol Backend</h3>

          <div className="flex flex-col gap-md">
            <div 
              className="flex justify-between items-center p-lg rounded-xl cursor-pointer transition-all"
              style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}
              onClick={() => navigate('/quality-check')}
            >
              <div className="flex items-center gap-md">
                <div className="p-md rounded-xl bg-primary-50 text-primary-600"><ShieldCheck size={24} /></div>
                <div>
                  <p className="font-bold text-body">AI Quality Check</p>
                  <p className="text-caption">Verifikasi klaim grade komoditas petani ({(supplies || []).length} menunggu)</p>
                </div>
              </div>
              <ArrowRight size={20} color="var(--text-tertiary)" />
            </div>

            <div 
              className="flex justify-between items-center p-lg rounded-xl cursor-pointer transition-all"
              style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)' }}
              onClick={() => navigate('/matching')}
            >
              <div className="flex items-center gap-md">
                <div className="p-md rounded-xl" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}><ShoppingCart size={24} /></div>
                <div>
                  <p className="font-bold text-body">AI Auto-Matching Engine</p>
                  <p className="text-caption">Cocokkan {verifiedSupplies.length} supply terverifikasi dengan {pendingDemands.length} demand aktif</p>
                </div>
              </div>
              <ArrowRight size={20} color="var(--text-tertiary)" />
            </div>

            <div 
              className="flex justify-between items-center p-lg rounded-xl cursor-pointer transition-all"
              style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}
              onClick={() => navigate('/routing')}
            >
              <div className="flex items-center gap-md">
                <div className="p-md rounded-xl" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}><TrendingUp size={24} /></div>
                <div>
                  <p className="font-bold text-body">3-Tier Sales Routing</p>
                  <p className="text-caption">Kalkulator distribusi grade Zero Food Loss</p>
                </div>
              </div>
              <ArrowRight size={20} color="var(--text-tertiary)" />
            </div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="glass-panel-solid p-xl">
          <h3 className="text-h3 mb-md">Aktivitas Real-time Ekosistem</h3>
          <div className="flex flex-col gap-sm" style={{ maxHeight: 400, overflowY: 'auto' }}>
            {(activities || []).slice(0, 8).map((act, i) => (
              <motion.div 
                key={act.id || i}
                className="flex gap-sm items-start"
                style={{ padding: 12, background: 'rgba(0,0,0,0.02)', borderRadius: 10 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <span style={{ fontSize: 20 }}>{act.icon}</span>
                <div>
                  <p className="text-body font-bold" style={{ fontSize: '0.875rem' }}>{act.message}</p>
                  <p className="text-caption">{act.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
