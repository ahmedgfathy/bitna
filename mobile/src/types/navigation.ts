// Navigation types for React Navigation
export type PublicStackParamList = {
  Home: undefined;
  PropertyDetails: { propertyId: string };
  Login: undefined;
  Subscribe: undefined;
};

export type AuthenticatedStackParamList = {
  Dashboard: undefined;
  Properties: undefined;
  PropertyDetail: { propertyId: string };
  PropertyForm: { propertyId?: string; mode?: 'create' | 'edit' };
  Leads: undefined;
  LeadDetail: { leadId: string };
  LeadForm: { leadId?: string; mode?: 'create' | 'edit' };
  Team: undefined;
  Settings: undefined;
  Home: undefined; // Public home accessible while logged in
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
