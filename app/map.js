import {ImageBackground, StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import MapView, {Marker} from 'react-native-maps';
import {useCallback, useEffect, useState} from "react";

export default function Page() {
    const url = 'https://small-parks-cheat-193-252-172-28.loca.lt'

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        fetch(url +'/api/boxes')
            .then(response => response.json())
            .then(data => {
                const boxes = data['hydra:member'];

                const markers = [];
                for (let i = 0; i < boxes.length; i++) {
                    const box = boxes[i];
                    const marker = {
                        latlng: {
                            latitude: box.geoLoc['1'],
                            longitude: box.geoLoc['2']
                        },
                        title: box.street + ', ' + box.zipcode + ' ' + box.city,
                        capacity: box.capacity,
                        id: box.id
                    }
                    markers.push(marker);
                }

                setMarkers(markers);
            })
            .catch(error => {
                console.log(error);
            });}, []);

    console.log(markers)

    return (
        <ImageBackground source={require('../assets/image/back.png')} style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>Livrex</Text>
                <MapView
                    style={{ flex: 1 }}
                    region={{
                        latitude: 45.15861499554227,
                        longitude: 5.7593382139903655,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    {markers.map(marker => (
                        <Marker key={marker.id}
                                coordinate={{
                            latitude: parseFloat(marker.latlng.latitude),
                            longitude: parseFloat(marker.latlng.longitude),}}
                                title={marker.title}
                                description={'Capacity: ' + marker.capacity} />
                    ))}
                </MapView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
        backgroundColor : '#008686',

    },
    main: {
        flex: 1,
        width : '100%',
        height : '100%',
        fontFamily: 'K2D-Regular'
    },
    title: {
        marginTop : 30,
        fontSize: 80,
        textAlign: "center",
        color : '#d3d3d3',
        fontFamily: 'MeowScript-Regular'
    },
    subtitle: {
        fontSize: 24,
        textAlign: "center",
        color : '#d3d3d3'
    },
    icon: {
        textAlign:"center",
        color : '#d3d3d3'

    }
});