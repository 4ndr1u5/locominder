import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView, StyleSheet, Button } from 'react-native';
import MapView from 'react-native-maps';
import ReminderModel from '../Model/Reminder'
import GooglePlacesInput from './GooglePlacesInput'
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import BgTracking from './BackgroundTracking'

export default class MapList extends Component<{}> {
    constructor(props) {
        super(props);
        let reminder = null
        let model = new ReminderModel();
        let reminders = model.getReminders()

        this.state = {
            reminders,
            ready: true,
        };

    }


    addReminder = () => {
        this.props.navigator.push({
            screen: 'loco.Reminder',
        });
    }

    _getRegion = (reminder) => {
        return {
            latitude: reminder.lat,
            longitude: reminder.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }
    }

    componentDidMount() {
        console.log('Component did mount');
        this.getCurrentPosition();
    }

    setRegion(region) {
        if (this.state.ready) {
            setTimeout(() => this.map.animateToRegion(region), 10);
        }
        //this.setState({ region });
    }

    onMapReady = (e) => {
        if (!this.state.ready) {
            this.setState({ ready: true });
        }
    };
    getCurrentPosition() {
        try {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    };
                    this.setRegion(region);
                },
                (error) => {
                    //TODO: better design
                    switch (error.code) {
                        case 1:
                            if (Platform.OS === "ios") {
                                Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Privacidad - Localización");
                            } else {
                                Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Apps - ExampleApp - Localización");
                            }
                            break;
                        default:
                            Alert.alert("", "Error al detectar tu locación");
                    }
                }
            );
        } catch (e) {
            alert(e.message || "");
        }
    };



    render() {
        return (
            <View style={styles.container}>
                <BgTracking reminders={this.state.reminders}/>
                <ScrollView
                    style={StyleSheet.absoluteFill}
                    contentContainerStyle={styles.scrollview}
                >
                    <MapView
                        ref={map => { this.map = map }}
                        provider={this.props.provider}
                        style={styles.map}
                        scrollEnabled={true}
                        showsUserLocation={true}
                        followsUserLocation={false}
                        // showsMyLocationButton={false}
                        showsPointsOfInterest={true}
                        // showsScale={false}
                        // zoomEnabled={true}
                        // pitchEnabled={true}
                        // rotateEnabled={true}
                        initialRegion={this.state.region}
                        onMapReady={this.onMapReady}
                    >
                        {this.state.reminders && this.state.reminders.map(reminder =>
                        <View>
                              <MapView.Circle center={{latitude: reminder.lat,
                                        longitude: reminder.lng}}
                          radius={2000} 
                          />
                            <MapView.Marker
                                title={reminder.title}
                                description="..."
                                coordinate={this._getRegion(reminder)}
                            />
                        </View>
                      
                        )}
                        {/* {this.state.reminder && <MapView.Marker
                            title={this.state.reminder.title}
                            description="..."
                            coordinate={this._getRegion(this.state.reminder)}
                        />} */}

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
