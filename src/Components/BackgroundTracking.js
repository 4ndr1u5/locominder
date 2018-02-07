import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';


import DeviceInfo from 'react-native-device-info';

import { 
  Container,
  Button, Icon,
  Text,
  Header, Footer, Title,
  Content, 
  Left, Body, Right,
  Switch 
} from 'native-base';

import { Row } from 'react-native-easy-grid';


import BackgroundGeolocation from "react-native-background-geolocation";

const TRACKER_HOST = 'http://tracker.transistorsoft.com/locations/';

export default class BackgroundTracking extends Component<{}> {

  constructor(props) {
    super(props);

    this.eventId = 1;

    this.state = {
      enabled: true,
      isMoving: true,
      username: "user",
      events: []
    };
  }

  componentDidMount() {
    // Step 1:  Listen to events:
    BackgroundGeolocation.on('location', this.onLocation.bind(this));    
    BackgroundGeolocation.on('motionchange', this.onMotionChange.bind(this));
    BackgroundGeolocation.on('activitychange', this.onActivityChange.bind(this));
    BackgroundGeolocation.on('providerchange', this.onProviderChange.bind(this));
    BackgroundGeolocation.on('powersavechange', this.onPowerSaveChange.bind(this));
    BackgroundGeolocation.on('http', this.onHttp.bind(this));
    BackgroundGeolocation.on('heartbeat', this.onHeartbeat.bind(this));
    
    // Step 2:  #configure:
    BackgroundGeolocation.configure({      
      distanceFilter: 10,
      stopOnTerminate: false,
      startOnBoot: true,
      foregroundService: true,
      url: TRACKER_HOST + this.state.username,
      params: {
        // Required for tracker.transistorsoft.com
        device: {
          uuid: DeviceInfo.getUniqueID(),
          model: DeviceInfo.getModel(),
          platform: DeviceInfo.getSystemName(),
          manufacturer: DeviceInfo.getManufacturer(),
          version: DeviceInfo.getSystemVersion(),
          framework: 'ReactNative'
        }
      },
      autoSync: true,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE
    }, (state) => {
      this.setState({
        enabled: state.enabled,
        isMoving: state.isMoving
      });
    });
    BackgroundGeolocation.start();      
  }

  /**
  * @event location
  */
  onLocation(location) {
    console.log('[event] location: ', location);
    this.addEvent('location', new Date(location.timestamp), location);
  }
  /**
  * @event motionchange
  */
  onMotionChange(event) {
    console.log('[event] motionchange: ', event.isMovign, event.location);
    this.setState({
      isMoving: event.isMoving
    });
    this.addEvent('motionchange', new Date(event.location.timestamp), event.location);
  }
  /**
  * @event activitychange
  */
  onActivityChange(event) {
    console.log('[event] activitychange: ', event);
    this.addEvent('activitychange', new Date(), event);
  }
  /**
  * @event providerchange
  */
  onProviderChange(event) {
    console.log('[event] providerchange', event);
    this.addEvent('providerchange', new Date(), event);
  }  
  /**
  * @event powersavechange
  */
  onPowerSaveChange(isPowerSaveMode) {
    console.log('[event] powersavechange', isPowerSaveMode);
    this.addEvent('powersavechange', new Date(), {isPowerSaveMode: isPowerSaveMode});
  }
  /**
  * @event heartbeat
  */
  onHttp(response) {
    console.log('[event] http: ', response);
    this.addEvent('http', new Date(), response);
  }
  /**
  * @event heartbeat
  */
  onHeartbeat(event) {
    console.log('[event] heartbeat: ', event);
    this.addEvent('heartbeat', new Date(), event);
  }

  /**
  * Add an event to list
  */
  addEvent(name, date, object) {
    let event = {
      key: this.eventId++, 
      name: name, 
      timestamp: date.toLocaleTimeString(), 
      json: JSON.stringify(object, null, 2)
    };
    let rs = this.state.events;
    rs.unshift(event);
    this.setState({
      events: rs
    });
  }


  render() {
    return null
  }

}

