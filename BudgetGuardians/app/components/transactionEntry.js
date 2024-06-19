import { Text, View, Pressable,StyleSheet } from "react-native";
import { doc, deleteDoc } from "firebase/firestore";
import styleSetting from "../setting/setting"

export default function TransactionEntry({
    onPress = (e) => {console.log(e);}, //modal
    props = {},
    deleteTransaction = (e) => {console.log(e);},
    editTransaction = (e) => {console.log(e);},
    showbutton = true,
}) {
    return (
        <>
            <View style={styles.row}>
                <Pressable style={styles.transaction} onPress={onPress}>
                    <View style={styles.box}>
                        <View style={styles.miniBox}>
                            <Text style={[]}>{props.date}</Text>
                            <View style={styles.title}>
                                <Text style={styles.right}>{props.category}</Text>
                            </View>
                        </View>
                        <Text style={styles.right}>${props.amount?.toFixed(2)}</Text>
                    </View>
                    
                </Pressable>
                {showbutton && (
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                        <Pressable style={styles.deletebutton} onPress={(e)=>{deleteTransaction(e)}}>
                            <Text style={{textAlign:"center"}}>Delete Transaction</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={(e)=>{editTransaction(e)}}>
                            <Text style={{textAlign:"center"}}>Edit Transaction</Text>
                        </Pressable>
                    </View>
                )}
            </View>
            
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