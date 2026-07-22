import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, CheckCircle2, TrendingUp, Cpu, Leaf, Upload, Image, Camera } from 'lucide-react';
import './DiagnosisPage.css';

export default function DiagnosisPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (evt) => {
        setUploadedImage(evt.target.result);
      };
      reader.readAsDataURL(file);
      setDiagnosisResult(null);
    }
  };

  const runAIDiagnosis = () => {
    setAnalyzing(true);
    setDiagnosisResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setDiagnosisResult({
        cropName: 'Cabai Merah Keriting',
        healthScore: 94,
        diseaseStatus: 'Bebas Hama Kritis (Sehat)',
        spectralIndex: '0.82 NDVI (Optimal)',
        predictedYield: '12.5 Ton / Ha',
        harvestDateEst: '12 Oktober 2026',
        recommendation: 'Tanaman dalam kondisi optimal. Lakukan pemupukan susulan NPK pada hari ke-50. Sistem irigasi berjalan efisien 98%.',
        gradeEstimate: 'A+',
        confidenceScore: '94.2%'
      });
    }, 2500);
  };

  return (
    <div className="diagnosis-page">
      <div className="diagnosis-page__header flex justify-between items-center mb-xl">
        <div>
          <h2 className="text-h2 flex items-center gap-xs">
            AI Diagnosis & Yield Forecast
            <span className="badge badge-primary flex items-center gap-xs" style={{ fontSize: '0.75rem' }}>
              <Cpu size={14} /> Computer Vision & NDVI
            </span>
          </h2>
          <p className="text-caption">Upload foto tanaman dari lahan Anda untuk analisis kesehatan & prediksi hasil panen presisi oleh AI</p>
        </div>
      </div>

      <div className="grid grid-2 gap-lg mb-xl">
        {/* Left: Upload & Diagnosis */}
        <div className="glass-panel p-xl">
          <h3 className="text-h2 mb-md flex items-center gap-xs">
            <Camera size={24} color="var(--primary-600)" /> Upload Foto Tanaman
          </h3>

          {/* Upload Area */}
          <div 
            className="upload-area p-xl rounded-2xl text-center border-2 border-dashed border-primary-300 mb-lg cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            style={{ background: uploadedImage ? 'transparent' : 'rgba(16,185,129,0.04)' }}
          >
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              hidden 
            />

            {uploadedImage ? (
              <div>
                <img 
                  src={uploadedImage} 
                  alt="Uploaded crop" 
                  style={{ maxHeight: 220, borderRadius: 16, objectFit: 'cover', width: '100%' }}
                />
                <p className="text-caption mt-sm font-bold text-primary-600">📷 {uploadedFileName}</p>
                <p className="text-caption text-tertiary">Klik untuk ganti foto</p>
              </div>
            ) : (
              <div>
                <div className="inline-flex p-lg rounded-full bg-primary-50 text-primary-600 mb-md">
                  <Upload size={36} />
                </div>
                <p className="font-bold text-h3 mb-xs">Klik untuk Upload Foto Tanaman</p>
                <p className="text-caption text-tertiary">Ambil foto daun, batang, atau buah dari kamera HP Anda. Format: JPG, PNG</p>
              </div>
            )}
          </div>

          {/* Analyze Button */}
          <button 
            className="btn btn-primary btn-lg w-full flex items-center justify-center gap-sm"
            onClick={runAIDiagnosis} 
            disabled={analyzing || !uploadedImage}
          >
            {analyzing ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Cpu size={20} />
              </motion.div>
            ) : <Sparkles size={20} />}
            {analyzing ? 'AI Sedang Menganalisis Citra...' : (uploadedImage ? 'Jalankan Diagnosis AI' : 'Upload Foto Terlebih Dahulu')}
          </button>

          {/* Diagnosis Result */}
          <AnimatePresence>
            {diagnosisResult && (
              <motion.div 
                className="mt-lg p-lg rounded-2xl border border-success-200"
                style={{ background: 'rgba(16, 185, 129, 0.05)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-between items-center mb-md">
                  <span className="badge badge-success flex items-center gap-2xs">
                    <CheckCircle2 size={14} /> {diagnosisResult.diseaseStatus}
                  </span>
                  <span className="font-bold text-h3 text-success">{diagnosisResult.healthScore}% Sehat</span>
                </div>
                <h4 className="font-bold text-h3 mb-xs">{diagnosisResult.cropName}</h4>
                <p className="text-caption mb-md">{diagnosisResult.recommendation}</p>
                <div className="grid grid-2 gap-sm pt-md border-t border-success-200">
                  <div className="text-caption"><strong>Estimasi Grade:</strong> <span className="text-primary-700 font-bold">{diagnosisResult.gradeEstimate}</span></div>
                  <div className="text-caption"><strong>Akurasi AI:</strong> <span className="text-primary-700 font-bold">{diagnosisResult.confidenceScore}</span></div>
                  <div className="text-caption"><strong>Indeks NDVI:</strong> <span className="text-primary-700 font-bold">{diagnosisResult.spectralIndex}</span></div>
                  <div className="text-caption"><strong>Prediksi Yield:</strong> <span className="text-primary-700 font-bold">{diagnosisResult.predictedYield}</span></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Yield Forecast */}
        <div className="glass-panel p-xl">
          <h3 className="text-h2 mb-md flex items-center gap-xs">
            <TrendingUp size={24} color="var(--primary-600)" /> Prediksi Hasil Panen
          </h3>

          <div className="p-lg rounded-2xl bg-gray-50 border border-glass mb-lg">
            <span className="text-overline">Target Estimasi Total Panen Musim Ini</span>
            <p className="text-h1 font-black text-primary-600 mt-xs mb-xs">12.5 <span className="text-h3 font-normal">Ton</span></p>
            <p className="text-caption">Akurasi: <strong>94.2%</strong> (data historis cuaca + log pupuk Karsa + sensor tanah)</p>
          </div>

          <div className="flex flex-col gap-sm">
            <div className="flex justify-between items-center p-md rounded-xl bg-white border border-glass">
              <div>
                <p className="font-bold text-body" style={{ fontSize: '0.875rem' }}>Fase Vegetatif Akhir</p>
                <p className="text-caption">Umur Tanaman: 45 Hari</p>
              </div>
              <span className="badge badge-primary">Sesuai Target</span>
            </div>
            <div className="flex justify-between items-center p-md rounded-xl bg-white border border-glass">
              <div>
                <p className="font-bold text-body" style={{ fontSize: '0.875rem' }}>Estimasi Pembentukan Buah</p>
                <p className="text-caption">Prediksi Panen: 12 Oktober 2026</p>
              </div>
              <span className="badge badge-success">Optimis (+8%)</span>
            </div>
            <div className="flex justify-between items-center p-md rounded-xl bg-white border border-glass">
              <div>
                <p className="font-bold text-body" style={{ fontSize: '0.875rem' }}>Potensi Grading AI</p>
                <p className="text-caption">Berdasarkan analisis citra terakhir</p>
              </div>
              <span className="badge badge-success">Grade A+ Predicted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
