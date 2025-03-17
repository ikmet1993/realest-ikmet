import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PropertyData, AppraisalReport } from '@/types';
import { getTranslation } from '@/data/translations';
import { generatePDF } from '@/utils/pdf';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { FileText, Loader2, Edit, Save, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface AIAppraisalReportProps {
  propertyData: PropertyData;
  report: AppraisalReport | null;
  isLoading: boolean;
}

const AIAppraisalReport: React.FC<AIAppraisalReportProps> = ({
  propertyData,
  report: initialReport,
  isLoading
}) => {
  const { language } = useLanguage();
  const [report, setReport] = useState<AppraisalReport | null>(initialReport);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempContent, setTempContent] = useState<string>('');

  const handleExportPDF = () => {
    if (report) {
      generatePDF(propertyData, report, language);
    }
  };

  const startEditing = (sectionKey: string, content: string) => {
    setEditingSection(sectionKey);
    setTempContent(content);
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setTempContent('');
  };

  const saveEditing = (sectionKey: string) => {
    if (!report) return;
    
    const updatedReport = { ...report };
    
    switch(sectionKey) {
      case 'propertyDetails':
        updatedReport.propertyDetails = tempContent;
        break;
      case 'appraisalPurpose':
        updatedReport.appraisalPurpose = tempContent;
        break;
      case 'appraisalMethod':
        updatedReport.appraisalMethod = tempContent;
        break;
      case 'marketAnalysis':
        updatedReport.marketAnalysis = tempContent;
        break;
      case 'valueEstimation':
        updatedReport.valueEstimation = tempContent;
        break;
      case 'conclusions':
        updatedReport.conclusions = tempContent;
        break;
      default:
        break;
    }
    
    setReport(updatedReport);
    setEditingSection(null);
    setTempContent('');
    toast.success(language === 'el' ? 'Οι αλλαγές αποθηκεύτηκαν με επιτυχία!' : 'Changes saved successfully!');
  };

  if (isLoading) {
    return (
      <div className="form-section flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-estate-primary mb-4" />
        <p className="text-lg font-medium text-estate-dark">
          {getTranslation('processingRequest', language)}
        </p>
      </div>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <div className="form-section">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-estate-dark">
          {getTranslation('appraisalReport', language)}
        </h2>
        <Button 
          onClick={handleExportPDF}
          className="bg-estate-primary hover:bg-estate-dark"
        >
          <FileText className="mr-2 h-4 w-4" />
          {getTranslation('exportToPdf', language)}
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>{getTranslation('propertyDetails', language)}</CardTitle>
            {editingSection !== 'propertyDetails' ? (
              <Button variant="ghost" size="sm" onClick={() => startEditing('propertyDetails', report.propertyDetails)}>
                <Edit className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={() => saveEditing('propertyDetails')}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={cancelEditing}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {editingSection === 'propertyDetails' ? (
              <Textarea
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                className="min-h-[100px]"
              />
            ) : (
              <p>{report.propertyDetails}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>{getTranslation('appraisalPurpose', language)}</CardTitle>
            {editingSection !== 'appraisalPurpose' ? (
              <Button variant="ghost" size="sm" onClick={() => startEditing('appraisalPurpose', report.appraisalPurpose)}>
                <Edit className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={() => saveEditing('appraisalPurpose')}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={cancelEditing}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {editingSection === 'appraisalPurpose' ? (
              <Textarea
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                className="min-h-[100px]"
              />
            ) : (
              <p>{report.appraisalPurpose}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>{getTranslation('appraisalMethod', language)}</CardTitle>
            {editingSection !== 'appraisalMethod' ? (
              <Button variant="ghost" size="sm" onClick={() => startEditing('appraisalMethod', report.appraisalMethod)}>
                <Edit className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={() => saveEditing('appraisalMethod')}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={cancelEditing}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {editingSection === 'appraisalMethod' ? (
              <Textarea
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                className="min-h-[100px]"
              />
            ) : (
              <p>{report.appraisalMethod}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>{getTranslation('marketAnalysis', language)}</CardTitle>
            {editingSection !== 'marketAnalysis' ? (
              <Button variant="ghost" size="sm" onClick={() => startEditing('marketAnalysis', report.marketAnalysis)}>
                <Edit className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={() => saveEditing('marketAnalysis')}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={cancelEditing}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {editingSection === 'marketAnalysis' ? (
              <Textarea
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                className="min-h-[100px]"
              />
            ) : (
              <p>{report.marketAnalysis}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>{getTranslation('valueEstimation', language)}</CardTitle>
            {editingSection !== 'valueEstimation' ? (
              <Button variant="ghost" size="sm" onClick={() => startEditing('valueEstimation', report.valueEstimation)}>
                <Edit className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={() => saveEditing('valueEstimation')}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={cancelEditing}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {editingSection === 'valueEstimation' ? (
              <Textarea
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                className="min-h-[100px]"
              />
            ) : (
              <p>{report.valueEstimation}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>{getTranslation('conclusions', language)}</CardTitle>
            {editingSection !== 'conclusions' ? (
              <Button variant="ghost" size="sm" onClick={() => startEditing('conclusions', report.conclusions)}>
                <Edit className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={() => saveEditing('conclusions')}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={cancelEditing}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {editingSection === 'conclusions' ? (
              <Textarea
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                className="min-h-[100px]"
              />
            ) : (
              <p>{report.conclusions}</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-estate-light border-estate-accent">
          <CardHeader>
            <CardTitle>{getTranslation('appraiserInfo', language)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold">{report.appraiser.name}</p>
            <p>{report.appraiser.title}</p>
            <p>{report.appraiser.contact}</p>
            <p>{report.appraiser.date}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIAppraisalReport;
