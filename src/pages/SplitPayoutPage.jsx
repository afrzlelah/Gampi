import { useGlobalState } from '../context/GlobalStateContext';
import { useAuth } from '../context/AuthContext';
import { formatRupiah } from '../data/mockData';
import { motion } from 'framer-motion';
import { ArrowLeftRight, CheckCircle2, DollarSign, Wallet, ShieldCheck } from 'lucide-react';
import StatCard from '../components/StatCard';
import './SplitPayoutPage.css';

export default function SplitPayoutPage() {
  const { payouts } = useGlobalState();
  const { user } = useAuth();

  const isFarmer = user?.role === 'farmer';
  const isInvestor = user?.role === 'investor';
  const isAdmin = user?.role === 'admin';

  // Calculate totals based on role
  const farmerTotal = payouts.reduce((acc, p) => acc + (p.farmerShare || 0), 0);
  const investorTotal = payouts.reduce((acc, p) => acc + (p.investorShare || 0), 0);
  const platformTotal = payouts.reduce((acc, p) => acc + (p.platformFee || 0), 0);

  return (
    <div className="payout">
      <div className="payout__header flex justify-between items-center mb-xl">
        <div>
          <h2 className="text-h2 flex items-center gap-xs">
            Automated Split Payout Gateway
            <span className="badge badge-success flex items-center gap-xs" style={{ fontSize: '0.75rem' }}>
              <ShieldCheck size={14} /> Otomatis & Transparan
            </span>
          </h2>
          <p className="text-caption">
            {isFarmer 
              ? 'Riwayat penerimaan dana hasil penjualan komoditas panen Anda (Bagi Hasil 60% Bersih)'
              : (isInvestor ? 'Riwayat imbal hasil investasi (Bagi Hasil 35% Bersih)' : 'Ringkasan distribusi dana otomatis seluruh ekosistem AGRIDAYA')}
          </p>
        </div>
      </div>

      {/* Role Specific Stat Cards */}
      <div className="grid grid-3 gap-md mb-xl">
        {isFarmer && (
          <>
            <StatCard title="Total Hasil Penjualan (60%)" value={farmerTotal / 1000000} prefix="Rp " suffix=" Juta" decimals={1} trend={+18} icon={Wallet} />
            <StatCard title="Transaksi Selesai" value={payouts.length} unit="Transaksi" icon={CheckCircle2} />
            <StatCard title="Status Rekening Bank" value="Terverifikasi" unit="BCA / DANA" icon={ShieldCheck} />
          </>
        )}

        {isInvestor && (
          <>
            <StatCard title="Total Imbal Hasil (35%)" value={investorTotal / 1000000} prefix="Rp " suffix=" Juta" decimals={1} trend={+12} icon={DollarSign} />
            <StatCard title="Proyek Selesai" value={payouts.length} unit="Proyek" icon={CheckCircle2} />
            <StatCard title="Rata-rata ROI" value="18.5" unit="%" trend={+2.1} icon={Wallet} />
          </>
        )}

        {isAdmin && (
          <>
            <StatCard title="Total Porsi Petani (60%)" value={farmerTotal / 1000000} prefix="Rp " suffix=" M" decimals={2} icon={Wallet} />
            <StatCard title="Total Imbal Investor (35%)" value={investorTotal / 1000000} prefix="Rp " suffix=" M" decimals={2} icon={DollarSign} />
            <StatCard title="Platform Revenue (5%)" value={platformTotal / 1000000} prefix="Rp " suffix=" Juta" decimals={1} icon={ArrowLeftRight} />
          </>
        )}
      </div>

      {/* Split Payout Mechanism Banner */}
      <div className="alert alert-info p-lg mb-xl flex items-center justify-between glass-panel-solid" style={{ borderRadius: 16 }}>
        <div className="flex items-center gap-md">
          <div className="p-md rounded-full bg-primary-50 text-primary-600">
            <ArrowLeftRight size={28} />
          </div>
          <div>
            <h4 className="font-bold text-body" style={{ fontSize: '1rem' }}>Mekanisme Split Payout Otomatis</h4>
            <p className="text-caption">
              Setiap kali pembayaran B2B diterima: <strong>60%</strong> masuk langsung ke dompet Petani, <strong>35%</strong> dikembalikan ke Investor (Modal + ROI), dan <strong>5%</strong> sebagai biaya komisi platform.
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="glass-panel p-xl">
        <h3 className="text-h3 mb-md">
          {isFarmer ? 'Riwayat Pencairan Bagi Hasil Petani' : 'Riwayat Transaksi Split Payout'}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <thead>
              <tr className="text-caption text-tertiary">
                <th className="p-sm">ID Transaksi</th>
                <th className="p-sm">Tanggal</th>
                <th className="p-sm">Komoditas & Pembeli</th>
                <th className="p-sm">Nilai Total B2B</th>
                <th className="p-sm">Porsi Petani (60%)</th>
                <th className="p-sm">Porsi Investor (35%)</th>
                <th className="p-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p, i) => (
                <motion.tr 
                  key={p.id || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{ background: 'rgba(0,0,0,0.01)', borderRadius: 12 }}
                >
                  <td className="p-md font-bold">{p.id}</td>
                  <td className="p-md text-caption">{p.date}</td>
                  <td className="p-md">
                    <p className="font-bold text-body" style={{ fontSize: '0.875rem' }}>{p.commodity}</p>
                    <p className="text-caption text-tertiary">ke {p.buyer}</p>
                  </td>
                  <td className="p-md font-bold">{formatRupiah(p.totalValue)}</td>
                  <td className="p-md font-bold text-success">{formatRupiah(p.farmerShare)}</td>
                  <td className="p-md font-bold text-primary-600">{formatRupiah(p.investorShare)}</td>
                  <td className="p-md">
                    <span className={`badge ${p.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                      {p.status === 'completed' ? 'Tercairkan Instan' : 'Diproses'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
