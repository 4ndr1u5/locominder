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
        let location
let reminder
        if(this.props.navigation.state.params){
            location = this.props.navigation.state.params.location
            reminder = this.props.navigation.state.params.reminder
        }
       
        let model = new ReminderModel();
        let reminders = model.getReminders()
        reminders.map(rem => {
            return {
                reminder: rem.Title,
                region: {
                    latitude: rem.Lattitude,
                    longitude: rem.Longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }
            }
        })

        if(this.props.navigation.state.params){
            this.state = {
                reminder: reminder,
                region: {
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                },
            };
        }
        else{
            this.state = {
                reminders: reminders,
               
            };
            
        }
       

    }
    addReminder = () => {
        const { navigate } = this.props.navigation;
        navigate('Reminder')
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
                        {this.state.reminders && this.state.reminders.map(reminder => {
                            return <MapView.Marker
                                title={reminder.reminder}
                                description="..."
                                coordinate={reminder.region}
                            />
                        })}
                        {this.state.reminder && <MapView.Marker
                                title={reminder.reminder}
                                description="..."
                                coordinate={reminder.region}
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
