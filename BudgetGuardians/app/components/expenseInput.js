import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import {DatePickerInput} from 'react-native-paper-dates';

import { addTransactionToFirestore } from "../setting/fireStoreFunctions";
import CustomInput from "./customInput";
import CustomButton from "./customButton";
import FaIcon from "./FaIcon";
import styleSetting from "../setting/setting";

export const defaultCategory = [
  { label: 'Transport', value: 'Transport' },
  { label: 'Food', value: 'Food' },
  { label: 'Groceries', value: 'Groceries' },
  { label: 'Utilities', value: 'Utilities' },
  { label: 'Rent', value: 'Rent' },
  { label: 'Allowance', value: 'Allowance' },
  { label: 'Others', value: 'Others' },
];

export default function ExpenseInput() {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const [categoryError, setCategoryError] = useState("");
    const [amountError, setAmountError] = useState("");
    const [dateError, setDateError] = useState("");

    const reset =() => {
        setCategory("");
        setAmount("");
        setDate("");
        setCategoryError("");
        setAmountError("");
        setDateError("");
        setDescription("");
    }
    const validate = () => {
        let valid = true
        if (!category) {
            setCategoryError("Category is required.");
            valid = valid && false;
        }
        const numericAmount = Number.parseFloat(amount);
        if (!numericAmount || numericAmount === NaN || numericAmount === 0) {
            setAmountError("Amount is required.");
            valid = valid && false;
        }
        if (!isValidDate(date)) {
            setDateError("Invalid date. Please select a valid date.");
            valid = valid && false;
        }
        return valid;
    }
    // Function to add expense
    const addExpense = async() => {
        if(validate() === false) {
            return;
        }

        const numericAmount = parseFloat(amount);
        const formatteddate = new Date(date).toLocaleDateString('en-SG')
        await addTransactionToFirestore({category: category, amount:-numericAmount, date:formatteddate, description:description || null})
        .then((data) => {
            console.log(data)
            reset();
        }).catch((err) => {
            console.log(err)
        })
    }

    // Function to add income
    const addIncome = async() => {
        if(validate() === false) {
            return;
        }

        const numericAmount = Number.parseFloat(amount);
        const formatteddate = new Date(date).toLocaleDateString('en-SG')
        await addTransactionToFirestore({category: category, amount:numericAmount, date:formatteddate, description:description || null})
        .then((data) => {
            console.log(data)
            console.log(description)
            reset();
        }).catch((err) => {
            console.log(err)
        })
    }

    // To check if the date given by user is a valid date
    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date);
    };

    return (
        <>
            <View style={{flexDirection:"row",alignSelf:"center",justifyContent:"space-evenly",width:"70%",flexWrap:"wrap", height:"auto",paddingBottom:10,borderRadius:15,shadowRadius:15,shadowColor:"black",shadowOpacity:0.5}}>
                <View style={{width:"80%",maxWidth:"100%",paddingHorizontal:10}}>
                    <View style={{flexDirection:"row", justifyContent:"space-between",flexWrap:"wrap"}}>
                        <View  style={{}}>
                            <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10}}>Transaction Type</Text>
                            <Dropdown
                                data={defaultCategory}
                                style={{width: 220,borderRadius: 10,height:50, borderColor: 'black', borderWidth: 1, padding: 5,marginVertical:5}}
                                placeholderStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap'}}
                                selectedTextStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap'}}
                                inputSearchStyle={{fontSize: 16,justifyContent:"center",height:50, whiteSpace: 'nowrap'}}
                                labelField="label"
                                valueField="value"
                                maxHeight={300}
                                search
                                searchPlaceholder="Search..."
                                placeholder="Select Category"
                                value={category}
                                onChange={(item) => setCategory(item.value)}
                                renderLeftIcon={() => (
                                    <FaIcon name="money-bill" size={20}/>
                                )}
                            />
                            <Text style={{color: 'red', fontSize: 12, marginLeft: 10}}>{categoryError}</Text>
                        </View>
                        <View style={{}}>
                            <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10}}>Amount</Text>
                            <CustomInput
                                placeholder="Enter Amount"
                                values={amount}
                                onChange1={(x) => setAmount(x)}
                                containerStyle={{width: 150,margin:0,marginVertical:5,minWidth:150, justifyContent: 'center', alignItems: 'center'}}
                                inputContainerStyle={{width: 150,minWidth:150, height: 50, borderColor: 'black', borderWidth: 1, padding: 5, margin: 5}}
                                inputStyle={{width: 130,minWidth:130}}
                                errorExist={false}
                            />  
                            <Text style={{color: 'red', fontSize: 12, marginLeft: 10}}>{amountError}</Text>
                        </View>
                        <View style={{}}>
                            <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10}}>Transaction Date</Text>
                            <DatePickerInput 
                                style={{width:270,fontSize:13,maxHeight:50,height:50,minWidth:0, backgroundColor:"white",borderRadius:10,borderTopRightRadius:10,borderTopLeftRadius:10,borderWidth:1,borderColor:"black"}}
                                locale="en-SG"
                                value={date}
                                onChange={(d) => setDate(d)}
                                inputMode="start"
                                label="Transaction Date"

                                display="calendar"
                                activeUnderlineColor="black"
                            />
                            <Text style={{color: 'red', fontSize: 12, marginLeft: 10}}>{dateError}</Text>
                        </View>
                    </View>
                    <View>
                        <View style={{}}>
                            <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10}}>Description</Text>
                            <CustomInput
                                placeholder="Enter Descriptions (Optional)"
                                values={description}
                                onChange1={(x) => setDescription(x)}
                                containerStyle={{width: "100%",margin:0,marginVertical:5,minWidth:"100%", justifyContent: 'center', alignItems: 'center'}}
                                inputContainerStyle={{width: "100%",minWidth:"100%", height: 50, borderColor: 'black', borderWidth: 1, padding: 5, margin: 5}}
                                inputStyle={{width: "100%",minWidth:"100%"}}
                                errorExist={false}
                            />  
                            <Text style={{color: 'red', fontSize: 12, marginLeft: 10}}>{amountError}</Text>
                        </View>
                    </View>
                </View>
                <View style={{paddingHorizontal:10,height:"auto",width:"auto",maxHeight:"100%",justifyContent:"space-between",maxWidth:"100%"}}>
                    <View style={{marginVertical:5,width:"100%"}}>
                        <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10}}>    </Text>
                        <CustomButton
                            text={"Add Income"}
                            onPress={() => {addIncome()}}
                            containerStyle={[styles.button,{width:"100%"}]}
                            textStyle={{fontSize: 13}}
                        />
                    </View>
                    <View style={{marginVertical:5,width:"100%"}}>
                        <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10}}>    </Text>
                        <CustomButton
                            text={"Add Expense"}
                            onPress={() => {addExpense()}}
                            containerStyle={styles.button}
                            textStyle={{fontSize: 13}}
                        />
                    </View>
                </View>
                
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    button:{
        backgroundColor:styleSetting.color.lightblue,
        width: "100%",
        minWidth: 100,
        height: 50,
        fontSize: "85%",
        flexWrap: 'wrap',
        shadowColor:"black",
        margin:0,
        shadowOffset : {width: 2, height: 2},
        shadowOpacity: 0.5,
    }
});