
import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Gift, Coffee, Heart, Briefcase } from 'lucide-react';
import { getGiftRecommendations } from '../services/geminiService';
import { RecommendationRequest } from '../types';

const AIConcierge: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [params, setParams] = useState<RecommendationRequest>({
    occasion: 'Holiday Gifting',
    budget: '₹5000-₹15000',
    recipientCount: '25',
    tone: 'Professional'
  });

  const handleConsult = async () => {
    setLoading(true);
    const response = await getGiftRecommendations(params);
    setResult(response || "");
    setLoading(false);
  };

  const handleQuickSelect = (field: keyof RecommendationRequest, value: string) => {
    setParams(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          AI Consulting Beta
        </div>
        <h1 className="text-4xl font-bold text-slate-900 serif mb-4">Meet your AI Gift Concierge</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Describe your gifting needs, and our Gemini-powered assistant will curate the perfect strategy for your team or clients in INR.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Controls */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-indigo-50">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Gift className="w-5 h-5 text-indigo-600" />
            Gift Parameters
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Occasion Type</label>
              <div className="grid grid-cols-2 gap-3">
                {['Holiday Gifting', 'New Hire Welcome', 'Client Thank You', 'Anniversary'].map(v => (
                  <button
                    key={v}
                    onClick={() => handleQuickSelect('occasion', v)}
                    className={`px-4 py-2 rounded-xl text-sm transition-all border ${params.occasion === v ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-300'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Budget Per Recipient</label>
              <div className="grid grid-cols-3 gap-3">
                {['< ₹5000', '₹5000-₹15000', '₹15000+'].map(v => (
                  <button
                    key={v}
                    onClick={() => handleQuickSelect('budget', v)}
                    className={`px-4 py-2 rounded-xl text-sm transition-all border ${params.budget === v ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-300'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Recipient Count</label>
                <input 
                  type="number" 
                  value={params.recipientCount}
                  onChange={(e) => handleQuickSelect('recipientCount', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Gift Tone</label>
                <select 
                  value={params.tone}
                  onChange={(e) => handleQuickSelect('tone', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Professional</option>
                  <option>Warm & Personal</option>
                  <option>Luxurious</option>
                  <option>Fun & Energetic</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleConsult}
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Ask AI Consultant
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Window */}
        <div className="flex flex-col h-full">
          <div className="bg-slate-900 rounded-3xl shadow-2xl p-8 text-indigo-100 min-h-[500px] flex flex-col">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-2 text-xs font-mono uppercase tracking-widest text-slate-500">Gemini Intelligence</span>
            </div>

            <div className="flex-grow overflow-y-auto font-serif italic text-lg leading-relaxed">
              {result ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <div className="whitespace-pre-wrap">{result}</div>
                  <div className="mt-8 pt-8 border-t border-slate-800 flex gap-4">
                    <button className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg not-italic font-sans font-bold hover:bg-indigo-500">
                      Add Suggested Items to Cart
                    </button>
                    <button onClick={() => setResult(null)} className="text-sm border border-slate-700 px-4 py-2 rounded-lg not-italic font-sans">
                      Start Over
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                  <Sparkles className="w-12 h-12 opacity-20" />
                  <p className="not-italic font-sans text-sm">Select parameters and click "Ask" to generate ideas.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConcierge;
