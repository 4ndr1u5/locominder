import React, { Component } from 'react';
import { ScrollView, View, Dimensions,  StyleSheet, Platform, Text, TextInput } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
import Geocoder from 'react-native-geocoding';
Geocoder.setApiKey('AIzaSyC_I1djbTw-2Htu47whoplsXc-0jaATGjE'); // use a valid API key
export default class Reminder extends Component<{}> {
  constructor(props) {
    super(props)

    this.state = {
      reminder: "",
      location: "",
      lattitude: "",
      longitude: ""
    }
  }

  searchLocation(text) {
    Geocoder.getFromLocation(text).then(
      json => {
        console.log(json)
        var location = json.results[0].geometry.location;
        alert(location.lat + ", " + location.lng);
      },
      error => {
        alert(error);
      }
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Remind me to...</FormLabel>
        <FormInput inputStyle={styles.inputs} ref="reminderText" />
        <FormLabel>@</FormLabel>
        <FormInput inputStyle={styles.inputs} ref="reminderLocation" onChangeText={(text)=>this.searchLocation(text)} />
        <Button
          raised
          buttonStyle={styles.button}
          textStyle={{ textAlign: 'center' }}
          title={`Create`}
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
    // margin: 100,
    // padding:100
  },
  button:{
    width: width,
    backgroundColor: 'tomato', 
    borderRadius: 2,
    margin:20
  }

});
