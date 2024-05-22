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
import { Link, Redirect, useRouter } from 'expo-router';
import React from 'react';
import {signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import DialogInput from 'react-native-dialog-input';

import styleSetting from "../setting/setting";
import ErrorMap from "../setting/errors";
import Icon from "../components/icon";
import buttonStyle from "../components/buttonStyle";
import { auth } from "../auth/firebaseConfig";

export default function Page() {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    
    const [error, setError] = React.useState('');

    const [resetEmail, onChangeResetEmail] = React.useState('');
    const [errorResetEmail, setErrorResetEmail] = React.useState('');
    
    const router = useRouter();
    
    function handleLogin(e) {
        e.preventDefault;
        setError("")
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("login")
            router.replace('../pages/homePage');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.code)
            setError(ErrorMap.get(error.code))
        });
    }
      
    function handlePasswordReset(e) {
        e.preventDefault;  
        setErrorResetEmail("")
        sendPasswordResetEmail(auth,resetEmail)
        .then(() => {
            Alert.alert("Email sent! Check email for password reset instructions.")
            setModalVisible(false)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.code)
            setErrorResetEmail(ErrorMap.get(error.code))
        })
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
                                  <Icon size = {200}/>
                                  <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeResetEmail}
                                    value={resetEmail}
                                    placeholder="Your Email"
                                    autoCapitalize="none"
                                  />
                                  {errorResetEmail && <Text style = {styles.error}>Error: {errorResetEmail}</Text>}
                                  <Pressable style = {buttonStyle.loginButtonContainer} onPress={e => handlePasswordReset(e)}>
                                      <View style={{borderRadius : 100}}>
                                          <Text style = {buttonStyle.loginButton}>Reset Password</Text>
                                      </View>
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
                            <Text>Forget Password?</Text>
                        </Pressable>
                        <Text>{'\n'}</Text>
                    </View>
                
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    button:{
        width:styleSetting.size.em600,
        padding:styleSetting.size.em10,
        fontSize:styleSetting.size.em20
    },
    container: {
        flex: 1,
        alignItems: "center",
        padding: styleSetting.size.em24,
        backgroundColor:styleSetting.color.lightlightblue,
    },
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        maxWidth: styleSetting.size.em960,
        marginHorizontal: "auto",
    },
    card: {
        marginTop:"auto",
        marginBottom:"auto",
        backgroundColor:styleSetting.color.white,
        maxHeight:styleSetting.size.em500,
        borderRadius:styleSetting.size.em24,
        flex:1,
        justifyContent: "center",
        alignItems:"center",
        minWidth:styleSetting.size.em350,
        maxWidth:styleSetting.size.em450,
    },
    error:{
        color:styleSetting.color.red,
    },
    input: {
        minWidth:styleSetting.size.em300,
        maxWidth:styleSetting.size.em400,
        height: styleSetting.size.em40,
        margin: styleSetting.size.em07,
        borderWidth: 1,
        padding: styleSetting.size.em10,
        borderRadius:styleSetting.size.em10,
    },
    navigationbar: {
        alignSelf:"flex-start",
    },
    navigationbarText: {
        fontSize:styleSetting.size.em20,
        fontWeight:"bold"
    }
});
