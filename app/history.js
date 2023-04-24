import {ImageBackground, StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import MapView, {Marker} from 'react-native-maps';
import {useCallback, useEffect, useState} from "react";

export default function Page() {
    const url = 'https://five-loops-suffer-193-252-172-28.loca.lt'
    const [books, setBooks] = useState([])
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        fetch(url +'/api/borrows')
            .then(response => response.json())
            .then(data => {
                const history = data['hydra:member'];

                const userHistory = [];
                for (let i = 0; i < history.length; i++) {
                    const box = history[i];
                    if (box.idUser === '/api/users/7b34c881-9f3f-4123-bce6-ffcdaf228c20'){
                    userHistory.push(box);
                    }
                }
                setMarkers(userHistory);
            })
            .catch(error => {
                console.log(error);
            });}, []);

    useEffect(() => {
        fetch(url +'/api/books')
            .then(response => response.json())
            .then(data => {
                const booksData = data['hydra:member'];

                const booksHistory = [];
                for (let i = 0; i < booksData.length; i++) {
                    const box = booksData[i];
                    if (box.idBorrow === '/api/borrows/4'){
                        booksHistory.push(box);
                    }
                }
                setBooks(booksHistory);
            })
            .catch(error => {
                console.log(error);
            });}, []);

    console.log(markers)
    console.log(books)

    return (
        <ImageBackground source={require('../assets/image/back.png')} style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>Livrex</Text>
                {books.map(book => (
                    <Text>{book.title}</Text>
                ))}
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