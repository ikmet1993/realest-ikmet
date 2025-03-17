import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PropertyData, PropertyCondition, PropertyFeature } from '@/types';
import { 
  getTranslation, 
  getPropertyConditionTranslation, 
  getPropertyFeatureTranslation 
} from '@/data/translations';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface PropertyDetailsProps {
  data: PropertyData;
  onUpdate: (data: Partial<PropertyData>) => void;
  errors: Partial<Record<keyof PropertyData, string>>;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ 
  data, 
  onUpdate, 
  errors 
}) => {
  const { language } = useLanguage();
  const isLand = data.propertyType === 'land';
  const isOther = data.propertyType === 'other';
  const isBuilding = !isLand && !isOther;

  const propertyConditions: PropertyCondition[] = [
    'new', 'renovated', 'good', 'needs_renovation', 'poor'
  ];

  const getPropertyFeatures = (): PropertyFeature[] => {
    if (isLand) {
      return [
        'view', 'corner_plot', 'near_sea', 'buildable', 'utilities_connected', 'fenced', 'parking'
      ];
    } else if (isOther) {
      return [];
    } else {
      return [
        'parking', 'balcony', 'garden', 'elevator', 'storage',
        'security_door', 'alarm', 'solar_water_heater', 'fireplace', 'air_conditioning'
      ];
    }
  };

  const handleFeatureToggle = (feature: PropertyFeature) => {
    const features = data.features.includes(feature)
      ? data.features.filter(f => f !== feature)
      : [...data.features, feature];
    onUpdate({ features });
  };

  return (
    <div className="form-section">
      <h2 className="text-2xl font-bold mb-6 text-estate-dark">
        {getTranslation('propertyDetails', language)}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="address">
            {getTranslation('address', language)} 
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => onUpdate({ address: e.target.value })}
            placeholder={getTranslation('address', language)}
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="area">
            {getTranslation('area', language)}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="area"
            value={data.area}
            onChange={(e) => onUpdate({ area: e.target.value })}
            placeholder={getTranslation('area', language)}
            className={errors.area ? "border-red-500" : ""}
          />
          {errors.area && (
            <p className="text-sm text-red-500">{errors.area}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="size">
            {getTranslation('size', language)} ({getTranslation('squareMeters', language)})
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="size"
            type="number"
            value={data.size === 0 ? '' : data.size}
            onChange={(e) => onUpdate({ size: Number(e.target.value) })}
            placeholder="0"
            className={errors.size ? "border-red-500" : ""}
          />
          {errors.size && (
            <p className="text-sm text-red-500">{errors.size}</p>
          )}
        </div>
        
        {isBuilding && (
          <>
            <div className="space-y-2">
              <Label htmlFor="constructionYear">
                {getTranslation('constructionYear', language)}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="constructionYear"
                type="number"
                value={data.constructionYear === 0 ? '' : data.constructionYear}
                onChange={(e) => onUpdate({ constructionYear: Number(e.target.value) })}
                min="1800"
                max={new Date().getFullYear()}
                placeholder={new Date().getFullYear().toString()}
                className={errors.constructionYear ? "border-red-500" : ""}
              />
              {errors.constructionYear && (
                <p className="text-sm text-red-500">{errors.constructionYear}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="floor">
                {getTranslation('floor', language)}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="floor"
                value={data.floor}
                onChange={(e) => onUpdate({ floor: e.target.value })}
                placeholder={getTranslation('floor', language)}
                className={errors.floor ? "border-red-500" : ""}
              />
              {errors.floor && (
                <p className="text-sm text-red-500">{errors.floor}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condition">
                {getTranslation('condition', language)}
                <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={data.condition} 
                onValueChange={(value: PropertyCondition) => onUpdate({ condition: value })}
              >
                <SelectTrigger id="condition" className={errors.condition ? "border-red-500" : ""}>
                  <SelectValue placeholder={getTranslation('conditionOptions', language)} />
                </SelectTrigger>
                <SelectContent>
                  {propertyConditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {getPropertyConditionTranslation(condition, language)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.condition && (
                <p className="text-sm text-red-500">{errors.condition}</p>
              )}
            </div>
          </>
        )}
      </div>
      
      {isBuilding && (
        <div className="mt-6 flex items-center space-x-2">
          <Switch
            id="residentialPermit"
            checked={data.residentialPermit}
            onCheckedChange={(checked) => onUpdate({ residentialPermit: checked })}
          />
          <Label htmlFor="residentialPermit">
            {getTranslation('residentialPermit', language)}
          </Label>
        </div>
      )}
      
      {(!isOther) && (
        <div className="mt-6">
          <Label className="text-base font-medium mb-4 block">
            {getTranslation('features', language)}
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {getPropertyFeatures().map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox 
                  id={feature}
                  checked={data.features.includes(feature)}
                  onCheckedChange={() => handleFeatureToggle(feature)}
                />
                <Label htmlFor={feature} className="cursor-pointer">
                  {getPropertyFeatureTranslation(feature, language)}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-6 space-y-2">
        <Label htmlFor="additionalNotes">
          {getTranslation('additionalNotes', language)}
        </Label>
        <Textarea
          id="additionalNotes"
          value={data.additionalNotes || ''}
          onChange={(e) => onUpdate({ additionalNotes: e.target.value })}
          placeholder={getTranslation('additionalNotes', language)}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default PropertyDetails;
