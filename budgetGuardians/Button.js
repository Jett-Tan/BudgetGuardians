import { View, Button, Alert, StyleSheet } from "react-native";

const LoginButton = (prop) => {
    return (
        <View style={styles.buttons}>
            <Button
                title="Login"
                style={styles.buttons}
                onPress={() => Alert.alert('Simple Button pressed')}
            />
        </View>

    )
}
const SignupButton = (prop) => {
    return (
        <View style={styles.buttons}>
            <Button
                title="Sign up"

                onPress={() => Alert.alert('Simple Button pressed')}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    buttons: {
        padding: 20,
        width: 300,
        height: 80,
        fontSize: 30,
    },
});

export { SignupButton }
export { LoginButton }