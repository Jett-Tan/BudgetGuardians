import { Text, View, Pressable,StyleSheet, Modal } from "react-native";
import styleSetting from "../setting/setting"
import PieChart from 'react-native-pie-chart'
import FaIcon from "./FaIcon";
import { useState } from "react";

export default function BudgetEntry({
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
    const totalSpent = props.amountSpent < 0 ? props.amountSpent : 0;
    const totalBudget = props.amountSpent > 0 ? props.amountSpent + props.amount : props.amount || 0;
    const remaining = totalBudget + totalSpent;

    const [modalVisible, setModalVisible] = useState(false)
    

    return (
        <>
            <Modal visible={modalVisible} transparent={true}>
                {/* <View style={{width:"100%",height:"100%",zIndex:1,position:"absolute",backgroundColor:"black",opacity:0.2}}></View> */}
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <View style={{width:300,height:300,backgroundColor:"white",borderRadius:15,shadowColor:"black",shadowRadius:5,shadowOpacity:0.5}}>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={{fontSize:20,fontWeight:"bold",margin:15}}>{props.category}</Text>
                            <Pressable onPress={() => setModalVisible(false)}>
                                <FaIcon name="x" size={20} style={{margin:15}}/>
                            </Pressable>
                        </View>
                        <View style={{margin:15}}>
                            <Text style={{fontSize:20,fontWeight:"bold"}}>Budget: ${totalBudget.toFixed(2)}</Text>
                            <Text style={{fontSize:20,fontWeight:"bold"}}>Spent: ${totalSpent.toFixed(2)}</Text>
                            <Text style={{fontSize:20,fontWeight:"bold"}}>Remaining: ${remaining.toFixed(2)}</Text>
                            <Text style={{fontSize:20,fontWeight:"bold"}}>Additional Income: ${props?.additionalIncome?.toFixed(2)}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Pressable style={[styles.button,{width:"90%"}]} onPress={() => {editBudget(props.category);setModalVisible(false)}}>
                                <Text style={{fontWeight:"bold"}}>Edit</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            
            <Pressable onPress={() => setModalVisible(true)} style={{width:"90%",marginHorizontal:"auto",height:"auto",shadowColor:"black",margin:15,borderRadius:15,shadowRadius:15,shadowOpacity:0.5}}>
                <View style={{flexDirection:"row",width:"90%",justifyContent:"space-between",margin:15}}>
                    <View style={{flexDirection:"column"}}>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>Budget:</Text>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>{totalBudget.toFixed(2)}</Text>
                    </View>
                    <View style={{flexDirection:"column"}}>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>Spent:</Text>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>{totalSpent.toFixed(2)}</Text>
                    </View>
                    <View style={{flexDirection:"column"}}>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>Remaining:</Text>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>{remaining.toFixed(2)}</Text>
                    </View>
                    <View style={{flexDirection:"column"}}>
                    <Text style={{fontSize:20,fontWeight:"bold"}}>Additional Income:</Text>
                    <Text style={{fontSize:20,fontWeight:"bold"}}>{props?.additionalIncome?.toFixed(2)}</Text>
                    </View>
                    <View style={{flexDirection:"column"}}>
                    </View>
                    <Text style={{fontSize:20,fontWeight:"bold"}}>{props?.category}</Text>
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