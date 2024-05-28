import { Text, View, Pressable,StyleSheet } from "react-native";

import styleSetting from "../setting/setting"

export default function TransactionEntry({
    onPress = (e) => {console.log(e);},
    props = {},
}) {
    
    return (
        <>
            <Pressable onPress={onPress}>
                <View>
                    <Text>{props.date}</Text>
                    <Text>{props.amount}</Text>
                </View>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({

})