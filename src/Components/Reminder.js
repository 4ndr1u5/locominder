import React, { Component } from 'react';
import { ScrollView, View, Dimensions,  StyleSheet, Platform, Text, TextInput } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
const { width, height } = Dimensions.get('window');

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
  }


  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Remind me to...</FormLabel>
        <FormInput inputStyle={styles.inputs} ref="reminderText" />
        <FormLabel>@</FormLabel>
        <FormInput inputStyle={styles.inputs} ref="reminderLocation" onChangeText={this.searchLocation()} />
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
