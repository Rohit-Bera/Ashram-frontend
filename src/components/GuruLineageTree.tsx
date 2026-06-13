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
      name: {
        en: 'Lord Sri Krishna',
        hi: 'भगवान श्री कृष्ण',
        gu: 'ભગવાન શ્રી કૃષ્ણ',
        bn: 'পরমেশ্বর ভগবান শ্রীকৃষ্ণ'
      },
      title: {
        en: 'The Supreme Source of Absolute Truth',
        hi: 'परम सत्य का आदि स्रोत',
        gu: 'પરમ સત્યના મૂળ સ્ત્રોત',
        bn: 'পরম সত্যের নিত্য আদি উৎস'
      },
      era: 'Primordial / Eternal',
      role: {
        en: 'Adi-Guru',
        hi: 'आदि-गुरु',
        gu: 'આદિ-ગુરુ',
        bn: 'আদি-শ্রীগুরু'
      },
      inheritedFrom: {
        en: 'None (The Origin of All)',
        hi: 'कोई नहीं (सबका आदि स्रोत)',
        gu: 'કોઈ નહીં (સર્વના મૂળ)',
        bn: 'কেহই নয় (তিনি স্বয়ংপ্রকাশ)'
      },
      inheritedTo: {
        en: 'Lord Brahma (Divinely Initiated)',
        hi: 'ब्रह्मा जी (दिव्य दीक्षा)',
        gu: 'બ્રહ્માજી (દિવ્ય દીક્ષા)',
        bn: 'ব্রহ্মা দেব (দিব্য দীক্ষাপ্রাপ্ত)'
      },
      avatar: 'https://images.unsplash.com/photo-1609137144814-7223e75e1cee?auto=format&fit=crop&q=80&w=200',
      description: {
        en: 'Spoke the transcendental knowledge of Bhagavad-gita directly to Arjuna and imparted the primeval Vedic wisdom into the heart of Lord Brahma at the dawn of creation.',
        hi: 'सृष्टि के प्रारंभ में ब्रह्मा जी के हृदय में दिव्य ज्ञान संचारित किया तथा महाभारत युद्ध स्थल में अर्जुन को श्रीमद्भगवद्गीता का अमर उपदेश दिया।',
        gu: 'સૃષ્ટિના પ્રારંભમાં બ્રહ્માજીના હૃદયમાં દિવ્ય જ્ઞાન સંચારિત કર્યું અને અર્જુનને અમર ગીતા જ્ઞાન આપ્યું.',
        bn: 'সৃষ্টির আদি লগ্নে ব্রহ্মা দেবের হৃদয়ে অপ্রাকৃত বৈদিক জ্ঞান সঞ্চার করেন এবং পরবর্তীতে কুরুক্ষেত্রের পুণ্য রণাঙ্গনে অর্জুনকে শ্রীমদ্ভগবদ্গীতা দান করেন।'
      }
    },
    {
      id: 'brahma',
      name: {
        en: 'Lord Brahma',
        hi: 'ब्रह्मा जी',
        gu: 'બ્રહ્માજી',
        bn: 'শ্রী ব্রহ্মা দেব'
      },
      title: {
        en: 'First Created Cosmic Entity',
        hi: 'ब्रह्मांड के प्रथम सृष्टा',
        gu: 'બ્રહ્માંડના પ્રથમ સર્જક',
        bn: 'মহাবিশ্বের আদি পিতা ও স্রষ্টা'
      },
      era: 'Cosmic Beginning',
      role: {
        en: 'Disseminator of Vedas',
        hi: 'वेदों के प्रथम व्याख्याता',
        gu: 'વેદોના પ્રથમ પ્રસારક',
        bn: 'বেদ প্রচারক'
      },
      inheritedFrom: {
        en: 'Lord Sri Krishna (Through heart-inspiration)',
        hi: 'भगवान श्री कृष्ण (हृदय की प्रेरणा द्वारा)',
        gu: 'ભગવાન શ્રી કૃષ્ણ (હૃદય સ્પંદન દ્વારા)',
        bn: 'পরমেশ্বর ভগবান শ্রীকৃষ্ণ (হৃদয় মন্দিরে বংশীধ্বনিরূপে)'
      },
      inheritedTo: {
        en: 'Sri Narada Muni',
        hi: 'देवर्षि नारद मुनि',
        gu: 'દેવર્ષિ નારદ મુનિ',
        bn: 'দেবর্ষি নারদ মুনি'
      },
      avatar: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=200',
      description: {
        en: 'Received knowledge through sound representation and compiled the planetary cosmic arrangements, establishing the Brahma Sampradaya.',
        hi: 'दिव्य प्रणव ध्वनि द्वारा वेद ज्ञान प्राप्त किया तथा ब्रह्मा संप्रदाय की स्थापना कर संपूर्ण ब्रह्मांड में सत्य का संचार किया।',
        gu: 'દિવ્ય ઓમકાર ધ્વનિ દ્વારા જ્ઞાન મેળવ્યું અને બ્રહ્મા સંપ્રદાય સ્થાપ્યો.',
        bn: 'শ্রীকৃষ্ণের নিকট হতে অপ্রাকৃত বীজমন্ত্র প্রাপ্ত হয়ে ভক্তিপূর্ণ হৃদয়ে ব্রহ্ম সম্প্রদায়ের শুভ সূচনা করেন।'
      }
    },
    {
      id: 'madhva',
      name: {
        en: 'Sri Madhvacharya',
        hi: 'श्री मध्वाचार्य',
        gu: 'શ્રી મધ્વાચાર્ય',
        bn: 'শ্রীল মধ্বাচার্য'
      },
      title: {
        en: 'Founder of Tattvavada (Dvaita School)',
        hi: 'द्वैत दर्शन के महान प्रवर्तक',
        gu: 'દ્વૈત દર્શનના મહાન સ્થાપક',
        bn: 'দ্বৈত বেদান্ত দর্শনের পরম প্রবক্তা'
      },
      era: 'Medieval Era (1238 - 1317 AD)',
      role: {
        en: 'Siddhanta Acharya',
        hi: 'सिद्धांत आचार्य',
        gu: 'સિદ્ધાંત આચાર્ય',
        bn: 'তত্ত্ববাদী আচার্য'
      },
      inheritedFrom: {
        en: 'Vyasadeva (Initiated in Badarikashrama)',
        hi: 'श्रीमद्व्यासदेव (बदरिकाश्रम में दीक्षा)',
        gu: 'શ્રીમદ વ્યાસદેવ (બદરિકાશ્રમમાં દીક્ષા)',
        bn: 'বেদব্যাস দেব (বদরিক আশ্রমে অপ্রাকৃত সাক্ষাৎকারযোগে)'
      },
      inheritedTo: {
        en: 'Padmanabha Tirtha & Successors',
        hi: 'पद्मनाभ तीर्थ और उनके उत्तराधिकारी',
        gu: 'પદ્મનાભ તીર્થ અને અન્ય શિષ્યો',
        bn: 'পদ্মনাভ তীর্থ ও পরবর্তী বৈষ্ণব শিষ্যবৃন্দ'
      },
      avatar: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=200',
      description: {
        en: 'Defeated non-dualistic speculations by establishing that the soul is eternally a servant of Lord Vishnu. Anchored the Brahma-Madhva line.',
        hi: 'भगवान विष्णु और जीवात्मा के सनातन भेद को सिद्ध कर द्वैत दर्शन स्थापित किया तथा मायावाद दर्शन का प्रबल खंडन किया।',
        gu: 'જીવાત્મા અને પરમાત્મા વચ્ચેના શાશ્વત સંબંધને સાબિત કરતો દ્વૈતવાદ સ્થાપ્યો.',
        bn: 'শ্রীমদ্ভাগবত ও বৈদিক শাস্ত্রের অভিনব ব্যাখ্যা সহকারে পরমাত্মা ও জীবাত্মার নিত্য দাসত্ব সম্বন্ধ রূপ দ্বৈত তত্ত্ব প্রতিস্থাপন করেন।'
      }
    },
    {
      id: 'chaitanya',
      name: {
        en: 'Sri Chaitanya Mahaprabhu',
        hi: 'श्री चैतन्य महाप्रभु',
        gu: 'શ્રી ચૈતન્ય મહાપ્રભુ',
        bn: 'শ্রী চৈতন্য মহাপ্রভু'
      },
      title: {
        en: 'The Golden Avatar of Divine Love',
        hi: 'प्रेम और संकीर्तन के स्वर्ण अवतार',
        gu: 'પ્રેમ અને સંકીર્તનના સુવર્ણ અવતાર',
        bn: 'প্রেমাবতার নদিয়ার শচীনন্দন'
      },
      era: 'Medieval Era (1486 - 1534)',
      role: {
        en: 'Original Preacher of Sankirtana',
        hi: 'युगधर्म हरिनाम संकीर्तन के प्रणेता',
        gu: 'હરિનામ સંકીર્તનના પ્રણેતા',
        bn: 'সংকীর্তন আন্দোলনের পরম যুগাবতার'
      },
      inheritedFrom: {
        en: 'Sri Ishvara Puri (Gaya Dham)',
        hi: 'श्री ईश्वर पुरी (गया धाम)',
        gu: 'શ્રી ઈશ્વર પુરી (ગયા ધામ)',
        bn: 'শ্রী ঈশ্বর পুরী (পুণ্য গয়া ধাম)'
      },
      inheritedTo: {
        en: 'The Six Goswamis of Vrindavan',
        hi: 'वृंदावन के छह गोस्वामी',
        gu: 'વૃંદાવનના છ ગોસ્વામીઓ',
        bn: 'শ্রীল রূপ ও সানাতন আদি ছয় গোস্বামী পাদ'
      },
      avatar: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=200',
      description: {
        en: 'Integrated Madhva philosophy, demonstrating chanting of Hare Krishna is the easiest process of liberation in Kali-yuga. Established Acintya-Bheda-Abheda.',
        hi: 'अचिन्त्य-भेदाभेद तत्व के द्वारा वैष्णव दर्शन को पूर्णता दी तथा कलयुग में उद्धार के लिए निरंतर महामंत्र जाप का प्रसाद दिया।',
        gu: 'અચિંત્ય-ભેદાભેદ દર્શન આપ્યું અને હરે કૃષ્ણ મહામંત્રના સંકીર્તનથી હૃદય શુદ્ધિનો માર્ગ દર્શાવ્યો.',
        bn: 'অচিন্ত্যভেদাভেদ তত্ত্ব সংস্থাপন করে নাম ও নামীর অভেদত্ব প্রতিপন্ন করেন এবং পরম সংকীর্তন যজ্ঞে নিখিল বিশ্বকে কোল দিলেন।'
      }
    },
    {
      id: 'bhaktisiddhanta',
      name: {
        en: 'Srila Bhaktisiddhanta Sarasvati Thakura',
        hi: 'श्रील भक्तिसिद्धांत सरस्वती ठाकुर',
        gu: 'શ્રીલ ભક્તિસિદ્ધાંત સરસ્વતી ઠાકુર',
        bn: 'শ্রীল ভক্তিসিদ্ধান্ত সরস্বতী ঠাকুর'
      },
      title: {
        en: 'The Lion Guru (Simha Guru)',
        hi: 'सिंह गुरु - उग्र धर्म रक्षक',
        gu: 'સિંહ ગુરુ - ધર્મ રક્ષક',
        bn: 'সিংহগুরু বীর আচাৰ্য্য'
      },
      era: 'Early Modern Era (1874 - 1937)',
      role: {
        en: 'Founder of Gaudiya Math',
        hi: 'गौड़ीय मठ के महान संस्थापक-आचार्य',
        gu: 'ગૌડીય મઠના સ્થાપક',
        bn: 'শ্রী গৌড়ীয় মঠের প্রতিষ্ঠাতা আচাৰ্য্য'
      },
      inheritedFrom: {
        en: 'Gaura Kisora Dasa Babaji',
        hi: 'श्रील गौर किशोर दास बाबाजी',
        gu: 'શ્રીલ ગૌર કિશોર દાસ બાબાજી',
        bn: 'শ্রীল গৌরকিশোর দাস বাবাজী মহারাজ'
      },
      inheritedTo: {
        en: 'Srila Prabhupada & Disciples',
        hi: 'श्रील एसी भक्तिवेदांत स्वामी प्रभुपाद',
        gu: 'શ્રીલ એ.સી. ભક્તિવેદાંત સ્વામી પ્રભુપાદ',
        bn: 'শ্রীল ভক্তিবেদান্ত স্বামীপ্রভুপাদ ও অনুসারীবৃন্দ'
      },
      avatar: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=200',
      description: {
        en: 'A powerful celestial scholar who revived pure Gaudiya Vaishnavism and instructed Srila Prabhupada to preach in the Western English-speaking world.',
        hi: 'एक प्रखर विद्वान जिन्होंने ६४ गौड़ीय मठों की स्थापना की और अपने प्रिय शिष्य प्रभुपाद को विश्वव्यापी अंग्रेजी प्रचार का आदेश दिया।',
        gu: 'અત્યંત તેજસ્વી આચાર્ય જેમણે વૈશ્વિક પ્રચાર માટે પ્રભુપાદને પ્રેરણા આપી.',
        bn: 'এক অপ্রাকৃত দিব্য সিংহগুরু যিনি ৬৪টি গৌড়ীয় মঠ স্থাপনপূর্বক বৈষ্ণবধর্ম রক্ষা করেন এবং শ্রীল প্রভুপাদকে পাশ্চাত্য দেশে ইংরেজি ভাষায় প্রচারের আদেশ দেন।'
      }
    },
    {
      id: 'prabhupada',
      name: {
        en: 'Srila A.C. Bhaktivedanta Swami Prabhupada',
        hi: 'श्रील ए.सी. भक्तिवेदांत स्वामी प्रभुपाद',
        gu: 'શ્રીલ એ.સી. ભક્તિવેદાંત સ્વામી પ્રભુપાદ',
        bn: 'শ্রীল এ.সি. ভক্তিবেদান্ত স্বামী প্রভুপাদ'
      },
      title: {
        en: 'Saviour of the Whole World (Founder-Acarya)',
        hi: 'जगतगुरु - इस्कॉन संस्थापक आचार्य',
        gu: 'જગતગુરુ - ઇસ્કોન સ્થાપક આચાર્ય',
        bn: 'জগদ্গুরু - ইস্কন প্রতিষ্ঠাতা-আচার্য'
      },
      era: 'Modern Era (1896 - 1977)',
      role: {
        en: 'World-Wide Preacher & Translator',
        hi: 'विश्वव्यापी प्रचारक और शास्त्र अनुवादक',
        gu: 'વૈશ્વિક પ્રચારક અને ગ્રંથ અનુવાદક',
        bn: 'বিশ্ব-সঞ্চারী বৈষ্ণব মহাজন'
      },
      inheritedFrom: {
        en: 'Srila Bhaktisiddhanta Sarasvati Thakura',
        hi: 'श्रील भक्तिसिद्धांत सरस्वती ठाकुर',
        gu: 'શ્રીલ ભક્તિસિદ્ધાંત સરસ્વતી ઠાકુર',
        bn: 'শ্রীল ভক্তিসিদ্ধান্ত সরস্বতী ঠাকুর শ্রীচরণ'
      },
      inheritedTo: {
        en: 'The Collective Hearts of Worldwide Seekers',
        hi: 'विश्वभर के समस्त समर्पित भक्तगण',
        gu: 'સમગ્ર વિશ્વના જિજ્ઞાસુ ભક્તો',
        bn: 'সমগ্র বিশ্বব্রহ্মাণ্ডের অগণিত বৈষ্ণব সমাজ'
      },
      avatar: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=200',
      description: {
        en: 'Carried the holy names across the oceans inside the Jaladuta cargo ship at age 69. Initiated thousands, translated dozens of holy books, and established over 108 coordinates temples globally.',
        hi: '६९ वर्ष की आयु में जलदूत मालवाहक जहाज से अमेरिका जाकर पाश्चात्य जगत में हरे कृष्ण संकीर्तन गुंजाया। १०८ से अधिक विशाल मंदिरों की स्थापना की।',
        gu: '૬૯ વર્ષની ઉંમરે જલદૂત જહાજ દ્વારા અમેરિકા જઈ વૈશ્વિક સ્તરે ૧૦૮ થી વધુ મંદિરો સ્થાપ્યા.',
        bn: '৬৯ বছর বয়সে ‘জলদূত’ জাহাজে চড়ে সাগর পাড়ি দিয়ে বিশ্বজুড়ে ১০৮টিরও বেশি কৃষ্ণমন্দির স্থাপন করেন এবং কোটি কোটি প্রাণ উদ্ধার করেন।'
      }
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
            const isClickable = ['chaitanya', 'prabhupada'].includes(node.id);
            const isSelected = activeGuruId === node.id;

            return (
              <div 
                key={node.id} 
                className={`flex flex-col items-center transition-all ${isClickable ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
                onClick={() => {
                  if (node.id === 'chaitanya' || node.id === 'prabhupada') {
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
