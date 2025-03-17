import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/data/translations';
import PropertyForm from '@/components/PropertyForm';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Building } from 'lucide-react';
import ApiKeyModal from '@/components/ApiKeyModal';

interface IndexProps {
  apiKey: string | null;
  onApiKeySave: (apiKey: string) => void;
}

const PageContent: React.FC<IndexProps> = ({ apiKey, onApiKeySave }) => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
        <ApiKeyModal onSave={onApiKeySave} />
        <LanguageSwitcher />
      </div>

      <header className="bg-estate-primary text-white py-6 px-4 shadow-md">
        <div className="container mx-auto max-w-4xl flex items-center justify-center">
          <Building className="h-8 w-8 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            {getTranslation('appTitle', language)}
          </h1>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl py-8">
        <PropertyForm apiKey={apiKey} />
      </main>

      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto max-w-4xl text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} {language === 'el'
            ? 'Εφαρμογή Εκτίμησης Ακινήτων made by Ikmet KaraChousein'
            : 'Property Appraisal Application made by Ikmet KaraChousein'}
        </div>
      </footer>
    </div>
  );
};

const Index: React.FC<IndexProps> = ({ apiKey, onApiKeySave }) => {
  return (
    <LanguageProvider>
      <PageContent apiKey={apiKey} onApiKeySave={onApiKeySave} />
    </LanguageProvider>
  );
};

export default Index;
