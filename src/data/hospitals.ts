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
  'https://images.unsplash.com/photo-1559757148-5c688a10ba90?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580281657527-47f249e8f4df?w=600&h=400&fit=crop',
];

export const hospitals: Hospital[] = [
  {
    id: 1, name: "AIIMS Delhi", city: "Delhi", location: "Ansari Nagar, New Delhi",
    rating: 4.8, reviews: 2847, diseases: ["Cardiology", "Neurology", "Oncology", "Orthopedics"],
    generalBeds: 42, icuBeds: 8, contact: "+91 11-2658-8500", hours: "24/7 Emergency",
    price: "Government", image: hospitalImages[0],
  },
  {
    id: 2, name: "Apollo Hospital", city: "Mumbai", location: "Navi Mumbai, Maharashtra",
    rating: 4.6, reviews: 1923, diseases: ["Cardiology", "Gastroenterology", "Pulmonology"],
    generalBeds: 35, icuBeds: 3, contact: "+91 22-3350-3350", hours: "Mon-Sat 8AM–9PM",
    price: "Premium", image: hospitalImages[1],
  },
  {
    id: 3, name: "Fortis Hospital", city: "Bangalore", location: "Bannerghatta Road, Bangalore",
    rating: 4.5, reviews: 1654, diseases: ["Orthopedics", "Nephrology", "Urology"],
    generalBeds: 28, icuBeds: 12, contact: "+91 80-6621-4444", hours: "24/7 Emergency",
    price: "Private", image: hospitalImages[2],
  },
  {
    id: 4, name: "CMC Vellore", city: "Chennai", location: "Vellore, Tamil Nadu",
    rating: 4.9, reviews: 3201, diseases: ["Oncology", "Hematology", "Neurosurgery", "Dermatology"],
    generalBeds: 55, icuBeds: 15, contact: "+91 416-228-1000", hours: "24/7 Emergency",
    price: "Government", image: hospitalImages[3],
  },
  {
    id: 5, name: "Medanta Hospital", city: "Delhi", location: "Sector 38, Gurugram",
    rating: 4.7, reviews: 2156, diseases: ["Cardiac Surgery", "Liver Transplant", "Robotics"],
    generalBeds: 18, icuBeds: 5, contact: "+91 124-414-1414", hours: "Mon-Sat 9AM–8PM",
    price: "Premium", image: hospitalImages[4],
  },
  {
    id: 6, name: "NIMHANS", city: "Bangalore", location: "Hosur Road, Bangalore",
    rating: 4.7, reviews: 1876, diseases: ["Neurology", "Psychiatry", "Neurosurgery"],
    generalBeds: 38, icuBeds: 0, contact: "+91 80-2699-5000", hours: "Mon-Sat 9AM–5PM",
    price: "Government", image: hospitalImages[5],
  },
  {
    id: 7, name: "Kokilaben Hospital", city: "Mumbai", location: "Andheri West, Mumbai",
    rating: 4.4, reviews: 1432, diseases: ["Cardiology", "Oncology", "Pediatrics"],
    generalBeds: 22, icuBeds: 7, contact: "+91 22-3066-6666", hours: "24/7 Emergency",
    price: "Premium", image: hospitalImages[6],
  },
  {
    id: 8, name: "PGIMER Chandigarh", city: "Delhi", location: "Sector 12, Chandigarh",
    rating: 4.6, reviews: 2034, diseases: ["Hepatology", "Gastroenterology", "ENT"],
    generalBeds: 47, icuBeds: 11, contact: "+91 172-274-6018", hours: "24/7 Emergency",
    price: "Government", image: hospitalImages[7],
  },
  {
    id: 9, name: "Manipal Hospital", city: "Bangalore", location: "HAL Airport Road, Bangalore",
    rating: 4.3, reviews: 1287, diseases: ["Orthopedics", "Cardiology", "Pulmonology"],
    generalBeds: 15, icuBeds: 4, contact: "+91 80-2502-4444", hours: "Mon-Sat 8AM–8PM",
    price: "Private", image: hospitalImages[8],
  },
  {
    id: 10, name: "Narayana Health", city: "Bangalore", location: "Bommasandra, Bangalore",
    rating: 4.5, reviews: 1765, diseases: ["Cardiac Surgery", "Nephrology", "Oncology"],
    generalBeds: 60, icuBeds: 18, contact: "+91 80-7122-2222", hours: "24/7 Emergency",
    price: "Private", image: hospitalImages[9],
  },
  {
    id: 11, name: "Tata Memorial Hospital", city: "Mumbai", location: "Parel, Mumbai",
    rating: 4.8, reviews: 2543, diseases: ["Oncology", "Radiation Therapy", "Surgical Oncology"],
    generalBeds: 32, icuBeds: 6, contact: "+91 22-2417-7000", hours: "Mon-Sat 9AM–5PM",
    price: "Government", image: hospitalImages[10],
  },
  {
    id: 12, name: "Max Super Speciality", city: "Delhi", location: "Saket, New Delhi",
    rating: 4.4, reviews: 1654, diseases: ["Neurology", "Cardiology", "Orthopedics", "Urology"],
    generalBeds: 25, icuBeds: 9, contact: "+91 11-2651-5050", hours: "24/7 Emergency",
    price: "Private", image: hospitalImages[11],
  },
  {
    id: 13, name: "Global Hospital", city: "Hyderabad", location: "Lakdi-ka-pul, Hyderabad",
    rating: 4.3, reviews: 987, diseases: ["Liver Transplant", "Nephrology", "Gastroenterology"],
    generalBeds: 20, icuBeds: 2, contact: "+91 40-3044-5000", hours: "Mon-Sat 9AM–7PM",
    price: "Private", image: hospitalImages[0],
  },
  {
    id: 14, name: "Ruby Hall Clinic", city: "Pune", location: "Sasoon Road, Pune",
    rating: 4.2, reviews: 876, diseases: ["Cardiology", "Orthopedics", "Pediatrics"],
    generalBeds: 30, icuBeds: 10, contact: "+91 20-2616-3391", hours: "24/7 Emergency",
    price: "Private", image: hospitalImages[1],
  },
  {
    id: 15, name: "SMS Hospital", city: "Jaipur", location: "JLN Marg, Jaipur",
    rating: 4.1, reviews: 1123, diseases: ["General Medicine", "Trauma", "Orthopedics"],
    generalBeds: 65, icuBeds: 14, contact: "+91 141-256-0291", hours: "24/7 Emergency",
    price: "Government", image: hospitalImages[2],
  },
  {
    id: 16, name: "SSKM Hospital", city: "Kolkata", location: "AJC Bose Road, Kolkata",
    rating: 4.0, reviews: 945, diseases: ["General Medicine", "Surgery", "Gynecology"],
    generalBeds: 50, icuBeds: 8, contact: "+91 33-2223-8040", hours: "24/7 Emergency",
    price: "Government", image: hospitalImages[3],
  },
  {
    id: 17, name: "Apollo Hospitals", city: "Chennai", location: "Greams Road, Chennai",
    rating: 4.7, reviews: 2876, diseases: ["Cardiology", "Oncology", "Transplant Surgery"],
    generalBeds: 40, icuBeds: 16, contact: "+91 44-2829-3333", hours: "24/7 Emergency",
    price: "Premium", image: hospitalImages[4],
  },
  {
    id: 18, name: "Yashoda Hospital", city: "Hyderabad", location: "Somajiguda, Hyderabad",
    rating: 4.3, reviews: 1234, diseases: ["Neurology", "Gastroenterology", "Pulmonology"],
    generalBeds: 33, icuBeds: 7, contact: "+91 40-4567-8901", hours: "Mon-Sat 8AM–9PM",
    price: "Private", image: hospitalImages[5],
  },
];
