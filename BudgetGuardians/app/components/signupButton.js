import { Link } from "expo-router";
import { View, Text} from "react-native";

import ButtonStyle from "./buttonStyle.js";

export default function SignupButton() {
    return (
      <>
        <View style = {ButtonStyle.signupButtonContainer}>
            <Link style={ButtonStyle.signupButton} push href="./pages/signupPage">
                <Text>Signup</Text>
            </Link>
        </View>
      </>
)}