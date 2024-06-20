import DropdownComponent from "../../components/expense"
import { View, Text, StyleSheet } from "react-native";

export default function TransactionTab() {
    return (
        <>
            <View style = {[{width:"95%",height:"95%", margin: "5%", alignItems: "center"}]}>
                <DropdownComponent/>
            </View>
            
        </>
    )
}