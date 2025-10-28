import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import HomeScreen from '../screens/public/HomeScreen';

export type RootStackParamList = {
  Main: undefined;
  PublicHome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={AuthenticatedNavigator} />
            <Stack.Screen
        name="Root"
        component={NavigationSwitcher}
        options={{
          headerShown: false,
          headerTitle: 'Contaboo',
    </Stack.Navigator>
  );
}
