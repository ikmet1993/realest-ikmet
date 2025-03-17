export type Language = 'el' | 'en';

export type PropertyType = 'residence' | 'office' | 'store' | 'land' | 'other';

export type PropertyCondition = 'new' | 'renovated' | 'good' | 'needs_renovation' | 'poor';

export type PropertyFeature = 
  | 'parking' 
  | 'balcony' 
  | 'garden' 
  | 'elevator' 
  | 'storage' 
  | 'security_door' 
  | 'alarm' 
  | 'solar_water_heater' 
  | 'fireplace' 
  | 'air_conditioning'
  | 'view'
  | 'corner_plot'
  | 'near_sea'
  | 'buildable'
  | 'utilities_connected'
  | 'fenced';

export type AppraisalPurpose = 'sale' | 'rent' | 'loan' | 'tax' | 'insurance' | 'other';

export interface PropertyData {
  address: string;
  area: string;
  propertyType: PropertyType;
  size: number;
  constructionYear?: number;
  floor?: string;
  condition?: PropertyCondition;
  residentialPermit: boolean;
  features: PropertyFeature[];
  appraisalPurpose: AppraisalPurpose;
  additionalNotes?: string;
}

export interface AppraisalReport {
  propertyDetails: string;
  appraisalPurpose: string;
  appraisalMethod: string;
  marketAnalysis: string;
  valueEstimation: string;
  conclusions: string;
  appraiser: {
    name: string;
    title: string;
    contact: string;
    date: string;
  };
}
