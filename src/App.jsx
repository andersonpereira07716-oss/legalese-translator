import React, { useState } from 'react';
import { ShieldAlert, FileText, CheckCircle2, AlertTriangle, Zap, ArrowRight, Lock, QrCode, ExternalLink } from 'lucide-react';

export default function App() {
  const [contractText, setContractText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [pixData, setPixData] = useState(null);
  const [loadingPix, setLoadingPix] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!contractText.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setAnalysis({
        riskLevel: 'ALTO RISCO',
        summary: 'Este contrato possui cláusulas restritivas de rescisão e multas abusivas.',
        simpleTranslation: 'Basicamente: Se cancelar antes do prazo, vai pagar uma multa muito cara e eles isentam-se de culpas por falhas no serviço.',
        traps: [
          'Multa rescisória de 50% sobre o saldo restante (Cláusula 4.2)',
          'Renovação automática sem aviso prévio de 30 dias (Cláusula 8.1)',
          'Isenção total de responsabilidade em caso de instabilidade (Cláusula 12)'
        ]
      });
      setLoading(false);
    }, 1500);
  };

  const handleOpenCheckout = async () => {
    setShowCheckout(true);
    setLoadingPix(true);
    
    try {
      // Simulação de chamada para gerar o Pix no Mercado Pago (Pode substituir pelo seu link direto do MP)
      setTimeout(() => {
        setPixData({
          copyPasteCode: '00020126580014br.gov.bcb.pix0136legalese-pro-mercadopago-key520400005303986540547.005802BR5920LEGALESE TRANSLATOR6005PATOS62070503***6304',
          checkoutUrl: 'https://mpago.la/seu-link-de-pagamento' // Cole aqui o seu link do Mercado Pago se preferir
        });
        setLoadingPix(false);
      }, 800);
    } catch (e) {
      setLoadingPix(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
      
      {/* HEADER MELHORADO */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/20">
            ⚖️
          </div>
          <span className="font-black text-lg tracking-tight">LEGALESE<span className="text-cyan-400">TRANSLATOR</span></span>
        </div>
        <button 
          onClick={handleOpenCheckout}
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/20 transition active:scale-95 flex items-center gap-1.5"
        >
          💎 PRO (R$ 47)
        </button>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-3xl mx-auto w-full py-8 space-y-8">
        
        <div className="text-center space-y-3 px-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest shadow-inner">
            ⚡ Powered by Gemini AI & Pix Checkout
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Traduza Contratos Complexos em Segundos
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
            Cole termos de uso, contratos de aluguel ou financiamentos e descubra os riscos ocultos explicados de forma simples.
          </p>
        </div>

        {/* FORMULÁRIO DE ANÁLISE COM GLASSMORPHISM */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-4">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5">
                Cole o texto do contrato ou termos de uso aqui:
              </label>
              <textarea 
                rows="6"
                placeholder="Ex: O Contratante pagará multa rescisória de..."
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
                className="w-full p-4 bg-slate-950 border border-slate-800/80 rounded-2xl text-xs text-white focus:outline-none focus:border-cyan-500 transition shadow-inner resize-none leading-relaxed"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-cyan-500/25 transition active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>A analisar cláusulas ocultas com IA...</span>
              ) : (
                <>
                  <Zap size={16} /> Traduzir e Revelar Riscos <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* RESULTADO DA ANÁLISE */}
        {analysis && (
          <div className="bg-slate-900/90 backdrop-blur-xl border border-red-500/30 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="text-red-400" size={22} />
                <h3 className="font-black text-sm text-white uppercase tracking-wider">Raio-X do Contrato</h3>
              </div>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-[10px] font-black rounded-full uppercase tracking-wider">
                {analysis.riskLevel}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1.5 shadow-inner">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Veredito Simples:</span>
                <p className="text-slate-200 font-medium leading-relaxed">{analysis.simpleTranslation}</p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-red-400 font-black uppercase tracking-wider block">⚠️ Armadilhas Encontradas:</span>
                {analysis.traps.map((trap, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3.5 bg-red-950/20 border border-red-900/40 rounded-xl text-red-200">
                    <span className="font-bold text-red-400">•</span>
                    <span className="leading-relaxed">{trap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL DE CHECKOUT PIX / MERCADO PAGO */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 relative shadow-2xl">
            <button onClick={() => setShowCheckout(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Desbloquear Legalese Pro</h3>
              <p className="text-xs text-slate-400">Análises ilimitadas de contratos e PDFs completos via Inteligência Artificial.</p>
            </div>

            {loadingPix ? (
              <div className="py-10 text-center text-xs text-cyan-400 font-bold">A gerar pagamento Pix seguro...</div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 shadow-inner">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Pix Copia e Cola (Mercado Pago):</p>
                  <p className="text-[10px] font-mono text-cyan-400 break-all select-all bg-slate-900 p-2.5 rounded-xl border border-slate-800">{pixData?.copyPasteCode}</p>
                </div>

                <a 
                  href="https://mpago.la/1Gc1o3z" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase rounded-2xl text-center shadow-lg transition flex items-center justify-center gap-2"
                >
                  <ExternalLink size={15} /> Pagar com Link do Mercado Pago
                </a>

                <button 
                  onClick={() => { alert('Acesso Pro simulado com sucesso!'); setShowCheckout(false); }}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase rounded-xl transition"
                >
                  Já fiz o pagamento / Simular Acesso
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RODAPÉ */}
      <footer className="max-w-4xl mx-auto w-full pt-8 pb-4 border-t border-slate-900/80 text-center text-xs text-slate-500">
        <p>© 2026 Legalese Translator. Todos os direitos reservados.</p>
      </footer>

    </div>
  );
}
