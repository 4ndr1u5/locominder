import { Navigation } from 'react-native-navigation';

import MapList from './MapList';
import GridList from './GridList';
import Reminder from './Reminder';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('loco.MapList', () => MapList);
  Navigation.registerComponent('loco.GridList', () => GridList);
  Navigation.registerComponent('loco.Reminder', () => Reminder);
}