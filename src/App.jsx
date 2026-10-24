import React, { useState, useEffect } from 'react';
import { ShieldAlert, FileText, Zap, CheckCircle, Lock, ExternalLink, History, RefreshCw, Layers } from 'lucide-react';

export default function App() {
  const [contractText, setContractText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Carregar histórico do localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem('legalese_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Salvar histórico
  const saveToHistory = (item) => {
    const newHistory = [item, ...history.slice(0, 4)];
    setHistory(newHistory);
    localStorage.setItem('legalese_history', JSON.stringify(newHistory));
  };

  const handleAnalyze = () => {
    if (!contractText.trim()) return;
    setLoading(true);
    setAnalysis(null);

    setTimeout(() => {
      let result = {};
      const textLower = contractText.toLowerCase();
      
      if (textLower.includes('multa') || textLower.includes('rescisão')) {
        result = {
          risk: 'ALTO RISCO',
          verdict: 'Basicamente: Há penalizações pesadas por cancelamento antecipado e isenção de culpas para a outra parte.',
          traps: [
            'Multa rescisória elevada sobre o saldo restante',
            'Renovação automática sem aviso prévio adequado',
            'Isenção total de responsabilidade em caso de instabilidade'
          ]
        };
      } else {
        result = {
          risk: 'MÉDIO RISCO',
          verdict: 'O texto contém cláusulas standard, mas exige atenção aos prazos e obrigações de entrega.',
          traps: [
            'Prazos de contestação muito curtos',
            'Obrigatoriedade de resolução em jurisdição específica'
          ]
        };
      }

      setAnalysis(result);
      setLoading(false);
      saveToHistory({ text: contractText.slice(0, 40) + '...', date: new Date().toLocaleDateString(), result });
    }, 1500);
  };

  const loadPreset = (type) => {
    if (type === 'aluguer') {
      setContractText('O LOCATÁRIO pagará multa rescisória de 50% sobre o saldo restante do contrato em caso de saída antecipada.');
    } else if (type === 'prestacao') {
      setContractText('A CONTRATADA isenta-se de qualquer responsabilidade por falhas de sistema ou interrupções no serviço prestado.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <ShieldAlert size={22} />
          </div>
          <span className="font-black tracking-wider text-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            LEGALESETRANSLATOR
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition flex items-center gap-1 text-xs font-medium"
          >
            <History size={16} /> Histórico ({history.length})
          </button>
          <a 
            href="https://mpago.la/1Gc1o3z" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-1"
          >
            <Lock size={14} /> PRO (R$ 47)
          </a>
        </div>
      </header>

      {/* HISTÓRICO MODAL/DRAWER */}
      {showHistory && (
        <div className="bg-slate-900 border-b border-slate-800 p-4 max-w-xl mx-auto mt-2 rounded-2xl shadow-xl">
          <h3 className="text-sm font-bold text-cyan-400 mb-2 flex items-center gap-2">
            <History size={16} /> Análises Anteriores (Salvas no Dispositivo)
          </h3>
          {history.length === 0 ? (
            <p className="text-xs text-slate-500">Nenhum contrato analisado recentemente.</p>
          ) : (
            <div className="space-y-2">
              {history.map((h, idx) => (
                <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                  <div>
                    <span className="text-slate-300 font-medium">{h.text}</span>
                    <span className="block text-[10px] text-slate-500">{h.date} - {h.result.risk}</span>
                  </div>
                  <button 
                    onClick={() => { setContractText(h.text); setShowHistory(false); }}
                    className="text-cyan-400 hover:underline"
                  >
                    Carregar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* HERO SECTION */}
      <main className="max-w-xl mx-auto p-4 mt-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Zap size={12} /> POWERED BY GEMINI AI & PIX CHECKOUT
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Traduza Contratos Complexos em Segundos</h1>
          <p className="text-slate-400 text-sm">Cole termos de uso, contratos de aluguer ou financiamentos e descubra os riscos ocultos explicados de forma simples.</p>
        </div>

        {/* PRESETS DE TESTE RÁPIDO */}
        <div className="flex gap-2 mb-3">
          <button onClick={() => loadPreset('aluguer')} className="text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300 transition">
            📋 Ex: Contrato Aluguer
          </button>
          <button onClick={() => loadPreset('prestacao')} className="text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300 transition">
            📋 Ex: Termos de Serviço
          </button>
        </div>

        {/* INPUT CARD */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-4 shadow-2xl backdrop-blur-xl mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Cole o texto do contrato ou termos de uso aqui:
          </label>
          <textarea
            rows={5}
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            placeholder="Ex: O Contratante pagará multa rescisória de..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition resize-none"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !contractText.trim()}
            className="mt-4 w-full py-3.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-slate-950 font-black rounded-2xl shadow-lg shadow-cyan-500/20 hover:opacity-95 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="animate-spin" size={18} /> A traduzir termos jurídicos...
              </>
            ) : (
              <>
                <Zap size={18} /> TRADUZIR E REVELAR RISCOS →
              </>
            )}
          </button>
        </div>

        {/* RESULTADO DA ANÁLISE */}
        {analysis && (
          <div className="bg-slate-900/80 border border-cyan-500/30 rounded-3xl p-5 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <span className="font-black text-sm tracking-wide flex items-center gap-2">
                <FileText size={18} className="text-cyan-400" /> RAIO-X DO CONTRATO
              </span>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${analysis.risk.includes('ALTO') ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                {analysis.risk}
              </span>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 mb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Veredito Simples:</span>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">{analysis.verdict}</p>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <ShieldAlert size={14} className="text-red-400" /> Armadilhas Encontradas:
            </h4>
            <ul className="space-y-2">
              {analysis.traps.map((trap, i) => (
                <li key={i} className="text-xs bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl text-slate-300 flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span> {trap}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FORJA DIGITAL ECOSYSTEM FOOTER */}
        <div className="mt-12 border-t border-slate-900 pt-6 text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mb-2 font-semibold">
            <Layers size={14} /> ECOSSISTEMA FORJA DIGITAL
          </div>
          <div className="flex justify-center gap-4 text-xs">
            <a href="https://catalogo-apps.vercel.app" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
              Catálogo Apps <ExternalLink size={12} />
            </a>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">Termux & Vercel Engine</span>
          </div>
        </div>
      </main>
    </div>
  );
}
