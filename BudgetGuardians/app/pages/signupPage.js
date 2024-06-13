import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Switch, Pressable, Alert } from "react-native";
import { Link, router } from 'expo-router';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";
import React from 'react';

import styleSetting from "../setting/setting";
import Icon from "../components/icon";
import buttonStyle from "../components/buttonStyle";
import Errors from "../setting/errors";
import CustomInput from "../components/customInput";
import CustomButton from "../components/customButton";
import { auth } from "../auth/firebaseConfig";
import { Entypo } from "@expo/vector-icons"

export default function Page() {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [confirmPassword, onChangePassword2] = React.useState('');

    // Function for delaying to check if password matching
    // Usage is just: "await delay(5000);"
    const delay = async (ms) => {
        return new Promise((resolve) => 
            setTimeout(resolve, ms));
    }

    function isPasswordConfirmed(password,confirmPassword) {
        return (password && confirmPassword && password === confirmPassword) 
    } 
    
    function checkValid(){
        if (Errors.handleError(email,"email") !== '') {
            return false;
        }
        if (Errors.handleError(password,"password") !== '') {
            return false;
        }
        if (Errors.handleError(confirmPassword,"confirm",{password:password,confirmPassword:confirmPassword}) !== '') {
            return false;
        }
        if(!isPasswordConfirmed(password, confirmPassword)){
            return false;
        }
        return true;
    }
    function handleSignup(e) {
        e.preventDefault;
        setError("")

        if(!checkValid()){
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setSuccess("Successful")
            // console.log(auth)   
            delay(1000)
            sendEmailVerification(auth.currentUser)
            .then(() => {
                setSuccess("Email verification sent!")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.code)
                setError(Errors.errorGetter(error.code))
                return;
            });
            router.push('./createProfilePage')
            // auth.signOut() 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.code)
            setError(Errors.errorGetter(error.code))
            return;
        });
        
        
    }
    
    async function handlePasswordChange(pwd,confirm = false) {
        if (!confirm) {
            onChangePassword(pwd)
            // console.log(pwd)
            await delay(100);
        } else {
            onChangePassword2(pwd)
            // console.log(pwd)
            await delay(100);
        }
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
            <Icon size = {150}/>
            <CustomInput
                type="email"
                placeholder="Your Email"
                onChange1={e => onChangeEmail(e)}
                values1={email}
            />
            <CustomInput
                password = {true}
                placeholder="Your Password"
                onChange1={e => handlePasswordChange(e)}
                onChange2={e => handlePasswordChange(e,true)}
                values1={password}
                values2={confirmPassword}
                hiddenEye = {true}
                type="confirm"
            />
            <CustomButton
                type="signup"
                onPress={handleSignup}
                text="Signup"
            />
            {error && <Text style = {styles.error}>Error: {error}</Text>}
            {success && <Text style = {styles.success}>{success}</Text>}
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
        minHeight:styleSetting.size.em400,
        borderRadius:styleSetting.size.em24,
        flex:1,
        justifyContent: "center",
        alignItems:"center",
        minWidth:styleSetting.size.em350,
        maxWidth:styleSetting.size.em450,
    },
    error:{
        color:styleSetting.color.red,
        textAlign: "center",
    },
    success:{
        color:styleSetting.color.forestgreen,
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
        paddingLeft: styleSetting.size.em10,
        paddingRight: styleSetting.size.em10,
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
