import { Pressable, ScrollView, Text, View } from "react-native"
import BudgetInput from "../../components/budgetInput"
import BudgetLoader from "../../components/budgetLoader"

export default function BudgetTab() {
    
    return (<>
        <View style = {[{width:"95%",height:"95%",flexDirection:"row", margin: "2.5%", alignItems: "flex-start",flexWrap:"wrap"}]}>
            <View style={{height:"auto",width:"20%",minWidth:300}}>
                <BudgetInput/>
            </View>
            <View style={{height:"90%", width:"75%",minWidth:300}}>
                <BudgetLoader/>
            </View>
        </View>
    </>)
}