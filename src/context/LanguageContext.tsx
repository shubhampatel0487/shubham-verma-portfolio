import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Navigation
  nav_home: { en: "Home", hi: "होम" },
  nav_about: { en: "About", hi: "परिचय" },
  nav_expertise: { en: "Expertise", hi: "तकनीकी कौशल" },
  nav_labs: { en: "Engineering Lab", hi: "इंजीनियरिंग लैब" },
  nav_projects: { en: "Projects", hi: "प्रोजेक्ट्स" },
  nav_videos: { en: "Video Library", hi: "वीडियो लाइब्रेरी" },
  nav_code: { en: "Code Explorer", hi: "सोर्स कोड" },
  nav_diagrams: { en: "Diagrams", hi: "सर्किट डायग्राम" },
  nav_graph: { en: "Knowledge Graph", hi: "नॉलेज ग्राफ" },
  nav_playground: { en: "Playground", hi: "कोड प्लेग्राउंड" },
  nav_blog: { en: "Blog", hi: "ब्लॉग" },
  nav_recruiter: { en: "Recruiter Mode", hi: "रिक्रूटर मोड" },
  nav_resume: { en: "Resume", hi: "रिज्यूमे" },
  nav_contact: { en: "Contact", hi: "संपर्क" },
  nav_voice: { en: "Voice Nav", hi: "वॉइस नेविगेशन" },

  // Hero
  hero_greeting: { en: "Hello, I'm", hi: "नमस्ते, मैं हूँ" },
  hero_title: { en: "Aspiring Robotics & AI Engineer", hi: "रोबोटिक्स और एआई इंजीनियर" },
  hero_tagline: { en: "Engineering Intelligence. Building the Future.", hi: "इंजीनियरिंग इंटेलिजेंस। भविष्य का निर्माण।" },
  hero_subtagline: { en: "Turning Ideas Into Intelligent Systems.", hi: "विचारों को बुद्धिमान प्रणालियों में बदलना।" },
  hero_explore_btn: { en: "Explore Projects", hi: "प्रोजेक्ट्स देखें" },
  hero_resume_btn: { en: "Download Resume", hi: "रिज्यूमे डाउनलोड" },
  hero_contact_btn: { en: "Contact Me", hi: "संपर्क करें" },

  // About
  about_badge: { en: "Professional Narrative", hi: "व्यावसायिक विवरण" },
  about_heading: { en: "About Me & Technical Vision", hi: "मेरे बारे में और तकनीकी विजन" },
  about_mission: { en: "Engineering Mission", hi: "इंजीनियरिंग मिशन" },
  about_vision: { en: "Career Vision", hi: "करियर विजन" },
  about_timeline: { en: "Verified Technical Timeline", hi: "प्रमाणित तकनीकी समयरेखा" },

  // AI Assistant
  ai_assistant_title: { en: "SHUBHAM AI Assistant", hi: "शुभम एआई सहायक" },
  ai_assistant_desc: { en: "Ask me anything about Shubham's engineering projects, skills, or background.", hi: "शुभम के इंजीनियरिंग प्रोजेक्ट्स, कौशल या पृष्ठभूमि के बारे में कुछ भी पूछें।" }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('shubham_portfolio_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('shubham_portfolio_lang', lang);
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
