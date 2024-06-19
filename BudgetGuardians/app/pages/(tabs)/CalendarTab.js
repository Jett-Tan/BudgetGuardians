import { View,StyleSheet,Text,FlatList } from "react-native"
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
            <View style={{width:"90%",height:"95%",justifyContent:"flex-start"}}>
                <View style={{width:"100%",height:"10%",marginBottom:20,borderRadius:100, backgroundColor:styleSetting.color.lightblue,borderWidth:1,borderColor:"black", justifyContent:"center"}}>
                    <Text style={{textAlign:"center",fontSize:styleSetting.size.em20}}>Month</Text>
                </View>
                <View style={{width:"100%",height:"70%",marginBottom:20,padding:30,borderRadius:50, backgroundColor:styleSetting.color.lightblue,borderWidth:1,borderColor:"black", justifyContent:"center"}}>
                    {/* <FlatList 
                        // data={[{text:"Sun",id:0},{text:"Mon",id:1},{text:"Tue",id:2},{text:"Wed",id:3},{text:"Thu",id:4},{text:"Fri",id:5},{text:"Sat",id:6}]}
                        data={[{text:"S",id:0},{text:"M",id:1},{text:"T",id:2},{text:"W",id:3},{text:"T",id:4},{text:"F",id:5},{text:"S",id:6}]}
                        renderItem={({item, index}) => (
                            <View style={{marginHorizontal:"auto"}}>
                                <DateText text={item.text}/>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                        numColumns={7}
                        style={{width:"100%"}}
                        />
                    <FlatList 
                        data={[
                            {number:1,id:0},
                            {number:2,id:1},
                            {number:3,id:2},
                            {number:4,id:3},
                            {number:5,id:4},
                            {number:6,id:5},
                            {number:7,id:6},
                            {number:8,id:7},
                            {number:9,id:8},
                            {number:10,id:9},
                            {number:11,id:10},
                            {number:12,id:11},
                            {number:13,id:12},
                            {number:14,id:13},
                            {number:15,id:14},
                            {number:16,id:15},
                            {number:17,id:16},
                            {number:18,id:17},
                            {number:19,id:18},
                            {number:20,id:19},
                            {number:21,id:20},
                            {number:22,id:21},
                            {number:23,id:22},
                            {number:24,id:23},
                            {number:25,id:24},
                            {number:26,id:25},
                            {number:27,id:26},
                            {number:28,id:27},
                            {number:29,id:28},
                            {number:30,id:29},
                            {number:31,id:30},
                            {number:32,id:31},
                            {number:33,id:32},
                            {number:34,id:33},
                            {number:35,id:34},
                            {number:36,id:35},
                        ]}
                        renderItem={({item, index}) => (
                            <View style={{marginHorizontal:"auto"}}>
                                <DateCircle number={item.number}/>
                            </View>
                        )}
                        
                        style={{width:"100%"}}
                        
                        keyExtractor={item => item.id}
                        numColumns={7}
                        columnWrapperStyle={{justifyContent:"space-evenly"}}
                        /> */}
                </View>
            </View>
        </>
    )
}
const DateText =  ({text}) => {
    return (
        <Text style={{fontSize:styleSetting.size.em40, fontWeight:"bold"}}>{text}</Text>
    )
}
const DateCircle = ({number, color}) => {
    return (
        <View style={{width:40,height:40,backgroundColor:"red",borderRadius:50,alignContent:"center",justifyContent:"center",shadowColor:"black",shadowRadius:5}}>
            <Text style={{textAlign:"center",fontSize:styleSetting.size.em20,fontWeight:"bold"}}>{number}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})