import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Platform, Text, TextInput } from 'react-native';

export default class Reminder extends Component<{}> {
  constructor(props) {
    super(props)

    this.state = {
      reminder: "rem"
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>zaza</Text>
        <TextInput
          style={{ height: 40, width:100, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(reminder) => this.setState({ reminder })}
          value={this.state.reminder} />
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

});
