import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView, StyleSheet, Button, ListView } from 'react-native';
import MapView from 'react-native-maps';
import ReminderModel from '../Model/Reminder'

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

export default class GridList extends Component<{}> {
  constructor(props) {
    super(props);

    if (this.props.reminder) {
      reminder = this.props.reminder
    }
    let model = new ReminderModel();
    let reminders = model.getReminders()


    this.state = {
      reminders
    };
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(reminders),
    };

  }
  addReminder = () => {
    const { navigate } = this.props.navigation;
    // navigate('Reminder')
    this.props.navigator.push({
      screen: 'loco.Reminder',
    });
  }



  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={StyleSheet.absoluteFill}
          contentContainerStyle={styles.scrollview}
        >
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData.title}</Text>}
          />
          <Button
            raised
            buttonStyle={styles.button}
            textStyle={{ textAlign: 'center' }}
            title={`+`}
            onPress={this.addReminder.bind(this)}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
  },
  list: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 100,
  },
});
