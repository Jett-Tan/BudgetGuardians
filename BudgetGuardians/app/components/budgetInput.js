import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState } from "react";

import { 
    updateBudgetAmountToFirestore ,
    updateBudgetToFirestore,
    getBudgetAmountFromFirestore, 
    getBudgetsFromFirestore, 
    addBudgetToFirestore, 
    liveUpdate } from "../setting/fireStoreFunctions";
import CustomInput from "./customInput";
import CustomButton from "./customButton";
import FaIcon from "./FaIcon";
import styleSetting from "../setting/setting";
import { defaultCategory } from "./defaultCategory";

export default function BudgetInput() {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    
    const [totalBudgetAmount, setTotalBudgetAmount] = useState("");

    const [categoryBudget, setCategoryBudget] = useState([]);

    const [userCategory, setUserCategory] = useState([]);

    const [categoryError, setCategoryError] = useState("");
    const [amountError, setAmountError] = useState("");

    useEffect(() => {
        
        liveUpdate((data) => {
            const budgets = data?.financialData?.budgetInfo?.budgets || [];
            setTotalBudgetAmount(data?.financialData?.budgetInfo?.totalBudgetAmount?.toString() || "");
            setCategoryBudget(budgets);
            setUserCategory(data?.financialData?.categories || defaultCategory);
        });

        
    (async () => {
        try {
            const budgetAmount = await getBudgetAmountFromFirestore();
            setTotalBudgetAmount(budgetAmount?.toString() || ""); // Convert to string

            const budgets = await getBudgetsFromFirestore();
            setCategoryBudget(budgets);
        } catch (err) {
            console.log(err);
        }
    })();
}, []);

    const validatBudget = () => {
        resetErrors()
        let valid = true
        if (!category){
            setCategoryError("Category is required.");
            valid = valid && false;
        }
        const numericAmount = Number.parseFloat(amount);
        if (typeof numericAmount === 'string' || isNaN(numericAmount)) {
            setAmountError("Only numeric amount is allowed.");
            valid = valid && false;
        } else if (numericAmount <= 0) {
            setAmountError("Positive amount only.");
            valid = valid && false;
        }
        return valid;
    }
    const validateTotalBudgetAmount = () => {
        resetErrors()
        let valid = true
        // if (!category) {
        //     setCategoryError("Category is required.");
        //     valid = valid && false;
        // }
        const numericAmount = Number.parseFloat(totalBudgetAmount);
        if (typeof numericAmount === 'string' || isNaN(numericAmount)) {
            setAmountError("Only numeric amount is allowed.");
            valid = valid && false;
        } else if (numericAmount <= 0) {
            setAmountError("Positive amount only.");
            valid = valid && false;
        }
        return valid;
    }
    const resetErrors = () => {
        setCategoryError("");
        setAmountError("");
    }
    const addBudgetAmount = async() => {
        if(validateTotalBudgetAmount() === false) {
            console.log("Validation failed");
            return;
        }

        const numericAmount = Number.parseFloat(totalBudgetAmount);
        await updateBudgetAmountToFirestore(numericAmount)
        .then((data) => {
            // console.log(data);
            alert("Budget of $" + numericAmount + " Sucessfully Set!")
        }).catch((err) => {
            console.log(err)
        })
    }

    const addCategoryBudget = async() => {
        if(validatBudget() === false) {
            console.log("Validation failed");
            return;
        }
        // console.log("add")
        const numericAmount = Number.parseFloat(amount);
        await addBudgetToFirestore({budgetAmount:numericAmount, budgetCategory:category})
        .then((data) => {
            // console.log(data);
        }).catch((err) => {
            console.log(err)
        })
    }

    const updateCategoryBudget = async() => {
        if(validatBudget() === false) {
            console.log("Validation failed");
            return;
        }
        const numericAmount = Number.parseFloat(amount);
        await updateBudgetToFirestore({budgetAmount:numericAmount, budgetCategory:category})
        .then((data) => {
            // console.log(data);
            setCategory("")
            setAmount("")
        }).catch((err) => {
            console.log(err)
        })
    }

    const updateAmount = (e) => {
        if (categoryBudget.find((x) => x.budgetCategory === e)){
            setAmount(categoryBudget.find((x) => x.budgetCategory === e).budgetAmount)
        }
    }

    const updateText = () => {
         if (category) {
            if (categoryBudget.find((x) => x.budgetCategory === category)){
                return "Update Budget for " + category
            }else {
                return "Add Budget for " + category
            }
        }else{
            return "Add Budget"
        }
    }
    const updateShadowColor = () => {
        if (category) {
            if (categoryBudget.find((x) => x.budgetCategory === category)){
                return "yellow"
            }else {
                return "green"
            }
        }else{
            return "white"
        }
    }
    return (
        <>
            <View style={{flexDirection:"row",minWidth:250,width:"100%",height:"100%",flexWrap:"wrap"}}>
                <View style={{width:"98%",paddingHorizontal:"1%",flexWrap:"wrap",flexDirection:"row"}}>
                    <View style={{width:"40%",minWidth:250,marginHorizontal:"auto",marginTop:10}}>
                        <Text  style={{marginLeft:5,marginBottom:5, color:"white"}}>Category</Text>
                        <Dropdown
                                data={userCategory}
                                style={{width: "100%",borderRadius: 10,height:60, borderColor: 'white', borderWidth: 3, padding: 5}}
                                iconColor="white"
                                containerStyle={{borderWidth: 3, marginTop:4,paddingVertical: 8,borderRadius:15,height:"auto", borderColor:"white", backgroundColor:"#111111"}}
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
                                onChange={(item) => {setCategory(item.value); updateAmount(item.value)}}
                                renderLeftIcon={() => (
                                    <FaIcon name="money-bill" size={20} color={"#7b9a6d"}/>
                                )}
                            />
                        <Text style={{color:"red",marginLeft:5,marginBottom:5}}>{categoryError}</Text>
                    </View>
                    <View style={{width:"20%",minWidth:250,marginHorizontal:"auto",marginTop:10}}>
                        <Text  style={{marginLeft:5,marginBottom:5, color:"white"}}>Amount</Text>
                        <CustomInput
                            placeholder="Amount"
                            values={amount}
                            onChange1={(e) => setAmount(e)}
                            errorExist={false}
                            containerStyle={{margin:0, marginBottom:0,padding:0, height:"auto"}}
                            inputContainerStyle={{height: 60,margin:0, borderColor: 'white', borderWidth: 3, padding: 5, borderColor:"white", backgroundColor:"#111111"}}
                            inputStyle={{width: "95%",height:50,backgroundColor:"#111111", color:"white"}}
                        />  
                        <Text style={{color:"red",marginLeft:5,marginBottom:5}}>{amountError}</Text>
                    </View>
                    <View style={{width:"20%",minWidth:250,marginHorizontal:"auto",marginTop:10}}>
                        <Text  style={{marginLeft:5,marginBottom:5}}> </Text>
                        <CustomButton
                            type={"signup"}
                            text={updateText()}
                            onPress={ (
                                () => {
                                    if (category) {
                                        if (categoryBudget.find((x) => x.budgetCategory === category)){
                                            return  updateCategoryBudget
                                        }else {
                                            return  addCategoryBudget
                                        }
                                    }else{
                                        return addCategoryBudget
                                    }
                                }
                            )()}
                            containerStyle={{width:"100%",maxWidth:"100%",height:60,margin:0, borderColor:"white",backgroundColor:"#111111", borderWidth:3,shadowColor:updateShadowColor(),shadowRadius:15,shadowOpacity:0.5}}
                            textStyle={{fontWeight:"bold",fontSize:"95%", color:"white"}}
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