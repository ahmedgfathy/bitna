import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import PropertiesScreen from '../screens/dashboard/PropertiesScreen';
import PropertyDetailScreen from '../screens/dashboard/PropertyDetailScreen';
import PropertyFormScreen from '../screens/dashboard/PropertyFormScreen';

export type PropertiesStackParamList = {
  PropertiesList: undefined;
  PropertyDetail: { propertyId: string };
  PropertyForm: { propertyId?: string; mode: 'create' | 'edit' };
};

const Stack = createNativeStackNavigator<PropertiesStackParamList>();

export default function PropertiesStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="PropertiesList" 
        component={PropertiesScreen}
      />
      <Stack.Screen 
        name="PropertyDetail" 
        component={PropertyDetailScreen}
        options={{
          headerShown: true,
          headerTitle: 'Property Details',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="PropertyForm" 
        component={PropertyFormScreen}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: route.params?.mode === 'edit' ? 'Edit Property' : 'New Property',
          headerBackTitle: 'Back',
        })}
      />
    </Stack.Navigator>
  );
}
