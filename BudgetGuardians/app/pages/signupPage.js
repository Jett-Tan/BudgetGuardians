import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Switch } from "react-native";
import { Link } from 'expo-router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from 'react';

import styleSetting from "../setting/setting";
import Icon from "../components/icon";
import buttonStyle from "../components/buttonStyle";
import { auth } from "../auth/firebaseConfig";

export default function Page() {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    const errorMap = new Map(
    [
        ["auth/email-already-exists","Email already exists"],
        ["auth/email-already-in-use","Email already exists"],
        ["auth/invalid-email","Invalid Email"],
        ["auth/invalid-password","Invalid Password. It must be at least six characters."],
        ["auth/user-not-found","User not found"]
    ])
//   console.log(auth)

  function handleSignup(e) {
    e.preventDefault;
    setError("")
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        setSuccess("Successful")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code)
        setError(errorMap.get(error.code))
    });
    // console.log('signup');
  }
  return (
    <View style={styles.container}>
      <View style = {styles.navigationbar}>
        <Link href="../">
          <Text style = {styles.navigationbarText}>Back</Text>
        </Link>
      </View>
      <View style={styles.main}>
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
            {
                error && <Text style = {
                    styles.error
                }>Error: {error}</Text>
                
            }
            {
                success && <Text style = {
                    styles.success
                }>{success}</Text>
            }
          <Button
            style = {buttonStyle.loginButtonContainer}
            title="Signup"
            onPress={e => handleSignup(e)}
          />
          <Text>{'\n'}</Text>
          <TouchableOpacity>

          </TouchableOpacity>
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
    error:{
        color:styleSetting.color.red,
    },
    success:{
        color:styleSetting.color.green,
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
    },
    options:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:"space-between",
        width:"auto",
        
    },
    input: {
        minWidth:250,
        maxWidth:300,
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
