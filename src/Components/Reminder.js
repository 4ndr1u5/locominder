import React, { Component } from 'react';
import { ScrollView, View, Dimensions, StyleSheet, Platform, Text, TextInput, Picker,Image } from 'react-native';
import { Button, Input, Item, Label } from 'native-base';
import GooglePlacesInput from './GooglePlacesInput'
const { width, height } = Dimensions.get('window');
import ReminderModel from '../Model/Reminder'

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };
export default class Reminder extends Component<{}> {
  constructor(props) {
    super(props)

    this.state = {
      title: null,
      lat: null,
      lng: null,
      desc: null,
      address: null
    }
  }

  saveReminder() {
    var model = new ReminderModel();
    debugger
    model.createReminder({
      title: this.state.title,
      lat: this.state.lat,
      lng: this.state.lng,
      desc: this.state.title,
      address: this.state.address,
    })
    // const { navigate } = this.props.navigation;
    // navigate('MapList', { reminder: this.state })
    this.props.navigator.push({
      screen: 'loco.MapList',
      passProps: { reminder: this.state }
    });
  }
  setReminderText = (text) => {
    this.setState({
      title: text,
      desc: text
    })
  }

  setLocation = (data, details) => {
    this.setState({
      address: details.formatted_address
      , lat: details.geometry.location.lat
      , lng: details.geometry.location.lng
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Item floatingLabel>
          <Label>remind me toooo</Label>
          <Input ref="title" onChangeText={(text) => this.setReminderText(text)} />
        </Item>

        <GooglePlacesInput setLocation={this.setLocation.bind(this)} reminder={this.state} />

         <Button block light onPress={this.saveReminder.bind(this)}>
            <Text>Create</Text>
          </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputs: {
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    width: width,
    backgroundColor: 'tomato',
    borderRadius: 2,
    margin: 20
  },
  selectedLocation: {
    fontSize: 20,
  }
});