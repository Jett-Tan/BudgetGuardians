import {View, Text, StyleSheet } from 'react-native';
import {useState} from 'react';
import styleSetting from '../setting/setting';

export default function SideBar() {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <>
            <View style={[styles.navigationBar]}>
                <CustomIconButton
                    text=""
                    iconHref="line"
                    borderless = {true}
                    onPress={() => {toggleModalVisible()}}
                />
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={[styles.header,{backgroundColor:"white", maxHeight:90, flex:1, flexDirection:"row-reverse"}]}>
                        <View style={[styles.navigationBar]}>
                            <View style={{backgroundColor:"red", width:300}}>
                                <View style={{flex:1,flexDirection:"row-reverse"}}>
                                    <CustomIconButton
                                        text=""
                                        iconHref="line"
                                        borderless = {true}
                                        onPress={() => {toggleModalVisible()}}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
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