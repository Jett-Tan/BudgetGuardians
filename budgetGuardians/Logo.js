import React from 'react';
import {View, Image, StyleSheet} from "react-native";



const Logo = () => {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.tinyLogo} 
                source={require('./img/logo.png')} 
            />
        </View>
    );
}
const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50,
    },
});

export {Logo}