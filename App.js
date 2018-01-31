/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import  GridList from './src/Components/GridList'
import  MapList from './src/Components/MapList'
import  Reminder from './src/Components/Reminder'
import  HelloWorld from './src/Components/BackgroundTracking'

import {
  StackNavigator,
} from 'react-navigation';


export default App = StackNavigator({
  HelloWorld: { screen: HelloWorld },
  MapList: { screen: MapList },
  Reminder: { screen: Reminder },
  GridList: { screen: GridList },
});

