import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { AppraisalPurpose as PurposeType } from '@/types';
import { getTranslation, getAppraisalPurposeTranslation } from '@/data/translations';
import { cn } from '@/lib/utils';
import { Tag, Home, Landmark, Receipt, Shield, HelpCircle } from 'lucide-react';

interface AppraisalPurposeProps {
  selected: PurposeType | null;
  onChange: (purpose: PurposeType) => void;
  error?: string;
}

const AppraisalPurpose: React.FC<AppraisalPurposeProps> = ({ 
  selected, 
  onChange,
  error
}) => {
  const { language } = useLanguage();
  
  const purposes: { type: PurposeType; icon: React.ReactNode }[] = [
    { type: 'sale', icon: <Tag className="h-8 w-8 mb-2" /> },
    { type: 'rent', icon: <Home className="h-8 w-8 mb-2" /> },
    { type: 'loan', icon: <Landmark className="h-8 w-8 mb-2" /> },
    { type: 'tax', icon: <Receipt className="h-8 w-8 mb-2" /> },
    { type: 'insurance', icon: <Shield className="h-8 w-8 mb-2" /> },
    { type: 'other', icon: <HelpCircle className="h-8 w-8 mb-2" /> },
  ];

  return (
    <div className="form-section">
      <h2 className="text-2xl font-bold mb-6 text-estate-dark">
        {getTranslation('appraisalPurpose', language)}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {purposes.map(({ type, icon }) => (
          <div
            key={type}
            className={cn(
              "property-card cursor-pointer flex flex-col items-center text-center transition-all",
              selected === type 
                ? "border-estate-primary bg-estate-light" 
                : "hover:border-estate-accent",
              error ? "border-red-500" : ""
            )}
            onClick={() => onChange(type)}
          >
            {icon}
            <span className="font-medium">
              {getAppraisalPurposeTranslation(type, language)}
            </span>
          </div>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
};

export default AppraisalPurpose;
