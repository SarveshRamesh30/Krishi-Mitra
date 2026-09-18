import { DiseaseKnowledgeItem } from "@/types";

export const TN_CROP_DISEASES: DiseaseKnowledgeItem[] = [
  {
    id: "paddy-blast",
    crop: "Paddy (Rice)",
    diseaseName: "Paddy Blast (Leaf & Neck Blast)",
    diseaseNameTamil: "நெல் குலை நோய் (இலை மற்றும் கழுத்துக் குலை நோய்)",
    pathogen: "Magnaporthe oryzae (Pyricularia oryzae)",
    favorableConditions: "High relative humidity (>90%), night temp 19-23°C, excessive nitrogen fertilizer application, cloudy drizzle weather.",
    symptoms: [
      "Spindle-shaped or eye-shaped lesions on leaves with brown borders and grey/ash-white centers",
      "Blackening and rotting at the neck of the panicle (neck blast)",
      "Chaffy / unfilled grains with poor grain setting",
      "Seedling burning and lodging in severe nursery infestations"
    ],
    severityDefault: "critical",
    treatments: [
      {
        type: "organic",
        title: "Pseudomonas fluorescens Spray",
        titleTa: "சூடோமோனாஸ் ஃப்ளூரசன்ஸ் தெளிப்பு",
        description: "Foliar spray of liquid bio-control formulation to suppress fungal hyphae growth and induce systemic resistance.",
        descriptionTa: "இலைகளில் திரவ உயிரியல் பூஞ்சாணக் கட்டுப்பாட்டை தெளித்து நோய் எதிர்ப்பு சக்தியைத் தூண்டவும்.",
        dosage: "10 g/litre or 2.5 kg/ha in 500 litres of water",
        schedule: "Apply in early morning or late evening; repeat after 7 days if weather remains humid.",
        costEstimateInr: 350,
        safetyNote: "Compatible with organic certification; safe for beneficial insects."
      },
      {
        type: "organic",
        title: "Neem Seed Kernel Extract (NSKE 5%)",
        titleTa: "வேப்பங்கொட்டை சாறு 5%",
        description: "Freshly prepared 5% aqueous extract sprayed over the crop foliage to inhibit spore germination.",
        descriptionTa: "பூஞ்சான் வித்துக்கள் முளைப்பதைத் தடுக்க 5% வேப்பங்கொட்டை சாறு தெளிக்கவும்.",
        dosage: "50 g crushed kernel per litre of water",
        schedule: "Spray immediately upon spotting first eye-shaped lesions.",
        costEstimateInr: 200
      },
      {
        type: "chemical",
        title: "Tricyclazole 75% WP (TNAU Gold Standard)",
        titleTa: "ட்ரைசைக்ளசோல் 75% WP",
        description: "Systemic fungicide specifically targeting blast melanin biosynthesis; highly effective for panicle neck blast prevention.",
        descriptionTa: "நெல் குலை நோய்க்கான தீவிர ஊடுருவும் பூஞ்சாணக்கொல்லி.",
        dosage: "0.6 g/litre of water (120 g per acre)",
        schedule: "1st spray at boot leaf stage; 2nd spray at 5% panicle emergence.",
        costEstimateInr: 680,
        safetyNote: "Wear protective gloves and mask. Maintain 15-day pre-harvest interval (PHI)."
      },
      {
        type: "cultural",
        title: "Nitrogen Management & Water Regulation",
        titleTa: "தழைச்சத்து மேலாண்மை மற்றும் நீர் ஒழுங்குமுறை",
        description: "Split nitrogen fertilizer into 3 equal doses; avoid top-dressing during rainy spells. Apply 50 kg/ha extra Potash (MOP) to harden leaf tissues.",
        descriptionTa: "யூரியா உரத்தை ஒரே நேரத்தில் இடாமல் மூன்று தவணைகளாக பிரிக்கவும். பொட்டாஷ் உரம் 50 கிலோ இடவும்.",
        schedule: "Immediate action during active tillering stage.",
        costEstimateInr: 450
      }
    ],
    preventionAdvisory: "Seed treatment with Trichoderma viride @ 4g/kg seed or Carbendazim @ 2g/kg seed before sowing. Grow resistant varieties like ADT 43, TPS 5, or CO 51 in endemic Cauvery delta pockets.",
    tnauAdvisoryUrl: "https://agritech.tnau.ac.in/crop_protection/crop_prot_crop%20diseases_cereals_paddy_1.html"
  },
  {
    id: "cotton-bollworm",
    crop: "Cotton",
    diseaseName: "Pink Bollworm Infestation",
    diseaseNameTamil: "பருத்தி இளஞ்சிவப்பு காய்ப்புழு தாக்குதல்",
    pathogen: "Pectinophora gossypiella (Saunders)",
    favorableConditions: "Continuous warm dry climate (28-34°C) with intermittent light showers during square and flowering stage.",
    symptoms: [
      "Rosetted flowers ('rosette bloom') where petals twist and fail to open normally",
      "Premature shedding of squares, flowers, and small bolls",
      "Burrowing entry holes sealed with frass; larvae feeding inside seeds and stained lint",
      "Premature, deformed boll opening with stained yellow/brown fibre"
    ],
    severityDefault: "high",
    treatments: [
      {
        type: "organic",
        title: "Pheromone Traps Installation (Gossyplure)",
        titleTa: "மோகினி இனக்கவர்ச்சி பொறி அமைத்தல்",
        description: "Install sleeve traps with synthetic pheromone septa to monitor moth activity and mass trap adult males.",
        descriptionTa: "ஆண் அந்துப்பூச்சிகளை கவர்ந்து அழிக்க ஏக்கருக்கு 8 முதல் 10 இனக்கவர்ச்சி பொறிகளை அமைக்கவும்.",
        dosage: "8 to 10 traps per acre placed 1 foot above canopy",
        schedule: "Deploy immediately; replace pheromone lure every 21 days.",
        costEstimateInr: 400,
        safetyNote: "Zero chemical residue; completely safe for honeybees and natural predators."
      },
      {
        type: "organic",
        title: "Trichogramma bactrae Release",
        titleTa: "ட்ரைக்கோகிரம்மா முட்டை ஒட்டுண்ணி விடுதல்",
        description: "Egg parasitoid wasp cards stapled on lower leaf surfaces to parasitize pink bollworm eggs before hatching.",
        descriptionTa: "புழுக்கள் முட்டையிலிருந்து வெளிவருவதற்கு முன்பே அழிக்க டிரைக்கோ கார்டுகளைப் பொருத்தவும்.",
        dosage: "3 Trichocards (60,000 parasitized eggs) per acre",
        schedule: "Release 3 times at 10-day intervals from 45 days after sowing.",
        costEstimateInr: 300
      },
      {
        type: "chemical",
        title: "Emamectin Benzoate 5% SG or Chlorantraniliprole 18.5% SC",
        titleTa: "எமாமெக்டின் பென்சோயேட் 5% SG",
        description: "Targeted semi-synthetic avermectin with rapid stomach action against lepidopteran larvae within unopened bolls.",
        descriptionTa: "காய்களைத் துளைக்கும் புழுக்களுக்கு எதிரான நவீன பூச்சிக்கொல்லி.",
        dosage: "0.4 g/litre (80 g/acre) for Emamectin or 0.3 ml/litre for Chlorantraniliprole",
        schedule: "Spray when rosette flowers exceed 5% or ETL of 8 moths/trap/day is recorded.",
        costEstimateInr: 750,
        safetyNote: "Do not tank-mix with sulfur or copper compounds."
      }
    ],
    preventionAdvisory: "Destroy previous crop residues and stubbles. Avoid stacking cotton stalks near fields. Maintain synchronous planting in the cluster.",
    tnauAdvisoryUrl: "https://agritech.tnau.ac.in/crop_protection/crop_prot_crop_pest_fibre_cotton_1.html"
  },
  {
    id: "turmeric-rhizome-rot",
    crop: "Turmeric",
    diseaseName: "Rhizome Rot & Leaf Blotch",
    diseaseNameTamil: "மஞ்சள் கிழங்கு அழுகல் மற்றும் இலைப்புள்ளி நோய்",
    pathogen: "Pythium aphanidermatum / Taphrina maculans",
    favorableConditions: "Waterlogging, poor soil drainage, clayey soil, continuous monsoon rains with warm soil temperature (25-30°C).",
    symptoms: [
      "Initial yellowing of lower leaf margins which progresses inward to central leaves",
      "Softening and foul-smelling rotting of the collar region and underground mother rhizome",
      "Pseudo-stem easily pulls out from the root zone with slimy decomposed base",
      "Severe stunting and sudden drying of clumps in field patches"
    ],
    severityDefault: "critical",
    treatments: [
      {
        type: "organic",
        title: "Trichoderma viride Soil Drenching + Farm Yard Manure",
        titleTa: "டிரைக்கோடெர்மா விரிடி + மக்கிய தொழு உரம்",
        description: "Enriched bio-fungicide culture multiplied in 50 kg well-rotted FYM and neem cake applied at root zones.",
        descriptionTa: "மக்கிய தொழு உரத்துடன் டிரைக்கோடெர்மா விரிடி கலந்து வேர்ப்பகுதியில் இடவும்.",
        dosage: "2.5 kg Trichoderma + 50 kg FYM + 25 kg Neem cake per acre",
        schedule: "Drench thoroughly into base of infected plants and surrounding 2-meter radius.",
        costEstimateInr: 520
      },
      {
        type: "chemical",
        title: "Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ)",
        titleTa: "மெட்டலாக்சில் + மேன்கோசெப் கலவை வேர் நனைத்தல்",
        description: "Dual systemic and contact oomycete fungicide for aggressive root and rhizome drenching.",
        descriptionTa: "கிழங்கு அழுகலைத் தடுக்கும் தீவிர பூஞ்சாணக்கொல்லி வேர் நனைத்தல்.",
        dosage: "2.5 g/litre of water (drench 200-300 ml per plant clump)",
        schedule: "Drench immediately around root zone; repeat after 14 days if wet conditions persist.",
        costEstimateInr: 890,
        safetyNote: "Clear drainage channels immediately to prevent standing water."
      }
    ],
    preventionAdvisory: "Use certified disease-free seed rhizomes. Treat seed rhizomes with Metalaxyl @ 3g/L for 30 minutes before planting. Adopt raised bed planting in Erode/Salem zones.",
    tnauAdvisoryUrl: "https://agritech.tnau.ac.in/crop_protection/crop_prot_crop%20diseases_spices_turmeric.html"
  },
  {
    id: "sugarcane-red-rot",
    crop: "Sugarcane",
    diseaseName: "Sugarcane Red Rot",
    diseaseNameTamil: "கரும்பு செவ்வழுகல் நோய்",
    pathogen: "Colletotrichum falcatum",
    favorableConditions: "Waterlogged soils, cultivation of susceptible varieties (e.g. CoC 671), flood conditions, alkaline soils.",
    symptoms: [
      "Withering and drooping of crown leaves from the 3rd and 4th leaf downwards",
      "Longitudinal splitting of cane reveals blood-red internal tissues with characteristic white cross-bands",
      "Sour alcohol/fermented odor emanating from split stalks",
      "Stalk becomes hollow, light in weight, and pith shrinks"
    ],
    severityDefault: "critical",
    treatments: [
      {
        type: "cultural",
        title: "Immediate Rogueing & Field Sanitation",
        titleTa: "பாதிக்கப்பட்ட கரும்புகளை அகற்றி அழித்தல்",
        description: "Uproot affected clumps along with underground root systems, burn outside field, and drench spot with 1% Bordeaux mixture.",
        descriptionTa: "பாதிக்கப்பட்ட கரும்புகளை வேரோடு பிடுங்கி எரித்து, அந்த இடத்தில் போர்டோ கலவை ஊற்றவும்.",
        schedule: "Execute immediately to halt subterranean fungal spore transfer.",
        costEstimateInr: 250
      },
      {
        type: "chemical",
        title: "Carbendazim 50% WP Sett Treatment & Spray",
        titleTa: "கார்பெண்டாசிம் 50% WP",
        description: "Systemic benzimidazole fungicide to arrest spore transmission in standing crop nodes.",
        descriptionTa: "கரும்பு கணுக்களில் பூஞ்சான் பரவுவதைத் தடுக்க தெளிக்கவும்.",
        dosage: "1 g/litre of water (200 g/acre)",
        schedule: "Spray at the base of stalks and irrigate immediately.",
        costEstimateInr: 450
      }
    ],
    preventionAdvisory: "Adopt crop rotation with paddy or sunnhemp. Plant red-rot resistant varieties such as Co 86032, Co 0212, or CoG 6. Practice hot water sett treatment at 52°C for 30 mins.",
    tnauAdvisoryUrl: "https://agritech.tnau.ac.in/crop_protection/crop_prot_crop_diseases_commercial_sugarcane_1.html"
  },
  {
    id: "banana-bunchy-top",
    crop: "Banana (Robusta/Nendran)",
    diseaseName: "Banana Bunchy Top Virus (BBTV)",
    diseaseNameTamil: "வாழை முடிச்சு / கொத்து முடி நோய்",
    pathogen: "Banana bunchy top babuvirus (Vector: Pentalonia nigronervosa aphid)",
    favorableConditions: "High banana aphid vector density, uncertified sucker planting, congested orchards in Theni/Tirunelveli.",
    symptoms: [
      "Leaves become progressively smaller, narrow, erect, and crowded at the pseudostem apex creating a 'bunchy' appearance",
      "Dark green 'dot-dash' or 'Morse code' streaks along the leaf veins and petiole",
      "Pronounced marginal chlorosis (yellowing) and upward curling of leaves",
      "Severely stunted plants that fail to produce bunches or yield unmarketable deformed fingers"
    ],
    severityDefault: "high",
    treatments: [
      {
        type: "cultural",
        title: "Eradication of Infected Mats (Kerosene/Glyphosate Injection)",
        titleTa: "பாதிக்கப்பட்ட வாழைகளை வேரோடு அழித்தல்",
        description: "Inject 4 ml of 2,4-D or pour 20 ml kerosene into pseudostem to kill the viral reservoir tree completely.",
        descriptionTa: "வைரஸ் மற்ற மரங்களுக்கு பரவாமல் இருக்க பாதிக்கப்பட்ட மரத்தை அழிக்கவும்.",
        schedule: "Immediate destruction within 24 hours of confirmation.",
        costEstimateInr: 150
      },
      {
        type: "chemical",
        title: "Vector Control with Acetamiprid 20% SP / Imidacloprid 17.8% SL",
        titleTa: "வாழை அசுவினி பூச்சி கட்டுப்பாடு",
        description: "Target foliar spray to leaf axils and heart leaves to eliminate the banana aphid (Pentalonia nigronervosa) vector.",
        descriptionTa: "வாழை அசுவினியைக் கட்டுப்படுத்த இலை இடுக்குகளில் தெளிக்கவும்.",
        dosage: "Imidacloprid @ 0.3 ml/litre or Acetamiprid @ 0.5 g/litre",
        schedule: "Spray all surrounding healthy plants in a 50-meter radius.",
        costEstimateInr: 420,
        safetyNote: "Direct the spray specifically into the crown and leaf whorls."
      }
    ],
    preventionAdvisory: "Use only virus-indexed tissue culture banana plantlets from accredited TNAU / NRCB labs. Inspect suckers for aphids prior to planting.",
    tnauAdvisoryUrl: "https://agritech.tnau.ac.in/crop_protection/crop_prot_crop%20diseases_fruits_banana_1.html"
  },
  {
    id: "groundnut-tikka",
    crop: "Groundnut",
    diseaseName: "Tikka Leaf Spot (Early & Late Leaf Spot)",
    diseaseNameTamil: "நிலக்கடலை டிக்கா இலைப்புள்ளி நோய்",
    pathogen: "Cercospora arachidicola (Early) & Phaeoisariopsis personata (Late)",
    favorableConditions: "Prolonged high humidity, heavy morning dews, temperatures between 25-30°C in Cuddalore and Tiruvannamalai belts.",
    symptoms: [
      "Circular brown to dark brown necrotic spots on upper leaf surfaces surrounded by a bright yellow halo",
      "Premature leaf yellowing and severe defoliation leaving bare stems",
      "Reduced pod filling, shriveled kernels, and weakened peg attachment causing pods to break in soil during harvest"
    ],
    severityDefault: "moderate",
    treatments: [
      {
        type: "organic",
        title: "Panchagavya 3% + Pseudomonas fluorescens Spray",
        titleTa: "பஞ்சகவ்யா 3% + சூடோமோனாஸ் தெளிப்பு",
        description: "Traditional bio-stimulant and bio-antagonist spray to strengthen cuticle thickness and suppress fungal lesions.",
        descriptionTa: "இலைகளுக்கு ஊட்டமளித்து பூஞ்சானை எதிர்க்க பஞ்சகவ்யா தெளிக்கவும்.",
        dosage: "30 ml Panchagavya + 10 g Pseudomonas per litre of water",
        schedule: "Apply at 35 and 50 days after sowing.",
        costEstimateInr: 300
      },
      {
        type: "chemical",
        title: "Hexaconazole 5% SC or Mancozeb 75% WP",
        titleTa: "ஹெக்சாகோனசோல் 5% SC / மேன்கோசெப்",
        description: "Broad spectrum triazole ergosterol biosynthesis inhibitor providing both curative and preventative protection.",
        descriptionTa: "டிக்கா இலைப்புள்ளியைக் கட்டுப்படுத்தும் தீவிர பூஞ்சாணக்கொல்லி.",
        dosage: "Hexaconazole @ 2 ml/litre or Mancozeb @ 2 g/litre",
        schedule: "First spray at 40 days after sowing; repeat 15 days later if spots persist.",
        costEstimateInr: 540
      }
    ],
    preventionAdvisory: "Seed treatment with Carbendazim @ 2g/kg or Trichoderma viride @ 4g/kg seed. Avoid sowing volunteer crops in adjacent fields.",
    tnauAdvisoryUrl: "https://agritech.tnau.ac.in/crop_protection/crop_prot_crop%20diseases_oilseeds_groundnut_1.html"
  }
];
