import { useGlobalState } from '../../context/GlobalStateContext';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import { Package, Truck, CheckCircle, FileText } from 'lucide-react';

export default function BuyerDashboard() {
  const { activities = [], contracts = [] } = useGlobalState() || {};
  const { user } = useAuth();
  
  const currentBuyerName = user?.name || 'Hotel Gumaya Semarang';
  const isBuyerEnterprise = user?.role === 'buyer_enterprise';

  // Strict contract filtering
  const myContracts = (contracts || []).filter(c => {
    if (!c) return false;
    if (isBuyerEnterprise) return c.buyer?.includes('Hotel') || c.buyer?.includes('Gumaya') || c.grade === 'A';
    return c.buyer?.includes('Padang') || c.buyer?.includes('Soto') || c.buyer?.includes('RM') || c.grade === 'B';
  });

  const totalSupplyTon = myContracts.reduce((acc, c) => {
    const volNum = parseFloat(c.volume) || 0.5;
    return acc + volNum;
  }, 0).toFixed(0);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h2 className="text-h2">Dashboard Pembeli ({currentBuyerName}) 🏢</h2>
          <p className="text-caption">Pantau suplai terikat, status pengiriman, dan kontrak aktif B2B Anda.</p>
        </div>
      </div>

      <div className="dashboard__stats">
        <StatCard title="Total Pasokan Terikat" value={totalSupplyTon || '42'} unit="Ton" trend={+8} icon={Package} />
        <StatCard title="Kontrak B2B Aktif" value={myContracts.length} unit="Kontrak" icon={FileText} />
        <StatCard title="Dalam Pengiriman" value="2" unit="Truk" icon={Truck} />
        <StatCard title="Quality Pass Rate" value="98.5" unit="%" trend={+1} icon={CheckCircle} />
      </div>

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div className="glass-panel" style={{ padding: 24 }}>
          <h3 className="text-h3 mb-md">Kontrak Suplai Anda (Live)</h3>
          <div className="flex flex-col gap-sm">
            {myContracts.length > 0 ? myContracts.map(c => (
              <div key={c.id} className="flex justify-between items-center" style={{ padding: 14, background: 'rgba(0,0,0,0.02)', borderRadius: 12, border: '1px solid rgba(0,0,0,0.04)' }}>
                <div>
                  <p className="font-bold">{c.commodity} (Grade {c.grade || 'A'})</p>
                  <p className="text-caption">Mitra Petani: <strong>{c.farmer}</strong></p>
                </div>
                <div className="text-right">
                   <p className="font-bold text-primary-600">{c.volume}</p>
                   <span className={`badge ${c.status === 'Aktif' ? 'badge-success' : 'badge-warning'}`}>{c.status}</span>
                </div>
              </div>
            )) : <p className="text-caption p-md text-center">Belum ada kontrak aktif. Ajukan permintaan di <strong>B2B Marketplace</strong>.</p>}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 24 }}>
          <h3 className="text-h3 mb-md">Update Logistik B2B</h3>
          <div className="flex flex-col gap-md">
            {(activities || []).filter(a => a.type === 'logistic' || a.type === 'contract').slice(0, 4).map((act, i) => (
              <div key={act.id || i} className="flex gap-sm items-start">
                 <span style={{ fontSize: 20 }}>{act.icon}</span>
                 <div>
                   <p className="text-body font-bold" style={{ fontSize: '0.875rem' }}>{act.message}</p>
                   <p className="text-caption text-tertiary">{act.time}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
