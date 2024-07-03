import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import {DatePickerInput} from 'react-native-paper-dates';

import { addTransactionToFirestore, getUserDataFromFirestore } from "../setting/fireStoreFunctions";
import CustomInput from "./customInput";
import CustomButton from "./customButton";
import FaIcon from "./FaIcon";
import styleSetting from "../setting/setting";
import { defaultCategory } from "./defaultCategory"

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
        .then(async () => {
            // console.log(data)
            await getUserDataFromFirestore().then((data) => {
                const financialData = data.financialData;
                const transactions = financialData.transactions;
                const budgetAmt = financialData.budgetInfo.budgets.find((budget) => budget.budgetCategory === category).budgetAmount || 0;
                const totalExpense = transactions.filter((transaction) => transaction.amount < 0 && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0);
                const totalIncome = transactions.filter((transaction) => transaction.amount > 0 && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0);
                const remainingBudget = budgetAmt + totalExpense + totalIncome;
                if (budgetAmt > 0 && remainingBudget < 0) {
                    alert(`You have exceeded your budget for ${category}! by $${-remainingBudget}!`);
                } else if (budgetAmt > 0 && remainingBudget < budgetAmt*0.3) {
                    alert(`You are close to exceeding your budget for ${category}! You have $${remainingBudget} left!`);
                } else if (budgetAmt > 0 && remainingBudget === 0) {
                    alert(`You have fully utilized your budget for ${category}!`);
                }
            }).catch((err) => {
                console.log(err)
            });
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
            // console.log(data)
            // console.log(description)
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
            <View style={{width:"100%",flexDirection:"row",height:"100%"}}>
                <View style={{padding:10,width:"80%",height:"100%",alignContent:"space-between"}}>
                    <View style={{minHeight:"50%",height:"auto",width:"100%",flexDirection:"row",justifyContent:"space-between",flexWrap:"wrap"}}>
                        <View style={{width:"30%",minWidth:300,maxHeight:"100%",height:'auto',paddingBottom:10}}>
                            <Text style={{fontSize: 13, fontWeight: 'bold',marginBottom:5,marginLeft:10, color: "white"}}>Transaction Type</Text>
                            <Dropdown
                                data={defaultCategory}
                                style={{width: "100%",borderRadius: 10,height:60, borderColor: 'white', borderWidth: 3, padding: 5}}
                                iconColor="white"
                                containerStyle={{borderWidth: 3, marginTop:4,paddingVertical: 8,borderRadius:15, borderColor:"white", backgroundColor:"#111111"}}
                                placeholderStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap', color:"white"}}
                                selectedTextStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap',  color:"white"}}
                                inputSearchStyle={{fontSize: 16,height:50,whiteSpace: 'nowrap',  color:"white"}}
                                itemContainerStyle={{backgroundColor: "#111111"}}
                                itemTextStyle={{color:"white"}}
                                labelField="label"
                                valueField="value"
                                maxHeight={300}
                                activeColor='#2596be'
                                search
                                searchPlaceholder="Search..."
                                placeholder="Select Category"
                                value={category}
                                onChange={(item) => setCategory(item.value)}
                                renderLeftIcon={() => (
                                    <FaIcon name="money-bill" size={20} color={"#7b9a6d"}/>
                                )}
                            />
                            <Text style={styles.errorText}>{categoryError}</Text>
                        </View>
                        <View style={{width:"30%",minWidth:300,maxHeight:"100%",height:"auto",paddingBottom:10}}>
                            <Text style={{fontSize: 13, fontWeight: 'bold',marginBottom:5,marginLeft:10, color: "white"}}>Amount</Text>
                            <CustomInput
                                placeholder="Enter Amount"
                                
                                values={amount}
                                onChange1={(x) => setAmount(x)}
                                containerStyle={{margin:0, padding:0, height:"auto"}}
                                inputContainerStyle={{height: 60,margin:0, borderColor: 'white', borderWidth: 3, padding: 5, borderColor:"white", backgroundColor:"#111111"}}
                                inputStyle={{width: "95%",height:50,backgroundColor:"#111111", color:"white"}}
                                errorExist={false}
                            />  
                            <Text style={styles.errorText}>{amountError}</Text>
                        </View>
                        <View style={{width:"30%",minWidth:300,maxHeight:"100%",height:"auto", paddingBottom:10}}>
                            <Text style={{fontSize: 13, fontWeight: 'bold',marginBottom:5,marginLeft:10, color: "white"}}>Transaction Date</Text>
                            <DatePickerInput 
                                style={{backgroundColor:"#111111",color:"white",borderRadius:10,borderTopRightRadius:10,borderTopLeftRadius:10,height:54,alignSelf:"flex-start",padding:0,borderWidth:3,borderColor:"white"}}
                                underlineStyle={{borderWidth:0}}
                                underlineColor="white"
                                outlineStyle={{borderWidth:0}}
                                selectionColor="white"
                                iconColor="white"
                                textColor="white"
                                activeUnderlineColor="white"
                                color
                                placeholderTextColor={"white"}
                                locale="en-SG"
                                value={date}
                                onChange={(d) => setDate(d)}
                                onChangeText={(d) => {typeof d === Date ? setDate(d) : setDate("")}}
                                inputMode="start"
                                label="Transaction Date"
                                display="calendar"
                            />
                            <Text style={styles.errorText}>{dateError}</Text>
                        </View>
                    </View>
                    <View style={{minHeight:"50%",height:"auto",width:"100%",flexDirection:"row",justifyContent:"space-between",flexWrap:"wrap"}}>
                        <View style={{width:"100%",minWidth:300}}>
                            <Text style={{fontSize: 13, fontWeight: 'bold', marginLeft:10,marginBottom:5,color:"white"}}>Description</Text>
                            <CustomInput
                                placeholder="Enter Descriptions (Optional)"
                                values={description}
                                onChange1={(x) => setDescription(x)}
                                containerStyle={{width: "100%",minWidth:"100%",marginLeft:0,margin:0}}
                                inputContainerStyle={{width: "100%",minWidth:"100%",marginLeft:0,margin:0, height: 60, borderColor: 'black', borderWidth: 3, padding: 5,borderColor:"white", backgroundColor:"#111111"}}
                                inputStyle={{width: "100%",minWidth:"100%", borderColor:"white", backgroundColor:"#111111", color:"white"}}
                            /> 
                            <Text style={styles.errorText}> </Text>
                        </View>
                    </View>
                </View>
                <View style={{padding:10,width:"20%",height:"100%",flexDirection:"column"}}> 
                    <View style={{width:"100%",alignItems:"center"}}>
                        <Text style={{fontSize: 13, fontWeight: 'bold', marginLeft:10,marginBottom:5,color:"white"}}> </Text>
                        <CustomButton
                            text={"Add Income"}
                            onPress={() => {addIncome()}}
                            containerStyle={[{height:60,backgroundColor:"#111111",borderColor:"white",borderWidth:3,width:"90%",margin:0,padding:0},{shadowColor:"green",shadowRadius :15,shadowOpacity: 0.5}]}
                            textStyle={{fontSize: 20,color:"white",fontWeight:"bold"}}
                        />
                        <Text style={[styles.errorText,{fontSize:19}]}> </Text>
                    </View>
                    <View style={{width:"100%",alignItems:"center"}}>
                        <Text style={{fontSize: 13, fontWeight: 'bold', marginLeft:10,marginBottom:5,color:"white"}}> </Text>
                        <CustomButton 
                            text={"Add Expense"}
                            onPress={() => {addExpense()}}
                            containerStyle={[{height:60,backgroundColor:"#111111",borderColor:"white",borderWidth:3,width:"90%",margin:0,padding:0},{shadowColor:"red",shadowRadius :15,shadowOpacity: 0.5}]}
                            textStyle={{fontSize: 20,color:"white",fontWeight:"bold"}}
                        />
                        <Text style={[styles.errorText,{fontSize:19}]}> </Text>
                    </View>
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    errorText:{color: 'red', fontSize: 12, marginLeft: 10},

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