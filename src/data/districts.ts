export interface DistrictInfo {
  id: string;
  name: string;
  nameTamil: string;
  zone: string;
  soilTypes: string[];
  majorCrops: string[];
  majorMandis: string[];
  averageRainfallMm: number;
}

export const TN_DISTRICTS: DistrictInfo[] = [
  {
    id: "thanjavur",
    name: "Thanjavur",
    nameTamil: "தஞ்சாவூர்",
    zone: "Cauvery Delta Zone",
    soilTypes: ["Alluvial Soil", "Clay Loam"],
    majorCrops: ["Paddy (Rice)", "Blackgram", "Sugarcane", "Coconut"],
    majorMandis: ["Thanjavur APMC", "Kumbakonam Regulated Market", "Papanasam Market"],
    averageRainfallMm: 938,
  },
  {
    id: "erode",
    name: "Erode",
    nameTamil: "ஈரோடு",
    zone: "Western Agro-Climatic Zone",
    soilTypes: ["Red Loam", "Black Soil"],
    majorCrops: ["Turmeric", "Sugarcane", "Paddy", "Tapioca", "Maize"],
    majorMandis: ["Erode Agricultural Producers Co-op", "Perundurai Regulated Market", "Gobichettipalayam Market"],
    averageRainfallMm: 710,
  },
  {
    id: "madurai",
    name: "Madurai",
    nameTamil: "மதுரை",
    zone: "Southern Agro-Climatic Zone",
    soilTypes: ["Black Cotton Soil", "Red Sandy Loam"],
    majorCrops: ["Paddy", "Jasmine", "Millets", "Cotton", "Pulses"],
    majorMandis: ["Madurai Mattuthavani Central Market", "Usilampatti Market", "Melur Market"],
    averageRainfallMm: 840,
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    nameTamil: "கோயம்புத்தூர்",
    zone: "Western Agro-Climatic Zone",
    soilTypes: ["Black Soil", "Red Gravelly Soil"],
    majorCrops: ["Cotton", "Maize", "Coconut", "Tomato", "Sugarcane"],
    majorMandis: ["Pollachi Regulated Market", "Coimbatore MGR Wholesale Market", "Kinathukadavu Market"],
    averageRainfallMm: 650,
  },
  {
    id: "theni",
    name: "Theni",
    nameTamil: "தேனி",
    zone: "Southern Western Ghats Zone",
    soilTypes: ["Red Sandy Loam", "Alluvial"],
    majorCrops: ["Banana (Robusta/Nendran)", "Cotton", "Grapes", "Sugarcane", "Cardamom"],
    majorMandis: ["Chinnamanur Banana Market", "Cumbum Fruit Market", "Theni Regulated Market"],
    averageRainfallMm: 855,
  },
  {
    id: "cuddalore",
    name: "Cuddalore",
    nameTamil: "கடலூர்",
    zone: "North Eastern Coastal Zone",
    soilTypes: ["Coastal Alluvium", "Red Ferrallitic"],
    majorCrops: ["Groundnut", "Cashew", "Paddy", "Sugarcane", "Jackfruit"],
    majorMandis: ["Panruti Cashew/Jackfruit Market", "Cuddalore OT Market", "Vridhachalam Market"],
    averageRainfallMm: 1210,
  },
  {
    id: "salem",
    name: "Salem",
    nameTamil: "சேலம்",
    zone: "North Western Agro-Climatic Zone",
    soilTypes: ["Red Loamy", "Black Soil"],
    majorCrops: ["Tapioca", "Mango", "Turmeric", "Paddy", "Cotton"],
    majorMandis: ["Salem Shevapet Market", "Attur Tapioca Sago Market", "Mecheri Market"],
    averageRainfallMm: 980,
  },
  {
    id: "tirunelveli",
    name: "Tirunelveli",
    nameTamil: "திருநெல்வேலி",
    zone: "Southern Agro-Climatic Zone",
    soilTypes: ["Deep Red Soil", "River Alluvial"],
    majorCrops: ["Paddy", "Banana", "Pulses", "Chillies", "Coconut"],
    majorMandis: ["Tirunelveli Town Market", "Ambasamudram Market", "Sankarankovil Market"],
    averageRainfallMm: 814,
  }
];
