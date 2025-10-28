import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import LeadsScreen from '../screens/dashboard/LeadsScreen';
import LeadDetailScreen from '../screens/dashboard/LeadDetailScreen';
import LeadFormScreen from '../screens/dashboard/LeadFormScreen';

export type LeadsStackParamList = {
  LeadsList: undefined;
  LeadDetail: { leadId: string };
  LeadForm: { leadId?: string; mode: 'create' | 'edit' };
};

const Stack = createNativeStackNavigator<LeadsStackParamList>();

export default function LeadsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="LeadsList" 
        component={LeadsScreen}
      />
      <Stack.Screen 
        name="LeadDetail" 
        component={LeadDetailScreen}
        options={{
          headerShown: true,
          headerTitle: 'Lead Details',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="LeadForm" 
        component={LeadFormScreen}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: route.params?.mode === 'edit' ? 'Edit Lead' : 'New Lead',
          headerBackTitle: 'Back',
        })}
      />
    </Stack.Navigator>
  );
}
