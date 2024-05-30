import {  Redirect,  useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { auth } from "./auth/firebaseConfig";
import { View, StyleSheet} from 'react-native';

import Loader from './components/loader';
import styleSetting from './setting/setting';

const Blink = () => {
  const [isShowingText, setIsShowingText] = useState(true);
  const [reloaded, setreloaded] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("user is signed in")
        setHasToken(true);
    } else {
      console.log("user is not signed in")
      setHasToken(false);
    }
  });

  useEffect(() => {
    const toggle = setInterval(() => {
      setIsShowingText(!isShowingText);
      setreloaded(true);
    }, 500);
    
    return () => clearInterval(toggle);
  });
  if (!reloaded) {
    return <Loader isLoading={true} withText={true} />;
    // return <Text>asd</Text>
  }
  if (hasToken) {
    return <Redirect href="/pages/homePage" />;
  } else {
    return <Redirect href="/pages/initPage" />;
  }
};


export default function Page() {
  // get cookies or token to see if login in else set to init page
  const [temp, setTemp] = useState(true);

  const delay = async (ms) => {
    return new Promise((resolve) => 
      setTimeout(resolve, ms));
  }
  

  return (
      <View style ={styles.container}>
        <View style={styles.main}>
          <Blink/>
        </View>
      </View>
  )  
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