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
    photoUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600',
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
    photoUrl: 'https://images.unsplash.com/photo-1609137144814-7223e75e1cee?auto=format&fit=crop&q=80&w=600',
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
    coverUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=1200',
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

export const EVENTS: AshramEvent[] = [];

export const PRODUCTS: Product[] = [];

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
    author: 'Gita Prachar Mandali',
    publishDate: 'June 16, 2026',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Spiritual Seeker',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    experience: {
      en: 'To be truly free, forget the world, forgive everyone, and harbor no malice toward anyone. God resides in every living body; serving them is serving God.',
      hi: 'सच्चे अर्थों में स्वतंत्र होने के लिए, दुनिया को भूल जाओ, सबको माफ कर दो और किसी के प्रति द्वेष मत रखो। ईश्वर प्रत्येक जीवित शरीर में निवास करता है; उनकी सेवा करना ही ईश्वर की सेवा है।',
      gu: 'સાચા અર્થમાં મુક્ત થવા માટે દુનિયાને ભૂલી જાવ.',
      bn: 'সত্যিকার অর্থে স্বাধীন হতে হলে, পৃথিবী ভুলে যান, সবাইকে ক্ষমা করুন এবং কারও প্রতি বিদ্বেষ রাখবেন না। ভগবান প্রতিটি জীবের দেহে বিরাজমান; তাদের সেবা করাই ভগবানের সেবা।'
    },
    rating: 5,
    country: 'India'
  }
];
