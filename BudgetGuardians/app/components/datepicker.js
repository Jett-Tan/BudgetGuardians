import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";

const DateChooser = ({inputDate, setInputDate}) => {
//   const [inputDate, setInputDate] = React.useState(undefined)

  return (
      <View style={styles.container}>
        <DatePickerInput style={styles.button}
          locale="en-SG"
          label="Transaction Date"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
        />
      </View>
  )
}

export default DateChooser;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: '50%',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    button: {
      padding: 10,
      backgroundColor: '#89CFF0',
      marginLeft: 10,
      flex: 1,
      alignItems: 'center',
      width: 30,
      height: 40,
    },

  });
  
  
  
  