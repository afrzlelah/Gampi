// ═══════════════════════════════════════════════════════════════
// AGRIDAYA — Mock Data for Simulation Demo
// ═══════════════════════════════════════════════════════════════

export const farmers = [
  { id: 1, name: 'Pak Suharto', age: 52, location: 'Bandungan', group: 'Poktan Makmur Jaya', crops: ['Cabai Merah', 'Tomat'], reputationScore: 92, avatar: '👨‍🌾', totalHarvest: '2.4 ton', earnings: 'Rp 18.500.000' },
  { id: 2, name: 'Bu Sari', age: 47, location: 'Sumowono', group: 'Poktan Subur Makmur', crops: ['Bawang Merah', 'Kubis'], reputationScore: 88, avatar: '👩‍🌾', totalHarvest: '3.1 ton', earnings: 'Rp 22.300.000' },
  { id: 3, name: 'Mas Danu', age: 28, location: 'Getasan', group: 'Poktan Muda Tani', crops: ['Sawi', 'Brokoli'], reputationScore: 95, avatar: '👨‍🌾', totalHarvest: '1.8 ton', earnings: 'Rp 14.200.000' },
  { id: 4, name: 'Pak Karso', age: 55, location: 'Bandungan', group: 'Poktan Makmur Jaya', crops: ['Wortel', 'Kentang'], reputationScore: 85, avatar: '👨‍🌾', totalHarvest: '4.2 ton', earnings: 'Rp 28.100.000' },
  { id: 5, name: 'Bu Endang', age: 43, location: 'Sumowono', group: 'Poktan Subur Makmur', crops: ['Cabai Rawit', 'Terong'], reputationScore: 90, avatar: '👩‍🌾', totalHarvest: '2.7 ton', earnings: 'Rp 19.800.000' },
  { id: 6, name: 'Mas Adi', age: 25, location: 'Getasan', group: 'Poktan Muda Tani', crops: ['Selada', 'Bayam'], reputationScore: 78, avatar: '👨‍🌾', totalHarvest: '1.2 ton', earnings: 'Rp 9.500.000' },
];

export const buyers = [
  { id: 1, name: 'Hotel Gumaya Semarang', type: 'Hotel', grade: 'A', icon: '🏨', monthlyDemand: '800 kg', contract: 'Active' },
  { id: 2, name: 'Restoran Soto Bangkong', type: 'Restoran', grade: 'B', icon: '🍽️', monthlyDemand: '350 kg', contract: 'Active' },
  { id: 3, name: 'Katering Sehat Nusantara', type: 'Katering', grade: 'A', icon: '🥘', monthlyDemand: '1.200 kg', contract: 'Active' },
  { id: 4, name: 'RM Padang Sederhana', type: 'UMKM', grade: 'B', icon: '🍛', monthlyDemand: '250 kg', contract: 'Pending' },
  { id: 5, name: 'PT Indofood Sukses', type: 'Industri', grade: 'C', icon: '🏭', monthlyDemand: '5.000 kg', contract: 'Active' },
  { id: 6, name: 'Supermart Fresh', type: 'Retail', grade: 'A', icon: '🛒', monthlyDemand: '600 kg', contract: 'Active' },
];

export const forwardContracts = [
  {
    id: 'FC-2026-001',
    farmer: 'Poktan Makmur Jaya',
    buyer: 'Hotel Gumaya Semarang',
    commodity: 'Cabai Merah Keriting',
    volume: '500 kg',
    pricePerKg: 'Rp 35.000',
    totalValue: 'Rp 17.500.000',
    plantDate: '15 Jun 2026',
    harvestDate: '22 Sep 2026',
    status: 'active',
    progress: 65,
  },
  {
    id: 'FC-2026-002',
    farmer: 'Poktan Subur Makmur',
    buyer: 'Katering Sehat Nusantara',
    commodity: 'Bawang Merah',
    volume: '800 kg',
    pricePerKg: 'Rp 28.000',
    totalValue: 'Rp 22.400.000',
    plantDate: '01 Jul 2026',
    harvestDate: '15 Okt 2026',
    status: 'active',
    progress: 40,
  },
  {
    id: 'FC-2026-003',
    farmer: 'Poktan Muda Tani',
    buyer: 'Supermart Fresh',
    commodity: 'Brokoli Premium',
    volume: '300 kg',
    pricePerKg: 'Rp 18.000',
    totalValue: 'Rp 5.400.000',
    plantDate: '10 Mei 2026',
    harvestDate: '08 Ags 2026',
    status: 'completed',
    progress: 100,
  },
  {
    id: 'FC-2026-004',
    farmer: 'Poktan Makmur Jaya',
    buyer: 'RM Padang Sederhana',
    commodity: 'Wortel',
    volume: '400 kg',
    pricePerKg: 'Rp 12.000',
    totalValue: 'Rp 4.800.000',
    plantDate: '01 Ags 2026',
    harvestDate: '20 Nov 2026',
    status: 'pending',
    progress: 0,
  },
];

export const crowdfundingProjects = [
  {
    id: 'CF-001',
    title: 'Budidaya Cabai Merah Premium',
    farmer: 'Poktan Makmur Jaya',
    location: 'Bandungan, Kab. Semarang',
    targetFunding: 15000000,
    currentFunding: 12750000,
    investors: 24,
    roi: '18%',
    duration: '4 bulan',
    status: 'active',
    description: 'Proyek budidaya cabai merah keriting di lahan 0.5 Ha dengan teknik mulsa plastik. Target produksi 2 ton.',
    harvestEst: 'Sep 2026',
    riskLevel: 'Rendah',
  },
  {
    id: 'CF-002',
    title: 'Hidroponik Selada & Bayam Urban',
    farmer: 'Poktan Muda Tani',
    location: 'Getasan, Kab. Semarang',
    targetFunding: 8000000,
    currentFunding: 8000000,
    investors: 15,
    roi: '22%',
    duration: '3 bulan',
    status: 'funded',
    description: 'Smart urban farming selada dan bayam hidroponik NFT system di greenhouse mini.',
    harvestEst: 'Ags 2026',
    riskLevel: 'Rendah',
  },
  {
    id: 'CF-003',
    title: 'Ekspansi Bawang Merah Brebes-Grade',
    farmer: 'Poktan Subur Makmur',
    location: 'Sumowono, Kab. Semarang',
    targetFunding: 25000000,
    currentFunding: 10000000,
    investors: 18,
    roi: '15%',
    duration: '5 bulan',
    status: 'active',
    description: 'Perluasan lahan bawang merah varietas Brebes unggul di 1 Ha. Mitra buyer sudah tersedia.',
    harvestEst: 'Nov 2026',
    riskLevel: 'Sedang',
  },
];

export const priceHistory = [
  { month: 'Jan', cabai: 42000, bawang: 32000, tomat: 12000, wortel: 10000 },
  { month: 'Feb', cabai: 55000, bawang: 35000, tomat: 14000, wortel: 11000 },
  { month: 'Mar', cabai: 48000, bawang: 30000, tomat: 11000, wortel: 10500 },
  { month: 'Apr', cabai: 38000, bawang: 28000, tomat: 13000, wortel: 9800 },
  { month: 'Mei', cabai: 35000, bawang: 34000, tomat: 15000, wortel: 10200 },
  { month: 'Jun', cabai: 40000, bawang: 36000, tomat: 16000, wortel: 11500 },
  { month: 'Jul', cabai: 52000, bawang: 38000, tomat: 13500, wortel: 10800 },
];

export const dashboardStats = {
  totalFarmers: 847,
  totalBuyers: 156,
  totalTransactions: 1243,
  totalRevenue: 2840000000,
  harvestDistributed: 48.5,
  foodLossPrevented: 99.2,
  investorReturns: 17.8,
  activeContracts: 89,
};

export const recentActivities = [
  { id: 1, type: 'harvest', message: 'Panen cabai 250kg dari Poktan Makmur Jaya berhasil disortir', time: '5 menit lalu', icon: '🌶️' },
  { id: 2, type: 'contract', message: 'Forward Contract FC-2026-005 ditandatangani Hotel Ciputra', time: '23 menit lalu', icon: '📝' },
  { id: 3, type: 'funding', message: 'Investor baru bergabung di proyek CF-001 (Rp 500.000)', time: '1 jam lalu', icon: '💰' },
  { id: 4, type: 'delivery', message: 'Pengiriman 300kg tomat Grade A ke Supermart Fresh', time: '2 jam lalu', icon: '🚛' },
  { id: 5, type: 'payout', message: 'Split Payout Rp 8.200.000 berhasil disalurkan ke 3 petani', time: '3 jam lalu', icon: '✅' },
  { id: 6, type: 'karsa', message: 'AI Karsa mencatat laporan pemupukan dari Bu Sari', time: '4 jam lalu', icon: '🤖' },
];

export const karsaConversation = [
  { role: 'user', text: 'Karsa, aku sudah kasih pupuk urea dua karung hari ini', lang: 'id' },
  { role: 'karsa', text: 'Baik, Pak Suharto. Saya catat pemupukan urea 2 karung (100 kg) pada lahan cabai Anda di Bandungan hari ini, 22 Juli 2026. Jadwal pemupukan berikutnya dalam 14 hari. Ada yang lain?', lang: 'id' },
  { role: 'user', text: 'Dina iki wis ngeweki pupuk urea rong karung', lang: 'jw' },
  { role: 'karsa', text: 'Siap, Pak. Kula catat: pemupukan urea 2 karung (100 kg) tanggal 22 Juli 2026. Tanaman cabai sampun umur 45 hari. Estimasi panen: 65 hari lagi (25 September 2026). Pripun, wonten tambahan?', lang: 'jw' },
  { role: 'user', text: 'Piye kabare tanduranku?', lang: 'jw' },
  { role: 'karsa', text: '📊 Status Tanaman Anda:\n• Komoditas: Cabai Merah Keriting\n• Umur: 45 hari (Fase Vegetatif)\n• Kesehatan: Baik ✅\n• Pemupukan: Sesuai jadwal\n• Estimasi panen: 25 Sep 2026\n• Estimasi hasil: 480-520 kg\n• Kontrak terikat: FC-2026-001 (Hotel Gumaya)\n\nSemua berjalan sesuai rencana, Pak! 🌱', lang: 'id' },
];

export const academyModules = [
  { id: 1, title: 'Teknik Mulsa Plastik Modern', category: 'Budidaya', duration: '15 menit', level: 'Pemula', progress: 100, icon: '🌱', lessons: 5 },
  { id: 2, title: 'Manajemen Hama Terpadu (PHT)', category: 'Perlindungan', duration: '25 menit', level: 'Menengah', progress: 60, icon: '🐛', lessons: 8 },
  { id: 3, title: 'Hidroponik NFT System', category: 'Urban Farming', duration: '30 menit', level: 'Lanjutan', progress: 30, icon: '💧', lessons: 10 },
  { id: 4, title: 'Pencatatan Keuangan Tani Digital', category: 'Manajemen', duration: '20 menit', level: 'Pemula', progress: 0, icon: '📊', lessons: 6 },
  { id: 5, title: 'Optimasi Irigasi & Fertigasi', category: 'Teknik Lahan', duration: '18 menit', level: 'Menengah', progress: 0, icon: '💦', lessons: 7 },
  { id: 6, title: 'Pascapanen & Sortasi Mutu', category: 'Pascapanen', duration: '22 menit', level: 'Pemula', progress: 45, icon: '📦', lessons: 6 },
];

export const reputationBreakdown = {
  overall: 92,
  metrics: [
    { label: 'Ketepatan Waktu Panen', score: 95, weight: 25 },
    { label: 'Kualitas Produk', score: 90, weight: 30 },
    { label: 'Konsistensi Volume', score: 88, weight: 20 },
    { label: 'Keaktifan Pelaporan', score: 96, weight: 15 },
    { label: 'Penyelesaian Kontrak', score: 92, weight: 10 },
  ],
  badges: [
    { name: 'Petani Teladan', icon: '🏆', earned: true },
    { name: 'Zero Waste Hero', icon: '♻️', earned: true },
    { name: 'Early Adopter', icon: '🚀', earned: true },
    { name: 'Mentor Komunitas', icon: '🎓', earned: false },
    { name: 'Top Performer Q3', icon: '⭐', earned: false },
  ],
  history: [
    { month: 'Jan', score: 78 },
    { month: 'Feb', score: 80 },
    { month: 'Mar', score: 83 },
    { month: 'Apr', score: 85 },
    { month: 'Mei', score: 88 },
    { month: 'Jun', score: 90 },
    { month: 'Jul', score: 92 },
  ],
};

export const splitPayoutHistory = [
  {
    id: 'SP-001',
    date: '20 Jul 2026',
    totalValue: 17500000,
    commodity: 'Cabai Merah',
    buyer: 'Hotel Gumaya',
    farmerShare: 10500000,
    investorShare: 6125000,
    platformFee: 875000,
    status: 'completed',
  },
  {
    id: 'SP-002',
    date: '18 Jul 2026',
    totalValue: 5400000,
    commodity: 'Brokoli Premium',
    buyer: 'Supermart Fresh',
    farmerShare: 3240000,
    investorShare: 1890000,
    platformFee: 270000,
    status: 'completed',
  },
  {
    id: 'SP-003',
    date: '15 Jul 2026',
    totalValue: 8200000,
    commodity: 'Tomat Cherry',
    buyer: 'Katering Sehat Nusantara',
    farmerShare: 4920000,
    investorShare: 2870000,
    platformFee: 410000,
    status: 'completed',
  },
  {
    id: 'SP-004',
    date: '22 Jul 2026',
    totalValue: 22400000,
    commodity: 'Bawang Merah',
    buyer: 'RM Padang Sederhana',
    farmerShare: 13440000,
    investorShare: 7840000,
    platformFee: 1120000,
    status: 'processing',
  },
];

export const commodities = [
  { name: 'Cabai Merah', emoji: '🌶️', price: 'Rp 42.000/kg', change: '+8.2%', trend: 'up' },
  { name: 'Bawang Merah', emoji: '🧅', price: 'Rp 38.000/kg', change: '+5.6%', trend: 'up' },
  { name: 'Tomat', emoji: '🍅', price: 'Rp 13.500/kg', change: '-2.1%', trend: 'down' },
  { name: 'Wortel', emoji: '🥕', price: 'Rp 10.800/kg', change: '+1.3%', trend: 'up' },
  { name: 'Brokoli', emoji: '🥦', price: 'Rp 22.000/kg', change: '+3.7%', trend: 'up' },
  { name: 'Kentang', emoji: '🥔', price: 'Rp 14.200/kg', change: '-0.8%', trend: 'down' },
];

export const formatRupiah = (num) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
};
