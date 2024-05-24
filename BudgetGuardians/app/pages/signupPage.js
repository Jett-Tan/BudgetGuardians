import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Switch, Pressable, Alert } from "react-native";
import { Link } from 'expo-router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from 'react';

import styleSetting from "../setting/setting";
import Icon from "../components/icon";
import buttonStyle from "../components/buttonStyle";
import ErrorMap from "../setting/errors";
import { auth } from "../auth/firebaseConfig";
import { Entypo } from "@expo/vector-icons"

export default function Page() {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [confirmPassword, onChangePassword2] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(true);
    const [showPassword2, setShowPassword2] = React.useState(true);

    // Function for delaying to check if password matching
    // Usage is just: "await delay(5000);"
    const delay = async (ms) => {
        return new Promise((resolve) => 
            setTimeout(resolve, ms));
    }

    function isPasswordConfirmed(password, confirmPassword) {
        if(password && confirmPassword && password === confirmPassword) return true;
        return false;
    } 

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

            <View style= {styles.containerForPasswords}>
            <TextInput
                style={[styles.input]}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Your Password"
                secureTextEntry={showPassword}
            />
            <Pressable 
                onPress={() => setShowPassword(prev => !prev)}
                style={styles.icon}>
                {showPassword ? (
                    <Entypo name="eye" size={24} color="black" />
                 ) : (
                    <Entypo name="eye-with-line" size={24} color="black" />
                )}
            </Pressable>
            </View>
            
            <View style= {styles.containerForPasswords}>
            <TextInput
                value={confirmPassword}
                placeholder="Re-enter Password"
                secureTextEntry={showPassword2}
                style={styles.input}
                onChangeText={ async (e) => {
                    onChangePassword2(e)
                    console.log(e)
                    await delay(100);
                    if(!isPasswordConfirmed(password, e)){
                    // password is not matching, you can show error to your user
                        const a = setError("Passwords do not match!")
                        return a;
                    } else {
                        setError('');
                    }
                }}
            />
            <Pressable 
                onPress={() => setShowPassword2(prev => !prev)}
                style={styles.icon}>
                {showPassword2 ? (
                    <Entypo name="eye" size={24} color="black" />
                 ) : (
                    <Entypo name="eye-with-line" size={24} color="black" />
                )}
            </Pressable>
            </View>

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
    containerForPasswords: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
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
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        minWidth:styleSetting.size.em300,
        maxWidth:styleSetting.size.em400,
        height: styleSetting.size.em60,
        margin: styleSetting.size.em07,
        borderWidth: 1,
        padding: styleSetting.size.em10,
        borderRadius:styleSetting.size.em10,
    },
    icon: {
        position: 'absolute',
        right: 10,
        height: '100%',
        justifyContent: 'center',
        zIndex: 2,
        userSelect: "none",
    },
    navigationbar: {
        alignSelf:"flex-start",
    },
    navigationbarText: {
        fontSize:styleSetting.size.em20,
        fontWeight:"bold"
    }
});
