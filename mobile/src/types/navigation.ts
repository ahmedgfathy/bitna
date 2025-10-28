// Navigation types for React Navigation
export type PublicStackParamList = {
  Home: undefined;
  PropertyDetails: { propertyId: string };
  Login: undefined;
  Subscribe: undefined;
};

export type PropertyType = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  propertyType: string;
  category: string;
  region: string;
  isPublic: boolean;
};
