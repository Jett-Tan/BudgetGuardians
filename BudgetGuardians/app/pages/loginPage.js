import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Pressable,
  Alert,
  Modal
} from "react-native";
import { Link,Redirect } from 'expo-router';
import React from 'react';
import {signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import DialogInput from 'react-native-dialog-input';

import styleSetting from "../setting/setting";
import Icon from "../components/icon";
import buttonStyle from "../components/buttonStyle";
import { auth } from "../auth/firebaseConfig";

export default function Page() {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);

    const [error, setError] = React.useState('');

    const errorMap = new Map([
        ["auth/email-already-exists","Email already exists"],
        ["auth/email-already-in-use","Email already exists"],
        ["auth/invalid-email","Invalid Email"],
        ["auth/invalid-password","Invalid Password. It must be at least six characters."],
        ["auth/user-not-found","User not found"],
        ["auth/invalid-credential","Wrong password or Email"]
    ])

    function handleLogin(e) {
        e.preventDefault;
        setError("")
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("login")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.code)
            setError(errorMap.get(error.code))
        });
    }
      
    function handlePasswordReset(e) {
        console.log("resetPressed")
        console.log(e)
        e.preventDefault;     
        const resetEmail = Alert.prompt(
            'Sign in to iTunes Store',
            'Enter the Apple ID password for "hello@mobiscroll.com".',
            'Password',
            'password'
        );
         Alert.prompt('Title', 'Subtitle', text =>
           console.log('You entered ' + text)
        )
        // sendPasswordResetEmail(auth,resetEmail)
        // .then((e) => {

        // }).catch((e) => {
        //   console.log(e.code)
        // })
        // console.log(resetEmail)
        // Alert.alert("Email sent! Check email for password reset instructions.")
    }

    return (
      <View style={styles.container}>
          <View style = {styles.navigationbar}>
              <Link href="../">
                  <Text style = {styles.navigationbarText}>Back</Text>
              </Link>
          </View>
          <View style={styles.main}>
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}>
                    <View style={styles.container}>
                      <View style = {styles.navigationbar}>
                          <Text style = {styles.navigationbarText} onPress={() => setModalVisible(!modalVisible)}>Back</Text>
                          </View>
                      <View style={styles.main}>
                    <View style = {styles.card}>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>       
                    </View>
                    </View>
                  </Modal>     
                    <View style = {styles.card}>
                        <Icon size = {200}/>
                        <TextInput
                          style={styles.input}
                          onChangeText={onChangeEmail}
                          value={email}
                          placeholder="Your Email"
                          autoCapitalize="none"
                        />
                        <TextInput
                          style={styles.input}
                          onChangeText={onChangePassword}
                          value={password}
                          placeholder="Your password"
                          secureTextEntry
                        />
                        {error && <Text style = {styles.error}>Error: {error}</Text>}
                        <Pressable style = {buttonStyle.loginButtonContainer} onPress={e => handleLogin(e)}>
                          <View style={{borderRadius : 100}}>
                          <Text style = {buttonStyle.loginButton}>Login</Text>
                          </View>
                        </Pressable>
                        <Pressable style={{marginTop:15}} onPress={() => setModalVisible(true)}>
                        {/* <Pressable style={{marginTop:15}} onPress={e => handlePasswordReset(e, )}> */}
                            <Text>Forget Password?</Text>
                        </Pressable>
                        <Text>{'\n'}</Text>
                    </View>
                
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
    alignItems:"center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  rememberme: {
    flex:1,
    flexDirection:"row"
  },
  card: {
    marginTop:"auto",
    marginBottom:"auto",
    backgroundColor:"#ffffff",
    maxHeight:500,
    borderRadius:styleSetting.borderRadius.large,
    flex:1,
    justifyContent: "center",
    alignItems:"center",
    minWidth:350,
    maxWidth:450,
  },
  options:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignContent:"space-between",
    width:"auto",
    
  },
  input: {
    minWidth:300,
    maxWidth:400,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:styleSetting.borderRadius.small,
  },
  navigationbar: {
    alignSelf:"flex-start",
  },
  navigationbarText: {
    fontSize:styleSetting.size.text.smaller,
    fontWeight:"bold"
  }
});
