import { Link, Redirect } from "expo-router";
import { View, Text, StyleSheet, Pressable, TouchableOpacity} from "react-native";

import styleSetting from "../setting/setting.js";

const props = {
    type: "primary" | "secondary" | "login" | "signup" | "danger" | "link",
    text: "",
    getStyle: (e) => {
        switch (e) {
            case "primary":
                return {
                    pressable: [
                        styles.button,
                        styles.primary],
                    text: styles.text
                };
            case "secondary":
                return {
                    pressable: [
                        styles.button,
                        styles.secondary],
                    text: styles.text
                };
            case "login":
                return {
                    pressable: [
                        styles.button,
                        styles.login],
                    text: styles.text
                };
            case "signup":
                return {
                    pressable: [
                        styles.button,
                        styles.signup],
                    text: styles.text
                };
            case "danger":
                return {
                    pressable: [
                        styles.button,
                        styles.danger],
                    text: styles.text
                };
            case "link":
                return {
                    pressable: [
                        styles.button,
                        styles.link],
                    text: styles.textLink
                };
            default:
                return {
                    pressable: [
                        styles.button,
                        styles.primary],
                    text: styles.text
                };
        }
    },
}

export default function CustomButton({
    type,
    text,
    onPress = (e) => {},
    href = null,
    containerStyle = {},
    textStyle={}
}) {
    return (
        <>
            <TouchableOpacity style = {[props.getStyle(type).pressable,containerStyle]} onPress={e => onPress(e)}>
                {href != null ? 
                    <Link href={href} style = {[props.getStyle(type).text,textStyle]}>
                        <Text>{text}</Text>
                    </Link> 
                    :
                    <View style={{height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}}>
                        <Text style = {[props.getStyle(type).text,textStyle]} >{text}</Text>
                    </View>
                }
            </TouchableOpacity>
        </>
    )
}
const styles = StyleSheet.create({
    text:{
        textAlign:"center",
        textAlignVertical:"center",
        fontSize:styleSetting.size.em28,
        padding:styleSetting.size.em07,
    },
    textLink:{
        textAlign:"center",
        textAlignVertical:"center",
        fontSize:styleSetting.size.em16,
        color:styleSetting.color.royalblue,
        padding:styleSetting.size.em07,
        textDecorationLine: 'underline',
    },
    button:{
        textAlign:"center",
        textAlignVertical:"center",
        maxWidth:styleSetting.size.em300,
        margin:styleSetting.size.em10,
        borderRadius:styleSetting.size.em10,
    },
    primary: {
        backgroundColor:styleSetting.color.lightgrey,
    }, 
    secondary: {
        backgroundColor:styleSetting.color.grey,
    }, 
    login: {
        backgroundColor:styleSetting.color.blue,
    },  
    signup: {
        backgroundColor:styleSetting.color.blue,
    },  
    danger: {
        backgroundColor:styleSetting.color.red,
    }, 
    link: {
        fontSize:styleSetting.size.em10,
    },
})