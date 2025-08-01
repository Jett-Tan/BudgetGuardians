import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import styleSetting from "../setting/setting"
import { useState, useEffect } from "react";
import { auth } from "../auth/firebaseConfig";
import SideBar from "../components/sideBar";
import Overlay from "../components/overlay";

import {
    getUserDataFromFirestore, 
    liveUpdate} from "../setting/fireStoreFunctions";
import HomeTab from "./(tabs)/HomeTab";
import TransactionTab from "./(tabs)/TransactionTab";
import CalendarTab from "./(tabs)/CalendarTab";
import ProfileTab from "./(tabs)/ProfileTab";
import BudgetTab from "./(tabs)/BudgetTab";
import CategoriseTab from "./(tabs)/CategoriseTab"
import SettingTab from "./(tabs)/SettingTab";
import ReportTab from "./(tabs)/ReportTab";

export default function Page() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState({});
    const [tab, setTab] = useState("home");

    const check = setInterval(() => {
        !auth.currentUser && router.replace('./initPage') ;
    },100)

    setTimeout(() => {clearInterval(check)}, 300);
    
    
    
    useEffect(() => {
        liveUpdate((x) => {
            setCurrentUser(x)
        });
        (async () => {
            await getUserDataFromFirestore()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => {
                router.replace('./createProfilePage') ;
                
            });
        })();
    }, []);


    const loadData = setInterval(async () => {
        await getUserDataFromFirestore()
        .then((data) => {
            setCurrentUser(data);
        })
        .catch((err) => {
             router.replace('./createProfilePage') ;
        });
    }, 100);
    setTimeout(()=>{clearInterval(loadData)} ,300);

    const[modalVisible,setModalVisible] = useState(false)

    const toggleModalVisible = () => {
        console.log(modalVisible)
        setModalVisible(!modalVisible)
    }

    const addExpense = async () => {
        await addTransactionToFirestore({amount:-123.30,date:"adsd",description:"Food",category:"Food"})
        .then((data) => {
            // console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const addIncome = async () => {
        await addTransactionToFirestore({amount:-123.30,date:"adsd",description:"Food",category:"Food"})
        .then((data) => {
            // console.log(data)
        }).catch((err) => {
            console.log(err)
        })
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
            <Overlay visible={!auth?.currentUser?.emailVerified && auth?.currentUser?.emailVerified === false}/>
            <View style={styles.container}> 
                <View style={[styles.header,{backgroundColor:styleSetting.color.lightblack,justifyContent:"center",height:70,borderColor:"white",borderBottomWidth:3}]}>
                        <Text style={styles.welcomeText}>Welcome {currentUser ? currentUser?.userData?.name?.firstName : 'Guest'}</Text>
                </View>
                <View style ={{flexDirection:"row",height:"100%"}}>
                    <View style ={{height:"100%"}}>
                        <SideBar value={tab} setValue ={setTab}/>
                    </View>
                    <View style={[styles.content,{background:"#111111"}]}>
                        {/* <TransactionEntry props={{date:"01.12.2022",amount:123.3,description:"money"}}/> */}
                        {tab === "home" && <HomeTab/>}
                        {/* {tab === "calendar" && <CalendarTab/>} */}
                        {tab === "calendar" && <CalendarTab/>}
                        {tab === "transactions" && <TransactionTab/>}
                        {tab === "categorise" && <CategoriseTab/>}
                        {tab === "budget" && <BudgetTab/>}
                        {tab === "reports" && <ReportTab/>}
                        {tab === "profile" && <ProfileTab/>}
                        {tab === "settings" && <SettingTab/>}
                        {/* <Button title="Add Expense" onPress={addExpense}/> */}
                        {/* <DropdownComponent/> */}
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
        backgroundColor:"#111111",
    },
    forexpense:{
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent:'center'
        
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
        color:"white",
        fontWeight:"bold",
    },
    header: {
        backgroundColor: "#84B6E3",
        maxHeight: 90,
        flexDirection: "row-reverse",
        alignItems: "center",
        padding: 10,
        shadowColor: styleSetting.color.neonGreen,
        shadowOpacity:0.5,
        shadowOffset:{width:0,height:3},
        // shadowRadius:5,
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
