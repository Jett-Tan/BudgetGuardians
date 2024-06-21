import DropdownComponent from "../../components/expense"
import { View, Text, StyleSheet } from "react-native";
import ExpenseInput from "../../components/expenseInput";
import TransactionLoader from "../../components/transactionLoader";
import styleSetting from "../../setting/setting";

export default function TransactionTab() {
    return (
        <>
            <View style = {[{width:"95%",height:"95%", margin: "2.5%", alignItems: "center"}]}>
                <View style={{height:"auto",width:"100%",marginBottom:10}}>
                    <ExpenseInput/>
                </View>
                <View style={{marginBottom:"auto",height:"auto",maxHeight:"60%", width:"100%",alignItems:"center"}}>
                    <TransactionLoader/>
                </View>
                {/* <DropdownComponent/> */}
            </View>
            
        </>
    )
}