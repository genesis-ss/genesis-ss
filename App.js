/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen/index';
import AboutusScreen from './src/screens/AboutusScreen/index';
import CalendarScreen from './src/screens/CalendarScreen/index';
import LentScreen from './src/screens/LentScreen/index';
import LinkScreen from './src/screens/LinkScreen/index';
import DetailScreen from './src/screens/DetailScreen/index';
import { Icon } from 'native-base';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Icon name="ios-radio" size={20} />,
        }}
      />
      <Tab.Screen
        name="Saints"
        component={CalendarScreen}
        options={{
          tabBarLabel: 'Saints',
          tabBarIcon: ({ color, size }) => <Icon name="ios-people" size={20} style={{ color: 'lightskyblue' }} />,
        }}
      />
      <Tab.Screen
        name="Lent"
        component={LentScreen}
        options={{
          tabBarLabel: 'Lent',
          tabBarIcon: ({ color, size }) => <Icon name="md-book" size={20} style={{ color: 'purple' }} />,
        }}
      />
      <Tab.Screen
        name="Links"
        component={LinkScreen}
        options={{
          tabBarLabel: 'Links',
          tabBarIcon: ({ color, size }) => <Icon name="ios-link" size={20} style={{ color: 'green' }} />,
        }}
      />
      <Tab.Screen
        name="About us"
        component={AboutusScreen}
        options={{
          tabBarLabel: 'About us',
          tabBarIcon: ({ color, size }) => <Icon name="ios-information-circle-outline" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" options={{ title: 'Iraivarthai - இறைவார்த்தை' }} component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
