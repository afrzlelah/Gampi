import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Send, Bot, User, Volume2, Sparkles, Navigation, Sun, Smartphone } from 'lucide-react';
import { karsaConversation } from '../data/mockData';
import { useGlobalState } from '../context/GlobalStateContext';
import { useAuth } from '../context/AuthContext';
import './KarsaPage.css';

export default function KarsaPage() {
  const { addHarvest } = useGlobalState();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFieldMode, setIsFieldMode] = useState(false); // Field Outdoor Mode Toggle
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    setMessages(karsaConversation);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const processAIResponse = (userQuery) => {
    const query = userQuery.toLowerCase();
    let responseText = '';
    let isJavanese = query.includes('dina') || query.includes('wis') || query.includes('piye') || query.includes('tani');

    if (query.includes('panen') || query.includes('kilo') || query.includes('kg') || query.includes('ton')) {
      const matchKg = query.match(/\d+/);
      const volumeKg = matchKg ? parseInt(matchKg[0]) : 80;
      const farmerName = user?.name || 'Pak Suharto';

      addHarvest({
        id: `HVT-${Date.now()}`,
        farmer: farmerName,
        commodity: query.includes('tomat') ? 'Tomat Fresh' : (query.includes('bawang') ? 'Bawang Merah' : 'Cabai Merah Keriting'),
        volumeKg: volumeKg,
        date: 'Hari ini',
        status: 'Siap Transaksi'
      });

      responseText = isJavanese 
        ? `Matur nuwun, ${farmerName}! Laporan panen ${volumeKg} kg sampun kula catat wonten sistem ERP AgriDaya.`
        : `Baik, ${farmerName}! Laporan panen ${volumeKg} kg telah dicatat di lahan Anda. Stok ini siap diverifikasi AI untuk Paspor Panen!`;
    } else if (query.includes('pupuk') || query.includes('urea') || query.includes('npk')) {
      responseText = 'Siap! Pemupukan telah dicatat ke dalam log siklus tanam. Jadwal pemupukan susulan berikutnya diprediksi 12 hari lagi.';
    } else if (query.includes('cuaca') || query.includes('hujan') || query.includes('suhu')) {
      responseText = 'Prakiraan cuaca di lokasi lahan Bandungan: Cerah berawan 24°C, kelembapan 75%. Aman untuk panen hari ini!';
    } else {
      responseText = isJavanese
        ? 'Kula AI Karsa, siap mbantu pencatatan tani Pak Suharto. Wonten laporan panen utawi pupuk ingkang badhe dicatat?'
        : 'Saya AI Karsa, asisten suara Anda. Saya telah mencatat laporan Anda ke ekosistem AGRIDAYA.';
    }

    setMessages(prev => [...prev, { role: 'karsa', text: responseText, lang: isJavanese ? 'jw' : 'id' }]);
    speakText(responseText);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText, lang: 'id' }]);
    setInput('');

    setTimeout(() => {
      processAIResponse(userText);
    }, 600);
  };

  const toggleRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      if (!isRecording) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = 'id-ID';
          recognition.interimResults = false;
          recognition.onstart = () => setIsRecording(true);
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            setIsRecording(false);
          };
          recognition.onerror = () => setIsRecording(false);
          recognition.onend = () => setIsRecording(false);
          recognition.start();
          recognitionRef.current = recognition;
        } catch {
          simulateVoiceInput();
        }
      } else {
        recognitionRef.current?.stop();
        setIsRecording(false);
      }
    } else {
      simulateVoiceInput();
    }
  };

  const simulateVoiceInput = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setInput('Karsa, panen cabai merah 120 kg hari ini');
    }, 2000);
  };

  const handleQuickAction = (actionText) => {
    setInput(actionText);
  };

  return (
    <div className={`karsa ${isFieldMode ? 'karsa--field-mode' : ''}`}>
      <div className="karsa__header flex justify-between items-center mb-md">
        <div className="flex items-center gap-md">
          <div className="karsa__avatar">
            <Bot size={28} />
          </div>
          <div>
            <h2 className="text-h2 flex items-center gap-xs">
              AI Voice "Karsa"
              <span className="badge badge-primary flex items-center gap-xs" style={{ fontSize: '0.75rem' }}>
                <Sparkles size={12} /> Voice NLP
              </span>
            </h2>
            <p className="text-caption">Pencatatan tani lewat perintah suara (Bahasa Jawa & Indonesia)</p>
          </div>
        </div>

        {/* Outdoor Field Mode Switcher */}
        <button 
          className={`btn ${isFieldMode ? 'btn-primary font-bold' : 'btn-ghost border border-glass'}`}
          onClick={() => setIsFieldMode(!isFieldMode)}
        >
          <Sun size={18} /> {isFieldMode ? 'Mode di Lahan (Aktif ☀️)' : 'Aktifkan Mode di Lahan 🌾'}
        </button>
      </div>

      {/* Field Mode Alert & Outdoor Optimized Layout */}
      {isFieldMode && (
        <div className="alert alert-info p-md mb-md flex items-center justify-between bg-emerald-700 text-white rounded-2xl shadow-lg">
          <div className="flex items-center gap-sm">
            <Navigation size={20} className="animate-pulse" />
            <div>
              <p className="font-bold text-body" style={{ color: 'white' }}>📍 Terhubung GPS: Kebun Bandungan Lahan 01</p>
              <p className="text-caption" style={{ color: '#d1fae5' }}>UI Kontras Tinggi Diaktifkan untuk penggunaan outdoor di bawah terik matahari.</p>
            </div>
          </div>
          <span className="badge badge-success" style={{ background: '#065f46', color: 'white' }}>HIGH CONTRAST</span>
        </div>
      )}

      {/* Field Mode Quick Action Cards for Outdoor Farmers */}
      {isFieldMode && (
        <div className="grid grid-3 gap-md mb-md">
          <button className="field-action-card p-lg rounded-2xl text-left font-bold text-h3 bg-emerald-600 text-white shadow-md hover:bg-emerald-700" onClick={() => handleQuickAction('Karsa, panen cabai merah 100 kg hari ini')}>
            🌾 Lapor Panen 100kg
          </button>
          <button className="field-action-card p-lg rounded-2xl text-left font-bold text-h3 bg-blue-600 text-white shadow-md hover:bg-blue-700" onClick={() => handleQuickAction('Karsa, pemupukan urea 2 karung selesai')}>
            🧪 Lapor Pemupukan
          </button>
          <button className="field-action-card p-lg rounded-2xl text-left font-bold text-h3 bg-amber-600 text-white shadow-md hover:bg-amber-700" onClick={() => handleQuickAction('Piye kabare cuaca lan tanduranku?')}>
            ☀️ Cek Status Lahan
          </button>
        </div>
      )}

      <div className="karsa__container glass-panel-solid">
        <div className="karsa__chat">
          {messages.map((msg, i) => {
            if (!msg) return null;
            const isUser = msg.role === 'user';
            return (
              <motion.div 
                key={i} 
                className={`karsa__msg-wrapper ${isUser ? 'user' : 'karsa-bot'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="karsa__msg-avatar">
                  {isUser ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className="karsa__msg-content">
                  <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
                  {msg.lang === 'jw' && (
                    <span className="karsa__lang-badge">Bahasa Jawa Detected</span>
                  )}
                  {!isUser && (
                    <button 
                      className="karsa__speech-btn" 
                      onClick={() => speakText(msg.text)}
                      title="Dengar Suara AI"
                    >
                      <Volume2 size={14} /> Putar Suara
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        <form className="karsa__input-area" onSubmit={handleSend}>
          <button 
            type="button" 
            className={`karsa__mic-btn ${isRecording ? 'recording' : ''} ${isFieldMode ? 'large-mic' : ''}`}
            onClick={toggleRecording}
            title={isRecording ? "Mendengarkan..." : "Bicara Suara"}
          >
            <Mic size={isFieldMode ? 28 : 20} />
            {isRecording && <span className="karsa__pulse-ring" />}
          </button>
          
          <input 
            type="text" 
            className="input-field karsa__input" 
            placeholder={isFieldMode ? "Bicara atau tekan tombol cepat..." : "Ketik atau ucapkan (cth: 'Panen cabai 120 kg')..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <button type="submit" className="karsa__send-btn" disabled={!input.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
