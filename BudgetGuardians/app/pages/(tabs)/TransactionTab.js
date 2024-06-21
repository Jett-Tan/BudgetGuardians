import DropdownComponent from "../../components/expense"
import { View, Text, StyleSheet } from "react-native";
import ExpenseInput from "../../components/expenseInput";
import TransactionLoader from "../../components/transactionLoader";

export default function TransactionTab() {
    return (
        <>
            <View style = {[{width:"95%",height:"95%", margin: "2.5%", alignItems: "center"}]}>
                <View style={{height:"20%",width:"100%"}}>
                    <ExpenseInput/>
                </View>
                <View style={{marginBottom:"auto",height:"60%", width:"100%",alignItems:"center"}}>
                    <TransactionLoader/>
                </View>
                {/* <DropdownComponent/> */}
            </View>
            
        </>
    )
}