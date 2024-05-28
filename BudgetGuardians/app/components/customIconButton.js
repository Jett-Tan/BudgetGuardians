import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native"

import Icon from "./icon"
import styleSetting from "../setting/setting"

export default function CustomIconButton({
    onPress =( ) => {},
    text = "",
    iconHref = "",
}) {
    return (
        <>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.item}>
                    <View style={styles.icon}>
                        <Icon size={60} iconHref={iconHref}/>
                    </View>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        alignItems:"center",
        alignContent:"center",
        width:styleSetting.size.em95,
        height:styleSetting.size.em95,
        margin:styleSetting.size.em10,
    },
    icon: {
        backgroundColor:styleSetting.color.white,
        borderRadius:styleSetting.size.em20,
        borderColor:styleSetting.color.blue,
        borderWidth:styleSetting.size.em01,
    },
    text: {
        height:styleSetting.size.em15,
        fontSize: styleSetting.size.em12,
    }

})