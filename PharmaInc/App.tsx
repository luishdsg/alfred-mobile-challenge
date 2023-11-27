// Importações necessárias
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/layout/home';
import Favorites from './src/layout/favorites';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { components } from './src/styles';
import { Ionicons } from '@expo/vector-icons';
// Criação do navegador de abas na parte inferior
const Tab = createBottomTabNavigator();

// Componente principal que contém a navegação
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
       
       screenOptions={({ route }) => ({
        headerStyle: components.bgBlue,
        headerTintColor: '#E0FBFC',
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let iconColor;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName as any} size={size} color='#E0FBFC'/>;
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
            return <Ionicons name={iconName as any} size={size} color='#EE6C4D'/>;
          }
        },
        tabBarStyle: components.bgBlue,
      })}
       >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Favorites" component={Favorites} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>

  );
}
