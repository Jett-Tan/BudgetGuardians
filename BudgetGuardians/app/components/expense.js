import React, { useState, useEffect } from 'react';
import { auth } from "../auth/firebaseConfig";
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import {Dropdown} from 'react-native-element-dropdown'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { app, db, getFirestore, collection, addDoc } from "../auth/firebaseConfig";
import TransactionEntry from './transactionEntry';
import { addTransactionToFirestore, getUserDataFromFirestore, liveUpdate } from '../setting/fireStoreFunctions';

const data = [
  { label: 'Transport', value: 'Transport' },
  { label: 'Food', value: 'Food' },
  { label: 'Groceries', value: 'Groceries' },
  { label: 'Utilities', value: 'Utilities' },
  { label: 'Rent', value: 'Rent' },
  { label: 'Allowance', value: 'Allowance' },
  { label: 'Others', value: 'Others' },
];


const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [amount, setAmount] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const user = auth.currentUser;
  
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
    liveUpdate((data) => {
      setCurrentUser(data?.financialData?.transactions || []);
      console.log(data)
    });

    
  }, [user]);

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
  
  // Function to add expense
  const addExpense = async() => {
    const numericAmount = parseFloat(amount);
    await addTransactionToFirestore({category: value, amount:-numericAmount, date:"adsd", description:"Food"})
    .then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  // Function to add income
  const addIncome = async() => {
    const numericAmount = parseFloat(amount);
    await addTransactionToFirestore({category: value, amount:numericAmount, date:"adsd", description:"Food"})
    .then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  // Not needed anymore
  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);
    if (numericAmount < 0) {
      addExpense(numericAmount);
    } else {
      addIncome(numericAmount);
    }
  };
  
  // Not needed anymore
  const handleAddExpense = () => {
    const numericAmount = parseFloat(amount);
    if (numericAmount >= 0) {
      setErrorMessage("Can't record transaction because amount is positive but selected Add Expense!");
    } else {
      setErrorMessage("");
      addExpense(numericAmount);
    }
  };

  // Not needed anymore
  const handleAddIncome = () => {
    const numericAmount = parseFloat(amount);
    if (numericAmount < 0) {
      setErrorMessage("Can't record transaction because amount is negative but selected Add Income!");
    } else {
      setErrorMessage("");
      addIncome(numericAmount);
    }
  };

  return (<>
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
      <TextInput 
        placeholder = "Enter Amount" 
        style={styles.button}
        value={amount}
        onChangeText={setAmount}
        keyboardType='numeric'
      />
      <Pressable style={styles.button} onPress={addIncome}>
          <Text>Add Income</Text>
      </Pressable>
        <Pressable style={styles.button} onPress={addExpense}>
          <Text>Add Expense</Text>
        </Pressable>
      </View>
    </View>
    <View style={styles.container}>
    {Array.isArray(currentUser) && currentUser.map((x, index) => (
          <TransactionEntry key={index} props={{ amount: x?.amount, date: x?.date, category: x?.category }} />
        ))}
      
    </View>
  </>
    
    
    
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
  error: {
    color: 'red',
    marginTop: 10,
  },
});



