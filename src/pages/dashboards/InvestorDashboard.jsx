import { useGlobalState } from '../../context/GlobalStateContext';
import StatCard from '../../components/StatCard';
import { PiggyBank, TrendingUp, ShieldCheck, Wallet, CheckCircle2 } from 'lucide-react';
import { formatRupiah } from '../../data/mockData';

export default function InvestorDashboard() {
  const { activities = [], projects = [], payouts = [] } = useGlobalState() || {};

  const fundedProjects = (projects || []).filter(p => p.currentFunding > 0);
  const totalFunded = fundedProjects.reduce((acc, p) => acc + p.currentFunding, 0);
  const totalROI = payouts.reduce((acc, p) => acc + (p.investorShare || 0), 0);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h2 className="text-h2">Dashboard Investor Sosial 💰</h2>
          <p className="text-caption">Pantau portofolio pendanaan, proyek yang sudah didanai, dan imbal hasil (ROI).</p>
        </div>
      </div>

      <div className="dashboard__stats">
        <StatCard title="Total Dana Diinvestasikan" value={totalFunded > 0 ? (totalFunded / 1000000).toFixed(0) : '150'} prefix="Rp " suffix=" Jt" trend={+12} icon={PiggyBank} />
        <StatCard title="Proyek Didanai" value={fundedProjects.length || 3} unit="Proyek" icon={ShieldCheck} />
        <StatCard title="Total Imbal Hasil (35%)" value={totalROI > 0 ? (totalROI / 1000000).toFixed(1) : '18'} prefix="Rp " suffix=" Jt" trend={+2} icon={TrendingUp} />
        <StatCard title="Saldo Tersedia" value="25" prefix="Rp " suffix=" Jt" icon={Wallet} />
      </div>

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
        {/* Portofolio Proyek yang Sudah Didanai */}
        <div className="glass-panel" style={{ padding: 24 }}>
          <div className="flex justify-between items-center mb-md">
            <h3 className="text-h3 flex items-center gap-xs">
              <CheckCircle2 size={20} color="var(--success)" /> Portofolio Proyek Didanai
            </h3>
            <span className="badge badge-success">{fundedProjects.length} Proyek Aktif</span>
          </div>

          <div className="flex flex-col gap-md">
            {fundedProjects.length > 0 ? fundedProjects.map(proj => {
              const percent = Math.min(100, Math.round((proj.currentFunding / proj.targetFunding) * 100));
              return (
                <div key={proj.id} style={{ padding: 16, background: 'rgba(16,185,129,0.04)', borderRadius: 16, border: '1px solid rgba(16,185,129,0.15)' }}>
                  <div className="flex justify-between items-start mb-sm">
                    <div>
                      <p className="font-bold text-body">{proj.title}</p>
                      <p className="text-caption text-tertiary">Petani: {proj.farmer} • {proj.location}</p>
                    </div>
                    <span className="badge badge-primary">{proj.roi} ROI</span>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <div className="flex justify-between text-caption mb-xs">
                      <span>Terkumpul: <strong>{formatRupiah(proj.currentFunding)}</strong></span>
                      <span className="font-bold text-primary-600">{percent}%</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(0,0,0,0.06)', borderRadius: 3 }}>
                      <div style={{ height: '100%', width: `${percent}%`, background: 'linear-gradient(90deg, var(--primary-500), var(--primary-600))', borderRadius: 3 }} />
                    </div>
                  </div>
                </div>
              );
            }) : (
              // Show all projects as default when nothing funded yet
              (projects || []).map(proj => {
                const percent = Math.min(100, Math.round((proj.currentFunding / proj.targetFunding) * 100));
                return (
                  <div key={proj.id} style={{ padding: 16, background: 'rgba(0,0,0,0.02)', borderRadius: 16, border: '1px solid rgba(0,0,0,0.04)' }}>
                    <div className="flex justify-between items-start mb-sm">
                      <div>
                        <p className="font-bold text-body">{proj.title}</p>
                        <p className="text-caption text-tertiary">Petani: {proj.farmer}</p>
                      </div>
                      <span className="badge badge-info">{proj.roi} ROI</span>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <div className="flex justify-between text-caption mb-xs">
                        <span>Progress: <strong>{formatRupiah(proj.currentFunding)}</strong></span>
                        <span className="font-bold">{percent}%</span>
                      </div>
                      <div style={{ height: 6, background: 'rgba(0,0,0,0.06)', borderRadius: 3 }}>
                        <div style={{ height: '100%', width: `${percent}%`, background: '#94a3b8', borderRadius: 3 }} />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Aktivitas terkini */}
        <div className="glass-panel-solid" style={{ padding: 24 }}>
          <h3 className="text-h3 mb-md">Aktivitas Ekosistem</h3>
          <div className="flex flex-col gap-sm">
            {(activities || []).slice(0, 6).map((act, i) => (
              <div key={act.id || i} className="flex gap-sm items-start" style={{ padding: 12, background: 'rgba(0,0,0,0.02)', borderRadius: 8 }}>
                <span style={{ fontSize: 20 }}>{act.icon}</span>
                <div>
                  <p className="text-body font-bold" style={{ fontSize: '0.875rem' }}>{act.message}</p>
                  <p className="text-caption">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
