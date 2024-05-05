import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { CommonPage } from './Pages.js';
import { LoginButton, SignupButton } from './Buttons.js';
import { Logo } from './Logo.js';

export default function App() {
  return (
    <View style={styles.container}>
      <Logo/>
      <LoginButton/>
      <SignupButton/>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
