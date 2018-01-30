import React, { Component } from 'react';
import { ScrollView, View, Dimensions, StyleSheet, Platform, Text, TextInput, Picker } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { GooglePlacesInput } from './GooglePlacesAutocomplete'
const { width, height } = Dimensions.get('window');
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
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
  updateReminder = (text)=>{
this.setState({
  title:text,
  desc: text
})
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Remind me to...</FormLabel>
        <FormInput inputStyle={styles.inputs} ref="title" onChangeText={(text)=>this.updateReminder(text)} />
        <FormLabel>@</FormLabel>
        {/* <FormInput inputStyle={styles.inputs} ref="reminderLocation" onChangeText={(text)=>this.searchLocation(text)} /> */}
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description} // custom description render
          onPress={(data, details = null) => { 
            // 'details' is provided when fetchDetails = true
            debugger
            this.setState({
                address: details.formatted_address
                , lat: details.geometry.location.lat
                , lng: details.geometry.location.lng
            });
            // this.setState({locations:details.map(x=>x.geometry.location)})
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyC_I1djbTw-2Htu47whoplsXc-0jaATGjE',
            language: 'en', // language of the results
            types: '(cities)' // default: 'geocode'
          }}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#5d5d5d',
              fontSize: 16
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },



          }}

          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food'
          }}

          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          predefinedPlaces={[homePlace, workPlace]}

          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          //   renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
          renderRightButton={() => <Text style={styles.selectedLocation}>{this.state.address}</Text>}
        />
        <Button
          raised
          buttonStyle={styles.button}
          textStyle={{ textAlign: 'center' }}
          title={`Create`}
          onPress={this.saveReminder.bind(this)}
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
