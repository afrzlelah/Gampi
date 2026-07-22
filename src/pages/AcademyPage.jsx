import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Clock, BookOpen, Award } from 'lucide-react';
import { academyModules } from '../data/mockData';
import './AcademyPage.css';

export default function AcademyPage() {
  return (
    <div className="academy">
      <div className="academy__hero glass-panel-solid">
        <div className="academy__hero-content">
          <h2 className="text-h1 mb-sm">Smart Farming Academy</h2>
          <p className="text-body mb-lg">Tingkatkan kapabilitas dan adopsi teknologi pertanian dengan modul pembelajaran digital interaktif yang dirancang khusus untuk petani.</p>
          <div className="flex gap-md">
            <button className="btn btn-primary">Lanjutkan Belajar</button>
            <button className="btn btn-secondary">Jelajahi Modul</button>
          </div>
        </div>
        <div className="academy__hero-visual">
          <div className="academy__hero-badge">
            <Award size={32} color="var(--primary-400)" />
            <div>
              <p className="font-bold">Sertifikat Tersedia</p>
              <p className="text-caption">Tingkatkan skor reputasimu</p>
            </div>
          </div>
        </div>
      </div>

      <div className="academy__section">
        <h3 className="text-h2 mb-md">Modul Pembelajaran</h3>
        <div className="academy__grid">
          {academyModules.map((mod, i) => (
            <motion.div 
              key={mod.id} 
              className="academy-card glass-panel"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="academy-card__thumb">
                <div className="academy-card__icon">{mod.icon}</div>
                <div className="academy-card__overlay">
                  <PlayCircle size={48} color="white" />
                </div>
              </div>
              <div className="academy-card__content">
                <span className="badge badge-info mb-sm">{mod.category}</span>
                <h4 className="academy-card__title">{mod.title}</h4>
                
                <div className="academy-card__meta">
                  <div className="flex items-center gap-xs">
                    <Clock size={14} /> {mod.duration}
                  </div>
                  <div className="flex items-center gap-xs">
                    <BookOpen size={14} /> {mod.lessons} Pelajaran
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="badge badge-warning" style={{ padding: '2px 6px' }}>{mod.level}</span>
                  </div>
                </div>

                <div className="academy-card__progress">
                  <div className="flex justify-between text-caption mb-xs">
                    <span>Progress</span>
                    <span>{mod.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${mod.progress}%`, background: mod.progress === 100 ? 'var(--success)' : '' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
