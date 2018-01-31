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
    const { navigate } = this.props.navigation;
    navigate('MapList', { reminder: this.state })
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
          <Image
         style={{ width: 100, height: 100 }}
         source={{
           uri: "data:image/jpeg;base64,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"
         }}
       />
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