/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen/index';
import ProfileScreen from './src/screens/ProfileScreen/index';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calendar" component={ProfileScreen} />
        <Tab.Screen name="Links" component={ProfileScreen} />
        <Tab.Screen name="About us" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
