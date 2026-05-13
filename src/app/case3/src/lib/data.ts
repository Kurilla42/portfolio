import { Service, Review, FAQ, Office, PromoOffer, Technician } from './types';

export const COMPANY_INFO = {
  name: 'THELEN PLUMBING CO.',
  phone: '(763) 220-1064',
  email: 'hello@thelenplumbing.com',
  tagline: 'SERVING TWIN CITIES SINCE 1962',
  emergencyTagline: '⚡ 89-MINUTE GUARANTEE — OR THE DIAGNOSTIC IS ON US',
  stats: {
    rating: 4.9,
    reviewCount: 3412,
    recommendRate: 99,
  },
  serviceAreas: ['Minneapolis', 'St. Paul', 'Big Lake', 'Brooklyn Center', 'Elk River', 'Plymouth', 'Maple Grove'],
};

export const ESTIMATE_DATA = {
  issues: [
    { id: 'clogged-drain', label: 'CLOGGED DRAIN', sub: 'SLOW OR STOPPED', base: [149, 225] },
    { id: 'pipe-repair', label: 'PIPE REPAIR', sub: 'ACTIVE LEAK', base: [189, 450] },
    { id: 'water-heater', label: 'WATER HEATER', sub: 'NO HOT WATER', base: [1200, 2400] },
    { id: 'fixtures', label: 'FIXTURES & FAUCETS', sub: 'REPAIR OR SWAP', base: [129, 350] },
    { id: 'commercial', label: 'COMMERCIAL', sub: 'B2B SERVICES', base: [225, 900] },
    { id: 'leak-find', label: 'LEAK DETECTION', sub: 'HIDDEN LEAK', base: [275, 550] },
  ],
  homeSizes: [
    { id: 'small', label: 'APARTMENT / SMALL', sub: '< 1,200 SQ.FT', mult: 0.85 },
    { id: 'medium', label: 'STANDARD HOME', sub: '1,200 - 2,500 SQ.FT', mult: 1.0 },
    { id: 'large', label: 'ESTATE / MULTI', sub: '2,500+ SQ.FT', mult: 1.35 },
  ],
  urgency: [
    { id: 'normal', label: 'NEXT DAY', sub: 'STANDARD', mult: 1.0 },
    { id: 'priority', label: 'SAME DAY', sub: 'PRIORITY', mult: 1.2 },
    { id: 'emergency', label: 'EMERGENCY', sub: '89-MIN PROMISE', mult: 1.5 },
  ],
};

export const SERVICE_CITIES = [
  { name: 'MINNEAPOLIS', zips: '55401—55488' },
  { name: 'ST. PAUL', zips: '55101—55130' },
  { name: 'WAYZATA', zips: '55391' },
  { name: 'ROSEVILLE', zips: '55113' },
  { name: 'APPLE VALLEY', zips: '55124' },
  { name: 'EDINA', zips: '55410, 24, 35, 36, 39' },
  { name: 'BLOOMINGTON', zips: '55420, 31, 37, 38' },
  { name: 'EAGAN', zips: '55121, 22, 23' },
  { name: 'WOODBURY', zips: '55125, 29' },
  { name: 'STILLWATER', zips: '55082' },
  { name: 'BURNSVILLE', zips: '55306, 37' },
  { name: 'MAPLE GROVE', zips: '55311, 69' },
  { name: 'PLYMOUTH', zips: '55441, 42, 46, 47' },
  { name: 'BIG LAKE', zips: '55309' },
  { name: 'ELK RIVER', zips: '55330' },
];

export const OFFICES: Office[] = [
  {
    name: 'BIG LAKE OFFICE',
    address: '12345 County Rd 5',
    city: 'Big Lake',
    state: 'MN',
    zip: '55309',
    phone: '(763) 220-1064',
    mapUrl: '#',
  },
  {
    name: 'MINNEAPOLIS DISPATCH HUB',
    address: '8201 Industrial Park Blvd',
    city: 'Minneapolis',
    state: 'MN',
    zip: '55428',
    phone: '(763) 220-1064',
    mapUrl: '#',
  },
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Sarah K.',
    rating: 5,
    text: "Called at 11 PM with water under the kitchen sink. Eli answered, Hannah was at my door in 47 minutes, and the price she quoted was the price I paid. That's it. That's the whole review.",
    date: 'APR 2026',
    source: 'google',
    meta: 'Edina, MN · Customer since 2023'
  },
  {
    id: '2',
    author: 'Marcus D.',
    rating: 5,
    text: "I've used three plumbers in twelve years owning this duplex. Thelen is the only one who told me what something would cost before they did it. Will keep using them.",
    date: 'MAR 2026',
    source: 'google',
    meta: 'St. Paul, MN · Property owner'
  },
  {
    id: '3',
    author: 'Jenna R.',
    rating: 5,
    text: "They wear shoe covers. I know that sounds small. After what the last guy tracked through my white carpet, it isn't.",
    date: 'FEB 2026',
    source: 'google',
    meta: 'Wayzata, MN · Customer since 2024'
  },
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Why "flat-rate" instead of hourly?',
    answer: "Because hourly is a guess that puts the risk on you. Flat-rate puts the risk on us — if the job takes longer than we expected, that's our problem to solve, not your bill to absorb.",
    category: 'Pricing',
  },
  {
    id: 'faq-2',
    question: "Is the 89-minute diagnostic really refunded if you're late?",
    answer: "Yes. We honor it on same-day calls booked between 7 AM and 9 PM. We don't honor it during named winter storms or Vikings playoff games — fair's fair.",
    category: 'Guarantee',
  },
  {
    id: 'faq-3',
    question: 'Do you actually stock water heaters?',
    answer: 'Bradford White 40 and 50 gallon tanks, plus 3 tankless models, live on our trucks. 80% of replacements are same-day.',
    category: 'Service',
  },
  {
    id: 'faq-4',
    question: 'What does financing look like?',
    answer: '0% APR for 18 months on jobs over $1,500 through Synchrony. Soft credit pull, takes 90 seconds.',
    category: 'Pricing',
  },
  {
    id: 'faq-5',
    question: "Can I get a second opinion on another plumber's quote?",
    answer: "Yes. Free. We'll come look, give you our number in writing, and tell you honestly if the other guy's quote is fair.",
    category: 'Trust',
  },
  {
    id: 'faq-6',
    question: 'Are you really family-owned?',
    answer: 'Three Thelens on this page. Founded by Don Thelen in 1962, run by his grandson Ray since 2009. The accounting department is his wife. The dispatcher is his nephew.',
    category: 'Trust',
  },
];

export const TECHNICIANS: Technician[] = [
  {
    id: 'ray',
    name: 'RAY THELEN',
    role: "Owner · Master Plumber · 31 years",
    bio: '"If I wouldn\'t do it in my mother\'s basement, we don\'t do it here."',
    since: 'SINCE 1962',
    location: 'RAY',
    photoUrl: 'https://i.ibb.co/yF5nxCYw/Environmental-portrait-of-202604280059-1.webp',
    color: 'rgba(75, 45, 35, 0.7)',
    filename: 'Environmental-portrait-of-202604280059-1.webp'
  },
  {
    id: 'hannah',
    name: 'HANNAH THELEN',
    role: 'Lead Technician · 9 years on the truck',
    bio: '"Half my calls are people apologizing for not calling sooner. Don\'t."',
    since: 'JOINED 2014',
    location: 'HANNAH',
    photoUrl: 'https://i.ibb.co/jP27rmDb/Environmental-portrait-of-202604280058.webp',
    color: 'rgba(35, 55, 75, 0.7)',
    filename: 'Environmental-portrait-of-202604280058.webp'
  },
  {
    id: 'miguel',
    name: 'MIGUEL CARRANZA',
    role: "Senior Plumber · 14 years",
    bio: '"I want to leave the house cleaner than I found it. Always."',
    since: 'PIBUBh: 4.96',
    location: 'MIGUEL',
    photoUrl: 'https://i.ibb.co/jkkXhbrj/Environmental-portrait-of-202604280058-1.webp',
    color: 'rgba(65, 55, 35, 0.7)',
    filename: 'Environmental-portrait-of-202604280058-1.webp'
  },
  {
    id: 'eli',
    name: 'ELI THELEN',
    role: "Dispatch · 4 years",
    bio: '"I\'m the voice on the phone at 2 AM. I\'ll get someone moving before we hang up."',
    since: 'SINCE 2019',
    location: 'ELI',
    photoUrl: 'https://i.ibb.co/h1rbQ77P/Environmental-portrait-of-202604280059.webp',
    color: 'rgba(35, 75, 55, 0.7)',
    filename: 'Environmental-portrait-of-202604280059.webp'
  }
];
