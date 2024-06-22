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
  
      const router = useRouter();
  
      async function handleLogin(e) {
          e.preventDefault();
          setError("");
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
          });
      }
  
      function handlePasswordReset(e) {
          e.preventDefault();
          setErrorResetEmail("");
          console.log(resetEmail);
          sendPasswordResetEmail(auth, resetEmail)
          .then(() => {
              Alert.alert("Email sent! Check email for password reset instructions.");
              setModalVisible(false);
          }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(error.code);
              setErrorResetEmail(Errors.errorGetter(error.code));
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
                                          />  
                                      <CustomButton
                                          type="primary"
                                          onPress={e => handlePasswordReset(e)} 
                                          text="Reset Password"   
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
                      />
                      <CustomInput 
                          type="password"
                          password={true}
                          onChange1={(e) => setPassword(e)} 
                          values={password}
                          placeholder="Your Password" 
                          hiddenEye={true} 
                      />
                      <CustomButton 
                          type="login" 
                          text="Login" 
                          onPress={e => handleLogin(e)}
                      />
                      {error && <Text style={styles.error}>Error: {error}</Text>}
                      <CustomButton 
                          type="link" 
                          text="Forget Password ?" 
                          onPress={() => setModalVisible(true)}
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
          backgroundColor: styleSetting.color.lightlightblue,
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
          backgroundColor: styleSetting.color.white,
          maxHeight: styleSetting.size.em500,
          borderRadius: styleSetting.size.em24,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          minWidth: styleSetting.size.em350,
          maxWidth: styleSetting.size.em450,
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
      },
      navigationbarText: {
          fontSize: styleSetting.size.em20,
          fontWeight: "bold"
      }
  });
  