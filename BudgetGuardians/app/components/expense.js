import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {Dropdown} from 'react-native-element-dropdown'
const Tasks = () => {
    return (
    <View style={styles.container}>
        <View style={styles.row}>
            <Pressable style={styles.button} >Add Income </Pressable>
            <Pressable style={styles.button}>Add Expense</Pressable>
        </View>
    </View>
 );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    button: {
      padding: 10,
      backgroundColor: '#DDDDDD',
      marginHorizontal: 10,
    },
  });

export default Tasks;