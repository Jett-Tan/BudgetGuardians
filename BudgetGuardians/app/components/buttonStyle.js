import { StyleSheet } from "react-native";
import styleSetting from "../setting/setting";

export default ButtonStyle = StyleSheet.create({

    loginButton: {
        textAlign:"center",
        textAlignVertical:"center",
        backgroundColor:styleSetting.color.blue,
        padding:styleSetting.size.em10,
        fontSize:styleSetting.size.em28,
        borderRadius:styleSetting.size.em10,
        maxWidth:300,
    },
    signupButton: {
        textAlign:"center",
        textAlignVertical:"center",
        backgroundColor:styleSetting.color.blue,
        padding:styleSetting.size.em10,
        fontSize:styleSetting.size.em28,
        borderRadius:styleSetting.size.em10,
        maxWidth:300,
    },
    loginButtonContainer: {
        margin:styleSetting.size.em10,
    },
    signupButtonContainer: {
        margin:styleSetting.size.em10,
    },
});
