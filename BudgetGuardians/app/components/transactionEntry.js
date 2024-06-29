import { Text, View, Pressable,StyleSheet } from "react-native";
import { doc, deleteDoc } from "firebase/firestore";
import styleSetting from "../setting/setting"

export default function TransactionEntry({
    onPress = (e) => {console.log(e);}, //modal
    props = {},
    deleteTransaction = (e) => {console.log(e);},
    editTransaction = (e) => {console.log(e);},
    showbutton = true,
    containerStyle={},
    transactionStyle={},
    dateStyle={color:"white"},
    categoryStyle={},
    amountStyle={},
    titleBoxStyle={}
}) {
    return (
        <>
            <View style={[styles.row,containerStyle]}>
                <Pressable style={[styles.transaction,transactionStyle]} onPress={onPress}>
                    <View style={styles.box}>
                        <Text style={[dateStyle,{fontSize:"100%",width:"auto",marginVertical:"auto",fontWeight:"bold",marginLeft:20}]}>{props.date}</Text>
                        <View style={styles.miniBox}>
                            <View style={[styles.title,titleBoxStyle]}>
                                <Text style={[styles.text,categoryStyle]}>{props.category}</Text>
                            </View>
                                {props.amount >= 0 && <Text style={[styles.text,{textShadowRadius:5,textShadowColor:styleSetting.color.neonGreen},amountStyle]}>+${props.amount?.toFixed(2)}</Text> }
                                {props.amount < 0 && <Text style={[styles.text,{textShadowRadius:5,textShadowColor:styleSetting.color.red},amountStyle]}>-${Math.abs(props.amount)?.toFixed(2)}</Text> }
                        </View>
                        
                    </View>
                    
                </Pressable>
                {showbutton && (
                    <View style={{flexDirection:"row",justifyContent:"space-evenly",width:"40%",padding:10,}}>
                        <Pressable style={[styles.button,styles.deletebutton]} onPress={(e)=>{deleteTransaction(e)}}>
                            <Text style={{textAlign:"center",fontWeight:"bold",fontSize:"100%",color:"white"}}>Delete Transaction</Text>
                        </Pressable>
                        <Pressable style={[styles.button,styles.editButton]} onPress={(e)=>{editTransaction(e)}}>
                            <Text style={{textAlign:"center",fontWeight:"bold",fontSize:"100%",color:"white"}}>Edit Transaction</Text>
                        </Pressable>
                    </View>
                )}
            </View>
            
        </>
    )
}

const styles = StyleSheet.create({
    transaction:{
        width: 'auto',
        minWidth: "60%",
        maxWidth: "100%",
        alignSelf:"stretch",
        color:"white",
    },
    miniBox:{
        marginLeft:"auto",
        flexDirection:"column",
        height:"100%",
        width:"auto",
        justifyContent:"center",
        alignItems:"flex-end"
    },
    box: {
        width:"100%",
        height:"100%",
        padding:styleSetting.size.em05,
        flexDirection:"row",
        
    },
    title:{
        borderRadius:styleSetting.size.em10,
        borderColor:"white",
        width:150,
        borderWidth:3,
        padding:styleSetting.size.em03,
        paddingHorizontal:styleSetting.size.em10,
        marginVertical:styleSetting.size.em05,
        backgroundColor:"#111111",
    },
    button:{
        backgroundColor: "#111111",
        minWidth: 80,
        minHeight: 50,
        width:"40%",
        height:"100%",
        borderColor:"white",
        borderWidth:3,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deletebutton:{
        shadowColor:"red",
        shadowOpacity:0.5,
        shadowRadius:10,
    },
    editButton:{
        shadowColor:"yellow",
        shadowOpacity:0.5,
        shadowRadius:10,
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        borderColor: "white",
        borderWidth: 3,
        borderRadius:styleSetting.size.em10,
        shadowColor: "white",
        shadowRadius: 5,
    },  
    text:{
        textAlign:"center",
        fontSize:"100%",
        fontWeight:"bold",
        color:"white",
    },
})