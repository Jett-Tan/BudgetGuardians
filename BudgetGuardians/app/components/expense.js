import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {Dropdown} from 'react-native-element-dropdown'
import FontAwesome from '@expo/vector-icons/FontAwesome';



const data = [
  { label: 'Transport', value: '1' },
  { label: 'Food', value: '2' },
  { label: 'Groceries', value: '3' },
  { label: 'Utilities', value: '4' },
  { label: 'Rent', value: '5' },
  { label: 'Allowance', value: '6' },
  { label: 'Others', value: '7' },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Transaction Type
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <View style={styles.row}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Transaction Type' : '-'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <FontAwesome
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="money"
            size={20}
          />
        )}
      />
      <Pressable style={styles.button}>
          <Text>Add Income</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text>Add Expense</Text>
        </Pressable>
      </View>
    </View>
    
  );
};

export default DropdownComponent;



  

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
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
    flex: 2,
    alignItems: 'center',
    width: 30,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 4,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontSize: 14,
    marginRight:50,
  },
  placeholderStyle: {
    fontSize: 16,
    whitespace: 'nowrap',
  },
  selectedTextStyle: {
    fontSize: 16,
    whitespace: 'nowrap',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});



