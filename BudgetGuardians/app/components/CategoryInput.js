import { View, Text, StyleSheet, TextInput } from "react-native";
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

export default function CategoryInput() {
    const [category, setCategory] = useState("");


    const [userCategory, setUserCategory] = useState([]);
    
    useEffect(() => {
        
        liveUpdate((data) => {
            setUserCategory(data?.financialData?.categories || defaultCategory);
        });
}, []);

    const updateText = () => {
         if (category) {
            if (userCategory.find((x) => x.value === category)){
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
            if (userCategory.find((x) => x.value === category)){
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
                                onChangeText={(item) => {console.log(item)}}
                                searchPlaceholder="Search..."
                                placeholder="Select Category"
                                value={category}
                                onChange={(item) => {setCategory(item.value); }}
                            />
                    </View>
                    <View style={{width:"20%",minWidth:250,marginHorizontal:"auto",marginTop:10}}>
                        <Text  style={{marginLeft:5,marginBottom:5}}> </Text>
                        <CustomButton
                            type={"signup"}
                            text={updateText()}
                            onPress={ (
                                () => {
                                    if (category) {
                                        if (userCategory.find((x) => x.value === category)){
                                            return  ()=>{}
                                        }else {
                                            return  ()=>{}
                                        }
                                    }else{
                                        return ()=>{}
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