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
import { set } from "firebase/database";

export const defaultCategory = [
  { label: 'Transport', value: 'Transport' },
  { label: 'Food', value: 'Food' },
  { label: 'Groceries', value: 'Groceries' },
  { label: 'Utilities', value: 'Utilities' },
  { label: 'Rent', value: 'Rent' },
  { label: 'Allowance', value: 'Allowance' },
  { label: 'Others', value: 'Others' },
];

export default function BudgetInput() {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    
    const [totalBudgetAmount, setTotalBudgetAmount] = useState("");

    const [categoryBudget, setCategoryBudget] = useState([]);


    
    useEffect(() => {
        
        liveUpdate((data) => {
            const budgets = data?.financialData?.budgetInfo?.budgets || [];
            setTotalBudgetAmount(data?.financialData?.budgetInfo?.totalBudgetAmount?.toString() || "");
            setCategoryBudget(budgets);
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
        let valid = true
        if (!category){
            valid = valid && false;
        }
        const numericAmount = Number.parseFloat(amount);
        if (!numericAmount || numericAmount === NaN || numericAmount === 0) {
            valid = valid && false;
        }
        return valid;
    }
    const validateTotalBudgetAmount = () => {
        let valid = true
        // if (!category) {
        //     setCategoryError("Category is required.");
        //     valid = valid && false;
        // }
        const numericAmount = Number.parseFloat(totalBudgetAmount);
        if (!numericAmount || numericAmount === NaN || numericAmount === 0) {
            valid = valid && false;
        }
        return valid;
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
            {/* <View style={{flexDirection:"column",alignItems:"center",width:"90%",height:"50%",flexWrap:"wrap", padding:10,borderRadius:15,shadowRadius:15,shadowColor:"black",shadowOpacity:0.5}}>
                <Text>Total Budget</Text>
                <View style={{width:"90%",marginTop:20}}>
                    <Text style={{marginLeft:5}}>Set Total Budget Amount</Text>
                    <CustomInput
                        placeholder="Amount"
                        values={totalBudgetAmount}
                        onChange1={(e) => setTotalBudgetAmount(e)}
                        errorHandle={(e) => {
                if (!e || isNaN(Number.parseFloat(e))) {
                    return "Amount is required.";
                }
                ;
            }}
                        containerStyle={{width:"100%",marginHorizontal:"auto",minWidth:0,height:50}}
                        inputContainerStyle={{width:"100%",marginHorizontal:"auto",minWidth:0,height:50}}
                        inputStyle={{width:"95%",height:50}}
                    />
                </View>
                <CustomButton
                    type={"signup"}
                    text={"Set Budget"}
                    onPress={() => addBudgetAmount()}
                    containerStyle={{width:"65%",height:50,marginHorizontal:"auto"}}
                    textStyle={{fontWeight:"bold",fontSize:"95%"}}
                />
            </View> */}
            <View style={{flexDirection:"row",minWidth:250,width:"100%",height:"100%",flexWrap:"wrap"}}>
                {/* <View style={{width:"100%",alignItems:"center"}}>
                    <Text style={{fontWeight:"bold",textAlign:"center", color:"white"}}>Add / Edit Budget for Category</Text>
                </View> */}
                <View style={{width:"98%",paddingHorizontal:"1%",flexWrap:"wrap",flexDirection:"row"}}>
                    <View style={{width:"40%",minWidth:250,marginHorizontal:"auto",marginTop:10}}>
                        <Text  style={{marginLeft:5, color:"white"}}>Category</Text>
                        <Dropdown
                                data={defaultCategory}
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
                    </View>
                    <View style={{width:"20%",minWidth:250,marginHorizontal:"auto",marginTop:10}}>
                        <Text  style={{marginLeft:5, color:"white"}}>Amount</Text>
                        <CustomInput
                            placeholder="Amount"
                            values={amount}
                            onChange1={(e) => setAmount(e)}
                            errorHandle={(e) => {
                                if (!e) {
                                    return "Amount is required."
                                }
                                return "";
                            }}
                            containerStyle={{margin:0, padding:0, height:"auto"}}
                            inputContainerStyle={{height: 60,margin:0, borderColor: 'white', borderWidth: 3, padding: 5, borderColor:"white", backgroundColor:"#111111"}}
                            inputStyle={{width: "95%",height:50,backgroundColor:"#111111", color:"white"}}
                        />  
                    </View>
                    <View style={{width:"20%",minWidth:250,marginHorizontal:"auto",marginTop:10}}>
                        <Text  style={{marginLeft:5}}> </Text>
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