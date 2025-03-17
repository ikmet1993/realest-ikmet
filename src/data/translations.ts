import { Language, PropertyType, PropertyCondition, PropertyFeature, AppraisalPurpose } from '@/types';

type TranslationKeys =
  | 'appTitle'
  | 'nextStep'
  | 'prevStep'
  | 'propertyDetails'
  | 'address'
  | 'area'
  | 'propertyType'
  | 'size'
  | 'constructionYear'
  | 'floor'
  | 'condition'
  | 'residentialPermit'
  | 'features'
  | 'appraisalPurpose'
  | 'additionalNotes'
  | 'generateReport'
  | 'exportToPdf'
  | 'processingRequest'
  | 'appraisalReport'
  | 'propertyTypeOptions'
  | 'conditionOptions'
  | 'featureOptions'
  | 'purposeOptions'
  | 'yes'
  | 'no'
  | 'squareMeters'
  | 'appraiserInfo'
  | 'step1'
  | 'step2'
  | 'step3'
  | 'step4'
  | 'emptyFieldError'
  | 'appraisalMethod'
  | 'marketAnalysis'
  | 'valueEstimation'
  | 'conclusions'
  | 'complete'
  | 'requiredField';

type TranslationMap = {
  [key in TranslationKeys]: {
    [lang in Language]: string;
  };
};

type PropertyTypeTranslations = {
  [key in PropertyType]: {
    [lang in Language]: string;
  };
};

type PropertyConditionTranslations = {
  [key in PropertyCondition]: {
    [lang in Language]: string;
  };
};

type PropertyFeatureTranslations = {
  [key in PropertyFeature]: {
    [lang in Language]: string;
  };
};

type AppraisalPurposeTranslations = {
  [key in AppraisalPurpose]: {
    [lang in Language]: string;
  };
};

export const translations: TranslationMap = {
  appTitle: {
    el: 'Εφαρμογή Εκτίμησης Ακινήτων',
    en: 'Property Appraisal Application'
  },
  nextStep: {
    el: 'Επόμενο',
    en: 'Next'
  },
  prevStep: {
    el: 'Προηγούμενο',
    en: 'Previous'
  },
  propertyDetails: {
    el: 'Στοιχεία Ακινήτου',
    en: 'Property Details'
  },
  address: {
    el: 'Διεύθυνση',
    en: 'Address'
  },
  area: {
    el: 'Περιοχή',
    en: 'Area'
  },
  propertyType: {
    el: 'Τύπος ακινήτου',
    en: 'Property Type'
  },
  size: {
    el: 'Έκταση',
    en: 'Size'
  },
  constructionYear: {
    el: 'Έτος κατασκευής',
    en: 'Construction Year'
  },
  floor: {
    el: 'Όροφος',
    en: 'Floor'
  },
  condition: {
    el: 'Κατάσταση',
    en: 'Condition'
  },
  residentialPermit: {
    el: 'Άδεια κατοικίας',
    en: 'Residential Permit'
  },
  features: {
    el: 'Ειδικά χαρακτηριστικά',
    en: 'Special Features'
  },
  appraisalPurpose: {
    el: 'Σκοπός Εκτίμησης',
    en: 'Appraisal Purpose'
  },
  additionalNotes: {
    el: 'Επιπλέον σημειώσεις',
    en: 'Additional Notes'
  },
  generateReport: {
    el: 'Δημιουργία Έκθεσης',
    en: 'Generate Report'
  },
  exportToPdf: {
    el: 'Εξαγωγή σε PDF',
    en: 'Export to PDF'
  },
  processingRequest: {
    el: 'Επεξεργασία αιτήματος...',
    en: 'Processing request...'
  },
  appraisalReport: {
    el: 'Έκθεση Εκτίμησης',
    en: 'Appraisal Report'
  },
  propertyTypeOptions: {
    el: 'Επιλέξτε τύπο ακινήτου',
    en: 'Select property type'
  },
  conditionOptions: {
    el: 'Επιλέξτε κατάσταση',
    en: 'Select condition'
  },
  featureOptions: {
    el: 'Επιλέξτε χαρακτηριστικά',
    en: 'Select features'
  },
  purposeOptions: {
    el: 'Επιλέξτε σκοπό',
    en: 'Select purpose'
  },
  yes: {
    el: 'Ναι',
    en: 'Yes'
  },
  no: {
    el: 'Όχι',
    en: 'No'
  },
  squareMeters: {
    el: 'τ.μ.',
    en: 'sq.m.'
  },
  appraiserInfo: {
    el: 'Στοιχεία Εκτιμητή',
    en: 'Appraiser Information'
  },
  step1: {
    el: 'Τύπος Ακινήτου',
    en: 'Property Type'
  },
  step2: {
    el: 'Λεπτομέρειες',
    en: 'Details'
  },
  step3: {
    el: 'Σκοπός',
    en: 'Purpose'
  },
  step4: {
    el: 'Έκθεση',
    en: 'Report'
  },
  emptyFieldError: {
    el: 'Το πεδίο δεν μπορεί να είναι κενό',
    en: 'This field cannot be empty'
  },
  appraisalMethod: {
    el: 'Μέθοδος Εκτίμησης',
    en: 'Appraisal Method'
  },
  marketAnalysis: {
    el: 'Ανάλυση Αγοράς',
    en: 'Market Analysis'
  },
  valueEstimation: {
    el: 'Εκτίμηση Αξίας',
    en: 'Value Estimation'
  },
  conclusions: {
    el: 'Συμπεράσματα',
    en: 'Conclusions'
  },
  complete: {
    el: 'Ολοκλήρωση',
    en: 'Complete'
  },
  requiredField: {
    el: 'Υποχρεωτικό πεδίο',
    en: 'Required field'
  }
};

export const propertyTypeTranslations: PropertyTypeTranslations = {
  residence: {
    el: 'Κατοικία',
    en: 'Residence'
  },
  office: {
    el: 'Γραφείο',
    en: 'Office'
  },
  store: {
    el: 'Κατάστημα',
    en: 'Store'
  },
  land: {
    el: 'Οικόπεδο',
    en: 'Land'
  },
  other: {
    el: 'Άλλο',
    en: 'Other'
  }
};

export const propertyConditionTranslations: PropertyConditionTranslations = {
  new: {
    el: 'Νέα',
    en: 'New'
  },
  renovated: {
    el: 'Ανακαινισμένη',
    en: 'Renovated'
  },
  good: {
    el: 'Καλή',
    en: 'Good'
  },
  needs_renovation: {
    el: 'Χρειάζεται ανακαίνιση',
    en: 'Needs renovation'
  },
  poor: {
    el: 'Κακή',
    en: 'Poor'
  }
};

export const propertyFeatureTranslations: PropertyFeatureTranslations = {
  parking: {
    el: 'Πάρκινγκ',
    en: 'Parking'
  },
  balcony: {
    el: 'Μπαλκόνι',
    en: 'Balcony'
  },
  garden: {
    el: 'Κήπος',
    en: 'Garden'
  },
  elevator: {
    el: 'Ανελκυστήρας',
    en: 'Elevator'
  },
  storage: {
    el: 'Αποθήκη',
    en: 'Storage'
  },
  security_door: {
    el: 'Πόρτα ασφαλείας',
    en: 'Security door'
  },
  alarm: {
    el: 'Συναγερμός',
    en: 'Alarm'
  },
  solar_water_heater: {
    el: 'Ηλιακός θερμοσίφωνας',
    en: 'Solar water heater'
  },
  fireplace: {
    el: 'Τζάκι',
    en: 'Fireplace'
  },
  air_conditioning: {
    el: 'Κλιματισμός',
    en: 'Air conditioning'
  },
  // Adding land specific features
  view: {
    el: 'Θέα',
    en: 'View'
  },
  corner_plot: {
    el: 'Γωνιακό',
    en: 'Corner Plot'
  },
  near_sea: {
    el: 'Κοντά στη θάλασσα',
    en: 'Near Sea'
  },
  buildable: {
    el: 'Οικοδομήσιμο',
    en: 'Buildable'
  },
  utilities_connected: {
    el: 'Συνδεδεμένες παροχές',
    en: 'Utilities Connected'
  },
  fenced: {
    el: 'Περιφραγμένο',
    en: 'Fenced'
  }
};

export const appraisalPurposeTranslations: AppraisalPurposeTranslations = {
  sale: {
    el: 'Πώληση',
    en: 'Sale'
  },
  rent: {
    el: 'Ενοικίαση',
    en: 'Rent'
  },
  loan: {
    el: 'Δάνειο',
    en: 'Loan'
  },
  tax: {
    el: 'Φορολογικοί σκοποί',
    en: 'Tax purposes'
  },
  insurance: {
    el: 'Ασφάλιση',
    en: 'Insurance'
  },
  other: {
    el: 'Άλλο',
    en: 'Other'
  }
};

export const getTranslation = (key: TranslationKeys, language: Language): string => {
    const translation = translations[key];
    if (translation && translation[language]) {
      return translation[language];
    }
    console.warn(`Translation not found for key: ${key}, language: ${language}`); // Warn about missing translations
    return `[Missing translation: ${key}]`; // Return a placeholder
  };

export const getPropertyTypeTranslation = (type: PropertyType, language: Language): string => {
  const translation = propertyTypeTranslations[type];
    if (translation && translation[language]) {
      return translation[language];
    }
    console.warn(`Property type translation not found for type: ${type}, language: ${language}`);
    return `[Missing translation: ${type}]`;
};

export const getPropertyConditionTranslation = (condition: PropertyCondition, language: Language): string => {
  const translation = propertyConditionTranslations[condition];
    if(translation && translation[language]){
      return translation[language];
    }
    console.warn(`Property condition translation not found for condition: ${condition}, language: ${language}`);
    return `[Missing translation: ${condition}]`;
};

export const getPropertyFeatureTranslation = (feature: PropertyFeature, language: Language): string => {
  const translation = propertyFeatureTranslations[feature];
    if(translation && translation[language]){
       return translation[language];
    }
    console.warn(`Property feature translation not found for feature: ${feature}, language: ${language}`);
    return `[Missing translation: ${feature}]`;
};

export const getAppraisalPurposeTranslation = (purpose: AppraisalPurpose, language: Language): string => {
  const translation = appraisalPurposeTranslations[purpose];
    if(translation && translation[language]){
      return translation[language];
    }
    console.warn(`Appraisal purpose translation not found for purpose: ${purpose}, language: ${language}`);
    return `[Missing translation: ${purpose}]`;
};
