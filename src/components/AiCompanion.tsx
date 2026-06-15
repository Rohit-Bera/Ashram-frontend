import React, { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from '../context/LangContext';
import { MessageSquare, Send, Sparkles, X, Compass, Loader, Heart } from 'lucide-react';

interface ChatMessage {
  sender: 'seeker' | 'guru';
  text: string;
}

export const AiCompanion: React.FC = () => {
  const { t, language } = useGlobalContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        sender: 'guru',
        text: 'Pranams, dear seeker. I am your humble AI spiritual guide companion, here to help share the holy teachings of Mahavatar Babaji, Lahiri Mahasaya, and the Kriya Yoga lineage. \n\nHow may I help illuminate your pathway today?'
      }
    ];
  });
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto Scroll on message additions
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isLoading) return;

    // Append user input
    setMessages(prev => [...prev, { sender: 'seeker', text: textToSend }]);
    if (!customText) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });
      const data = await response.json();
      if (data.success && data.text) {
        setMessages(prev => [...prev, { sender: 'guru', text: data.text }]);
      } else {
        throw new Error('API failure');
      }
    } catch (e) {
      console.error('Guru chat error:', e);
      setMessages(prev => [
        ...prev,
        {
          sender: 'guru',
          text: 'Forgive me, dear seeker. A temporal material vibration has disrupted my network. Let us chant *Om* and please try again shortly. 🙏'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const SUGGESTIONS = [
    {
      en: 'What is Mantra Meditation?',
      hi: 'मंत्र ध्यान क्या है?',
      gu: 'મંત્ર ધ્યાન એટલે શું?',
      bn: 'মন্ত্র জপ বা সংকীর্তন কী?'
    },
    {
      en: 'Explain the Law of Karma',
      hi: 'कर्म के सिद्धांत की व्याख्या करें',
      gu: 'કર્મનો નિયમ સમજાવો',
      bn: 'কর্মের নিয়ম কী?'
    },
    {
      en: 'Gita teachings on Anxiety',
      hi: 'चिंता पर भगवद गीता की सीख',
      gu: 'ચિંતા પર ભગવદ ગીતા નો શીખ',
      bn: 'উদ্বেগ দূর করতে গীতার উপদেশ'
    }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-tr from-amber-600 to-amber-500 text-white rounded-full p-4 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all outline-none border border-amber-400 group"
        title="Spiritual AI Guru Guide"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
        </span>
        <Sparkles className="w-6 h-6 animate-pulse group-hover:rotate-12 transition-transform" />
      </button>

      {/* Slide-out / Pop-up Parchment Box */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[400px] h-[600px] max-h-[85vh] bg-[#FAF7F2] border border-amber-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform animate-in slide-in-from-bottom-5">
          
          {/* Ancient Parchment Headings Top Trim */}
          <div className="bg-gradient-to-r from-[#5C4D3C] to-[#4A3E31] text-amber-50 p-4 border-b border-[#2C2621]/10 flex justify-between items-center relative">
            <div className="flex items-center gap-2.5">
              <div className="bg-amber-100/10 p-1.5 rounded-full border border-amber-500/20">
                <Compass className="w-5 h-5 text-[#FF9933] animate-spin" style={{ animationDuration: '40s' }} />
              </div>
              <div>
                <h3 className="text-sm font-serif font-semibold tracking-wide text-amber-100">
                  {t({
                    en: 'AI Spiritual Guru Companion',
                    hi: 'एआई आध्यात्मिक गुरु मार्गदर्शक',
                    gu: 'એઆઈ આધ્યાત્મિક ગુરુ માર્ગદર્શક',
                    bn: 'শ্রীগুরু এআই পারमার্থিক নির্দেশক'
                  })}
                </h3>
                <p className="text-[10px] text-amber-200/70 flex items-center gap-0.5 mt-0.5">
                  <Sparkles className="w-2.5 h-2.5" />
                  Lineage: Kriya Yoga Parampara Grounding
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-amber-200 hover:text-white rounded-lg p-1 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Top decorative floral pattern */}
            <div className="absolute left-0 bottom-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF9933] to-transparent" />
          </div>

          {/* Chat scrolling feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAF7F2] flex flex-col" ref={scrollRef}>
            
            {/* Disclaimer notice */}
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 text-[10px] text-amber-900/60 leading-relaxed text-center font-serif">
              🍃 {t({
                en: 'This companion answers questions in the light of the Gita, Yoga Sutras, and Kriya Masters for internal peace.',
                hi: 'यह मार्गदर्शक आंतरिक शांति के लिए गीता, योग सूत्र और क्रिया योग के गुरुओं की शिक्षाओं के प्रकाश में उत्तर देता है।',
                gu: 'આ માર્ગદર્શક આંતરિક શાંતિ મેળવવા માટે ભગવદ ગીતા, યોગ સૂત્રો અને ક્રિયા યોગના ગુરુઓની શિક્ષાઓ અનુસાર માર્ગદર્શન આપે છે.',
                bn: 'এই নির্দেশক পরম শান্তি লাভের উদ্দেশ্যে গীতা, যোগসূত্র এবং ক্রিয়াযোগের গুরুদের মহিমাময় শিক্ষাবলীর আলোকে পথপ্রদর্শন করে।'
              })}
            </div>

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'seeker' ? 'justify-end' : 'justify-start'} animate-in fade-in-20 duration-150`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-xs leading-relaxed ${
                    msg.sender === 'seeker'
                      ? 'bg-amber-600 text-white rounded-tr-none'
                      : 'bg-white text-amber-950 border border-amber-100/90 rounded-tl-none font-serif relative overflow-hidden'
                  }`}
                >
                  {/* Miniature decorative elements for Guru messages */}
                  {msg.sender === 'guru' && (
                    <div className="absolute right-1 top-1 text-[8px] text-amber-700/10 rotate-12">
                      🙏
                    </div>
                  )}

                  {/* Parse basic markdown from API response */}
                  <div className="space-y-2 whitespace-pre-wrap">
                    {msg.text.split('\n\n').map((para, pIdx) => {
                      if (para.startsWith('###')) {
                        return <h4 key={pIdx} className="text-amber-950 font-bold border-b border-amber-550/10 pb-0.5 mt-2 font-sans text-xs">{para.replace('###', '').trim()}</h4>;
                      }
                      if (para.startsWith('>')) {
                        return (
                          <blockquote key={pIdx} className="border-l-2 border-amber-500 pl-2.5 py-1 text-xs text-amber-900 bg-amber-50/50 rounded italic font-sans">
                            {para.replace('>', '').trim()}
                          </blockquote>
                        );
                      }
                      return <p key={pIdx}>{para}</p>;
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Anim */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-amber-100 rounded-2xl rounded-tl-none p-4 flex items-center gap-2 shadow-sm">
                  <div className="relative">
                    <Loader className="w-4 h-4 text-amber-600 animate-spin" />
                  </div>
                  <span className="text-[10px] text-amber-800 italic animate-pulse">
                    Wisdom is aligning from the scriptures...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Active Preset Quick Queries Area */}
          <div className="px-4 py-2 bg-amber-50/50 border-t border-amber-100 overflow-x-auto flex gap-2 scrollbar-none">
            {SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sug[language])}
                disabled={isLoading}
                className="flex-shrink-0 px-3 py-1 bg-white hover:bg-amber-50 active:bg-amber-100 text-[10px] text-amber-900 border border-amber-200/80 rounded-full transition-colors font-serif disabled:opacity-50"
              >
                {sug[language]}
              </button>
            ))}
          </div>

          {/* Interactive footer sender */}
          <div className="p-3 bg-[#FAF7F2] border-t border-amber-200 flex gap-2">
            <input
              type="text"
              placeholder={t({
                en: 'Ask a spiritual question...',
                hi: 'कोई आध्यात्मिक प्रश्न पूछें...',
                gu: 'કોઈ આધ્યાત્મિક પ્રશ્ન પૂછો...',
                bn: 'কোনো আধ্যাত্মিক প্রশ্ন জিজ্ঞাসা করুন...'
              })}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
              className="flex-1 text-xs bg-white border border-amber-200 rounded-xl px-3 py-2.5 text-amber-950 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 bg-[#FF9933] hover:bg-[#E68019] disabled:opacity-40 text-white rounded-xl shadow-md transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* bottom accent border */}
          <div className="h-1 bg-gradient-to-r from-[#FF9933] to-[#E68019]" />
        </div>
      )}
    </>
  );
};
