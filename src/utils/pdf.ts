import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { PropertyData, AppraisalReport, Language } from '@/types';
import { 
  getPropertyTypeTranslation, 
  getPropertyConditionTranslation,
  getPropertyFeatureTranslation,
  getAppraisalPurposeTranslation,
  getTranslation
} from '@/data/translations';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const generatePDF = (
  propertyData: PropertyData, 
  report: AppraisalReport, 
  language: Language
): void => {
  // Initialize the PDF document with UTF-8 encoding support
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    compress: true
  });
  
  // Add Unicode font for Greek characters
  doc.addFont('https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf', 'Roboto', 'normal');
  doc.setFont('Roboto');
  
  // Define font sizes
  const titleFontSize = 18;
  const headingFontSize = 14;
  const normalFontSize = 10;
  
  // Define colors
  const primaryColor = [26, 86, 219]; // estate-primary
  const secondaryColor = [59, 130, 246]; // estate-secondary
  
  // Configure text settings
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(titleFontSize);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  
  // Title
  const title = language === 'el' ? 'ΕΚΘΕΣΗ ΕΚΤΙΜΗΣΗΣ ΑΚΙΝΗΤΟΥ' : 'PROPERTY APPRAISAL REPORT';
  doc.text(title, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
  
  // Reset text settings
  doc.setFont('Roboto', 'normal');
  doc.setFontSize(normalFontSize);
  doc.setTextColor(0, 0, 0);
  
  // Property Info Section
  doc.setFontSize(headingFontSize);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  const propertyDetailsTitle = getTranslation('propertyDetails', language);
  doc.text(propertyDetailsTitle, 14, 30);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(normalFontSize);
  
  // Format features as string
  const featuresString = propertyData.features
    .map(feature => getPropertyFeatureTranslation(feature, language))
    .join(', ');
  
  // Determine property type
  const isLand = propertyData.propertyType === 'land';
  const isOther = propertyData.propertyType === 'other';
  
  // Build table rows based on property type
  const baseRows = [
    [language === 'el' ? 'Διεύθυνση' : 'Address', propertyData.address],
    [language === 'el' ? 'Περιοχή' : 'Area', propertyData.area],
    [language === 'el' ? 'Τύπος ακινήτου' : 'Property Type', getPropertyTypeTranslation(propertyData.propertyType, language)],
    [language === 'el' ? 'Έκταση' : 'Size', `${propertyData.size} ${language === 'el' ? 'τ.μ.' : 'sq.m.'}`],
  ];
  
  // Add building-specific rows if not land or other
  const buildingRows = !isLand && !isOther ? [
    [language === 'el' ? 'Έτος κατασκευής' : 'Construction Year', propertyData.constructionYear?.toString() || ''],
    [language === 'el' ? 'Όροφος' : 'Floor', propertyData.floor || ''],
    [language === 'el' ? 'Κατάσταση' : 'Condition', propertyData.condition ? getPropertyConditionTranslation(propertyData.condition, language) : ''],
    [language === 'el' ? 'Άδεια κατοικίας' : 'Residential Permit', propertyData.residentialPermit ? (language === 'el' ? 'Ναι' : 'Yes') : (language === 'el' ? 'Όχι' : 'No')],
  ] : [];
  
  // Features row (not for 'other' type)
  const featuresRow = !isOther ? [
    [language === 'el' ? 'Ειδικά χαρακτηριστικά' : 'Special Features', featuresString || (language === 'el' ? 'Κανένα' : 'None')]
  ] : [];
  
  // Purpose row - for all types
  const purposeRow = [
    [language === 'el' ? 'Σκοπός Εκτίμησης' : 'Appraisal Purpose', getAppraisalPurposeTranslation(propertyData.appraisalPurpose, language)]
  ];
  
  // Additional notes row - optional for all types
  const notesRow = propertyData.additionalNotes ? [
    [language === 'el' ? 'Επιπλέον σημειώσεις' : 'Additional Notes', propertyData.additionalNotes]
  ] : [];
  
  // Combine all rows
  const tableBody = [
    ...baseRows,
    ...buildingRows,
    ...featuresRow,
    ...purposeRow,
    ...notesRow
  ];
  
  // Property details table
  doc.autoTable({
    startY: 35,
    head: [[language === 'el' ? 'Στοιχείο' : 'Property Detail', language === 'el' ? 'Περιγραφή' : 'Description']],
    body: tableBody,
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255], fontStyle: 'bold' },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60 },
      1: { cellWidth: 'auto' }
    },
    styles: { overflow: 'linebreak', cellPadding: 4, font: 'Roboto' },
    margin: { top: 35, bottom: 20, left: 14, right: 14 }
  });
  
  // Add property description
  let yPos = (doc as any).lastAutoTable.finalY + 10;
  
  // Main report sections
  const sections = [
    { title: getTranslation('propertyDetails', language), content: report.propertyDetails },
    { title: getTranslation('appraisalPurpose', language), content: report.appraisalPurpose },
    { title: getTranslation('appraisalMethod', language), content: report.appraisalMethod },
    { title: getTranslation('marketAnalysis', language), content: report.marketAnalysis },
    { title: getTranslation('valueEstimation', language), content: report.valueEstimation },
    { title: getTranslation('conclusions', language), content: report.conclusions }
  ];
  
  // Add each section to the PDF
  sections.forEach(section => {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Section title
    doc.setFontSize(headingFontSize);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text(section.title, 14, yPos);
    
    // Reset text settings
    doc.setFontSize(normalFontSize);
    doc.setTextColor(0, 0, 0);
    
    // Section content
    const splitText = doc.splitTextToSize(section.content, doc.internal.pageSize.getWidth() - 28);
    doc.text(splitText, 14, yPos + 8);
    
    // Update y position for next section
    yPos += 8 + (splitText.length * 5) + 10;
  });
  
  // Check if we need a new page for appraiser info
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  
  // Appraiser info section
  doc.setFontSize(headingFontSize);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text(getTranslation('appraiserInfo', language), 14, yPos);
  
  // Reset text settings
  doc.setFontSize(normalFontSize);
  doc.setTextColor(0, 0, 0);
  
  // Appraiser details
  yPos += 8;
  doc.text(report.appraiser.name, 14, yPos);
  yPos += 5;
  doc.text(report.appraiser.title, 14, yPos);
  yPos += 5;
  doc.text(`${language === 'el' ? 'Τηλέφωνο' : 'Phone'}: ${report.appraiser.contact}`, 14, yPos);
  yPos += 5;
  doc.text(`${language === 'el' ? 'Ημερομηνία' : 'Date'}: ${report.appraiser.date}`, 14, yPos);
  
  // Add a footer with page numbers
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(
      `${language === 'el' ? 'Σελίδα' : 'Page'} ${i} ${language === 'el' ? 'από' : 'of'} ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  // Save the PDF
  const fileName = `${language === 'el' ? 'Εκτίμηση_Ακινήτου' : 'Property_Appraisal'}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
};
