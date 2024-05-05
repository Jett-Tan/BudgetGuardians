import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { commonPage } from './Pages.js';
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your aapp!</Text>
      <MyButton></MyButton>
      <commonPage/>
      <StatusBar style="auto" />
    </View>
  );
}
function MyButton() {
  return (
    <button>
      I'm a button
    </button>
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
