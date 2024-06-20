import React, { useState, useEffect } from 'react';
import { auth } from "../auth/firebaseConfig";
import { View, Text, Pressable, StyleSheet, TextInput, ScrollView, Modal } from 'react-native';
import {Dropdown} from 'react-native-element-dropdown'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { app, db, getFirestore, collection, addDoc } from "../auth/firebaseConfig";
import TransactionEntry from './transactionEntry';
import { addTransactionToFirestore, getUserDataFromFirestore, liveUpdate, updateTransactionToFirestore } from '../setting/fireStoreFunctions';
import DateChooser from "./datepicker" 
import { DatePickerInput } from 'react-native-paper-dates';
import CustomInput from './customInput'


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
  const [date, setDate] = useState();
  const [amountError, setAmountError] = useState("");



  const [toEditTransactionDate, setToEditTransactionDate] = useState('');
  const [toEditTransactionAmount, setToEditTransactionAmount] = useState('');
  const [toEditTransactionCatergory, setToEditTransactionCatergory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
    liveUpdate((data) => {
      setCurrentUser(data?.financialData?.transactions || []);
      // console.log(data)
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
    
    if (!isValidDate(date)) {
      setErrorMessage("Invalid date. Please select a valid date.");
      return;
    }
    const numericAmount = parseFloat(amount);
    const formatteddate = new Date(date).toLocaleDateString('en-SG')
    console.log(formatteddate) 
    await addTransactionToFirestore({category: value, amount:-numericAmount, date:formatteddate, description:"Food"})
    .then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  // Function to add income
  const addIncome = async() => {
    
    if (!isValidDate(date)) {
      setErrorMessage("Invalid date. Please select a valid date.");
      return;
    }
    const numericAmount = parseFloat(amount);
    const formatteddate = new Date(date).toLocaleDateString('en-SG')
    await addTransactionToFirestore({category: value, amount:numericAmount, date:formatteddate, description:"Food"})
    .then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  // To check if the date given by user is a valid date
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

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

  const deleteTransaction = (id) => {
    
    let newTransactions1 = currentUser.splice(0, id);
    let newTransactions2 = currentUser.splice(id, currentUser.length - 1);
    
    updateTransactionToFirestore(newTransactions1.concat(newTransactions2));
  }

  const editTransaction = (id) =>{
    setToEditTransactionAmount(currentUser[id].amount)
    setToEditTransactionCatergory(currentUser[id].category)
    setToEditTransactionDate(currentUser[id].date)
    setModalVisible(true);
  }
  return (<>
    <View style={[{minWidth:"auto",flexDirection:'row',width:"80%",minHeight:"auto",flexWrap:"wrap",height:"20%",justifyContent:"space-evenly",alignItems:"center"}]}>
      {renderLabel()}
      <Modal visible={modalVisible} transparent={true}>
        <Pressable onPress={() => setModalVisible(false)} style={{width:"100%",height:"100%",backgroundColor:"black",opacity:0.5,position:"absolute",left:0,top:0}}></Pressable>
        <View style={{width:"80%",height:"80%",backgroundColor:"white",margin:"auto",shadowColor:"black",shadowOpacity:0.5,shadowRadius:5,borderRadius:10}}>
            <View>
              <Text style={{marginLeft:20}}>Amount</Text>
              <CustomInput
                values={toEditTransactionAmount}
                onChange1={(e) => setToEditTransactionAmount(e)}
                password={false}
                placeholder={toEditTransactionAmount}
              />
            </View>
            <View>
              <Text style={{marginLeft:20}}>Category</Text>
              <CustomInput
                values={toEditTransactionCatergory}
                onChange1={(e) => setToEditTransactionCatergory(e)}
                password={false}
                placeholder={setToEditTransactionCatergory}
              />
            </View>
            <View>
              <Text style={{marginLeft:20}}>Amount</Text>
              <CustomInput
                values={toEditTransactionAmount}
                onChange1={(e) => setToEditTransactionAmount(e)}
                password={false}
                placeholder={toEditTransactionAmount}
              />
            </View>
        </View>
      </Modal>
      {/* <View style={styles.row}> */}
      <View style={{width:"25%"}}>
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
      </View>
      <View style={{width:"10%"}}>
        <TextInput 
          placeholder = "Enter Amount" 
          style={styles.button}
          value={amount}
          onChangeText={setAmount}
          keyboardType='numeric'
        />
        {amountError ? <Text style={styles.error}>{amountError}</Text> : <></>}
      </View>
      <View style={{width:"20%"}}>
        <DateChooser setInputDate={setDate} inputDate={date}/>
      </View>
      <View style={{width:"25%",flexDirection:"row",justifyContent:"space-around"}}>
        <Pressable style={styles.button} onPress={addIncome}>
            <Text>Add Income</Text>
        </Pressable>
          <Pressable style={styles.button} onPress={addExpense}>
            <Text>Add Expense</Text>
          </Pressable>
        {/* </View> */}
        {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
      </View>
      {/* Styling of transaction box is under datepicker.js*/}
    </View>
    <View style={[styles.container,{height:"60%",width:"80%"}]}>
      <ScrollView>
        {Array.isArray(currentUser) && currentUser.map((x, index) => (
              <TransactionEntry 
                deleteTransaction={() => deleteTransaction(index)} 
                editTransaction={() => editTransaction(index)} 
                key={index} 
                props={{ amount: x?.amount, date: x?.date, category: x?.category }} 
              />
            ))}
      </ScrollView>
    </View>
    
  </>
    
    
    
  );
};

export default DropdownComponent;



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    width: '60%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  button: {
    // padding: 10,
    backgroundColor: '#89CFF0',
    // marginLeft: 10,
    // flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    height: 50,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    // flex: 4,
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



