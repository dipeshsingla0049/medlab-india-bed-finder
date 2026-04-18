export interface Hospital {
  id: number;
  name: string;
  city: string;
  location: string;
  rating: number;
  reviews: number;
  diseases: string[];
  generalBeds: number;
  icuBeds: number;
  contact: string;
  hours: string;
  price: 'Government' | 'Private' | 'Premium';
  image: string;
}

const hospitalImages = [
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580281657527-47f249e8f4df?w=600&h=400&fit=crop',
];

// 18 curated hospitals (kept from original)
const curated: Omit<Hospital, 'image'>[] = [
  { id: 1, name: "AIIMS Delhi", city: "Delhi", location: "Ansari Nagar, New Delhi", rating: 4.8, reviews: 2847, diseases: ["Cardiology","Neurology","Oncology","Orthopedics"], generalBeds: 42, icuBeds: 8, contact: "+91 11-2658-8500", hours: "24/7 Emergency", price: "Government" },
  { id: 2, name: "Apollo Hospital", city: "Mumbai", location: "Navi Mumbai, Maharashtra", rating: 4.6, reviews: 1923, diseases: ["Cardiology","Gastroenterology","Pulmonology"], generalBeds: 35, icuBeds: 3, contact: "+91 22-3350-3350", hours: "Mon-Sat 8AM–9PM", price: "Premium" },
  { id: 3, name: "Fortis Hospital", city: "Bangalore", location: "Bannerghatta Road, Bangalore", rating: 4.5, reviews: 1654, diseases: ["Orthopedics","Nephrology","Urology"], generalBeds: 28, icuBeds: 12, contact: "+91 80-6621-4444", hours: "24/7 Emergency", price: "Private" },
  { id: 4, name: "CMC Vellore", city: "Chennai", location: "Vellore, Tamil Nadu", rating: 4.9, reviews: 3201, diseases: ["Oncology","Hematology","Neurosurgery","Dermatology"], generalBeds: 55, icuBeds: 15, contact: "+91 416-228-1000", hours: "24/7 Emergency", price: "Government" },
  { id: 5, name: "Medanta Hospital", city: "Delhi", location: "Sector 38, Gurugram", rating: 4.7, reviews: 2156, diseases: ["Cardiac Surgery","Liver Transplant","Robotics"], generalBeds: 18, icuBeds: 5, contact: "+91 124-414-1414", hours: "Mon-Sat 9AM–8PM", price: "Premium" },
  { id: 6, name: "NIMHANS", city: "Bangalore", location: "Hosur Road, Bangalore", rating: 4.7, reviews: 1876, diseases: ["Neurology","Psychiatry","Neurosurgery"], generalBeds: 38, icuBeds: 0, contact: "+91 80-2699-5000", hours: "Mon-Sat 9AM–5PM", price: "Government" },
  { id: 7, name: "Kokilaben Hospital", city: "Mumbai", location: "Andheri West, Mumbai", rating: 4.4, reviews: 1432, diseases: ["Cardiology","Oncology","Pediatrics"], generalBeds: 22, icuBeds: 7, contact: "+91 22-3066-6666", hours: "24/7 Emergency", price: "Premium" },
  { id: 8, name: "PGIMER Chandigarh", city: "Delhi", location: "Sector 12, Chandigarh", rating: 4.6, reviews: 2034, diseases: ["Hepatology","Gastroenterology","ENT"], generalBeds: 47, icuBeds: 11, contact: "+91 172-274-6018", hours: "24/7 Emergency", price: "Government" },
  { id: 9, name: "Manipal Hospital", city: "Bangalore", location: "HAL Airport Road, Bangalore", rating: 4.3, reviews: 1287, diseases: ["Orthopedics","Cardiology","Pulmonology"], generalBeds: 15, icuBeds: 4, contact: "+91 80-2502-4444", hours: "Mon-Sat 8AM–8PM", price: "Private" },
  { id: 10, name: "Narayana Health", city: "Bangalore", location: "Bommasandra, Bangalore", rating: 4.5, reviews: 1765, diseases: ["Cardiac Surgery","Nephrology","Oncology"], generalBeds: 60, icuBeds: 18, contact: "+91 80-7122-2222", hours: "24/7 Emergency", price: "Private" },
  { id: 11, name: "Tata Memorial Hospital", city: "Mumbai", location: "Parel, Mumbai", rating: 4.8, reviews: 2543, diseases: ["Oncology","Radiation Therapy","Surgical Oncology"], generalBeds: 32, icuBeds: 6, contact: "+91 22-2417-7000", hours: "Mon-Sat 9AM–5PM", price: "Government" },
  { id: 12, name: "Max Super Speciality", city: "Delhi", location: "Saket, New Delhi", rating: 4.4, reviews: 1654, diseases: ["Neurology","Cardiology","Orthopedics","Urology"], generalBeds: 25, icuBeds: 9, contact: "+91 11-2651-5050", hours: "24/7 Emergency", price: "Private" },
  { id: 13, name: "Global Hospital", city: "Hyderabad", location: "Lakdi-ka-pul, Hyderabad", rating: 4.3, reviews: 987, diseases: ["Liver Transplant","Nephrology","Gastroenterology"], generalBeds: 20, icuBeds: 2, contact: "+91 40-3044-5000", hours: "Mon-Sat 9AM–7PM", price: "Private" },
  { id: 14, name: "Ruby Hall Clinic", city: "Pune", location: "Sasoon Road, Pune", rating: 4.2, reviews: 876, diseases: ["Cardiology","Orthopedics","Pediatrics"], generalBeds: 30, icuBeds: 10, contact: "+91 20-2616-3391", hours: "24/7 Emergency", price: "Private" },
  { id: 15, name: "SMS Hospital", city: "Jaipur", location: "JLN Marg, Jaipur", rating: 4.1, reviews: 1123, diseases: ["General Medicine","Trauma","Orthopedics"], generalBeds: 65, icuBeds: 14, contact: "+91 141-256-0291", hours: "24/7 Emergency", price: "Government" },
  { id: 16, name: "SSKM Hospital", city: "Kolkata", location: "AJC Bose Road, Kolkata", rating: 4.0, reviews: 945, diseases: ["General Medicine","Surgery","Gynecology"], generalBeds: 50, icuBeds: 8, contact: "+91 33-2223-8040", hours: "24/7 Emergency", price: "Government" },
  { id: 17, name: "Apollo Hospitals", city: "Chennai", location: "Greams Road, Chennai", rating: 4.7, reviews: 2876, diseases: ["Cardiology","Oncology","Transplant Surgery"], generalBeds: 40, icuBeds: 16, contact: "+91 44-2829-3333", hours: "24/7 Emergency", price: "Premium" },
  { id: 18, name: "Yashoda Hospital", city: "Hyderabad", location: "Somajiguda, Hyderabad", rating: 4.3, reviews: 1234, diseases: ["Neurology","Gastroenterology","Pulmonology"], generalBeds: 33, icuBeds: 7, contact: "+91 40-4567-8901", hours: "Mon-Sat 8AM–9PM", price: "Private" },
];

// Generate additional hospitals to reach 100+
const chains = ["Apollo","Fortis","Max","Manipal","Narayana","Columbia Asia","Wockhardt","KIMS","Aster","Sterling","Lilavati","Hinduja","Jaslok","Bombay","Care","Continental","Rainbow","Sunrise","BLK","Artemis","Medanta","Paras","Park","Nanavati","Hiranandani","Breach Candy","Sir Ganga Ram","Holy Family","Jupiter","Sahyadri"];
const cityAreas: Record<string, string[]> = {
  Delhi: ["Rohini","Dwarka","Vasant Kunj","Pitampura","Karol Bagh","Lajpat Nagar","Patparganj"],
  Mumbai: ["Bandra","Powai","Worli","Mulund","Goregaon","Borivali","Thane"],
  Bangalore: ["Whitefield","Indiranagar","Koramangala","Jayanagar","Electronic City","Marathahalli"],
  Chennai: ["T. Nagar","Adyar","Mylapore","Anna Nagar","Velachery","Porur"],
  Hyderabad: ["Banjara Hills","Jubilee Hills","Gachibowli","Madhapur","Begumpet","Kukatpally"],
  Kolkata: ["Salt Lake","Park Street","Howrah","New Town","Behala","Tollygunge"],
  Pune: ["Koregaon Park","Hinjewadi","Aundh","Baner","Kothrud","Hadapsar"],
  Jaipur: ["Malviya Nagar","Vaishali Nagar","C-Scheme","Mansarovar","Jagatpura"],
};
const allDiseases = ["Cardiology","Neurology","Oncology","Orthopedics","Pediatrics","Gynecology","Urology","Nephrology","Pulmonology","Gastroenterology","Dermatology","ENT","Ophthalmology","Endocrinology","Hematology","Psychiatry","Trauma","General Surgery","Liver Transplant","Cardiac Surgery","Neurosurgery","Radiology"];
const prices: Hospital['price'][] = ["Government","Private","Premium"];
const hoursOpts = ["24/7 Emergency","Mon-Sat 8AM–9PM","Mon-Sat 9AM–8PM","Mon-Sun 7AM–10PM","24/7 Emergency"];

// Seeded pseudo-random so the list is stable across renders
let seed = 42;
const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
const range = (min: number, max: number) => min + Math.floor(rand() * (max - min + 1));

const generated: Omit<Hospital, 'image'>[] = [];
const cities = Object.keys(cityAreas);
let nextId = 19;

while (generated.length < 90) {
  const chain = pick(chains);
  const city = pick(cities);
  const area = pick(cityAreas[city]);
  const suffix = pick(["Hospital","Multi-Speciality","Medical Center","Healthcare","Super Speciality","Institute"]);
  const name = `${chain} ${suffix} - ${area}`;
  const diseaseCount = range(2, 5);
  const diseases = Array.from(new Set(Array.from({ length: diseaseCount }, () => pick(allDiseases))));
  generated.push({
    id: nextId++,
    name,
    city,
    location: `${area}, ${city}`,
    rating: Math.round((3.8 + rand() * 1.2) * 10) / 10,
    reviews: range(150, 3500),
    diseases,
    generalBeds: range(0, 70),
    icuBeds: range(0, 25),
    contact: `+91 ${range(11, 99)}-${range(1000, 9999)}-${range(1000, 9999)}`,
    hours: pick(hoursOpts),
    price: pick(prices),
  });
}

export const hospitals: Hospital[] = [...curated, ...generated].map((h, i) => ({
  ...h,
  image: hospitalImages[i % hospitalImages.length],
}));
