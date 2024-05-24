import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Switch, Pressable, Alert } from "react-native";
import { Link } from 'expo-router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from 'react';

import styleSetting from "../setting/setting";
import Icon from "../components/icon";
import buttonStyle from "../components/buttonStyle";
import ErrorMap from "../setting/errors";
import { auth } from "../auth/firebaseConfig";

export default function Page() {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [confirmPassword, onChangePassword2] = React.useState('');

    function isPasswordConfirmed(password, password2) {
        if(password && confirmPassword && password === confirmPassword) return true;
        return false;
    } 
    const handleConfirmPasswordChange = async (e) => {
        setConfirmPassword(e.target.value);
        await checkPasswords(e.target.value);
    };

    const checkPasswords = async (newConfirmPassword) => {
        // Simulate an asynchronous operation, like a delay or API call if necessary
        await new Promise(resolve => setTimeout(resolve, 500)); // Remove or replace with actual async operation
    
        if (!isPasswordConfirmed(password, newConfirmPassword)) {
          setError("Passwords do not match!");
        } else {
          setError('');
        }
      };

    function handleSignup(e) {
        e.preventDefault;
        setError("")

        if(!isPasswordConfirmed(password, confirmPassword)){
            // password is not matching, you can show error to your user
            const a = setError("Passwords do not match!")
            return a;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setSuccess("Successful")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.code)
            setError(ErrorMap.get(error.code))
        });
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
            <TextInput
                style={styles.input}
                onChangeText={handleConfirmPasswordChange}
                value={confirmPassword}
                placeholder="Re-enter Password"
                secureTextEntry
            />
            {error && <Text style = {styles.error}>Error: {error}</Text>}
            {success && <Text style = {styles.success}>{success}</Text>}

            <Pressable style = {[buttonStyle.loginButtonContainer]} onPress={e => handleSignup(e)}>
                <View style={[{borderRadius : 100}]}>
                    <Text style = {[buttonStyle.loginButton,styles.button]}>Signup</Text>
                </View>
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
