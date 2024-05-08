import { StyleSheet, Text, View, Button } from "react-native";
import { Link, router, Pressable } from 'expo-router';


export default function Page() {
  // get cookies or token to see if login in else set to init page
  const hasToken = false;
  
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style = {styles.buttonBlock}>
          <Link style={styles.button} push href="/Login">Login</Link>
        </View>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
        <Link href="/home">home</Link>
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  buttonBlock: {
    height: 30,
    alignItems:'center'
  },
  button: {
    backgroundColor:'#00',
    height: 30,
    color: '#000000'
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
