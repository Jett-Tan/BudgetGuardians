import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const data = [
  { label: 'Transport', value: '1', icon: 'car' },
  { label: 'Food', value: '2', icon: 'cutlery' },
  { label: 'Groceries', value: '3', icon: 'shopping-cart' },
  { label: 'Utilities', value: '4', icon: 'bolt' },
  { label: 'Rent', value: '5', icon: 'home' },
  { label: 'Allowance', value: '6', icon: 'money' },
  { label: 'Others', value: '7', icon: 'ellipsis-h' },
];

const MultiSelectComponent = () => {
  const [selected, setSelected] = useState([]);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <FontAwesome
          style={styles.icon}
          color="#33CBFF"
          name={item.icon}
          size={20}
        />
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  const renderSelectedItem = (item, unSelect) => (
    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
      <View style={styles.selectedStyle}>
        <FontAwesome
          style={styles.icon}
          color="#33CBFF"
          name={item.icon}
          size={20}
        />
        <Text style={styles.textSelectedStyle}>{item.label}</Text>
        <AntDesign color="black" name="delete" size={17} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={selected}
        search
        searchPlaceholder="Search..."
        onChange={item => {
          setSelected(item);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
        renderItem={renderItem}
        renderSelectedItem={renderSelectedItem}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: "95%",
    margin: "2.5%",
    alignItems: "center"
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 10, // Add margin to separate text from icon
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 10, // Adjusted margin to separate icon from text
  },
  item: {
    flexDirection: 'row', // Use flex direction row for horizontal alignment
    alignItems: 'center', // Center items vertically
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
    marginLeft: 10, // Add margin to separate text from icon
  },
});
