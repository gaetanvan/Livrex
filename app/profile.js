import {ImageBackground, StyleSheet, Text, View } from "react-native";
import {Link} from "expo-router";
import { useSearchParams } from "expo-router";
import {useEffect, useState} from "react";
import QRCodeReader from "./QRCodeReader";
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


export default function Page() {

    const { id } = useSearchParams();

    const url = 'https://small-parks-cheat-193-252-172-28.loca.lt'

    const [users, setUser] = useState([]);


    useEffect(() => {
        fetch(url + "/api/users/" + id
            , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Method': 'GET',
                    'Access-Control-Request-Headers': 'Content-Type, Authorization'
                }})
            .then((response) => response.json())
            .then((json) => {
                setUser(json);
            })
            .catch((error) => console.error(error));
    }, []);

    console.log(users)
    return (
        <ImageBackground source={require('../assets/image/back.png')} style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>Livrex</Text>
                <Text style={styles.subtitle}>Scannez la boite</Text>
                <QRCodeReader nextpath={'box'} previousId={id} userId={users.id}/>
                <Text style={styles.profile}>Profil de {users.name}</Text>
                <View style={styles.button}>
                    <FontAwesome5 style={styles.icon} name="clock" size={50} />
                </View>
                <Text style={styles.subtitle}>Historique de vos emprunts</Text>
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
        color : '#d3d3d3',
        fontFamily: 'K2D-Regular'

    },
    icon: {
        textAlign:"center",
        color : '#242929',
        marginTop: 7,
    },
    profile: {
        marginTop: -50,
        marginBottom: 20,
        fontSize: 24,
        textAlign: "center",
        color: '#d3d3d3',
        fontFamily: 'K2D-Regular'
    },
    button: {
        width: 65,
        height: 65,
        borderRadius:999,
        alignSelf:"center",
        backgroundColor: '#D9D9D9',
    },
    });
