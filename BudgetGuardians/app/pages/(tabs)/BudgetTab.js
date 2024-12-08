import { Pressable, ScrollView, Text, View } from "react-native"
import BudgetInput from "../../components/budgetInput"
import BudgetLoader from "../../components/budgetLoader"

export default function BudgetTab() {
    
    return (<>
        <View style = {[{width:"95%",height:"90%",flexDirection:"row", margin: "2.5%", alignItems: "flex-start",justifyContent:"flex-start",flexDirection:"column",flexWrap:"wrap",minWidth:250}]}>
            <View style={{height:"auto",minHeight:"17.5%",width:"90%",alignItems:"center",justifyContent:"center",marginHorizontal:"auto",minWidth:250}}>
                <BudgetInput/>
            </View>
            <View style={{height:"60%", width:"90%",alignItems:"center",justifyContent:"center",marginHorizontal:"auto",marginVertical:20,minWidth:300}}>
                <BudgetLoader/>
            </View>
        </View>
    </>)
}