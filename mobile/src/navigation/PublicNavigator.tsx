import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../types/navigation';

// Import screens
import HomeScreen from '../screens/public/HomeScreen';
import PropertyDetailsScreen from '../screens/public/PropertyDetailsScreen';
import LoginScreen from '../screens/public/LoginScreen';
import SubscribeScreen from '../screens/public/SubscribeScreen';

const Stack = createNativeStackNavigator<PublicStackParamList>();

export default function PublicNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen 
        name="PropertyDetails" 
        component={PropertyDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Property Details',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Subscribe"
        component={SubscribeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
