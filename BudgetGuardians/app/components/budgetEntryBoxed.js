import { Text, View, Pressable,StyleSheet, Modal, } from "react-native";
import styleSetting from "../setting/setting"
import PieChart from 'react-native-pie-chart'
import FaIcon from "./FaIcon";
import { useState } from "react";

export default function BudgetEntryBoxed({
    onPress = (e) => {console.log(e);}, //modal
    props = {
        category: "",
        amount: 0,
        amountSpent: 0,
        additionalIncome: 0,
    },
    deleteBudget = (e) => {console.log(e);},
    editBudget = (e) => {console.log(e);},
    showbutton = true,
    clickable = false,
}) {
    var totalBudget = Math.abs(props.amount)
    var totalSpent =  Math.abs(props.amountSpent)  
    var additionalIncome =  Math.abs(props.additionalIncome)
    var overSpent =  0
    var remaining = 0

    if (additionalIncome > 0) {
        if (additionalIncome > totalSpent) {
            totalSpent =0;
            additionalIncome -= totalSpent
        } else if (additionalIncome < totalSpent) {
            totalSpent -= additionalIncome
            additionalIncome = 0
        } else {
            totalSpent = 0
            additionalIncome = 0
        }
    }
    if (totalBudget > totalSpent) {
        remaining = totalBudget - totalSpent
    }
    if (totalSpent > totalBudget) {
        overSpent = totalSpent - totalBudget
    }
    const displayNumber = remaining ? remaining + additionalIncome: -overSpent


    var absTotalBudget = Math.abs(totalBudget)
    var absRemaining = Math.abs(remaining)
    var absAdditionalIncome = Math.abs(additionalIncome)
    var absTotalSpent = Math.abs(totalSpent)
    var absOverSpent = Math.abs(overSpent)


    const widthAndHeight = 170
    const series = [
        absOverSpent,
        absTotalSpent,
        absAdditionalIncome,
        absRemaining
    ]

    const sliceColor = [
        "#E94243",
        "#EF6F71",
        "#6FEFED",
        "#B0EF6F"
    ]

    const [modalVisible, setModalVisible] = useState(false)
    

    return (
        <>
            <Modal visible={modalVisible} transparent={true}>
                <Pressable onPress={()=>setModalVisible(false)} style={{width:"100%",height:"100%",zIndex:-1,position:"absolute",backgroundColor:"black",opacity:0.2}}></Pressable>
                <View style={{margin:"auto"}}>
                    <View style={{width:300,height:300,backgroundColor:"#111111",borderRadius:15,shadowColor:"black",shadowRadius:5,shadowOpacity:0.5, borderColor:"white", borderWidth: 3}}>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={{fontSize:20,fontWeight:"bold",margin:15, color:"white"}}>{props.category}</Text>
                            <Pressable onPress={() => setModalVisible(false)}>
                                <FaIcon name="x" size={20} style={{margin:15}} color={"white"}/>
                            </Pressable>
                        </View>
                        <View style={{margin:15}}>
                            <Text style={{fontSize:20,fontWeight:"bold", color:"white"}}>Budget: ${absTotalBudget.toFixed(2)}</Text>
                            <Text style={{fontSize:20,fontWeight:"bold", color:"white"}}>Spent: ${absTotalSpent.toFixed(2)}</Text>
                            <Text style={{fontSize:20,fontWeight:"bold", color:"white"}}>Added Income: ${absAdditionalIncome.toFixed(2)}</Text>
                            {
                                absRemaining > 0 ? 
                                <Text style={{fontSize:20,fontWeight:"bold", color:"white"}}>Remaining: ${displayNumber.toFixed(2)}</Text>
                                : 
                                <Text style={{fontSize:20,fontWeight:"bold", color:"white"}}>Over Spent ${Math.abs(displayNumber).toFixed(2)}</Text>
                            }
                        </View>
                        {/* <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Pressable style={[styles.button,{width:"90%"}]} onPress={() => {editBudget(props.category);setModalVisible(false)}}>
                                <Text style={{fontWeight:"bold"}}>Edit</Text>
                            </Pressable>
                        </View> */}
                    </View>
                </View>
            </Modal>
            
            <Pressable onPress={() => setModalVisible(true)}  style={{width:200,height:"auto",shadowColor:styleSetting.color.white,borderWidth:3,borderColor:"white",margin:15,borderRadius:15,shadowRadius:15,shadowOpacity:0.5}}>
                <Text style={{fontWeight:"bold",marginVertical:15,fontSize:20,textAlign:"center",color:"white"}}>{props.category}</Text>
                <View style={{justifyContent:"center",marginBottom:15,alignItems:"center"}}>
                    <View style={{position:"absolute",zIndex:10,margin:"auto",fontWeight:"bold"}}>
                        <Text style={{fontWeight:"bold",color:"white"}}>${displayNumber.toFixed(2)}</Text>
                    </View>
                    <PieChart
                        style={{margin:"auto",shadowColor:styleSetting.color.blue,shadowRadius:15,borderRadius:100,shadowOpacity:0.5}}
                        widthAndHeight={widthAndHeight}
                        series={series}
                        
                        sliceColor={sliceColor}
                        coverRadius={0.6}
                        coverFill={'#000'}
                    />
                </View>
            </Pressable>
            
        </>
    )
}

const styles = StyleSheet.create({
    transaction:{
        margin:styleSetting.size.em10,
        padding: 10,
        width: '60%',
        minWidth: 200,

    },
    miniBox:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    box: {
        width:"100%",
        padding:styleSetting.size.em10,
    },
    title:{
        borderRadius:styleSetting.size.em07,
        paddingLeft:styleSetting.size.em05,
        paddingRight:styleSetting.size.em05,
        backgroundColor:'#89CFF0',    
    },
    right:{
        textAlign:"right",
        fontSize:styleSetting.size.em16,
    },
    button:{
        backgroundColor: '#89CFF0',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 80,
        minHeight: 50,
        width:"20%",
        borderRadius:5,
        shadowColor:"black",
        shadowOpacity:0.5,
        shadowOffset:{width:2,height:2},
        margin:15,
        height:"60%",
    },
    deletebutton:{
        backgroundColor: "#ff7588",
        minWidth: 80,
        minHeight: 50,
        width:"20%",
        borderRadius:5,
        shadowColor:"black",
        shadowOpacity:0.5,
        shadowOffset:{width:2,height:2},
        margin:15,
        height:"60%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexWrap: 'wrap',
        flex:3
    },  
    amount:{
        fontSize:styleSetting.size.em20,
    },
})