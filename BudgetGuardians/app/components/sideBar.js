import React from 'react';
import {Modal, View, Text, StyleSheet } from 'react-native';

import styleSetting from '../setting/setting';

export default function SideBar() {
    const [modalVisible, setModalVisible] = React.useState(false);
    return (
        <>
            <Modal 
            visible = {modalVisible}>
                <View style={styles.sideBar}>
                    <View style={styles.sideBarContent}>
                        <Text style={styles.sideBarText}>Budget Guardians</Text>
                        <Text style={styles.sideBarText}>Setting</Text>
                        <Text style={styles.sideBarText}>About</Text>
                        <Text style={styles.sideBarText}>Home</Text>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    sideBar: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: styleSetting.color.lightblue,
    },
    sideBarContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    sideBarText: {
        fontSize: styleSetting.size.em24,
        color: styleSetting.color.white,
    }
});