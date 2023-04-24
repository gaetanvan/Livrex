import {ImageBackground, Button, StyleSheet, Text, View} from "react-native";
import {Link} from "expo-router";
import QRCodeReader from "./QRCodeReader";
import { FontAwesome } from '@expo/vector-icons';
import {useFonts} from "expo-font";
import {useCallback} from "react";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

SplashScreen.preventAutoHideAsync();

export default function Page() {
  const [fontsLoaded] = useFonts({
    'K2D-Regular': require('../assets/fonts/K2D-Regular.ttf'),
    'K2D-Bold': require('../assets/fonts/K2D-Bold.ttf'),
    'MeowScript-Regular': require('../assets/fonts/MeowScript-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ImageBackground source={require('../assets/image/back.png')} style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Livrex</Text>
        <Text style={styles.subtitle}>Scannez votre carte</Text>
        <QRCodeReader nextpath={'profile'} previousId={'1'}
        userId={'1'} style={styles.qrcode}/>
        <View style={styles.button}>
          <FontAwesome style={styles.icon} name="map-marker" size={50} color="black" />
        </View>
        <Link href='/map' style={styles.subtitle}>Cartes des boites</Link>
        <Link href='/history' style={styles.subtitle}>Historique</Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor : '#242929',
    resizeMode: "cover"
  },
  main: {
    flex: 1,
    width : '100%',
    height : '100%',
    fontFamily: 'K2D-Regular',
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
    fontFamily: 'K2D-Regular',
  },
  icon: {
    textAlign:"center",
    color : '#242929',
    marginTop: 2,
  },
  button: {
    width: 55,
    height: 55,
    borderRadius:999,
    alignSelf:"center",
    backgroundColor: '#D9D9D9',
  },
});
