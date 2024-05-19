import { StyleSheet, Text, View, Button } from "react-native";
import { Link, router, Pressable } from 'expo-router';

import LoginButton from './components/loginButton'
import SignupButton from './components/signupButton'
import Icon from './components/icon'
import styleSetting from "./setting/setting";


export default function Page() {
  // get cookies or token to see if login in else set to init page
  const hasToken = false;

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Icon/>
        <LoginButton />
        <SignupButton />
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor:styleSetting.color.lightlightblue,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  }
});
