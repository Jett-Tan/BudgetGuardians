import { Link } from "expo-router";
import { View, Text} from "react-native";

import ButtonStyle from "./buttonStyle.js";

export default function LoginButton() {
    return (
      <>
        <View style = {ButtonStyle.loginButtonContainer}>
            <Link style={ButtonStyle.loginButton} href="./pages/loginPage">
                <Text>Login</Text>
            </Link>
        </View>
      </>
)}