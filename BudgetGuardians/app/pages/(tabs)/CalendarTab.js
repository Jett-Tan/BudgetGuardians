import { View,StyleSheet,Text } from "react-native"
import { useState, useEffect } from "react"

import { getUserDataFromFirestore } from "../../setting/fireStoreFunctions"
import styleSetting from "../../setting/setting";

export default function CalendarTab() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        (async () =>{
            await getUserDataFromFirestore()
            .then((data) => {
                setCurrentUser(data);
            }).catch((err) => {
                console.log(err)
            })
        })()
    }, [])
    Array(currentUser).map((data) => console.log(data))
    Array.isArray(currentUser?.financialData?.transactions) && console.log(currentUser.financialData.transactions)

    return (
        <>
            <View style={{width:"90%",height:"95%",justifyContent:"space-evenly"}}>
                <View style={{width:"100%",height:"10%",borderRadius:100, backgroundColor:styleSetting.color.lightblue,borderWidth:1,borderColor:"black", justifyContent:"center"}}>
                    <Text style={{textAlign:"center",fontSize:styleSetting.size.em20}}>Month</Text>
                </View>
                <View style={{width:"100%",height:"80%",marginBottom:20,borderRadius:50, backgroundColor:styleSetting.color.lightblue,borderWidth:1,borderColor:"black", justifyContent:"center"}}>
                    <Text style={{textAlign:"center",fontSize:styleSetting.size.em20}}>Calendar</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

})