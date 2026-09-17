import MapView, {Marker} from "react-native-maps";
import {Alert, StyleSheet} from 'react-native';
import {useCallback, useLayoutEffect, useState} from "react";
import IconButton from "../components/UI/IconButton";

function Map({navigation,route}) {

    const initialLocation = route.params &&
        {
            lat: route.params.initialLat,
            lng: route.params.initialLng
        };

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);


    const region = {
        latitude: initialLocation ? initialLocation.lat :37.78 ,
        longitude:initialLocation ? initialLocation.lng : -122.43 ,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    function selectLocationHandler(event) {
        if (initialLocation) {
            return;
        }

        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setSelectedLocation({lat:lat, lng:lng});
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert("No location selected",'You need to picked your location!');
            return;
        }

        navigation.navigate('AddPlace', {
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng,
        });
    },[navigation,selectedLocation])

    useLayoutEffect(() => {
        if (initialLocation) {
            return;
        }

        navigation.setOptions({
           headerRight: ({tintColor}) =>
               <IconButton
                   color={tintColor}
                   icon='save'
                   size={24}
                   onPress={savePickedLocationHandler}
               />
        });
    }, [navigation,savePickedLocationHandler])

    return (
        <MapView initialRegion={region} style={styles.map} onPress={selectLocationHandler}>
            {selectedLocation && <Marker
                title='Picked Location'
                coordinate={{
                    latitude: selectedLocation.lat,
                    longitude: selectedLocation.lng
                }}
            />}
        </MapView>
    )
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
})