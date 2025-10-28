// Mock data for homepage sections

export const MOCK_PROPERTIES = [
  {
    id: '1',
    title: 'Modern Villa in New Cairo',
    description: 'Luxurious 4-bedroom villa with private pool and garden',
    price: 8500000,
    location: 'New Cairo, Cairo',
    latitude: 30.0444,
    longitude: 31.2357,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    propertyType: 'Villa',
    category: 'For Sale',
    region: 'Cairo',
    isPublic: true,
  },
  {
    id: '2',
    title: 'Seaside Apartment in Marina',
    description: 'Beautiful 2-bedroom apartment with sea view',
    price: 4200000,
    location: 'Marina, North Coast',
    latitude: 30.8800,
    longitude: 29.0833,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    propertyType: 'Apartment',
    category: 'For Sale',
    region: 'North Coast',
    isPublic: true,
  },
  {
    id: '3',
    title: 'Downtown Office Space',
    description: 'Premium office space in the heart of Cairo',
    price: 15000,
    location: 'Downtown, Cairo',
    latitude: 30.0626,
    longitude: 31.2497,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    propertyType: 'Commercial',
    category: 'For Rent',
    region: 'Cairo',
    isPublic: true,
  },
  {
    id: '4',
    title: 'Family Home in Zamalek',
    description: 'Spacious 5-bedroom house in prestigious neighborhood',
    price: 12000000,
    location: 'Zamalek, Cairo',
    latitude: 30.0626,
    longitude: 31.2217,
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
    propertyType: 'House',
    category: 'For Sale',
    region: 'Cairo',
    isPublic: true,
  },
];

export const MOCK_FEATURED_PROPERTIES = [
  {
    id: 'f1',
    title: 'Luxury Penthouse - Zamalek',
    price: 15000000,
    location: 'Zamalek, Cairo',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    category: 'For Sale',
  },
  {
    id: 'f2',
    title: 'Beachfront Villa - North Coast',
    price: 18000000,
    location: 'Hacienda Bay, North Coast',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    category: 'For Sale',
  },
  {
    id: 'f3',
    title: 'Modern Apartment - New Cairo',
    price: 3500000,
    location: 'Fifth Settlement, New Cairo',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    category: 'For Sale',
  },
];

export const MOCK_TOP_COMPOUNDS = [
  {
    id: 'c1',
    name: 'Madinaty',
    location: 'New Cairo',
    propertiesCount: 245,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    priceRange: '2M - 8M',
  },
  {
    id: 'c2',
    name: 'Hacienda Bay',
    location: 'North Coast',
    propertiesCount: 189,
    imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
    priceRange: '5M - 20M',
  },
  {
    id: 'c3',
    name: 'Allegria',
    location: 'Sheikh Zayed',
    propertiesCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800',
    priceRange: '4M - 12M',
  },
];

export const MOCK_TOP_REGIONS = [
  {
    id: 'r1',
    name: 'New Cairo',
    propertyCount: 487,
    imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800',
  },
  {
    id: 'r2',
    name: 'North Coast',
    propertyCount: 356,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  },
  {
    id: 'r3',
    name: 'Sheikh Zayed',
    propertyCount: 312,
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
  },
  {
    id: 'r4',
    name: 'Zamalek',
    propertyCount: 198,
    imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
  },
];

export const MOCK_TOP_AGENTS = [
  {
    id: 'a1',
    name: 'Ahmed Hassan',
    company: 'Elite Properties',
    rating: 5,
    propertiesCount: 47,
    imageUrl: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 'a2',
    name: 'Sara Mohamed',
    company: 'Prime Real Estate',
    rating: 5,
    propertiesCount: 39,
    imageUrl: 'https://i.pravatar.cc/150?img=45',
  },
  {
    id: 'a3',
    name: 'Khaled Ali',
    company: 'Luxury Homes Egypt',
    rating: 4,
    propertiesCount: 35,
    imageUrl: 'https://i.pravatar.cc/150?img=33',
  },
  {
    id: 'a4',
    name: 'Mona Ibrahim',
    company: 'Cairo Realty',
    rating: 5,
    propertiesCount: 42,
    imageUrl: 'https://i.pravatar.cc/150?img=48',
  },
];

export const MOCK_REGIONS = [
  { id: '1', label: 'Cairo', value: 'Cairo' },
  { id: '2', label: 'New Cairo', value: 'New Cairo' },
  { id: '3', label: 'North Coast', value: 'North Coast' },
  { id: '4', label: 'Sheikh Zayed', value: 'Sheikh Zayed' },
  { id: '5', label: 'Zamalek', value: 'Zamalek' },
  { id: '6', label: 'Maadi', value: 'Maadi' },
  { id: '7', label: 'Heliopolis', value: 'Heliopolis' },
];

export const MOCK_PROPERTY_TYPES = [
  { id: '1', label: 'Apartment', value: 'Apartment' },
  { id: '2', label: 'Villa', value: 'Villa' },
  { id: '3', label: 'House', value: 'House' },
  { id: '4', label: 'Penthouse', value: 'Penthouse' },
  { id: '5', label: 'Commercial', value: 'Commercial' },
  { id: '6', label: 'Land', value: 'Land' },
  { id: '7', label: 'Duplex', value: 'Duplex' },
];

export const MOCK_CATEGORIES = [
  { id: '1', label: 'For Sale', value: 'For Sale' },
  { id: '2', label: 'For Rent', value: 'For Rent' },
  { id: '3', label: 'For Lease', value: 'For Lease' },
];
