import { StyleSheet, Text, View, Button,Pressable,Modal,Image } from "react-native";

import styleSetting from "../setting/setting"
import { useState } from "react";
import { auth } from "../auth/firebaseConfig";
import { Redirect, useRouter } from "expo-router";
import CustomIconButton from "../components/customIconButton";
import TransactionEntry from "../components/transactionEntry";

export default function Page() {
    const user = auth.currentUser;
    if (!user) {
        console.log("no user")
        return <Redirect href={"../"}></Redirect>  
    }
    const[modalVisible,setModalVisible] = useState(false)
    const toggleModalVisible = () => {setModalVisible(!modalVisible)}
    return (
        <>
            <View style={styles.navigationBar}>
                <Pressable onPress={e => {
                    auth.signOut()
                    router = useRouter()
                    router.replace("../pages/loginPage")
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
                <Modal 
                    visible = {modalVisible}
                ></Modal>
            </View>
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.itemContainer}>
                        <View style= { styles.itemRow}>
                            <CustomIconButton text="Add Transaction" iconHref="updateExpense_colored"/>
                            <CustomIconButton text="Set Budget" iconHref="updateExpense_colored"/> 
                            {/*set Budget include set Goal*/}
                            <CustomIconButton text="View Report" iconHref="updateExpense_colored"/>
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
            </View>
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
        flex: 1,
        maxWidth: styleSetting.size.em960,
        marginHorizontal: "auto",
        // backgroundColor:styleSetting.color.lightlightblue,
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
