import { StyleSheet,  View,  } from "react-native";
import { Link, useRouter, Redirect } from 'expo-router';

import Icon from '../components/icon'
import styleSetting from "../setting/setting";
import { auth } from "../auth/firebaseConfig";
import CustomButton from "../components/customButton";
import { onAuthStateChanged } from "firebase/auth";

export default function Page() {
  // get cookies or token to see if login in else set to init page
    
    const user = auth.currentUser;
    const router = useRouter();
    const check = setInterval(() => {
        auth.currentUser && router.replace('./homePage') ;
    },100)

    setTimeout(() => {clearInterval(check)}, 300);
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // console.log('User is signed in.', user.email);
            return <Redirect href="./homePage"/>
        } else {
            // console.log('User not found.');
        }
    }); 

    return (      
        <View style={styles.container}>
            <View style={styles.main}>
                <Icon size ={300} iconHref="favicon"/>
                <CustomButton type="login" text="Login" href ="./loginPage"/>
                <CustomButton type="signup" text="Signup" href ="./signupPage"/>
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
