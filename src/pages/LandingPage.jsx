import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sprout, ArrowRight, Shield, Zap, Users, TrendingUp, Bot, Leaf, BarChart3, ChevronRight } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import './LandingPage.css';

const features = [
  {
    icon: <Shield size={28} />,
    title: 'Forward Contract',
    desc: 'Kunci harga di awal, jamin 100% panen terserap',
    color: '#10b981',
  },
  {
    icon: <Bot size={28} />,
    title: 'AI Voice "Karsa"',
    desc: 'Pencatatan tani lewat suara bahasa lokal',
    color: '#3b82f6',
  },
  {
    icon: <Zap size={28} />,
    title: '3-Tier Sales Routing',
    desc: 'Zero food loss — semua grade panen tersalurkan',
    color: '#f59e0b',
  },
  {
    icon: <Users size={28} />,
    title: 'Closed-Loop Crowdfunding',
    desc: 'Pendanaan aman berwujud e-Voucher saprotan',
    color: '#8b5cf6',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Smart Matching',
    desc: 'Pencocokan otomatis supply & demand B2B',
    color: '#ec4899',
  },
  {
    icon: <Leaf size={28} />,
    title: 'Smart Farming Academy',
    desc: 'Edukasi digital adaptif untuk petani modern',
    color: '#06b6d4',
  },
];

const stats = [
  { value: 847, label: 'Petani Terdaftar', suffix: '+' },
  { value: 156, label: 'Mitra Pembeli B2B', suffix: '+' },
  { value: 2.84, label: 'Volume Transaksi', prefix: 'Rp ', suffix: ' M', decimals: 2 },
  { value: 99.2, label: 'Food Loss Dicegah', suffix: '%', decimals: 1 },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing__mesh-bg" />

      {/* Hero */}
      <section className="landing__hero">
        <motion.div
          className="landing__hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="landing__badge">
            <Sprout size={14} />
            <span>Ekosistem Agritech Indonesia</span>
          </div>

          <h1 className="landing__title">
            Revolusi Rantai Pasok{' '}
            <span className="gradient-text">Pertanian</span>{' '}
            Indonesia
          </h1>

          <p className="landing__subtitle">
            Platform B2B terintegrasi yang menghubungkan petani lokal langsung
            dengan industri kuliner — memastikan harga adil, panen 100% terserap,
            dan zero food loss.
          </p>

          <div className="landing__cta-group">
            <motion.button
              className="btn btn-primary btn-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/dashboard')}
            >
              Masuk Dashboard
              <ArrowRight size={18} />
            </motion.button>
            <motion.button
              className="btn btn-secondary btn-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/karsa')}
            >
              Coba AI Karsa
              <Bot size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          className="landing__hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="landing__orbit">
            <div className="landing__orbit-ring landing__orbit-ring--1">
              <div className="landing__orbit-dot" style={{ '--delay': '0s' }}>🌾</div>
              <div className="landing__orbit-dot" style={{ '--delay': '2s' }}>📊</div>
            </div>
            <div className="landing__orbit-ring landing__orbit-ring--2">
              <div className="landing__orbit-dot" style={{ '--delay': '1s' }}>🏨</div>
              <div className="landing__orbit-dot" style={{ '--delay': '3s' }}>💰</div>
              <div className="landing__orbit-dot" style={{ '--delay': '5s' }}>🤖</div>
            </div>
            <div className="landing__orbit-center">
              <Sprout size={40} />
              <span>GAMPI</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="landing__stats">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="landing__stat-item glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
          >
            <div className="landing__stat-value">
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix || ''}
                suffix={stat.suffix || ''}
                decimals={stat.decimals || 0}
              />
            </div>
            <div className="landing__stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Features */}
      <section className="landing__features">
        <motion.div
          className="landing__section-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-overline" style={{ color: 'var(--primary-400)' }}>Fitur Unggulan</span>
          <h2 className="text-h1">Ekosistem Digital <span className="gradient-text">Terintegrasi</span></h2>
          <p className="text-body" style={{ color: 'var(--text-secondary)', maxWidth: 560 }}>
            Solusi end-to-end dari hulu ke hilir yang memodernisasi setiap aspek rantai pasok pertanian.
          </p>
        </motion.div>

        <div className="landing__features-grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="landing__feature-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className="landing__feature-icon" style={{ '--accent': f.color }}>
                {f.icon}
              </div>
              <h3 className="landing__feature-title">{f.title}</h3>
              <p className="landing__feature-desc">{f.desc}</p>
              <div className="landing__feature-link">
                <span>Pelajari</span>
                <ChevronRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Bottom */}
      <motion.section
        className="landing__bottom-cta glass-panel-heavy"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="landing__bottom-cta-content">
          <h2 className="text-h1">Siap Melihat <span className="gradient-text">Demo?</span></h2>
          <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
            Jelajahi seluruh fitur ekosistem GAMPI melalui simulasi interaktif.
          </p>
          <motion.button
            className="btn btn-primary btn-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/dashboard')}
          >
            Mulai Jelajahi
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="landing__footer">
        <div className="landing__footer-brand">
          <Sprout size={20} />
          <span>GAMPI</span>
        </div>
        <p>Prodi Teknologi Informasi — UIN Walisongo Semarang © 2026</p>
      </footer>
    </div>
  );
}
