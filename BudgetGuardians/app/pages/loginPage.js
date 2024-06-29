import {
    StyleSheet,
    Text,
    View,
    Alert,
    Modal
  } from "react-native";
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import styleSetting from "../setting/setting";
import Errors from "../setting/errors";
import Icon from "../components/icon";
import CustomInput from "../components/customInput";
import CustomButton from "../components/customButton";
import { auth } from "../auth/firebaseConfig";

export default function Page() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);

    const [error, setError] = React.useState('');

    const [resetEmail, setResetEmail] = React.useState('');
    const [errorResetEmail, setErrorResetEmail] = React.useState('');
    const [shadowColor, setShadowColor] = React.useState("white");
    const [shadowColorReset, setShadowColorReset] = React.useState("white");
    
    const router = useRouter();

    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        setShadowColor("white");
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            router.replace('../pages/homePage');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.code);
            setError(Errors.errorGetter(error.code));
            setShadowColor(styleSetting.color.neonRed);
        });
    }
  
    function handlePasswordReset(e) {
        e.preventDefault();
        setErrorResetEmail("");
        setShadowColorReset("white");
        sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
            alert("If an account exists, an email will be sent. Check email for password reset instructions!");
            setModalVisible(false);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.code);
            setErrorResetEmail(Errors.errorGetter(error.code));
            setShadowColorReset(styleSetting.color.neonRed);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigationbar}>
                <Link href="../">
                    <Text style={styles.navigationbarText}>Back</Text>
                </Link>
            </View>
            <View style={styles.main}>
                <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                        <View style={styles.container}>
                            <View style={styles.navigationbar}>
                                <Text style={styles.navigationbarText} onPress={() => setModalVisible(!modalVisible)}>Back</Text>
                            </View>
                            <View style={styles.main}>
                                <View style={styles.card}>
                                    <Icon size={150}/>
                                    <CustomInput
                                            type="email"
                                            onChange1={(e) => setResetEmail(e)}
                                            values={resetEmail}
                                            placeholder="Your Email"
                                            containerStyle={{width:"90%",marginHorizontal:"auto",minWidth:0,height:50,marginVertical:15, borderColor:"white", borderWidth:3, borderRadius:10, backgroundColor:"#111111"}}
                                            inputContainerStyle = {{minWidth:"10%", backgroundColor:"#111111", height:40, borderColor:"transparent", borderWidth:3, borderRadius:10,paddingLeft: 10 }}
                                            inputStyle = {{color:"white"}}
                                        />  
                                    <CustomButton
                                        type="primary"
                                        onPress={e => handlePasswordReset(e)} 
                                        text="Reset Password"
                                        containerStyle={{width:"90%",maxWidth:"100%",marginHorizontal:"auto",minWidth:0,height:50,marginVertical:30, borderColor:"white", borderWidth:3, borderRadius:10, backgroundColor:styleSetting.color.lightblue,shadowColor:shadowColorReset,shadowRadius:15,shadowOpacity:0.5}}
                                        textStyle={{fontSize:styleSetting.size.em24,fontWeight:"bold",color:"white"}}   
                                    />
                                    {errorResetEmail && <Text style={styles.error}>Error: {errorResetEmail}</Text>}
                                <View style={{height:160}}></View>
                                </View>       
                            </View>
                        </View>
                </Modal>     
                <View style={styles.card}>
                    <Icon size={150}/>
                    <CustomInput 
                        type="email" 
                        onChange1={(e) => setEmail(e)} 
                        values={email}
                        placeholder="Your Email" 
                        containerStyle={{width:"80%",marginLeft:0,minWidth:0,height:50,marginVertical:5, borderColor:"white", borderWidth:3, borderRadius:10, backgroundColor:"#111111"}}
                        inputContainerStyle = {{minWidth:"10%", backgroundColor:"#111111", height:40, borderColor:"transparent", borderWidth:3, borderRadius:10,paddingLeft: 10 }}
                        inputStyle = {{color:"white"}}
                    />
                    <CustomInput 
                        type="password"
                        password={true}
                        onChange1={(e) => setPassword(e)} 
                        values={password}
                        placeholder="Your Password" 
                        hiddenEye={true} 
                        containerStyle={{width:"80%",marginLeft:0,minWidth:0,height:50,marginVertical:40, borderColor:"white", borderWidth:3, borderRadius:10, backgroundColor:"#111111"}}
                        inputContainerStyle = {{minWidth:"20%", backgroundColor:"#111111", height:40, borderColor:"transparent", borderWidth:3, borderRadius:10,paddingLeft: 10 }}
                        inputStyle = {{color:"white"}}
                    />
                    <CustomButton 
                        type="login" 
                        text="Login" 
                        onPress={e => handleLogin(e)}
                        containerStyle={{width:"80%",marginLeft:0,minWidth:0,height:50,marginVertical:30, borderColor:"white", borderWidth:3, borderRadius:10, backgroundColor:styleSetting.color.lightblue,shadowColor:shadowColor,shadowRadius:10,shadowOpacity:0.5}}
                        textStyle={{fontSize:styleSetting.size.em24,fontWeight:"bold",color:"white"}}
                    />
                    {error && <Text style={styles.error}>Error: {error}</Text>}
                    <CustomButton 
                        type="link" 
                        text="Forget Password ?" 
                        onPress={() => setModalVisible(true)}
                        
                    /> 
                    
                    <CustomButton 
                        type="link" 
                        text="Don't have an account ? Sign Up Now!" 
                        onPress={() => router.push("./signupPage")}
                    /> 
                    <Text>{'\n'}</Text>
                </View>
            </View>
        </View>
    );
}
  
  const styles = StyleSheet.create({
      button: {
          width: styleSetting.size.em600,
          padding: styleSetting.size.em10,
          fontSize: styleSetting.size.em20
      },
      container: {
          flex: 1,
          alignItems: "center",
          padding: styleSetting.size.em24,
          backgroundColor: styleSetting.color.lightblack,
      },
      main: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          maxWidth: styleSetting.size.em960,
          marginHorizontal: "auto",
      },
      card: {
          marginTop: "auto",
          marginBottom: "auto",
          backgroundColor: styleSetting.color.lightblack,
          maxHeight: styleSetting.size.em600,
          borderRadius: styleSetting.size.em24,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          minWidth: styleSetting.size.em350,
          maxWidth: styleSetting.size.em450,
          borderColor: "white",
          borderWidth: 3,
      },
      error: {
          color: styleSetting.color.red,
      },
      input: {
          minWidth: styleSetting.size.em300,
          maxWidth: styleSetting.size.em400,
          height: styleSetting.size.em40,
          margin: styleSetting.size.em07,
          borderWidth: 1,
          padding: styleSetting.size.em10,
          borderRadius: styleSetting.size.em10,
      },
      navigationbar: {
          alignSelf: "flex-start",
          backgroundColor: "#111111"
      },
      navigationbarText: {
          fontSize: styleSetting.size.em20,
          fontWeight: "bold",
          color: "white",
      }
  });
  