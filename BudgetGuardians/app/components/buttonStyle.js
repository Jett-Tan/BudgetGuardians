import { StyleSheet } from "react-native";
import styleSetting from "../setting/setting";

export default ButtonStyle = StyleSheet.create({

    loginButton: {
        textAlign:"center",
        textAlignVertical:"center",
        backgroundColor:styleSetting.color.blue,
        padding:styleSetting.padding.small,
        fontSize:styleSetting.size.text.small,
        borderRadius:styleSetting.borderRadius.small,
        maxWidth:300,
    },
    signupButton: {
        textAlign:"center",
        textAlignVertical:"center",
        backgroundColor:styleSetting.color.blue,
        padding:styleSetting.padding.small,
        fontSize:styleSetting.size.text.small,
        borderRadius:styleSetting.borderRadius.small,
        maxWidth:300,
    },
    loginButtonContainer: {
        margin:styleSetting.size.margin.smaller
    },
    signupButtonContainer: {
        margin:styleSetting.size.margin.smaller
    },
});
