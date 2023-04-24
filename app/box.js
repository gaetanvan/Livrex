import {ImageBackground,Pressable, StyleSheet, Text, View} from "react-native";
import {Link} from "expo-router";
import { useSearchParams } from "expo-router";
import {useEffect, useState} from "react";
import QRCodeReader from "./QRCodeReader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';


export default function Page() {

    const { id } = useSearchParams();
    const {userId} = useSearchParams();
    const url = 'https://small-parks-cheat-193-252-172-28.loca.lt'

    const [users, setUser] = useState([]);


    useEffect(() => {
        fetch(url + "/api/boxes/" + id
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
                <Text style={styles.subtitle}>Scannez le livre emprunté</Text>
                <QRCodeReader nextpath={'book'} previousId={id} userId={userId}/>
                <Text style={styles.subtitle}>Box de {users.city}</Text>
                <Pressable style={styles.button}>
                    <Link href={{ pathname: 'return' , params: { id: id }}}>Rendre un livre</Link>
                </Pressable>
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

    },
    button: {
        marginTop: 20,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        width: 200,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'white',
    },
});