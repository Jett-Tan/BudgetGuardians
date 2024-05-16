import { Link, Pressable } from "expo-router";
import { Button } from "react-native";
import { View, Text, StyleSheet } from "react-native";

const LoginButton = () => {
    return (
    <View style = {styles.buttonBlock}>
        <Link style={styles.button} push href="/login">
        <Text>Login</Text>
        </Link>
    </View>
)}
const styles = StyleSheet.create({
  buttonBlock: {
    width: 140,
    padding:40,
    height: 30,
    alignItems:'center',
    alignContent:'center'
  },
  button: {
    alignItems:'center',
    textAlign:'center',
    borderRadius:10,
    fontSize:30,
    textAlignVertical:'center',
    backgroundColor:'#d2486f',
    height: 50,
    width:100
  }
});

export default { LoginButton };