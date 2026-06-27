import React from 'react';
import { Sparkles, ArrowDown, BookOpen, Scroll, HelpCircle } from 'lucide-react';
import { useGlobalContext } from '../context/LangContext';
import { LocalizedString } from '../types';

interface LineageNode {
  id: string;
  name: LocalizedString;
  title: LocalizedString;
  era: string;
  role: LocalizedString;
  inheritedFrom: LocalizedString;
  inheritedTo: LocalizedString;
  avatar: string;
  description: LocalizedString;
}

export const GuruLineageTree: React.FC<{
  onSelectGuruById: (id: string) => void;
  activeGuruId?: string;
}> = ({ onSelectGuruById, activeGuruId }) => {
  const { language, t } = useGlobalContext();

  const lineageChain: LineageNode[] = [
    {
      id: 'krishna',
      name: { en: 'Lord Sri Krishna', hi: 'भगवान श्री कृष्ण', gu: 'ભગવાન શ્રી કૃષ્ણ', bn: 'পরমেশ্বর ভগবান শ্রীকৃষ্ণ' },
      title: { en: 'The Supreme Source of Absolute Truth', hi: 'परम सत्य का आदि स्रोत', gu: 'પરમ સત્યના મૂળ સ્ત્રોત', bn: 'পরম সত্যের নিত্য আদি উৎস' },
      era: 'Primordial / Eternal',
      role: { en: 'Adi-Guru', hi: 'आदि-गुरु', gu: 'આદિ-ગુરુ', bn: 'আদি-শ্রীগুরু' },
      inheritedFrom: { en: 'None (The Origin of All)', hi: 'कोई नहीं (सबका आदि स्रोत)', gu: 'કોઈ નહીં (સર્વના મૂળ)', bn: 'কেহই নয় (তিনি স্বয়ংপ্রকাশ)' },
      inheritedTo: { en: 'Babaji Maharaj', hi: 'बाबाजी महाराज', gu: 'બાબાજી મહારાજ', bn: 'বাবাজি মহারাজ' },
      avatar: 'https://images.unsplash.com/photo-1609137144814-7223e75e1cee?auto=format&fit=crop&q=80&w=200',
      description: { en: 'Spoke the transcendental knowledge of Bhagavad-gita directly to Arjuna.', hi: 'अर्जुन को श्रीमद्भगवद्गीता का अमर उपदेश दिया।', gu: 'અર્જુનને અમર ગીતા જ્ઞાન આપ્યું.', bn: 'কুরুক্ষেত্রের পুণ্য রণাঙ্গনে অর্জুনকে শ্রীমদ্ভগবদ্গীতা দান করেন।' }
    },
    {
      id: 'babaji',
      name: { en: 'Bhagavan Sri Sri Babaji Maharaj', hi: 'भगवान श्री श्री बाबाजी महाराज', gu: 'ભગવાન શ્રી શ્રી બાબાજી મહારાજ', bn: 'ভগবান শ্রী শ্রী বাबाजी মহারাজ' },
      title: { en: 'The Supreme Guru of Kriya Yoga', hi: 'क्रिया योग के परम गुरु', gu: 'ક્રિયા યોગના પરમ ગુરુ', bn: 'ক্রিয়াযোগের পরম গুরু' },
      era: 'Immortal (approx. 600 years)',
      role: { en: 'Supreme Guru', hi: 'परम गुरु', gu: 'પરમ ગુરુ', bn: 'পরম গুরু' },
      inheritedFrom: { en: 'Lord Sri Krishna', hi: 'भगवान श्री कृष्ण', gu: 'ભગવાન શ્રી કૃષ્ણ', bn: 'ভগবান শ্রীকৃষ্ণ' },
      inheritedTo: { en: 'Lahiri Mahasaya', hi: 'लाहिड़ी महाशय', gu: 'લાહિડી મહાશય', bn: 'লাহিড়ী মহাশয়' },
      avatar: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=200',
      description: { en: 'The immortal yogi of the Himalayas who revived the ancient science of Kriya Yoga.', hi: 'हिमालय के अमर योगी जिन्होंने क्रिया योग के प्राचीन विज्ञान को पुनर्जीवित किया।', gu: 'હિમાલયના અમર યોગી જેમણે ક્રિયા યોગ વિજ્ઞાન પુનર્જીવિત કર્યું.', bn: 'হিমালয়ের অমর যোগী যিনি প্রাচীন ক্রিয়াযোগ বিজ্ঞান পুনরুজ্জীবিত করেছিলেন।' }
    },
    {
      id: 'lahiri-mahasaya',
      name: { en: 'Sri Sri Lahiri Baba', hi: 'श्री श्री लाहिड़ी बाबा', gu: 'શ્રી શ્રી લાહિડી બાબા', bn: 'শ্রী শ্রী লাহিড়ী বাবা' },
      title: { en: 'The Householder Yogi', hi: 'गृहस्थ योगी', gu: 'ગૃહસ્થ યોગી', bn: 'গৃহস্থ যোগী' },
      era: 'Modern Era (1828 - 1895)',
      role: { en: 'Propagator of Kriya Yoga', hi: 'क्रिया योग प्रचारक', gu: 'ક્રિયા યોગ પ્રચારક', bn: 'ক্রিয়াযোগ প্রচারক' },
      inheritedFrom: { en: 'Babaji Maharaj', hi: 'बाबाजी महाराज', gu: 'બાબાજી મહારાજ', bn: 'বাবাজি মহারাজ' },
      inheritedTo: { en: 'Swami Sriyukteswar Giri', hi: 'स्वामी श्रीयुक्तेश्वर गिरि', gu: 'સ્વામી શ્રીયુક્તેશ્વર ગિરિ', bn: 'স্বামী শ্রীযুক্তেশ্বর গিরি' },
      avatar: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=200',
      description: { en: 'A householder yogi who was instructed by Babaji to propagate Kriya Yoga to ordinary people.', hi: 'एक गृहस्थ योगी जिन्हें बाबाजी ने आम लोगों तक क्रिया योग का प्रचार करने का निर्देश दिया था।', gu: 'ગૃહસ્થ યોગી જેમણે સામાન્ય લોકોમાં ક્રિયા યોગનો પ્રચાર કર્યો.', bn: 'একজন গৃহস্থ যোগী যাঁকে বাবাজি মহারাজ সাধারণ মানুষের মাঝে ক্রিয়াযোগ প্রচারের নির্দেশ দেন।' }
    },
    {
      id: 'sriyukteswar',
      name: { en: 'Swami Sriyukteswar Giri', hi: 'स्वामी श्रीयुक्तेश्वर गिरि', gu: 'સ્વામી શ્રીયુક્તેશ્વર ગિરિ', bn: 'স্বামী শ্রীযুক্তেশ্বর গিরি' },
      title: { en: 'Jnanavatar', hi: 'ज्ञानावतार', gu: 'જ્ઞાનાવતાર', bn: 'জ্ঞানাবতার' },
      era: 'Modern Era (1855 - 1936)',
      role: { en: 'Kriya Yogi and Astrologer', hi: 'क्रिया योगी और ज्योतिषी', gu: 'ક્રિયા યોગી અને જ્યોતિષી', bn: 'ক্রিয়াযোগী এবং জ্যোতিষী' },
      inheritedFrom: { en: 'Lahiri Mahasaya', hi: 'लाहिड़ी महाशय', gu: 'લાહિડી મહાશય', bn: 'লাহিড়ী মহাশয়' },
      inheritedTo: { en: 'Paramahansa Yogananda & Others', hi: 'परमहंस योगानन्द और अन्य', gu: 'પરમહંસ યોગાનંદ અને અન્ય', bn: 'পরমহংস যোগানন্দ এবং অন্যান্য' },
      avatar: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=200',
      description: { en: 'A great Kriya Yogi and astrologer who explained the rapid spiritual evolution through Kriya Yoga.', hi: 'एक महान क्रिया योगी और ज्योतिषी जिन्होंने क्रिया योग के माध्यम से तीव्र आध्यात्मिक विकास की व्याख्या की।', gu: 'મહાન ક્રિયા યોગી જેમણે ક્રિયા યોગ દ્વારા આધ્યાત્મિક વિકાસ સમજાવ્યો.', bn: 'একজন মহান ক্রিয়াযোগী এবং জ্যোতিষী যিনি ক্রিয়াযোগের মাধ্যমে দ্রুত আধ্যাত্মিক বিকাশের ব্যাখ্যা দিয়েছেন।' }
    }
  ];

  return (
    <div className="relative bg-white/60 backdrop-blur-md rounded-3xl border border-amber-100 p-6 md:p-8 shadow-sm space-y-8 overflow-hidden">
      
      {/* Visual Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex gap-1.5 items-center text-[10px] bg-amber-500 text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          Auspicious Parampara Lineage Tree
        </span>
        <h4 className="text-2xl font-serif text-amber-950 font-bold">
          The Discipled Golden Knowledge Succession
        </h4>
        <p className="text-xs text-amber-800 max-w-xl mx-auto font-serif">
          Tracing how pure Bhakti-yoga enlightenment has been inherited from master to disciple down through ages to preserve scripture authenticity.
        </p>
      </div>

      {/* The Visual Branches Layout */}
      <div className="relative max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Continuous decorative golden trunk pipeline */}
        <div className="absolute top-10 bottom-10 w-1 bg-gradient-to-b from-amber-300 via-amber-500/50 to-amber-600 left-1/2 -translate-x-1/2 rounded z-0" />

        <div className="space-y-12 w-full relative z-10">
          {lineageChain.map((node, idx) => {
            const isClickable = ['babaji', 'lahiri-mahasaya', 'sriyukteswar'].includes(node.id);
            const isSelected = activeGuruId === node.id;

            return (
              <div 
                key={node.id} 
                className={`flex flex-col items-center transition-all ${isClickable ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
                onClick={() => {
                  if (['babaji', 'lahiri-mahasaya', 'sriyukteswar'].includes(node.id)) {
                    onSelectGuruById(node.id);
                  }
                }}
              >
                {/* Node Box */}
                <div className={`w-full max-w-lg bg-white rounded-2xl border p-5 shadow-sm transition-all relative ${
                  isSelected 
                    ? 'border-amber-600 ring-2 ring-amber-500/20 shadow-md bg-amber-50/50' 
                    : isClickable 
                      ? 'border-amber-200 hover:border-amber-400 hover:shadow-md' 
                      : 'border-amber-100'
                }`}>
                  
                  {/* Small tag icon represent heritage */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5 text-[9px] font-bold text-amber-700 font-mono">
                    <Scroll className="w-3 h-3 text-amber-500" />
                    {t(node.role)}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
                    {/* Circle Avatar with glowing aura */}
                    <div className="relative">
                      <img 
                        src={node.avatar} 
                        alt={t(node.name)} 
                        className={`w-16 h-16 rounded-full object-cover border-4 ${
                          isSelected ? 'border-amber-500' : 'border-amber-100'
                        }`}
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute -bottom-1.5 -right-1.5 bg-amber-500 text-white text-[8px] font-bold font-mono w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                        {idx + 1}
                      </span>
                    </div>

                    {/* Meta Writeups */}
                    <div className="flex-1 space-y-2">
                      <div>
                        <span className="text-[10px] text-amber-600 font-bold font-mono">{node.era}</span>
                        <h5 className="text-base font-serif font-bold text-amber-950 leading-tight">
                          {t(node.name)}
                        </h5>
                        <p className="text-xs text-amber-900/80 font-serif leading-snug">
                          {t(node.title)}
                        </p>
                      </div>

                      {/* INHERITED FROM / TO DATA BLOCKS */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] bg-amber-50/70 p-2.5 rounded-xl border border-amber-100/60 font-mono">
                        <div>
                          <span className="text-amber-600 font-bold flex items-center gap-0.5">
                            ← Inherited From:
                          </span>
                          <span className="text-amber-950 font-medium block truncate mt-0.5" title={t(node.inheritedFrom)}>
                            {t(node.inheritedFrom)}
                          </span>
                        </div>
                        <div className="border-t sm:border-t-0 sm:border-l border-amber-100 pt-1.5 sm:pt-0 sm:pl-2.5">
                          <span className="text-amber-600 font-bold flex items-center gap-0.5">
                            → Inherited To:
                          </span>
                          <span className="text-amber-950 font-medium block truncate mt-0.5" title={t(node.inheritedTo)}>
                            {t(node.inheritedTo)}
                          </span>
                        </div>
                      </div>

                      {/* Node summary */}
                      <p className="text-xs text-amber-800 leading-relaxed font-serif">
                        {t(node.description)}
                      </p>

                      {isClickable && (
                        <div className="pt-1 text-[10px] text-amber-600 font-bold flex items-center gap-1 animate-pulse">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Click to read elaborate biography & scripture translations</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Vertical Connector Down Indicator */}
                {idx < lineageChain.length - 1 && (
                  <div className="my-2 bg-amber-100 text-amber-600 rounded-full p-1 border border-amber-200 shadow-sm z-20">
                    <ArrowDown className="w-4 h-4 animate-bounce" style={{ animationDuration: '3s' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      <div className="text-center font-serif text-xs text-amber-800/60 font-mono pt-4 border-t border-amber-100">
        🍁 Succession Lineage passed down successfully and preserved with deep spiritual devotion.
      </div>
    </div>
  );
};
