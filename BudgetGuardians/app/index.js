import { StyleSheet,  View,  } from "react-native";
import { Link, router, Redirect } from 'expo-router';

import Icon from './components/icon'
import styleSetting from "./setting/setting";
import { auth } from "./auth/firebaseConfig";
import CustomButton from "./components/customButton";

export default function Page() {
  // get cookies or token to see if login in else set to init page
  const hasToken = false;

  const user = auth.currentUser;

  if (user) {
    console.log(user)
    return <Redirect href="/pages/homePage" />;
  }
  async function href(location) {
    return () => <Redirect href={location} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Icon size ={300}/>
        
        <CustomButton type="login" text="Login" href ="./pages/loginPage"/>
        <CustomButton type="signup" text="Signup" href ="./pages/signupPage"/>
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
