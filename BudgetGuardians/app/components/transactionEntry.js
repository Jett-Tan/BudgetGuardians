import { Text, View, Pressable,StyleSheet } from "react-native";
import { doc, deleteDoc } from "firebase/firestore";
import styleSetting from "../setting/setting"

export default function TransactionEntry({
    onPress = (e) => {console.log(e);}, //modal
    props = {},
}) {
    console.log(props)
    return (
        <>
            <Pressable style={styles.transaction} onPress={onPress}>
                <View style={styles.box}>
                    <View style={styles.miniBox}>
                        <Text style={[]}>{props.date}</Text>
                        <View style={styles.title}>
                            <Text style={styles.right}>{props.category}</Text>
                        </View>
                    </View>
                    <Text style={styles.right}>${props.amount?.toFixed(2)}</Text>
                    <View style={styles.row}>
                    <Pressable style={styles.button}>
                        <Text>Delete Transaction</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text>Edit Transaction</Text>
                    </Pressable>
                    </View>
                </View>
                
            </Pressable>
            
        </>
    )
}

const styles = StyleSheet.create({
    transaction:{
        justifyContent:"center",
        alignItems:"center",
        margin:styleSetting.size.em10,
        padding: 10,
        width: '60%',

    },
    miniBox:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    box: {
        width:styleSetting.size.em300,
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
        padding: 10,
        backgroundColor: '#89CFF0',
        marginLeft: 10,
        flex: 2,
        alignItems: 'center',
        width: 30,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },  
    amount:{
        fontSize:styleSetting.size.em20,
    },
})