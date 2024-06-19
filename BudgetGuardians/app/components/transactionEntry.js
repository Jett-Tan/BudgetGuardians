import { Text, View, Pressable,StyleSheet } from "react-native";

import styleSetting from "../setting/setting"

export default function TransactionEntry({
    onPress = (e) => {console.log(e);}, //modal
    props = {},
}) {
    console.log(props)
    return (
        <>
            <Pressable style={styles.transcation} onPress={onPress}>
                <View style={styles.box}>
                    <View style={styles.miniBox}>
                        <Text style={[]}>{props.date}</Text>
                        <View style={styles.title}>
                            <Text style={styles.right}>{props.description}</Text>
                        </View>
                    </View>
                    <Text style={styles.right}>${props.amount?.toFixed(2)}</Text>
                </View>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    transcation:{
        justifyContent:"center",
        alignItems:"center",
        margin:styleSetting.size.em10,
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
        backgroundColor:styleSetting.color.red,    
    },
    right:{
        textAlign:"right",
        fontSize:styleSetting.size.em16,
    },  
    amount:{
        fontSize:styleSetting.size.em20,
    },
})