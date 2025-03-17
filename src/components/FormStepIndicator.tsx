import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/data/translations';
import { cn } from '@/lib/utils';

interface FormStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const FormStepIndicator: React.FC<FormStepIndicatorProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  const { language } = useLanguage();
  
  const stepLabels = [
    getTranslation('step1', language),
    getTranslation('step2', language),
    getTranslation('step3', language),
    getTranslation('step4', language)
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            {/* Step circle */}
            <div 
              className={cn(
                "step-indicator",
                currentStep > index 
                  ? "completed" 
                  : currentStep === index 
                    ? "active" 
                    : "upcoming"
              )}
            >
              {currentStep > index ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                index + 1
              )}
            </div>
            
            {/* Step label */}
            <div className="hidden sm:block mx-2 text-sm font-medium">
              {stepLabels[index]}
            </div>
            
            {/* Connector line */}
            {index < totalSteps - 1 && (
              <div 
                className={cn(
                  "w-16 h-0.5 mx-2",
                  currentStep > index ? "bg-estate-primary" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FormStepIndicator;
