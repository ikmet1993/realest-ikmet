import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PropertyData, AppraisalReport, PropertyType } from '@/types';
import type { AppraisalPurpose as AppraisalPurposeType } from '@/types';
import { getTranslation } from '@/data/translations';
import { generateAppraisalReport } from '@/utils/ai';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import FormStepIndicator from './FormStepIndicator';
import PropertyTypeSelector from './PropertyTypeSelector';
import PropertyDetails from './PropertyDetails';
import AppraisalPurpose from './AppraisalPurpose';
import AIAppraisalReport from './AIAppraisalReport';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, Loader2 } from 'lucide-react';

interface PropertyFormProps {
  apiKey: string | null;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ apiKey }) => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [report, setReport] = useState<AppraisalReport | null>(null);

  // Initialize property data
  const [propertyData, setPropertyData] = useState<PropertyData>({
    address: '',
    area: '',
    propertyType: 'residence',
    size: 0,
    constructionYear: new Date().getFullYear(),
    floor: '',
    condition: 'good',
    residentialPermit: true,
    features: [],
    appraisalPurpose: 'sale',
    additionalNotes: ''
  });

  // Form validation
  const [errors, setErrors] = useState<Partial<Record<keyof PropertyData, string>>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof PropertyData, string>> = {};
    const isLand = propertyData.propertyType === 'land';
    const isOther = propertyData.propertyType === 'other';
    const isBuilding = !isLand && !isOther;

    switch (step) {
      case 0: // Property Type step
        if (!propertyData.propertyType) {
          newErrors.propertyType = getTranslation('requiredField', language);
          toast.error(getTranslation('emptyFieldError', language));
        }
        break;

      case 1: // Property Details step
        if (!propertyData.address) {
          newErrors.address = getTranslation('requiredField', language);
        }
        if (!propertyData.area) {
          newErrors.area = getTranslation('requiredField', language);
        }
        if (!propertyData.size || propertyData.size <= 0) {
          newErrors.size = getTranslation('requiredField', language);
        }

        // Building-specific validations
        if (isBuilding) {
          if (!propertyData.constructionYear || propertyData.constructionYear <= 0) {
            newErrors.constructionYear = getTranslation('requiredField', language);
          }
          if (!propertyData.floor) {
            newErrors.floor = getTranslation('requiredField', language);
          }
          if (!propertyData.condition) {
            newErrors.condition = getTranslation('requiredField', language);
          }
        }

        if (Object.keys(newErrors).length > 0) {
          toast.error(getTranslation('emptyFieldError', language));
        }
        break;

      case 2: // Appraisal Purpose step
        if (!propertyData.appraisalPurpose) {
          newErrors.appraisalPurpose = getTranslation('requiredField', language);
          toast.error(getTranslation('emptyFieldError', language));
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateData = (updates: Partial<PropertyData>) => {
    setPropertyData(prev => ({ ...prev, ...updates }));

    // Clear errors for updated fields
    const updatedErrors = { ...errors };
    Object.keys(updates).forEach(key => {
      delete updatedErrors[key as keyof PropertyData];
    });
    setErrors(updatedErrors);

    // When property type changes, reset certain fields
    if (updates.propertyType) {
      const isLand = updates.propertyType === 'land';
      const isOther = updates.propertyType === 'other';

      if (isLand || isOther) {
        // Reset building-specific fields for land or other types
        setPropertyData(prev => ({
          ...prev,
          ...updates,
          constructionYear: undefined,
          floor: undefined,
          condition: undefined,
          residentialPermit: false,
          features: []
        }));
      }
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handlePropertyTypeSelect = (type: PropertyType) => {
    handleUpdateData({ propertyType: type });
  };

  const handleAppraisalPurposeSelect = (purpose: AppraisalPurposeType) => {
    handleUpdateData({ appraisalPurpose: purpose });
  };

  const handleGenerateReport = async () => {
    if (validateStep(2)) {
      if (!apiKey) {
        toast.error(
          language === 'el'
            ? 'Παρακαλώ εισάγετε το κλειδί API του OpenRouter.'
            : 'Please enter your OpenRouter API key.'
        );
        return;
      }
      try {
        setIsGeneratingReport(true);
        const appraisalReport = await generateAppraisalReport(
          propertyData,
          language,
          apiKey
        );
        setReport(appraisalReport);
        setCurrentStep(3);
      } catch (error) {
        console.error('Error generating report:', error);
        toast.error(
          language === 'el'
            ? 'Σφάλμα κατά τη δημιουργία της έκθεσης.'
            : 'Error generating the report.'
        );
      } finally {
        setIsGeneratingReport(false);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <PropertyTypeSelector
            selectedType={propertyData.propertyType}
            onChange={handlePropertyTypeSelect}
          />
        );
      case 1:
        return (
          <PropertyDetails
            data={propertyData}
            onUpdate={handleUpdateData}
            errors={errors}
          />
        );
      case 2:
        return (
          <AppraisalPurpose
            selected={propertyData.appraisalPurpose}
            onChange={handleAppraisalPurposeSelect}
            error={errors.appraisalPurpose}
          />
        );
      case 3:
        return (
          <AIAppraisalReport
            propertyData={propertyData}
            report={report}
            isLoading={isGeneratingReport}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <FormStepIndicator currentStep={currentStep} totalSteps={4} />

      {renderStepContent()}

      <div className="mt-8 flex justify-between">
        {currentStep > 0 && (
          <Button
            onClick={handlePrevious}
            variant="outline"
            className="flex items-center"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            {getTranslation('prevStep', language)}
          </Button>
        )}

        {currentStep < 2 && (
          <Button
            onClick={handleNext}
            className="ml-auto bg-estate-primary hover:bg-estate-dark flex items-center"
          >
            {getTranslation('nextStep', language)}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        )}

        {currentStep === 2 && (
          <Button
            onClick={handleGenerateReport}
            className="ml-auto bg-estate-primary hover:bg-estate-dark flex items-center"
            disabled={isGeneratingReport}
          >
            {isGeneratingReport ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {getTranslation('processingRequest', language)}
              </>
            ) : (
              <>
                {getTranslation('generateReport', language)}
                <CheckIcon className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PropertyForm;
