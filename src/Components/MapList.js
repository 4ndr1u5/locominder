import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView, StyleSheet, Button } from 'react-native';
// API key AIzaSyB5zeytBeZY06yf1luBhj5TvlKjawZLLCg
import MapView from 'react-native-maps';
import ReminderModel from '../Model/Reminder'

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class MapList extends Component<{}> {
    constructor(props) {
        super(props);
        
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
        };
    }
    createReminder = () => {
        debugger
        var model = new ReminderModel();
        let reminders = model.getReminders()
        model.createReminder({
            Title: "title", 
            Lattitude: LATITUDE.toString(),
            Longitude: LONGITUDE.toString(),
            Description: "description",
            Location: "vilnius"
        })
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
                        <MapView.Marker
                            title="This is a title"
                            description="This is a description"
                            coordinate={this.state.region}
                        />
                    </MapView>
                    <Button
                        onPress={this.createReminder}
                        title="+"
                        color="#841584"
                        accessibilityLabel="Create new reminder"
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
