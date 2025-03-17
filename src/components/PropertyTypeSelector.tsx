import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PropertyType } from '@/types';
import { getTranslation, getPropertyTypeTranslation } from '@/data/translations';
import { cn } from '@/lib/utils';
import { Building2, Home, Store, Map, HelpCircle } from 'lucide-react';

interface PropertyTypeSelectorProps {
  selectedType: PropertyType | null;
  onChange: (type: PropertyType) => void;
}

const PropertyTypeSelector: React.FC<PropertyTypeSelectorProps> = ({ 
  selectedType, 
  onChange 
}) => {
  const { language } = useLanguage();
  
  const propertyTypes: { type: PropertyType; icon: React.ReactNode }[] = [
    { type: 'residence', icon: <Home className="h-8 w-8 mb-2" /> },
    { type: 'office', icon: <Building2 className="h-8 w-8 mb-2" /> },
    { type: 'store', icon: <Store className="h-8 w-8 mb-2" /> },
    { type: 'land', icon: <Map className="h-8 w-8 mb-2" /> },
    { type: 'other', icon: <HelpCircle className="h-8 w-8 mb-2" /> },
  ];

  return (
    <div className="form-section">
      <h2 className="text-2xl font-bold mb-6 text-estate-dark">
        {getTranslation('propertyType', language)}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {propertyTypes.map(({ type, icon }) => (
          <div
            key={type}
            className={cn(
              "property-card cursor-pointer flex flex-col items-center text-center transition-all",
              selectedType === type 
                ? "border-estate-primary bg-estate-light" 
                : "hover:border-estate-accent"
            )}
            onClick={() => onChange(type)}
          >
            {icon}
            <span className="font-medium">
              {getPropertyTypeTranslation(type, language)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyTypeSelector;
