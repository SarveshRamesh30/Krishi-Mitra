import jsPDF from 'jspdf';
import { OrchestratorOutput, FarmerProfile } from '@/types';

export function generateFarmerActionPlanPDF(
  output: OrchestratorOutput,
  profile: FarmerProfile
) {
  const doc = new jsPDF();
  const primaryGreen = [21, 128, 61]; // #15803d
  const darkSlate = [30, 41, 59];

  // Header Banner
  doc.setFillColor(21, 128, 61);
  doc.rect(0, 0, 210, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('KRISHI MITRA (விவசாயத் தோழன்)', 14, 15);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Autonomous Multi-Agent Agronomic Action Plan & Welfare Dossier', 14, 23);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')} | Ref: KM-TN-${profile.district.toUpperCase()}-${Date.now().toString().slice(-4)}`, 14, 28);

  // Section 1: Farmer & Field Profile
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('1. FARMER & LANDHOLDING PROFILE', 14, 42);

  doc.setDrawColor(200, 200, 200);
  doc.line(14, 44, 196, 44);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Farmer Name: ${profile.name}`, 14, 52);
  doc.text(`District / Taluk: ${profile.district} / ${profile.taluk || 'Local Block'}`, 80, 52);
  doc.text(`Land Area: ${profile.landSizeAcres} Acres (${profile.category})`, 145, 52);

  doc.text(`Crop: ${output.intake.crop}`, 14, 58);
  doc.text(`Irrigation Source: ${profile.irrigationSource}`, 80, 58);
  doc.text(`Estimated Pathology Urgency: ${output.diagnosis.severity.toUpperCase()}`, 145, 58);

  // Section 2: Crop Pathology Diagnosis & Prescription
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('2. TNAU AGRONOMIC DIAGNOSIS & PRESCRIPTION', 14, 72);
  doc.line(14, 74, 196, 74);

  doc.setFontSize(10);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.text(`Diagnosed Disease: ${output.diagnosis.diseaseName}`, 14, 82);
  doc.text(`Pathogen: ${output.diagnosis.pathogen} | Confidence: ${output.diagnosis.confidenceScore}%`, 14, 88);

  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  const chemical = output.diagnosis.chemicalTreatments[0];
  if (chemical) {
    doc.setFont('helvetica', 'bold');
    doc.text(`[Chemical Rx] ${chemical.title}:`, 14, 96);
    doc.setFont('helvetica', 'normal');
    doc.text(`Dosage: ${chemical.dosage || 'As per package'} | Schedule: ${chemical.schedule}`, 20, 102);
  }

  const organic = output.diagnosis.organicTreatments[0];
  if (organic) {
    doc.setFont('helvetica', 'bold');
    doc.text(`[Organic Bio-Agent] ${organic.title}:`, 14, 110);
    doc.setFont('helvetica', 'normal');
    doc.text(`Dosage: ${organic.dosage || 'Standard foliar rate'} | Schedule: ${organic.schedule}`, 20, 116);
  }

  // Section 3: Matched Government Subsidies & Benefits
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('3. GOVERNMENT SCHEMES & SUBSIDY ENTITLEMENTS', 14, 130);
  doc.line(14, 132, 196, 132);

  doc.setFontSize(10);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.text(`Total Estimated Financial Benefit: INR ${output.schemes.totalEstimatedBenefitInr.toLocaleString('en-IN')}`, 14, 140);

  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.setFontSize(9);
  let schemeY = 148;
  output.schemes.matchedSchemes.slice(0, 3).forEach((s, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${idx + 1}. ${s.name} (${s.provider}) - Entitlement: INR ${s.estimatedBenefitInr.toLocaleString('en-IN')}`, 14, schemeY);
    doc.setFont('helvetica', 'normal');
    doc.text(`Documents: ${s.requiredDocuments.slice(0, 2).join(', ')} | Portal: ${s.portalUrl}`, 20, schemeY + 5);
    schemeY += 12;
  });

  // Section 4: Mandi Market Intelligence & Selling Plan
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('4. MANDI MARKET INTELLIGENCE & VERDICT', 14, 188);
  doc.line(14, 190, 196, 190);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`AI Recommendation: ${output.market.recommendation.replace(/_/g, ' ')}`, 14, 198);
  doc.text(`Target Mandi: ${output.market.bestMandi.name} (Current: INR ${output.market.bestMandi.currentPrice}/Quintal | MSP Floor: INR ${output.market.mspPerQuintal}/Q)`, 14, 204);
  doc.text(`Market Outlook: ${output.market.priceOutlook.toUpperCase()} | Estimated Upside Gain: INR ${output.market.potentialRevenueGainInr.toLocaleString('en-IN')}`, 14, 210);

  // Section 5: 7-Day Priority Action Schedule
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('5. 7-DAY ACTION PLAN CHECKLIST', 14, 224);
  doc.line(14, 226, 196, 226);

  doc.setFontSize(8.5);
  let planY = 234;
  output.weeklyActionPlan.slice(0, 4).forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`[ ] ${item.day} [${item.priority}]: ${item.action}`, 14, planY, { maxWidth: 180 });
    planY += 10;
  });

  // Footer / Verification Notice
  doc.setFillColor(245, 245, 245);
  doc.rect(0, 275, 210, 22, 'F');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  doc.text('Issued by Krishi Mitra Autonomous Multi-Agent AI Engine | Certified Agronomic Cross-Reference: TNAU / ICAR Knowledge Repository', 14, 282);
  doc.text('Farmer may present this document directly at the local Agricultural Extension Center, Tahsildar Office, or Bank Branch.', 14, 287);

  // Save the PDF
  const filename = `Krishi_Mitra_Action_Plan_${profile.name.replace(/\s+/g, '_')}.pdf`;
  doc.save(filename);
}
