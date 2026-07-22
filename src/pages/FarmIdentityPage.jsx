import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sprout, ShieldCheck, Users, Calendar, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './FarmIdentityPage.css';

export default function FarmIdentityPage() {
  const { user } = useAuth();
  
  const farmInfo = {
    name: 'Lahan Cabai Bandungan 01',
    farmer: user?.name || 'Pak Suharto',
    poktan: 'Poktan Makmur Jaya',
    location: 'Desa Jetis, Bandungan, Kab. Semarang',
    gps: '-6.2088, 106.8456',
    areaSize: '1.5 Hektar',
    mainCrop: 'Cabai Merah Keriting & Tomat',
    soilType: 'Vulkanik Subur (Andosol)',
    phLevel: '6.5 (Optimal)',
    irrigation: 'Irigasi Tetes (Drip Fertigation)',
    reputationScore: 92,
    status: 'Terverifikasi Karsa'
  };

  return (
    <div className="farm-identity">
      <div className="farm-identity__header flex justify-between items-center mb-xl">
        <div>
          <h2 className="text-h2 flex items-center gap-xs">
            Farm Identity (Profil Lahan Digital)
            <span className="badge badge-success flex items-center gap-xs" style={{ fontSize: '0.75rem' }}>
              <ShieldCheck size={14} /> Terdaftar Resmi
            </span>
          </h2>
          <p className="text-caption">Identitas geospasial dan sertifikasi kebun petani mitra AGRIDAYA</p>
        </div>
      </div>

      <div className="grid grid-3 gap-lg mb-xl">
        {/* Card 1: Bio */}
        <motion.div className="glass-panel p-xl flex flex-col justify-between" whileHover={{ y: -4 }}>
          <div>
            <div className="flex justify-between items-start mb-md">
              <span className="badge badge-primary">ID Lahan: LHN-BDG-01</span>
              <Sprout size={24} color="var(--primary-600)" />
            </div>
            <h3 className="text-h2 mb-xs">{farmInfo.name}</h3>
            <p className="text-caption mb-md">📍 {farmInfo.location}</p>
            <p className="text-body font-bold text-primary-600 mb-xs">Petani: {farmInfo.farmer}</p>
            <p className="text-caption text-tertiary">Kelompok Tani: {farmInfo.poktan}</p>
          </div>
          <div className="mt-lg pt-md border-t border-glass flex justify-between items-center text-caption font-bold">
            <span>Luas Lahan:</span>
            <span className="text-h3 font-black text-primary-600">{farmInfo.areaSize}</span>
          </div>
        </motion.div>

        {/* Card 2: Soil & Environment */}
        <motion.div className="glass-panel p-xl flex flex-col justify-between" whileHover={{ y: -4 }}>
          <div>
            <div className="flex justify-between items-start mb-md">
              <span className="badge badge-info">Kondisi Lahan</span>
              <MapPin size={24} color="var(--info)" />
            </div>
            <h3 className="text-h2 mb-xs">Spesifikasi Kebun</h3>
            <div className="flex flex-col gap-xs mt-md">
              <p className="text-caption">Jenis Tanah: <strong>{farmInfo.soilType}</strong></p>
              <p className="text-caption">Tingkat pH: <strong>{farmInfo.phLevel}</strong></p>
              <p className="text-caption">Irigasi: <strong>{farmInfo.irrigation}</strong></p>
            </div>
          </div>
          <div className="mt-lg pt-md border-t border-glass flex justify-between items-center text-caption font-bold">
            <span>Koordinat GPS:</span>
            <span className="font-mono text-primary-600">{farmInfo.gps}</span>
          </div>
        </motion.div>

        {/* Card 3: Reputation */}
        <motion.div className="glass-panel p-xl flex flex-col justify-between" whileHover={{ y: -4 }}>
          <div>
            <div className="flex justify-between items-start mb-md">
              <span className="badge badge-warning">Skor Karsa</span>
              <Award size={24} color="var(--warning)" />
            </div>
            <h3 className="text-h2 mb-xs">Kredibilitas Kebun</h3>
            <p className="text-h1 font-black text-primary-600 mt-xs mb-xs">{farmInfo.reputationScore} <span className="text-body font-normal">/ 100</span></p>
            <p className="text-caption">Peringkat Tani Teladan Jawa Tengah. Membuka batas kredit permodalan hingga Rp 500.000.000.</p>
          </div>
          <div className="mt-lg pt-md border-t border-glass flex justify-between items-center text-caption font-bold">
            <span>Status Verifikasi:</span>
            <span className="text-success flex items-center gap-2xs"><ShieldCheck size={14} /> {farmInfo.status}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
