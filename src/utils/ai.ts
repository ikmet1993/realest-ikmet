import { PropertyData, AppraisalReport, Language } from '@/types';
import {
  getPropertyTypeTranslation,
  getPropertyConditionTranslation,
  getPropertyFeatureTranslation,
  getAppraisalPurposeTranslation,
  getTranslation
} from '@/data/translations';
import { toast } from 'sonner';

// The AI model to use
const MODEL = "google/gemini-2.0-flash-thinking-exp-1219:free";

export const generateAppraisalReport = async (
  propertyData: PropertyData,
  language: Language,
  apiKey: string | null
): Promise<AppraisalReport> => {
  if (!apiKey) {
    toast.error(
      language === 'el'
        ? 'Παρακαλώ εισάγετε το κλειδί API του OpenRouter.'
        : 'Please enter your OpenRouter API key.'
    );
    throw new Error("API key is missing");
  }

  try {
    // Prepare property features formatted as a string
    const featuresString = propertyData.features
      .map(feature => getPropertyFeatureTranslation(feature, language))
      .join(', ');

    // Format the property data into a structured text for the AI prompt
    const propertyInfo = language === 'el'
      ? `
      Διεύθυνση: ${propertyData.address}
      Περιοχή: ${propertyData.area}
      Τύπος ακινήτου: ${getPropertyTypeTranslation(propertyData.propertyType, language)}
      Έκταση: ${propertyData.size} τ.μ.
      Έτος κατασκευής: ${propertyData.constructionYear}
      Όροφος: ${propertyData.floor}
      Κατάσταση: ${getPropertyConditionTranslation(propertyData.condition, language)}
      Άδεια κατοικίας: ${propertyData.residentialPermit ? 'Ναι' : 'Όχι'}
      Ειδικά χαρακτηριστικά: ${featuresString || 'Κανένα'}
      Σκοπός Εκτίμησης: ${getAppraisalPurposeTranslation(propertyData.appraisalPurpose, language)}
      ${propertyData.additionalNotes ? `Επιπλέον σημειώσεις: ${propertyData.additionalNotes}` : ''}
      `
      : `
      Address: ${propertyData.address}
      Area: ${propertyData.area}
      Property Type: ${getPropertyTypeTranslation(propertyData.propertyType, language)}
      Size: ${propertyData.size} sq.m.
      Construction Year: ${propertyData.constructionYear}
      Floor: ${propertyData.floor}
      Condition: ${getPropertyConditionTranslation(propertyData.condition, language)}
      Residential Permit: ${propertyData.residentialPermit ? 'Yes' : 'No'}
      Special Features: ${featuresString || 'None'}
      Appraisal Purpose: ${getAppraisalPurposeTranslation(propertyData.appraisalPurpose, language)}
      ${propertyData.additionalNotes ? `Additional Notes: ${propertyData.additionalNotes}` : ''}
      `;

    // Create the prompt for the AI in the appropriate language
    const prompt = language === 'el'
      ? `Είσαι ένας επαγγελματίας εκτιμητής ακινήτων στην Ελλάδα. Χρησιμοποίησε τις παρακάτω πληροφορίες για να δημιουργήσεις μια επαγγελματική έκθεση εκτίμησης ενός ακινήτου. Η έκθεση θα πρέπει να είναι γραμμένη στα Ελληνικά και με επαγγελματικό ύφος.

      Πληροφορίες ακινήτου:
      ${propertyInfo}

      Παρακαλώ δημιούργησε μια έκθεση εκτίμησης που να περιλαμβάνει τα ακόλουθα μέρη (χρησιμοποίησε JSON μορφή για την απάντησή σου με τα ακόλουθα πεδία):
      
      1. "propertyDetails": Περιγραφή του ακινήτου βασισμένη στα στοιχεία
      2. "appraisalPurpose": Σκοπός της εκτίμησης
      3. "appraisalMethod": Μέθοδος εκτίμησης που χρησιμοποιήθηκε (συγκριτική μέθοδος, μέθοδος εισοδήματος, ή άλλη κατάλληλη)
      4. "marketAnalysis": Σύντομη ανάλυση της αγοράς ακινήτων στην περιοχή
      5. "valueEstimation": Εκτίμηση της αξίας του ακινήτου (εύρος τιμών)
      6. "conclusions": Συμπεράσματα και προτάσεις
      
      Το JSON πρέπει να περιέχει αυτά τα πεδία, με περιεχόμενο 1-2 παραγράφους για κάθε τμήμα. Χρησιμοποίησε ρεαλιστικές εκτιμήσεις τιμών για την ελληνική αγορά ακινήτων.`
      : `You are a professional property appraiser in Greece. Use the following information to create a professional property appraisal report. The report should be written in English with a professional tone.

      Property Information:
      ${propertyInfo}

      Please create an appraisal report that includes the following sections (use JSON format for your response with these fields):
      
      1. "propertyDetails": Description of the property based on the provided details
      2. "appraisalPurpose": Purpose of the appraisal
      3. "appraisalMethod": Appraisal method used (comparative method, income method, or other appropriate)
      4. "marketAnalysis": Brief analysis of the real estate market in the area
      5. "valueEstimation": Estimate of the property value (price range)
      6. "conclusions": Conclusions and recommendations
      
      The JSON should contain these fields, with 1-2 paragraphs of content for each section. Use realistic price estimations for the Greek real estate market.`;

    const requestBody = {
      model: MODEL,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    };

    console.log("Request Body:", JSON.stringify(requestBody, null, 2)); // Log the request body

    // Call the OpenRouter API to generate the report
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.text(); // Get the raw error response
      console.error("API Error Data:", errorData); // Log the raw error
      throw new Error(`API request failed with status ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    try {
      // Try to parse the JSON from the AI response
      // First, find where the JSON starts and ends
      const jsonStart = content.indexOf('{');
      const jsonEnd = content.lastIndexOf('}') + 1;

      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        const jsonString = content.substring(jsonStart, jsonEnd);
        const parsedResponse = JSON.parse(jsonString);

        // Create the final report with current date and appraiser info
        const now = new Date();
        const dateStr = now.toLocaleDateString(language === 'el' ? 'el-GR' : 'en-US');

        return {
          propertyDetails: parsedResponse.propertyDetails || '',
          appraisalPurpose: parsedResponse.appraisalPurpose || '',
          appraisalMethod: parsedResponse.appraisalMethod || '',
          marketAnalysis: parsedResponse.marketAnalysis || '',
          valueEstimation: parsedResponse.valueEstimation || '',
          conclusions: parsedResponse.conclusions || '',
          appraiser: {
            name: 'Παπαδόπουλος Ιωάννης',
            title: language === 'el' ? 'Εκτιμητής ακινήτων με έδρα την Ελλάδα' : 'Property Appraiser based in Greece',
            contact: '25410 67199',
            date: dateStr
          }
        };
      } else {
        throw new Error('JSON not found in response');
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
      toast.error(
        language === 'el'
          ? 'Σφάλμα κατά την ανάλυση της απάντησης AI.'
          : 'Error parsing AI response.'
      );

      // Fallback: return a structured but empty report
      return {
        propertyDetails: content,
        appraisalPurpose: '',
        appraisalMethod: '',
        marketAnalysis: '',
        valueEstimation: '',
        conclusions: '',
        appraiser: {
          name: 'Παπαδόπουλος Ιωάννης',
          title: language === 'el' ? 'Εκτιμητής ακινήτων με έδρα την Ελλάδα' : 'Property Appraiser based in Greece',
          contact: '25410 67199',
          date: new Date().toLocaleDateString(language === 'el' ? 'el-GR' : 'en-US')
        }
      };
    }
  } catch (error: any) {
    console.error('Error generating appraisal report:', error);
    toast.error(
      language === 'el'
        ? `Σφάλμα κατά τη δημιουργία της έκθεσης: ${error.message}`
        : `Error generating the report: ${error.message}`
    );
    throw error; // Re-throw to be caught by caller
  }
};
