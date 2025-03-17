import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Language } from '@/types';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'el' ? 'en' : 'el');
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50"
    >
      {language === 'el' ? 'EN' : 'EL'}
    </Button>
  );
};

export default LanguageSwitcher;
