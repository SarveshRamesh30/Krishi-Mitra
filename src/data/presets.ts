import { FarmerProfile } from "@/types";

export interface FarmerPreset {
  id: string;
  badge: string;
  badgeTa: string;
  title: string;
  titleTa: string;
  district: string;
  crop: string;
  rawText: string;
  rawTextTa: string;
  farmerProfile: FarmerProfile;
  expectedOutcome: string;
}

export const TN_FARMER_PRESETS: FarmerPreset[] = [
  {
    id: "thanjavur-paddy-blast",
    badge: "Cauvery Delta Crisis",
    badgeTa: "காவிரி டெல்டா அவசர நிலை",
    title: "Thanjavur: Paddy Leaf & Neck Blast with Heavy Moisture",
    titleTa: "தஞ்சாவூர்: நெல் பயிரில் குலை நோய் மற்றும் காப்பீட்டு உதவி",
    district: "Thanjavur",
    crop: "Paddy (Rice)",
    rawText: "I am Murugesan from Papanasam, Thanjavur. I have 3.5 acres of CR-1009 paddy crop in active tillering stage. Over the past 4 days, I noticed spindle-shaped brown spots with grey centers on leaves, and some plant neck portions are turning black. The humidity is very high after rain. I took a crop loan and need to know what medicine to spray, whether PMFBY crop insurance covers this, and when to sell.",
    rawTextTa: "நான் பாபநாசம் முருகேசன், தஞ்சாவூர். எனக்கு 3.5 ஏக்கர் நிலத்தில் சி.ஆர்-1009 நெல் பயிர் உள்ளது. கடந்த 4 நாட்களாக இலைகளில் கண் போன்ற பழுப்பு நிற புள்ளிகள் மற்றும் கழுத்து பகுதியில் கறுத்து அழுகல் தெரிகிறது. பயிர்க்கடன் வாங்கியுள்ளேன். என்ன மருந்து தெளிக்க வேண்டும், பயிர் காப்பீட்டுத் தொகை கிடைக்குமா, சந்தையில் எப்போது விற்கலாம் என்று ஆலோசனை வேண்டும்.",
    farmerProfile: {
      id: "farmer-tn-001",
      name: "Murugesan K.",
      phone: "+91 98421 78210",
      district: "Thanjavur",
      taluk: "Papanasam",
      landSizeAcres: 3.5,
      crop: "Paddy (Rice)",
      annualIncome: 180000,
      category: "Small (2.5-5 acres)",
      irrigationSource: "Canal (Cauvery)"
    },
    expectedOutcome: "Diagnoses Paddy Blast (96% confidence), recommends Tricyclazole + Pseudomonas, unlocks ₹41,650 in PMFBY & PM-KISAN, advises 7-day Mandi hold for +₹180/Q gain."
  },
  {
    id: "erode-turmeric-rot",
    badge: "Western Belt Export Crop",
    badgeTa: "மேற்கு மண்டல மஞ்சள் பயிர்",
    title: "Erode: Turmeric Rhizome Rot & Drip Subsidy Application",
    titleTa: "ஈரோடு: மஞ்சள் கிழங்கு அழுகல் மற்றும் 100% சொட்டு நீர் மானியம்",
    district: "Erode",
    crop: "Turmeric",
    rawText: "I am Selvaraj from Gobichettipalayam, Erode. I grow turmeric on 2.0 acres using borewell water. Since last week's water stagnation, lower leaves are turning yellow and the root clump smells foul and pulls out easily. I want to cure this rot immediately, apply for 100% micro-irrigation subsidy to stop waterlogging, and check the Erode turmeric mandi price.",
    rawTextTa: "நான் கோபிசெட்டிபாளையம் செல்வராஜ், ஈரோடு. 2 ஏக்கரில் மஞ்சள் பயிரிட்டுள்ளேன். கடந்த வாரம் பெய்த மழையால் தண்ணீர் தேங்கி இலைகள் மஞ்சள் நிறமாகி வேர்க்கிழங்கு அழுகி துர்நாற்றம் வீசுகிறது. இதற்கு சிகிச்சை என்ன? 100% சொட்டு நீர் பாசன மானியத்திற்கு எப்படி விண்ணப்பிப்பது? ஈரோடு சந்தை விலை நிலவரம் என்ன?",
    farmerProfile: {
      id: "farmer-tn-002",
      name: "Selvaraj M.",
      phone: "+91 94432 11980",
      district: "Erode",
      taluk: "Gobichettipalayam",
      landSizeAcres: 2.0,
      crop: "Turmeric",
      annualIncome: 140000,
      category: "Marginal (<2.5 acres)",
      irrigationSource: "Borewell"
    },
    expectedOutcome: "Identifies Pythium Rhizome Rot, prescribes Metalaxyl-Mancozeb drenching, matches 100% TN-MIP Drip Subsidy (₹84,000 value), highlights bullish Erode Mandi price ₹15,200/Q."
  },
  {
    id: "coimbatore-cotton-bollworm",
    badge: "Textile Valley Challenge",
    badgeTa: "கொங்கு மண்டல பருத்தி புழு",
    title: "Coimbatore: Cotton Pink Bollworm & KCC Credit Request",
    titleTa: "கோயம்புத்தூர்: பருத்தி இளஞ்சிவப்பு காய்ப்புழு & கிசான் கடன் அட்டை",
    district: "Coimbatore",
    crop: "Cotton",
    rawText: "I am Palanisamy from Pollachi, Coimbatore. On my 4.0 acres of MCU-5 cotton, flowers look rosette-shaped and don't open. Dropping bolls show small entry holes and stained fiber inside. I need pesticide recommendation with biological control, want to know my Kisan Credit Card limit, and whether to sell to Pollachi mandi immediately.",
    rawTextTa: "நான் பொள்ளாச்சி பழனிசாமி, கோயம்புத்தூர். 4 ஏக்கர் பருத்தி சாகுபடியில் பூக்கள் ரோஜா பூ போல சுருங்கி விரியாமல் உதிர்கின்றன. காய்களில் துளைகள் மற்றும் உள்ளே புழுக்கள் உள்ளன. உடனடி பூச்சிக்கட்டுப்பாடு, கிசான் கிரெடிட் கார்டு கடன் மற்றும் பொள்ளாச்சி சந்தை விற்பனை ஆலோசனை வேண்டும்.",
    farmerProfile: {
      id: "farmer-tn-003",
      name: "Palanisamy V.",
      phone: "+91 97890 43521",
      district: "Coimbatore",
      taluk: "Pollachi",
      landSizeAcres: 4.0,
      crop: "Cotton",
      annualIncome: 220000,
      category: "Small (2.5-5 acres)",
      irrigationSource: "Borewell"
    },
    expectedOutcome: "Detects Pink Bollworm (94%), prescribes Pheromone Traps + Emamectin Benzoate, matches ₹1,60,000 KCC limit at 4% interest, advises immediate sale due to bearish outlook."
  },
  {
    id: "theni-banana-bbtv",
    badge: "Horticulture Hub Alert",
    badgeTa: "தேனி வாழை தோட்ட நோய்",
    title: "Theni: Banana Bunchy Top Virus & Dryland / SMAM Machinery",
    titleTa: "தேனி: வாழை முடிச்சு நோய் கட்டுப்பாடு & அரசு இயந்திர மானியம்",
    district: "Theni",
    crop: "Banana (Robusta/Nendran)",
    rawText: "I am Soundararajan from Chinnamanur, Theni. My 1.5 acre Grand Naine banana crop has leaves clustered tightly at the top with dark green Morse code lines on veins. Growth has completely stopped. What is this virus, how do I save healthy trees, and how do I get a power sprayer subsidy under SMAM?",
    rawTextTa: "நான் சின்னமனூர் சௌந்தரராஜன், தேனி. 1.5 ஏக்கர் வாழையில் இலைகள் மேல்நோக்கி கொத்தாக வளர்ந்து நரம்புகளில் கரும்பச்சை கோடுகள் உள்ளன. மர வளர்ச்சி நின்றுவிட்டது. இந்த கொத்து முடி நோயை எப்படி கட்டுப்படுத்துவது? பவர் ஸ்ப்ரேயர் இயந்திர மானியம் பெற வழி என்ன?",
    farmerProfile: {
      id: "farmer-tn-004",
      name: "Soundararajan S.",
      phone: "+91 94862 33419",
      district: "Theni",
      taluk: "Chinnamanur",
      landSizeAcres: 1.5,
      crop: "Banana (Robusta/Nendran)",
      annualIncome: 125000,
      category: "Marginal (<2.5 acres)",
      irrigationSource: "Drip/Sprinkler"
    },
    expectedOutcome: "Identifies Banana Bunchy Top Virus (BBTV) and Aphid vector, directs rogueing + Imidacloprid, matches SMAM 50% power sprayer subsidy + Kalaignar scheme seed kits."
  }
];
