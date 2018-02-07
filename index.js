import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/Components';
import codePush from "react-native-code-push";

registerScreens();

// start the app
codePush(Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Map list',
      screen: 'loco.MapList', // this is a registered name for a screen
    //   icon: require('../img/one.png'),
    //   selectedIcon: require('../img/one_selected.png'), // iOS only
      title: 'Map list',
    },
    {
      label: 'Reminder',
      screen: 'loco.Reminder',
    //   icon: require('../img/two.png'),
    //   selectedIcon: require('../img/two_selected.png'), // iOS only
      title: 'Reminder'
    }
  ]
}));

// import React, { Component } from 'react';
// import { Navigation } from 'react-native-navigation';

// import { registerScreens } from './src/Components';
// import codePush from "react-native-code-push";

// registerScreens();


// const navigatorStyle = {
//   navBarTranslucent: true,
//   drawUnderNavBar: true,
//   navBarTextColor: 'white',
//   navBarButtonColor: 'white',
//   statusBarTextColorScheme: 'light',
//   drawUnderTabBar: true
// };

// class App extends Component {

//   constructor(props) {
//     super(props)


//     iconsLoaded.then(() => {
//       this.startApp();
//     });

//   }

//   componentDidMount() {
//     if (!__DEV__)
//       codePush.sync({
//         updateDialog: true,
//         installMode: codePush.InstallMode.ON_NEXT_RESUME
//       });
//   }

//   startApp() {
//     Navigation.startTabBasedApp({
//       tabs: [
//         {
//           label: 'Map list',
//           screen: 'loco.MapList', // this is a registered name for a screen
//           //   icon: require('../img/one.png'),
//           //   selectedIcon: require('../img/one_selected.png'), // iOS only
//           title: 'Map list',
//         },
//         {
//           label: 'Reminder',
//           screen: 'loco.Reminder',
//           //   icon: require('../img/two.png'),
//           //   selectedIcon: require('../img/two_selected.png'), // iOS only
//           title: 'Reminder'
//         }
//       ]
//     });
//   }
// }


// App = codePush({ checkFrequency: codePush.CheckFrequency.MANUAL })(App);

// export default App;