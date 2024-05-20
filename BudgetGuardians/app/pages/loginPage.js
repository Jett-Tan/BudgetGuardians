import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Switch } from "react-native";
import { Link } from 'expo-router';
import React from 'react';
import styleSetting from "../setting/setting";
import Icon from "../components/icon";
import buttonStyle from "../components/buttonStyle";
import { auth } from "../auth/firebaseConfig";

export default function Page() {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // console.log(auth)
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
          <View style = {styles.options}>
            <View style = {styles.rememberme}>
              <Switch
                style ={
                  {height:10}
                }
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text 
                style ={
                  {fontSize:12}
                }>Remenber me</Text>
            </View>
            <View>
              <Link href={"/"}>
                <Text style ={
                  {fontSize:12}
                }>Forget Password?</Text>
              </Link>
            </View>
          </View>
          <Button
            style = {buttonStyle.loginButtonContainer}
            title="Login"
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
