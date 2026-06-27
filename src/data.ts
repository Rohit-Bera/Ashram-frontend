import { Guru, Ashram, AshramEvent, Product, BlogArticle, Testimonial } from './types';

export const GURUS: Guru[] = [
  {
    id: 'babaji',
    name: {
      en: 'Bhagavan Sri Sri Babaji Maharaj',
      hi: 'भगवान श्री श्री बाबाजी महाराज',
      gu: 'ભગવાન શ્રી શ્રી બાબાજી મહારાજ',
      bn: 'ভগবান শ্রী শ্রী বাबाजी মহারাজ'
    },
    era: 'Immortal (approx. 600 years)',
    country: 'Himalayas, India',
    lineage: {
      en: 'Kriya Yoga Lineage (Supreme Guru)',
      hi: 'क्रिया योग परम्परा (परम गुरु)',
      gu: 'ક્રિયા યોગ પરંપરા',
      bn: 'ক্রিয়াযোগ ও গুরুপরম্পরা'
    },
    discipleOf: {
      en: 'Self-Realized',
      hi: 'स्वयं सिद्ध',
      gu: 'સ્વયં સિદ્ધ',
      bn: 'স্বয়ং সিদ্ধ'
    },
<<<<<<< HEAD
    photoUrl: '/imagehere', // Represents devotional peaceful atmosphere
=======
    photoUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600',
>>>>>>> ac6c22c1af631600924d465d95793bc99929237d
    summary: {
      en: 'The immortal yogi of the Himalayas who revived the ancient science of Kriya Yoga.',
      hi: 'हिमालय के अमर योगी जिन्होंने क्रिया योग के प्राचीन विज्ञान को पुनर्जीवित किया।',
      gu: 'હિમાલયના અમર યોગી જેમણે ક્રિયા યોગ વિજ્ઞાન પુનર્જીવિત કર્યું.',
      bn: 'হিমালয়ের অমর যোগী যিনি প্রাচীন ক্রিয়াযোগ বিজ্ঞান পুনরুজ্জীবিত করেছিলেন।'
    },
    biography: {
      en: 'Babaji Maharaj is a supremely liberated (paramukta) yogi who has retained his physical form in the Himalayas for approximately 600 years. He initiated great masters like Adi Shankaracharya, Kabir Das, and Lahiri Mahasaya.',
      hi: 'बाबाजी महाराज एक परम मुक्त योगी हैं जो लगभग 600 वर्षों से हिमालय में अपना भौतिक शरीर बनाए हुए हैं। उन्होंने आदि शंकराचार्य, कबीर दास और लाहिड़ी महाशय जैसे महान संतों को दीक्षा दी।',
      gu: 'બાબાજી મહારાજ એક પરમ મુક્ત યોગી છે જેઓ લગભગ 600 વર્ષથી હિમાલયમાં છે.',
      bn: 'বাবাজি মহারাজ একজন পরমমুক্ত যোগী যিনি প্রায় ৬০০ বছর ধরে হিমালয়ে অবস্থান করছেন।'
    },
    birthDate: 'Unknown',
    deathDate: 'Immortal',
    birthPlace: {
      en: 'Himalayas, India',
      hi: 'हिमालय, भारत',
      gu: 'હિમાલય, ભારત',
      bn: 'হিমালয়, ভারত'
    },
    majorContributions: [
      {
        en: 'Reviving the ancient science of Kriya Yoga and initiating Lahiri Mahasaya.',
        hi: 'क्रिया योग के प्राचीन विज्ञान को पुनर्जीवित करना और लाहिड़ी महाशय को दीक्षा देना।',
        gu: 'ક્રિયા યોગના પ્રાચીન વિજ્ઞાનને પુનર્જીવિત કરવું.',
        bn: 'প্রাচীন ক্রিয়াযোগ বিজ্ঞান পুনরুজ্জীবিত করা।'
      }
    ],
    timeline: [
      {
        year: '1861',
        title: { en: 'Initiation of Lahiri Mahasaya', hi: 'लाहिड़ी महाशय की दीक्षा', gu: 'લાહિડી મહાશયની દીક્ષા', bn: 'লাহিড়ী মহাশয়কে দীক্ষাদান' },
        description: {
          en: 'Initiated Lahiri Mahasaya into Kriya Yoga in a Himalayan cave.',
          hi: 'हिमालय की एक गुफा में लाहिड़ी महाशय को क्रिया योग की दीक्षा दी।',
          gu: 'હિમાલયની ગુફામાં લાહિડી મહાશયને ક્રિયા યોગની દીક્ષા આપી.',
          bn: 'হিমালয়ের একটি গুহায় লাহিড়ী মহাশয়কে ক্রিয়াযোগে দীক্ষা দেন।'
        }
      }
    ],
    teachings: [
      {
        id: 't-babaji',
        title: {
          en: 'Humility and Equal Vision',
          hi: 'विनम्रता और समदृष्टि',
          gu: 'નમ્રતા અને સમાન દ્રષ્ટિ',
          bn: 'নম্রতা ও সমদৃষ্টি'
        },
        type: 'quote',
        content: {
          en: '"By washing the dirty brass pot of an ordinary sadhu, one learns the ultimate lesson of humility and equal vision."',
          hi: '"एक साधारण साधु के गंदे पीतल के बर्तन को धोने से विनम्रता और समदृष्टि का अंतिम पाठ सीखा जाता है।"',
          gu: '"સામાન્ય સાધુના વાસણો ધોવાથી નમ્રતાનો પાઠ શીખવા મળે છે."',
          bn: '"একজন সাধারণ সাধুর বাসন মাজা থেকে নম্রতার পরম শিক্ষা পাওয়া যায়।"'
        }
      }
    ],
    relatedAshramIds: ['brahmarshi-ashram'],
    relatedEventIds: []
  },
  {
    id: 'lahiri-mahasaya',
    name: {
      en: 'Sri Sri Lahiri Baba (Shyamacharan Lahiri Mahasaya)',
      hi: 'श्री श्री लाहिड़ी बाबा (श्यामाचरण लाहिड़ी महाशय)',
      gu: 'શ્રી શ્રી લાહિડી બાબા',
      bn: 'শ্রী শ্রী লাহিড়ী বাবা (শ্যামাচরণ লাহিড়ী মহাশয়)'
    },
    era: 'Modern Era',
    country: 'India',
    lineage: {
      en: 'Kriya Yoga Lineage',
      hi: 'क्रिया योग परम्परा',
      gu: 'ક્રિયા યોગ પરંપરા',
      bn: 'ক্রিয়াযোগ ও গুরুপরম্পরা'
    },
    discipleOf: {
      en: 'Babaji Maharaj',
      hi: 'बाबाजी महाराज',
      gu: 'બાબાજી મહારાજ',
      bn: 'বাবাজি মহারাজ'
    },
<<<<<<< HEAD
    photoUrl: '', // Beautiful meditative flower background representation
=======
    photoUrl: 'https://images.unsplash.com/photo-1609137144814-7223e75e1cee?auto=format&fit=crop&q=80&w=600',
>>>>>>> ac6c22c1af631600924d465d95793bc99929237d
    summary: {
      en: 'A householder yogi who propagated Kriya Yoga to ordinary people.',
      hi: 'एक गृहस्थ योगी जिन्होंने आम लोगों तक क्रिया योग का प्रचार किया।',
      gu: 'એક ગૃહસ્થ યોગી જેમણે સામાન્ય લોકોમાં ક્રિયા યોગનો પ્રચાર કર્યો.',
      bn: 'একজন গৃহস্থ যোগী যিনি সাধারণ মানুষের মাঝে ক্রিয়াযোগ প্রচার করেছিলেন।'
    },
    biography: {
      en: 'Lahiri Mahasaya was a householder who was deeply moved when Babaji restored his memories of past lives. Babaji instructed him to remain a householder so that ordinary people lost in worldly illusions could have an accessible path to God-realization.',
      hi: 'लाहिड़ी महाशय एक गृहस्थ थे। बाबाजी ने उन्हें गृहस्थ रहने का निर्देश दिया ताकि दुनिया के भ्रम में खोए हुए आम लोगों को ईश्वर प्राप्ति का सुलभ मार्ग मिल सके।',
      gu: 'લાહિડી મહાશય એક ગૃહસ્થ હતા જેમણે સામાન્ય લોકોને ઈશ્વર પ્રાપ્તિનો માર્ગ બતાવ્યો.',
      bn: 'লাহিড়ী মহাশয় একজন গৃহস্থ ছিলেন যাঁকে বাবাজি মহারাজ গৃহস্থ জীবনে থেকেই ঈশ্বর প্রাপ্তির পথ প্রদর্শনের নির্দেশ দেন।'
    },
    birthDate: 'September 30, 1828',
    deathDate: 'September 26, 1895',
    birthPlace: {
      en: 'Ghurni, Bengal Presidency, British India',
      hi: 'घूर्णी, बंगाल प्रेसीडेंसी, ब्रिटिश भारत',
      gu: 'ઘૂર્ણી, બંગાળ, બ્રિટિશ ભારત',
      bn: 'ঘূর্ণী, বেঙ্গল প্রেসিডেন্সি, ব্রিটিশ ভারত'
    },
    majorContributions: [
      {
        en: 'Synthesized the four major yogas and organized Kriya Yoga into four progressive stages.',
        hi: 'चार प्रमुख योगों का संश्लेषण किया और क्रिया योग को चार प्रगतिशील चरणों में व्यवस्थित किया।',
        gu: 'ક્રિયા યોગને ચાર પ્રગતિશીલ તબક્કામાં ગોઠવ્યું.',
        bn: 'চারটি প্রধান যোগের সমন্বয় সাধন এবং ক্রিয়াযোগকে চারটি স্তরে বিন্যস্ত করা।'
      }
    ],
    timeline: [
      {
        year: '1861',
        title: { en: 'Initiation', hi: 'दीक्षा', gu: 'દીક્ષા', bn: 'দীক্ষাদান' },
        description: {
          en: 'Received Kriya Yoga initiation from Babaji Maharaj.',
          hi: 'बाबाजी महाराज से क्रिया योग की दीक्षा प्राप्त की।',
          gu: 'બાબાજી મહારાજ પાસેથી ક્રિયા યોગની દીક્ષા લીધી.',
          bn: 'বাবাজি মহারাজের নিকট ক্রিয়াযোগের দীক্ষা গ্রহণ।'
        }
      }
    ],
    teachings: [
      {
        id: 't-lahiri',
        title: {
          en: 'Tapasya, Svadhyaya, Ishvara Pranidhana',
          hi: 'तपस्या, स्वाध्याय, ईश्वर प्रणिधान',
          gu: 'તપસ્યા, સ્વાધ્યાય, ઈશ્વર પ્રણિધાન',
          bn: 'তপস্যা, স্বাধ্যায়, ঈশ্বর প্রণিধান'
        },
        type: 'quote',
        content: {
          en: '"Kriya Yoga consists of physical discipline, self-study, and mental surrender to God."',
          hi: '"क्रिया योग में शारीरिक अनुशासन, स्वाध्याय और भगवान के प्रति मानसिक समर्पण शामिल है।"',
          gu: '"ક્રિયા યોગમાં શારીરિક શિસ્ત, સ્વાધ્યાય અને ઈશ્વર પ્રત્યે સમર્પણ છે."',
          bn: '"ক্রিয়াযোগ শারীরিক সংযম, স্বাধ্যায় এবং ভগবানের প্রতি মানসিক সমর্পণের সমষ্টি।"'
        }
      }
    ],
    relatedAshramIds: ['brahmarshi-ashram'],
    relatedEventIds: []
  },
  {
    id: 'sriyukteswar',
    name: {
      en: 'Swami Sriyukteswar Giri',
      hi: 'स्वामी श्रीयुक्तेश्वर गिरि',
      gu: 'સ્વામી શ્રીયુક્તેશ્વર ગિરિ',
      bn: 'স্বামী শ্রীযুক্তেশ্বর গিরি'
    },
    era: 'Modern Era',
    country: 'India',
    lineage: {
      en: 'Kriya Yoga Lineage',
      hi: 'क्रिया योग परम्परा',
      gu: 'ક્રિયા યોગ પરંપરા',
      bn: 'ক্রিয়াযোগ ও গুরুপরম্পরা'
    },
    discipleOf: {
      en: 'Lahiri Mahasaya',
      hi: 'लाहिड़ी महाशय',
      gu: 'લાહિડી મહાશય',
      bn: 'লাহিড়ী মহাশয়'
    },
    photoUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=600',
    summary: {
      en: 'A great Kriya Yogi and astrologer who explained the rapid spiritual evolution through Kriya Yoga.',
      hi: 'एक महान क्रिया योगी और ज्योतिषी जिन्होंने क्रिया योग के माध्यम से तीव्र आध्यात्मिक विकास की व्याख्या की।',
      gu: 'મહાન ક્રિયા યોગી જેમણે ક્રિયા યોગ દ્વારા આધ્યાત્મિક વિકાસ સમજાવ્યો.',
      bn: 'একজন মহান ক্রিয়াযোগী এবং জ্যোতিষী যিনি ক্রিয়াযোগের মাধ্যমে দ্রুত আধ্যাত্মিক বিকাশের ব্যাখ্যা দিয়েছেন।'
    },
    biography: {
      en: 'Swami Sriyukteswar Giri noted that Kriya Yoga rapidly accelerates human evolution; just half a minute of Kriya practice equals one year of natural spiritual growth. Through this science, a yogi can achieve self-realization in a single lifetime.',
      hi: 'स्वामी श्रीयुक्तेश्वर गिरि ने बताया कि क्रिया योग मानव विकास को तेजी से गति देता है; क्रिया अभ्यास का केवल आधा मिनट एक वर्ष के प्राकृतिक आध्यात्मिक विकास के बराबर है।',
      gu: 'સ્વામી શ્રીયુક્તેશ્વર ગિરિએ જણાવ્યું કે ક્રિયા યોગ માનવ વિકાસને વેગ આપે છે.',
      bn: 'স্বামী শ্রীযুক্তেশ্বর গিরি উল্লেখ করেছেন যে ক্রিয়াযোগ মানুষের আধ্যাত্মিক বিকাশকে ত্বরান্বিত করে।'
    },
    birthDate: 'May 10, 1855',
    deathDate: 'March 9, 1936',
    birthPlace: {
      en: 'Serampore, Bengal, British India',
      hi: 'श्रीरामपुर, बंगाल, ब्रिटिश भारत',
      gu: 'શ્રીરામપુર, બંગાળ, બ્રિટિશ ભારત',
      bn: 'শ্রীরামপুর, বাংলা, ব্রিটিশ ভারত'
    },
    majorContributions: [
      {
        en: 'Training profound masters like Paramahansa Yogananda and writing The Holy Science.',
        hi: 'परमहंस योगानन्द जैसे गुरुओं को प्रशिक्षित करना और द होली साइंस लिखना।',
        gu: 'પરમહંસ યોગાનંદ જેવા ગુરુઓને તાલીમ આપવી.',
        bn: 'পরমহংস যোগানন্দের মতো গুরুদেবদের প্রশিক্ষণ দেওয়া।'
      }
    ],
    timeline: [],
    teachings: [
      {
        id: 't-sriyukteswar',
        title: {
          en: 'Accelerated Evolution',
          hi: 'तीव्र विकास',
          gu: 'ઝડપી વિકાસ',
          bn: 'ত্বরান্বিত বিকাশ'
        },
        type: 'quote',
        content: {
          en: '"Just half a minute of Kriya practice equals one year of natural spiritual growth."',
          hi: '"क्रिया अभ्यास का केवल आधा मिनट एक वर्ष के प्राकृतिक आध्यात्मिक विकास के बराबर है।"',
          gu: '"ક્રિયા અભ્યાસની અડધી મિનિટ એક વર્ષના આધ્યાત્મિક વિકાસ બરાબર છે."',
          bn: '"ক্রিয়াযোগের মাত্র আধ মিনিটের অনুশীলন এক বছরের স্বাভাবিক আধ্যাত্মিক বিকাশের সমান।"'
        }
      }
    ],
    relatedAshramIds: ['brahmarshi-ashram'],
    relatedEventIds: []
  }
];

export const ASHRAMS: Ashram[] = [
  {
    id: 'brahmarshi-ashram',
    name: {
      en: 'Brahmarshi Satyananda Sannyas Ashram',
      hi: 'ब्रह्मर्षि सत्यानन्द संन्यास आश्रम',
      gu: 'બ્રહ્મર્ષિ સત્યાનંદ સંન્યાસ આશ્રમ',
      bn: 'ব্রহ্মর্ষি সত্যানন্দ সন্ন্যাস আশ্রম'
    },
<<<<<<< HEAD
    coverUrl: '/imagehere', // Beautiful temple complex dome proxy
    galleryUrls: [
      '/imagehere',
      '/imagehere'
    ],
    establishedDate: 'April 20, 1975',
    builtByGuruId: 'prabhupada',
    purpose: {
      en: 'Providing spiritual education, daily traditional worship, and feeding pure sacred vegetarian meals to pilgrims.',
      hi: 'आध्यात्मिक शिक्षा प्रदान करना, दैनिक पारंपरिक पूजा-अर्चना और तीर्थयात्रियों को शुद्ध प्रसादम भोजन कराना।',
      gu: 'આધ્યાત્મિક શિક્ષણ પૂરું પાડવું, દૈનિક પરંપરાગત પૂજા કરવી, અને તીર્થયાત્રીઓને શુદ્ધ શાકાહારી પ્રસાદ આપવો.',
      bn: 'আধ্যাত্মিক শিক্ষা প্রদান, নিত্য বৈদিক পূজা ও ভক্তবৃন্দের মাঝে মহাপ্রসাদ বিতরণ।'
    },
    description: {
      en: 'This temple was founded by Srila Prabhupada personally and contains the Samadhi Mausoleum of the founder. It is located in Raman Reti, Vrindavan, where Lord Krishna and Balaram performed their childhood pastimes under ancient banyan trees.',
      hi: 'इस मंदिर की स्थापना स्वयं श्रील प्रभुपाद ने की थी और इसमें संस्थापक का समाधि मंदिर स्थित है। यह वृंदावन के रमण रेती में स्थित है, जहाँ भगवान कृष्ण और बलराम ने प्राचीन बरगद के पेड़ों के नीचे अपनी बाल लीलाएँ की थीं।',
      gu: 'આ મંદિરની સ્થાપના ખુદ શ્રીલ પ્રભુપાદે કરી હતી અને અહીં તેમની પવિત્ર સમાધિ આવેલી છે. આ મંદિર વૃંદાવનના રમણ રેતીમાં આવેલું છે, જ્યાં ભગવાન કૃષ્ણ અને બલરામે તેમની બાળ લીલાઓ કરી હતી.',
      bn: 'এই মন্দিরটি শ্রীল প্রভুপাদ কর্তৃক স্বয়ং প্রতিষ্ঠিত হয়েছিল এবং এখানে তাঁর সমাধি মন্দির অবস্থিত। এটি বৃন্দাবনের রমণ রেতিতে অবস্থিত, যেখানে ভগবান শ্রীকৃষ্ণ ও বলরাম বাল্যলীলা বিলাস করেছিলেন।'
    },
    country: 'India',
    state: 'Uttar Pradesh',
    city: 'Vrindavan',
    latitude: 27.5714,
    longitude: 77.6743,
    dailySchedule: [
      { time: '04:30 AM', activity: { en: 'Mangala Arati', hi: 'मंगला आरती', gu: 'મંગલા આરતી', bn: 'মঙ্গল আরতি' } },
      { time: '05:15 AM', activity: { en: 'Tulsi Puja & Japa', hi: 'तुलसी पूजा एवं जप', gu: 'તુલસી પૂજા અને જપ', bn: 'তুলসী পূজা ও জপ' } },
      { time: '07:30 AM', activity: { en: 'Deity Greeting & Darshan', hi: 'दर्शन आरती', gu: 'દર્શન આરતી', bn: 'দেবদর্শন আরতি' } },
      { time: '08:00 AM', activity: { en: 'Srimad Bhagavatam Discourse', hi: 'श्रीमद्भागवतम् प्रवचन', gu: 'શ્રીમદ ભાગવતમ પ્રવચન', bn: 'শ্রীমদ্ভাগবত প্রবচন' } },
      { time: '12:30 PM', activity: { en: 'Raj Bhoga Offerings & Closing', hi: 'राजभोग आरती और पट बंद', gu: 'રાજભોગ આરતી અને મંદિર બંધ', bn: 'রাজভোগ আরতি ও পট বন্ধ' } },
      { time: '07:00 PM', activity: { en: 'Gaura Arati & Sandhya Kirtana', hi: 'गौर आरती एवं संध्या कीर्तन', gu: 'ગૌર આરતી અને સંધ્યા કીર્તન', bn: 'গৌর আরতি ও সন্ধ্যা কীর্তন' } }
    ],
    facilities: [
      { en: 'Spiritual Guest House accommodation', hi: 'आध्यात्मिक अतिथि गृह व्यवस्था', gu: 'આધ્યાત્મિક ગેસ્ટ હાઉસ સગવડ', bn: 'আধ্যাত্মিক অতিথি ভবন' },
      { en: 'Govindas Pure Vegetarian Restaurant', hi: 'गोविंदा का शुद्ध शाकाहारी भोजनालय', gu: 'ગોવિંદાસ શુદ્ધ શાકાહારી રેસ્ટોરન્ટ', bn: 'গোবিন্দাস্ নিরামিষ ভোজনালয়' },
      { en: 'Vedic Gurukul School & Library', hi: 'वैदिक गुरुकुल और पुस्तकालय', gu: 'વૈદિક ગુરુકુળ અને લાઈબ્રેરી', bn: 'বৈদিক গুরুকুল ও গ্রন্থাগার' },
      { en: 'Bhaktivedanta Hospice Care', hi: 'भक्तिवेदांत धर्मशाला एवं चिकित्सा सेवा', gu: 'ભક્તિવેદાંત હોસ્પાઇસ કેર', bn: 'ভক্তিবেদান্ত হস Hospice সেবাকেন্দ্র' }
    ],
    contactEmail: 'vrindavan@iskcon.org',
    contactPhone: '+91-565-2540021',
    upcomingEventIds: ['ev-janmashtami'],
    residentGuruIds: ['prabhupada']
  },
  {
    id: 'mayapur-chandradoya',
    name: {
      en: 'Temple of the Vedic Planetarium (ISKCON Mayapur)',
      hi: 'वैदिक तारामंडल मंदिर (इस्कॉन मायापुर)',
      gu: 'વૈદિક તારામંડળ મંદિર (ઇસ્કોન માયાપુર)',
      bn: 'শ্রী মায়াপুর চন্দ্রোদয় মন্দির (ইস্কন মায়াপুর)'
    },
    coverUrl: '/imagehere', // Beautiful grand architect dome visual
=======
    coverUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=1200',
>>>>>>> ac6c22c1af631600924d465d95793bc99929237d
    galleryUrls: [],
    establishedDate: 'Unknown',
    builtByGuruId: 'sriyukteswar',
    purpose: {
      en: 'To spread the profound science of Kriya Yoga to the general public.',
      hi: 'आम जनता तक क्रिया योग के गहन विज्ञान का प्रसार करना।',
      gu: 'સામાન્ય લોકોમાં ક્રિયા યોગના વિજ્ઞાનનો પ્રચાર કરવો.',
      bn: 'সাধারণ মানুষের মধ্যে ক্রিয়াযোগের গভীর বিজ্ঞান প্রচার করা।'
    },
    description: {
      en: 'Published the spiritual booklet Kriya Yoga and the Guru Lineage through the Gita Prachar Mandali to introduce Kriya Yoga to spiritual seekers.',
      hi: 'आध्यात्मिक साधकों को क्रिया योग से परिचित कराने के लिए गीता प्रचार मंडली के माध्यम से आध्यात्मिक पुस्तिका क्रिया योग और गुरु परंपरा प्रकाशित की।',
      gu: 'ક્રિયા યોગનો પરિચય આપવા પુસ્તિકા પ્રકાશિત કરી.',
      bn: 'গীতা প্রচার মণ্ডলীর মাধ্যমে ক্রিয়াযোগ ও গুরুপরম্পরা পুস্তিকা প্রকাশ করে।'
    },
    country: 'India',
    state: 'West Bengal',
    city: 'Kolkata',
    latitude: 22.5726,
    longitude: 88.3639,
    dailySchedule: [
      { time: '05:00 AM', activity: { en: 'Kriya Yoga Practice', hi: 'क्रिया योग अभ्यास', gu: 'ક્રિયા યોગ અભ્યાસ', bn: 'ক্রিয়াযোগ অনুশীলন' } }
    ],
    facilities: [
      { en: 'Meditation Hall', hi: 'ध्यान कक्ष', gu: 'ધ્યાન ખંડ', bn: 'ধ্যান কক্ষ' }
    ],
    contactEmail: 'info@kriyayoga.org',
    contactPhone: '+91-0000000000',
    upcomingEventIds: [],
    residentGuruIds: ['babaji', 'lahiri-mahasaya', 'sriyukteswar']
  }
];

<<<<<<< HEAD
export const EVENTS: AshramEvent[] = [
  {
    id: 'ev-janmashtami',
    name: {
      en: 'Sri Krishna Janmashtami Mahotsav 2026',
      hi: 'श्री कृष्ण जन्माष्टमी महोत्सव 2026',
      gu: 'શ્રી કૃષ્ણ જન્માષ્ટમી મહોત્સવ ૨૦૨૬',
      bn: 'শ্রী কৃষ্ণ জন্মাষ্টমী মহোৎসব ২০২৬'
    },
    description: {
      en: 'The celebration of the appearance of Lord Krishna. Featuring mega abhishekam (bathing ceremony of the deity), mystical midnight kirtan, Vedic dances, fire sacrifice, and continuous distribution of divine vegetarian feast.',
      hi: 'भगवान कृष्ण के अवतरण दिवस का भव्य आयोजन। भव्य देव स्नान (महा-अभिषेक), मध्यरात्री दिव्य संकीर्तन, सांस्कृतिक नाटक, यज्ञ और विशाल प्रसादम वितरण।',
      gu: 'ભગવાન શ્રીકૃષ્ણના પ્રાગટ્ય દિવસની અતિ ભવ્ય ઉજવણી. આખો દિવસ મહા-અભિષેક, રાત્રે સંગીતમય ભજન કીર્તન, સાંસ્કૃતિક ડ્રામા, હવન અને અન્નકૂટ ભંડારો.',
      bn: 'পরমেশ্বর ভগবান শ্রীকৃষ্ণের পরম পবিত্র মহিমাময় আবির্ভাব তিথি মহোৎসব। সারাদিনব্যাপী মহাযজ্ঞ, মহা-অভিষেক, মধ্যরাতের দিব্য সংকীর্তন ও লক্ষাধিক মানুষের মাঝে মহাপ্রসাদ বিতরণ।'
    },
    date: '2026-09-03',
    time: '04:30 AM - Midnight',
    location: {
      en: 'Vrindavan and globewide centers',
      hi: 'वृंदावन और विश्वव्यापी मंदिर केंद्र',
      gu: 'વૃંદાવન અને વૈશ્વિક ઇસ્કોન મંદિરો',
      bn: 'শ্রীধাম বৃন্দাবন ও বিশ্বজুড়ে সমস্ত শাখা কেন্দ্র'
    },
    imageUrl: '/imagehere',
    isActive: true,
    galleryUrls: [],
    ticketPrice: 0, // Free
    availableTickets: 5000,
    registrationsCount: 2450
  },
  {
    id: 'ev-ratha-yatra',
    name: {
      en: 'Jagannatha Ratha Yatra (Festival of Chariots)',
      hi: 'जगन्नाथ रथयात्रा (रथ सारथी उत्सव)',
      gu: 'જગન્નાથ રથયાત્રા (રથોત્સવ)',
      bn: 'জগন্নাথ রথযাত্রা মহোৎসব'
    },
    description: {
      en: 'Join thousands as we pull the beautiful chariot of Lord Jagannatha, Baladeva, and Subhadra through streets flooded with congregational chanting, flower showers, and traditional music, ending with a spiritual retreat.',
      hi: 'भगवान जगन्नाथ, बलदेव और सुभद्रा के भव्य रथ को पवित्र संकीर्तन, पुष्प वर्षा और झांकियों के साथ खींचते हुए लाखों भक्त सड़कों पर उतरेंगे, अंत में विशाल अमृतमयी भंडारा।',
      gu: 'ભગવાન જગન્નાથ, બલદેવ અને સુભદ્રાજીના ભવ્ય રથને ફૂલોની વર્ષા અને હરિનામ સંકીર્તન વચ્ચે ખેંચવાની સદભાગી સેવા, સાથે ભવ્ય પ્રસાદ.',
      bn: 'পরম দয়ালু পরমেশ্বর শ্রীজগন্নাথ, বলদেব ও সুভদ্রা দেবীর দিব্য রথ টেনে সংকীর্তন ও পুষ্পবৃষ্টির মাঝে পুরীধামের অনুসরণে রাজপথে নগর সংকীর্তন ও মহাসম্মিলন।'
    },
    date: '2026-07-16',
    time: '01:00 PM - 08:30 PM',
    location: {
      en: 'Mayapur & London Trafalgar Square',
      hi: 'मायापुर और लंदन ट्राफलगर स्क्वायर',
      gu: 'માયાપુર અને લંડન ટ્રાફાલ્ગર સ્ક્વેર',
      bn: 'শ্রীধাম মায়াপুর ও লণ্ডন ট্রাফালগার স্কয়ার'
    },
    imageUrl: '/imagehere',
    isActive: true,
    galleryUrls: [],
    ticketPrice: 0,
    availableTickets: 10000,
    registrationsCount: 4890
  },
  {
    id: 'ev-gaura-purnima',
    name: {
      en: 'Gaura Purnima Festival 2026',
      hi: 'गौर पूर्णिमा महोत्सव 2026',
      gu: 'ગૌર પૂર્ણિમા મહોત્સવ ૨૦૨૬',
      bn: 'শ্রীগৌরপূর্ণিমা মহোৎসব ২০২৬'
    },
    description: {
      en: 'The divine appearance day of Sri Chaitanya Mahaprabhu. Features bathing of Deity in gold water, saffron, special sandhya arati, and ecstatic kirtan with 50 different ancient musical instruments.',
      hi: 'श्री चैतन्य महाप्रभु का पावन प्राकट्य उत्सव। सुवर्ण जल और पंचामृत से भगवान का दिव्य अभिषेक, विशेष संध्या आरती, और ५० अलग वैदिक वाद्य यंत्रों से महासंकीर्तन।',
      gu: 'શ્રી ચૈતન્ય મહાપ્રભુજીનો પ્રાગટ્ય દિન. સુવર્ણ જળ-પંચામૃતથી અભિષેક, વિશેષ સંધ્યા આરતી અને કીર્તન ઉત્સવ.',
      bn: 'যুগাবতার শ্রীকৃষ্ণচৈতন্য মহাপ্রভুর পরম পবিত্র আবির্ভাব দ্বাদশী পূর্ণিমা তিথি মহোৎসব। গঙ্গাজল, দুগ্ধ, পঞ্চামৃত ও স্বর্ণোদকে মহাপ্রভুর মহা-অভিষেক ও সংকীর্তন।'
    },
    date: '2026-03-03',
    time: '10:00 AM - 09:00 PM',
    location: {
      en: 'Sridham Mayapur Ashram',
      hi: 'श्रीधाम मायापुर आश्रम',
      gu: 'શ્રીધામ માયાપુર આશ્રમ',
      bn: 'শ্রীধাম মায়াপুর প্রধান কেন্দ্র'
    },
    imageUrl: '/imagehere',
    isActive: true,
    galleryUrls: [],
    ticketPrice: 0,
    availableTickets: 8000,
    registrationsCount: 3120
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p-gita',
    name: {
      en: 'Bhagavad-gita As It Is (Hardbound Sanskrit Edition)',
      hi: 'भगवद-गीता यथारूप (सचित्र संस्कृत-हिंदी संस्करण)',
      gu: 'ભગવદ-ગીતા યથારૂપ (સચિત્ર સંસ્કૃત-ગુજરાતી)',
      bn: 'শ্রীমদ্ভাগবদ্গীতা যথাযথ (সচিত্র মূল সংস্করণ)'
    },
    description: {
      en: 'The largest selling edition of Bhagavad-gita in the world. Includes original Sanskrit, Roman transliterations, English synonyms, word-for-word translations, and elaborate purports by Srila Prabhupada.',
      hi: 'विश्व की सर्वाधिक बिकने वाली भगवद्गीता। इसमें मूल संस्कृत श्लोक, अंग्रेजी/हिंदी अनुवाद, शब्दार्थ और श्रील प्रभुपाद द्वारा रचित भव्य तात्पर्य शामिल है।',
      gu: 'વિશ્વની સૌથી વધુ વેચાતી ભગવદ ગીતા. જેમાં મૂળ સંસ્કૃત શ્લોકો, ગુજરાતી અનુવાદ, શબ્દાર્થ અને શ્રીલ પ્રભુપાદ દ્વારા વિગતવાર સરળ વિવેચન આપેલ છે.',
      bn: 'বিশ্বজুড়ে সর্বাধিক পঠিত ও সমাদৃত শ্রীমদ্ভগবদ্গীতা। মূল সংস্কৃত শ্লোক, বঙ্গানুবাদ, প্রতিশব্দ ও শ্রীল প্রভুপাদ কর্তৃক অত্যন্ত প্রাঞ্জল পরমার্থিক ভাষ্য সংবলিত।'
    },
    category: 'Books',
    price: 350,
    imageUrl: '/imagehere', // Represents sacred brown/gold covered book proxy
    isAvailable: true,
    stock: 500,
    rating: 4.9,
    reviews: [
      { id: 'r1', userName: 'Anand Dev', rating: 5, comment: 'Changed my entire lifestyle! Clear explanation.', date: '2026-05-12' },
      { id: 'r2', userName: 'Krishna Das', rating: 5, comment: 'The best commentary on Earth.', date: '2026-05-20' }
    ]
  },
  {
    id: 'p-shrimad',
    name: {
      en: 'Srimad-Bhagavatam (Canto 1 - The Creation)',
      hi: 'श्रीमद्-भागवतम् (प्रथम स्कंध - सृष्टि संरचना)',
      gu: 'શ્રીમદ-ભાગવતમ (પ્રથમ સ્કંધ - સૃષ્ટિ સંરચના)',
      bn: 'শ্রীমদ্ভগবতম্ (প্রথম স্কন্ধ - সৃষ্টি)'
    },
    description: {
      en: 'A monumental text detailing Vedic histories, creation cosmologies, lineages, and avatars of the Supreme Lord with exhaustive explanation.',
      hi: 'वैदिक इतिहास, सृष्टि संरचना, अध्यात्म ज्ञान और सर्वोच्च भगवान के अवतारों का विस्तृत वर्णन करने वाला महान ग्रंथ।',
      gu: 'વૈદિક ઈતિહાસ, સૃષ્ટિની રચના, અવતારો અને પરમતત્વનું જ્ઞાન આપતો અતિ મહત્વનો મહાન ગ્રંથ.',
      bn: 'মহিমাময় বৈদিক ইতিহাস, মহাবিশ্বের সৃষ্টিতত্ত্ব এবং পরমেশ্বর ভগবানের লীলা ও অবতার সমূহের বিজ্ঞানসম্মত বিশ্লেষণ।'
    },
    category: 'Books',
    price: 650,
    imageUrl: '/imagehere', // Represents sacred brown/gold covered book proxy
    isAvailable: true,
    stock: 200,
    rating: 5.0,
    reviews: [
      { id: 'r3', userName: 'Gauranga Mitra', rating: 5, comment: 'Pure spiritual science.', date: '2026-05-15' }
    ]
  },
  {
    id: 'p-dhoti',
    name: {
      en: 'Premium Saffron Cotton Dhoti & Uttariya Set',
      hi: 'प्रीमियम केसरिया सूती धोती और उत्तरीय सेट',
      gu: 'પ્રીમિયમ કેસરિયા કોટન ધોતી અને ખેસ સેટ',
      bn: 'প্রিমিয়াম গৈরিক সুতি ধুতি ও উত্তরীয় বস্ত্র'
    },
    description: {
      en: 'Handloomed Vedic attire crafted from 100% fine organic cotton. Highly breathable fabric ideal for daily prayers, meditation rituals, and temple visits.',
      hi: '100% शुद्ध जैविक कपास से निर्मित पारंपरिक केसरिया धोती सेट। दैनिक पूजा, साधना और मंदिर दर्शन के लिए अत्यंत आरामदायक हवादार वस्त्र।',
      gu: '૧૦૦% શુદ્ધ કપાસમાંથી હાથવણાટથી બનેલું કેસરિયા ધોતી અને ખેસ સેટ. ધ્યાન, સત્સંગ અને પૂજા પદ્ધતિમાં પહેરવા માટે ઉત્તમ.',
      bn: 'হস্তচালিত তাঁতে বোনা শতভাগ খাঁটি সুতি ও ভেষজ রঙে রঞ্জিত গৈরিক বস্ত্র। নিত্য জপ-ধ্যান ও মন্দিরে পরার পরম উপযোগী।'
    },
    category: 'Clothing',
    price: 750,
    imageUrl: '/imagehere', // Saffron clothing orange textile proxy
    isAvailable: true,
    stock: 120,
    rating: 4.7,
    reviews: []
  },
  {
    id: 'p-mala',
    name: {
      en: 'Original Vrindavan Tulsi Japa Mala with Beadbag',
      hi: 'मूल वृंदावन तुलसी जप माला और कढ़ाईदार झोली',
      gu: 'શુદ્ધ વૃંદાવન તુલસી જપ માળા અને કચ્છી થેલી',
      bn: 'বৃন্দাবনের পবিত্র তুলসী জপমালা ও চিত্রিত ঝুলি'
    },
    description: {
      en: 'Authentic 108 hand-carved Tulsi beads carefully gathered from Vrindavan, strung securely alongside a traditional cotton embroidered bead bag for counting prayers.',
      hi: 'वृंदावन की पवित्र सूखी तुलसी लकड़ी से हस्तनिर्मित 108 मनकों की जप माला, जपा के लिए विशेष कढ़ाईयुक्त सुरक्षित गोमुखी झोली के साथ।',
      gu: 'વૃંદાવનની પવિત્ર તુલસીમાંથી બનેલી ૧૦૮ મણકાની જપ માળા, સાથે સપ્રમાણ દોરાવાળી સુંદર ભરતકામ કરેલી હરિનામ થેલી.',
      bn: 'বৃন্দাবনের শুষ্ক পবিত্র তুলসী কাষ্ঠ থেকে খোদাই করা ১০৮টি তুলসী দানার জপমালা এবং সাথে সুদৃশ্য কারুকার্যময় হরিনাম জপের ঝুলি।'
    },
    category: 'Accessories',
    price: 250,
    imageUrl: '/imagehere', // Spiritual beads/woods jewelry proxy
    isAvailable: true,
    stock: 350,
    rating: 4.8,
    reviews: []
  },
  {
    id: 'p-incense',
    name: {
      en: 'Pure Organic Vrindavan Sandalwood Incense Sticks',
      hi: 'शुद्ध प्राकृतिक वृंदावन चंदन धूपबत्ती',
      gu: 'શુદ્ધ પ્રાકૃતિક વૃંદાવન ચંદન અગરબત્તી',
      bn: 'বৃন্দাবনের খাঁটি চন্দন কাঠ কয়লাহীন ধূপকাঠি'
    },
    description: {
      en: 'Charcoal-free incense hand-rolled in temple workshops using natural herbs, flower petals, and pure Mysore Sandalwood oil. Creates an immersive peaceful ambiance.',
      hi: 'कोयला रहित, पूरी तरह प्राकृतिक जड़ी-बूटियों, ताजे फूलों और मैसूर शुद्ध चंदन तेल से हाथ से बनाई गई सुगंधित अगरबत्ती। मंदिर जैसी पावन सुगंध उत्पन्न करती है।',
      gu: 'કોલસા મુક્ત, વનસ્પતિ જડીબુટ્ટી, સુકા ગુલાબ-તુલસી પાંદડા અને શુદ્ધ ચંદન તેલમાંથી બનાવેલ અગરબત્તી. પ્રફુલ્લિત સુગંધ ફેલાવે છે.',
      bn: 'কয়লাবিহীন, ভেষজ উপাদান, তুলসী পাতা ও মহীশুর চন্দন তেল মিশ্রিত হস্তনির্মিত অপূর্ব সুগন্ধযুক্ত ধূপ। শান্ত সমাহিত ভক্তিপূর্ণ পরিবেশ সৃষ্টি করে।'
    },
    category: 'Spiritual Items',
    price: 150,
    imageUrl: '/imagehere', // Meditative incense sticks proxy
    isAvailable: true,
    stock: 800,
    rating: 4.9,
    reviews: []
  },
  {
    id: 'p-seva-1',
    name: {
      en: 'Prasadam Seva - Feed 100 Sadhu/Pilgrims',
      hi: 'प्रसादम सेवा - 100 साधुओं और तीर्थयात्रियों को भोजन',
      gu: 'પ્રસાદમ સેવા - ૧૦૦ સાધુઓ તેમજ શ્રદ્ધાળુઓને ભોજન',
      bn: 'প্রসাদ সেবা - ১০০ জন সাধু ও মহাতীর্থযাত্রী ভোজন'
    },
    description: {
      en: 'Honor the tradition of Annadan. Sponsor a wholesome sacred vegetarian meal consisting of rice, dal, subji, pure ghee rotis, and halwa sweet made for sadhus in holy Vrindavan.',
      hi: 'अन्नदान की पावन परंपरा। वृंदावन धाम में तपस्यारत संतों और गरीब तीर्थयात्रियों को शुद्ध देसी घी की रोटियां, हरी सब्जियां, दाल-चावल और हलवे का पवित्र प्रसाद प्रायोजित करें।',
      gu: 'અન્નદાનની પવિત્ર પરંપરા. શ્રીધામ વૃંદાવનના ૧૦૦ તપસ્વીઓ અને મહાત્માઓને ગરમ રોટલી, ઘી ધરાવેલી દાળ તથા હલવા પ્રસાદનું સદાવ્રત ભોજન આપો.',
      bn: 'মহাকল্যাণকর অন্নদান সেবা। পরমধাম বৃন্দাবন বা মায়াপুরে শতর সাধু-সন্ন্যাসী ও পুণ্যার্থীদের মাঝে পুষ্টিকর বৈদিক মহাপ্রসাদ (খাদ্যদ্রব্য) বিতরণ সেবা।'
    },
    category: 'Donations',
    price: 2500,
    imageUrl: '/imagehere', // Warm food/devotional feast plate proxy
    isAvailable: true,
    stock: 99999,
    rating: 5.0,
    reviews: []
  }
];
=======
export const EVENTS: AshramEvent[] = [];

export const PRODUCTS: Product[] = [];
>>>>>>> ac6c22c1af631600924d465d95793bc99929237d

export const BLOGS: BlogArticle[] = [
  {
    id: 'b-kriya',
    title: {
      en: 'The Stages and Techniques of Kriya Yoga',
      hi: 'क्रिया योग के चरण और तकनीकें',
      gu: 'ક્રિયા યોગના તબક્કાઓ અને તકનીકો',
      bn: 'ক্রিয়াযোগের স্তর এবং কৌশলসমূহ'
    },
    summary: {
      en: 'Learn about the First Kriya techniques: Mahamudra, Nabhimudra, Pranayama, Brahma Yoni Mudra, and Khechari Mudra.',
      hi: 'प्रथम क्रिया तकनीकों के बारे में जानें: महामुद्रा, नाभिमुद्रा, प्राणायाम, ब्रह्म योनि मुद्रा और खेचरी मुद्रा।',
      gu: 'પ્રથમ ક્રિયા તકનીકો વિશે જાણો.',
      bn: 'প্রথম ক্রিয়া কৌশল সম্পর্কে জানুন: মহামুদ্রা, নাভিমুদ্রা, প্রাণায়াম, ব্রহ্মযোনি মুদ্রা এবং খেচরী মুদ্রা।'
    },
    content: {
      en: 'Lahiri Mahasaya organized Kriya Yoga into four progressive stages. The First Kriya consists of Mahamudra, Nabhimudra, Pranayama, Brahma Yoni Mudra, and Khechari Mudra. Practicing these brings profound inner peace and accelerates spiritual growth.',
      hi: 'लाहिड़ी महाशय ने क्रिया योग को चार चरणों में व्यवस्थित किया। इन तकनीकों का अभ्यास गहन आंतरिक शांति लाता है।',
      gu: 'લાહિડી મહાશયે ક્રિયા યોગને ચાર તબક્કામાં ગોઠવ્યું.',
      bn: 'লাহিড়ী মহাশয় ক্রিয়াযোগকে চারটি স্তরে বিন্যস্ত করেছেন।'
    },
<<<<<<< HEAD
    author: 'Gargamuni Swami',
    publishDate: 'May 28, 2026',
    readTime: '5 min read',
    imageUrl: '/imagehere',
=======
    author: 'Gita Prachar Mandali',
    publishDate: 'June 16, 2026',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800'
>>>>>>> ac6c22c1af631600924d465d95793bc99929237d
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
<<<<<<< HEAD
    id: 't-user1',
    name: 'Michael Henderson',
    avatarUrl: '/imagehere',
    experience: {
      en: 'Visiting the Raman Reti Ashram changed my view of life. The chanting, the peacefulness, and the simple lifestyle brought me back my sanity.',
      hi: 'रमण रेती आश्रम की यात्रा ने मेरे जीवन के प्रति दृष्टिकोण को बदल दिया। दिव्य संकीर्तन, अद्भुत शांति और सादा जीवन प्रणाली ने मुझे फिर से ऊर्जा दी।',
      gu: 'જ્યારે હું પહેલીવાર વૃંદાવન આશ્રમ ગયો, ત્યાંનું વાતાવરણ, ભક્તિમય કીર્તનો અને પવિત્ર જમણવાર મોહિત કરી ગયા.',
      bn: 'রমণ রেতি আশ্রমে এসে আমার জীবনের দিশা বদলে গিয়েছে। নিত্য জপ ও ভক্তদের প্রেমময় সরল আচরণে আমি পরম ধন্য হয়েছি।'
    },
    rating: 5,
    country: 'United States'
  },
  {
    id: 't-user2',
    name: 'Priyanka Patel',
    avatarUrl: '/imagehere',
    experience: {
      en: 'Highly satisfied with the Bhagavad Gita book quality and fast shipping of original incense sticks. The aroma fills my home temple with Vrindavan warmth.',
      hi: 'भगवद गीता पुस्तक की छपाई और शुद्ध धूपबत्ती की त्वरित डिलीवरी से बहुत प्रसन्न हूँ। इनकी दिव्य सुगंध मेरे गृह मंदिर को वृंदावन धाम जैसी ऊर्जा देती है।',
      gu: 'અહીંની પુસ્તકો ઓરિજિનલ ગીતા અને તુલસી માળાની નિત્ય પૂજા માટેની મટીરીયલ ક્વોલિટી ખૂબ જ સુંદર અને પરમ સંતોષકારક છે.',
      bn: 'গীতা শাস্ত্রের চমৎকার বাধাই এবং চন্দন ধূপের তীব্র সুগন্ধ আমার সমস্ত গৃহকোণকে দিব্য বৃন্দাবনের সুবাসে সুরভিত করে তোলে।'
=======
    id: 't-1',
    name: 'Spiritual Seeker',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    experience: {
      en: 'To be truly free, forget the world, forgive everyone, and harbor no malice toward anyone. God resides in every living body; serving them is serving God.',
      hi: 'सच्चे अर्थों में स्वतंत्र होने के लिए, दुनिया को भूल जाओ, सबको माफ कर दो और किसी के प्रति द्वेष मत रखो। ईश्वर प्रत्येक जीवित शरीर में निवास करता है; उनकी सेवा करना ही ईश्वर की सेवा है।',
      gu: 'સાચા અર્થમાં મુક્ત થવા માટે દુનિયાને ભૂલી જાવ.',
      bn: 'সত্যিকার অর্থে স্বাধীন হতে হলে, পৃথিবী ভুলে যান, সবাইকে ক্ষমা করুন এবং কারও প্রতি বিদ্বেষ রাখবেন না। ভগবান প্রতিটি জীবের দেহে বিরাজমান; তাদের সেবা করাই ভগবানের সেবা।'
>>>>>>> ac6c22c1af631600924d465d95793bc99929237d
    },
    rating: 5,
    country: 'India'
  }
];
