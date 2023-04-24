import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";

export default function QRCodeReader(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [result, setResult] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getBarCodeScannerPermissions =  async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        router.push({ pathname: props.nextpath , params: { id: data, previousId: props.previousId, userId: props.userId } })
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                style={styles.qrcode}
            />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    qrcode: {
        width: "100%",
        height: 550,
        marginTop: -30,
    }
});