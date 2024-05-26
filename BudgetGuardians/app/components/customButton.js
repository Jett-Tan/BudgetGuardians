import { Link, Redirect } from "expo-router";
import { View, Text, StyleSheet, Pressable} from "react-native";

import styleSetting from "../setting/setting.js";
import ButtonStyle from "./buttonStyle.js";
import { Switch } from "react-native-web";

const props = {
    type: "primary" | "secondary" | "login" | "signup" | "danger" | "link",
    text: "",
        
    getStyle: (e) => {
        switch (e) {
            case "primary":
                return styles.primary;
            case "secondary":
                return styles.secondary;
            case "login":
                return styles.login;
            case "signup":
                return styles.signup;
            case "danger":
                return styles.danger;
            case "link":
                return styles.link;
            default:
                return styles.primary;
        }
    },
}

export default function CustomButton({type,text,onPress = (e) => {},href = null}) {
    return (
        <>
            <Pressable style = {[styles.button,props.getStyle(type)]} onPress={e => onPress(e)}>
                {href != null ? 
                    <Link href={href} style = {styles.text}>
                        <Text>{text}</Text>
                    </Link> 
                    :
                    <View>
                        <Text style = {styles.text}>{text}</Text>
                    </View>
                }
            </Pressable>
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
        backgroundColor:styleSetting.color.white,
    },
})