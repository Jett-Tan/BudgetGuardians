import { StyleSheet, Text, View, Button } from "react-native";
import { Link, router, Pressable } from 'expo-router';

import LoginButton from './components/Buttons.js'

export default function Page() {
  // get cookies or token to see if login in else set to init page
  const hasToken = false;
  
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <LoginButton />;

        {/* <View style = {styles.buttonBlock}>
          <Link style={styles.button} push href="/login">
            <Text>Login</Text>
          </Link>
        </View> */}
        <View style = {styles.buttonBlock}>
          <Link style={styles.button} push href="/signup">
            <Text>Signup</Text>
          </Link>
        </View>
      </View>
    </View>
  );
  
}

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
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
