import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView, StyleSheet, Button } from 'react-native';
import MapView from 'react-native-maps';
import ReminderModel from '../Model/Reminder'

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class MapList extends Component<{}> {
    constructor(props) {
        super(props);
        let reminder = null

        if(this.props.navigation.state.params){
            reminder = this.props.navigation.state.params.reminder
        }
       debugger
        let model = new ReminderModel();
        let reminders = model.getReminders()
       
        if(reminder){
            this.state = {
                reminder
            };
        }
        else{
            this.state = {
                reminders
            };
            
        }
       

    }
    addReminder = () => {
        const { navigate } = this.props.navigation;
        navigate('Reminder')
    }

    _getRegion = (reminder) =>{
        return {
            latitude: reminder.lat,
            longitude: reminder.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={StyleSheet.absoluteFill}
                    contentContainerStyle={styles.scrollview}
                >
                    <MapView
                        provider={this.props.provider}
                        style={styles.map}
                        scrollEnabled={true}
                        zoomEnabled={true}
                        pitchEnabled={true}
                        rotateEnabled={true}
                        initialRegion={this.state.region}
                    >
                        {this.state.reminders && this.state.reminders.map(reminder => 
                            <MapView.Marker
                                title={reminder.title}
                                description="..."
                                coordinate={this._getRegion(reminder)}
                            />
                        )}
                        {this.state.reminder && <MapView.Marker
                                title={this.state.reminder.title}
                                description="..."
                                coordinate={this._getRegion(this.state.reminder)}
                            />}

                    </MapView>
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
    map: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - 100,
    },
});
