// import { AppRegistry } from 'react-native';
// import App from './App';

// AppRegistry.registerComponent('locominder', () => App);



import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/Components';

registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Map list',
      screen: 'loco.MapList', // this is a registered name for a screen
    //   icon: require('../img/one.png'),
    //   selectedIcon: require('../img/one_selected.png'), // iOS only
      title: 'Map list'
    },
    {
      label: 'Reminder',
      screen: 'loco.Reminder',
    //   icon: require('../img/two.png'),
    //   selectedIcon: require('../img/two_selected.png'), // iOS only
      title: 'Reminder'
    }
  ]
});