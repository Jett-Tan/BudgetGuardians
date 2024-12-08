import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";

const DateChooser = ({inputDate, setInputDate,style}) => {
//   const [inputDate, setInputDate] = React.useState(undefined)

  return (
        <DatePickerInput style={styles.button}
          locale="en-SG"
          label="Transaction Date"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
          display="calendar"
        />
      // <View style={styles.container}>
      // </View>
  )
}

export default DateChooser;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: '100%',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#89CFF0',
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
      height: 50,
      fontSize: "85%",
      flexWrap: 'wrap',
      shadowColor:"black",
      shadowOffset : {width: 2, height: 2},
      shadowOpacity: 0.5,
    },

  });
  
  
  
  