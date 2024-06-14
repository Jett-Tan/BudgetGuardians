import { StyleSheet, Text, View, Button,Pressable,Modal,Image } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { getAuth } from "firebase/auth";

import styleSetting from "../setting/setting"
import { useState, useEffect } from "react";
import { auth } from "../auth/firebaseConfig";
import CustomIconButton from "../components/customIconButton";
import TransactionEntry from "../components/transactionEntry";
import SideBar from "../components/sideBar";
import Overlay from "../components/overlay";
import Tasks from "../components/expense"
import { db, collection, addDoc, getDocs} from "firebase/firestore";
import DropdownComponent from "../components/expense";

export default function Page() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState();
    const user = auth.currentUser;
    
    useEffect(() => {
        if (user) {
          setCurrentUser(user);
        }
      }, [user]);

    if(user === null){
        return <Redirect href="./initPage"/>
    }

    const logout = () => { 
        auth.signOut(); 
        router.replace('./initPage');
    }

    const[modalVisible,setModalVisible] = useState(false)
    const toggleModalVisible = () => {
        console.log(modalVisible)
        setModalVisible(!modalVisible)
    }
    
    const block = false;
    return (
        <>
            {block && 
                <View style={{
                    width:"100%",
                    height:"100%",
                    justifyContent:"center",
                    alignContent:"center",
                    alignItems:"center",
                    backgroundColor:styleSetting.color.blue}}>
                    <Text style={{}}>Coming soon!!</Text>
                </View>
            }
            <Overlay visible={!auth.currentUser.emailVerified}/>
            <View style={styles.container}> 
            {/* TODO 
                
                need to style this page 
            */}     
                <View style={[styles.header,{backgroundColor:"#84B6E3", maxHeight:90, flex:1, flexDirection:"row-reverse"}]}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.welcomeContainer}>
                            <Text style={styles.welcomeText}>Welcome {currentUser ? currentUser.email : 'Guest'}</Text>
                        </View>
                        <CustomIconButton
                            text=""
                            iconHref="line"
                            borderless = {true}
                            onPress={() => {toggleModalVisible()}}
                        />
                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.modalHeader}>
                                <View style={styles.modalNavigationBar}>
                                    <View style={styles.modalContent}>
                                        <CustomIconButton
                                            text=""
                                            iconHref="line"
                                            borderless={true}
                                            onPress={() => { toggleModalVisible() }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>    
                </View>    
                </View>
            </View>
                
                <View style={styles.content}>
                    <DropdownComponent/>
                </View>
                  
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
        backgroundColor:styleSetting.color.white,
    },
    forexpense:{
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        flex: 7,
        alignItems: 'center',
        
        // Adjust this value to control the spacing between the navigation bar and the content
    },
    main: {
        backgroundColor:styleSetting.color.lightlightblue,
    },
    navigationBar: {
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
    },
    welcomeContainer: {
        flex: 2,
        alignItems: "center",
    },
    welcomeText: {
        fontSize: 18,
    },
    header: {
        backgroundColor: "#84B6E3",
        maxHeight: 90,
        flexDirection: "row-reverse",
        alignItems: "center",
        padding: 10,
    },
    modalHeader: {
        backgroundColor: "white",
        maxHeight: 90,
        flex: 1,
        flexDirection: "row-reverse",
        alignItems: "center",
        padding: 10,
    },
    modalNavigationBar: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: "red",
        width: 300,
        flexDirection: "row-reverse",
    },
});
