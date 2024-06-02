import { StyleSheet, Text, View, Button,Pressable,Modal,Image } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { getAuth } from "firebase/auth";

import styleSetting from "../setting/setting"
import { useState } from "react";
import { auth } from "../auth/firebaseConfig";
import CustomIconButton from "../components/customIconButton";
import TransactionEntry from "../components/transactionEntry";
import SideBar from "../components/sideBar";
import Overlay from "../components/overlay";

export default function Page() {
    const router = useRouter();
    
    const user = auth.currentUser;
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    const logout = () => { 
        auth.signOut(); 
        router.replace('./initPage');
    }

    const[modalVisible,setModalVisible] = useState(false)
    // const toggleModalVisible = () => {setModalVisible(!modalVisible)}
    return (
        <>
            <View style={{
                width:"100%",
                height:"100%",
                justifyContent:"center",
                alignContent:"center",
                alignItems:"center",
                backgroundColor:styleSetting.color.blue}}>
                <Text style={{}}>Coming soon!!</Text>
            </View>
            {/* <Overlay visible={!auth.currentUser.emailVerified}/> */}
            {/* <View style={styles.container}>  */}
            {/* TODO 
                need to style this page 
            */}
                {/* <View style={{backgroundColor:"#123123", height:90}}></View>
                <View style={[styles.main,{backgroundColor:"#012012", height:100}]}></View>
            </View>        */}
                {/* <View style={styles.container}>
                    <View style={styles.main}>
                        <View style={styles.navigationBar}>
                            <Pressable onPress={e => {
                                console.log(modalVisible);
                                // toggleModalVisible;
                            }}>
                                <Image 
                                    source={require('../assets/line.png')}
                                    style={
                                        {   
                                            resizeMode:"stretch",
                                            width:50,
                                            height:50
                                        }
                                    }
                                    />
                            </Pressable>
                        </View>
                        <View style={styles.itemContainer}>
                            <View style= { styles.itemRow}>
                                <CustomIconButton text="Add Transaction" iconHref="updateExpense_colored"/>
                                <CustomIconButton text="Set Budget" iconHref="updateExpense_colored"/> 
                                {/*set Budget include set Goal*/}
                                {/* <CustomIconButton text="View Report" iconHref="updateExpense_colored"/>
                            </View>
                        </View>
                        <View style={styles.lastestTransaction}>
                            <TransactionEntry props={{date:"adsd", amount:123.3,title:"Food"}}/>
                            <TransactionEntry props={{date:"adsd", amount:123.3,title:"Food"}}/>
                            {
                                //forloop 
                            }
                        </View>
                    </View>
                </View> */} 
        </>
    );
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        backgroundColor:styleSetting.color.lightlightblue,
    },
    main: {
        backgroundColor:styleSetting.color.lightlightblue,
    },
    navigationBar: {
        width:"auto",
        flex:1,
        backgroundColor:styleSetting.color.lightlightblue,
        height:50,
        maxHeight:90,
        padding:20,
        flexDirection:"row-reverse",
    },
    itemContainer:{
        width:300,
        height:150,
        marginTop:50,
        flexDirection:"column",
    },
    itemRow:{
        flexDirection:"row",
        justifyContent:"space-evenly",  
    },
    lastestTransaction:{
        height:450,
        // backgroundColor:"#123123",
    }
});
