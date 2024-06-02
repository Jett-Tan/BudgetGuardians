import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import styleSetting from '../setting/setting';

export default function SideBar() {
    return (
        <>
            <View style={styles.sideBar}>
                <View style={styles.sideBarContent}>
                    <Text style={styles.sideBarText}>Budget Guardians</Text>
                    <Text style={styles.sideBarText}>Setting</Text>
                    <Text style={styles.sideBarText}>About</Text>
                    <Text style={styles.sideBarText}>Home</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    sideBar: {
        height:"100%",
        width:200,
        backgroundColor: styleSetting.color.lightblue,
    },
    sideBarContent: {
    },
    sideBarText: {
        fontSize: styleSetting.size.em24,
        color: styleSetting.color.blue,
    }
});