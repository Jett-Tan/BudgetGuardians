import { StyleSheet, Text, View, Button,Pressable,Modal,Image } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { getAuth ,onAuthStateChanged} from "firebase/auth";

import styleSetting from "../setting/setting"
import { useState, useEffect } from "react";
import { auth } from "../auth/firebaseConfig";
import CustomIconButton from "../components/customIconButton";
import TransactionEntry from "../components/transactionEntry";
import SideBar from "../components/sideBar";
import Overlay from "../components/overlay";
import Tasks from "../components/expense"
import DropdownComponent from "../components/expense";
import CustomButton from "../components/customButton";

import { addExpenseToFirestore, 
    addUserDataToFirestore, 
    getUserDataFromFirestore, 
    liveUpdate} from "../setting/fireStoreFunctions";
import HomeTab from "./(tabs)/HomeTab";
import TransactionTab from "./(tabs)/TransactionTab";
import CalendarTab from "./(tabs)/CalendarTab";
import ProfileTab from "./(tabs)/ProfileTab";
import GoalTab from "./(tabs)/GoalTab";

export default function Page() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState({});
    const [tab, setTab] = useState("home");

    

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
                alert(err);
            });
        })();
    }, []);

    const loadData = setInterval(async () => {
        await getUserDataFromFirestore()
        .then((data) => {
            setCurrentUser(data);
        })
        .catch((err) => {
            alert(err);
        });
    }, 100);
    setTimeout(()=>{clearInterval(loadData)} ,500);

    const[modalVisible,setModalVisible] = useState(false)

    const toggleModalVisible = () => {
        console.log(modalVisible)
        setModalVisible(!modalVisible)
    }

    const addExpense = async () => {
        await addTransactionToFirestore({amount:-123.30,date:"adsd",description:"Food",category:"Food"})
        .then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const addIncome = async () => {
        await addTransactionToFirestore({amount:-123.30,date:"adsd",description:"Food",category:"Food"})
        .then((data) => {
            console.log(data)
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
                <View style={[styles.header,{backgroundColor:styleSetting.color.mildblue,justifyContent:"center",height:70}]}>
                        <Text style={styles.welcomeText}>Welcome {currentUser ? currentUser?.userData?.name?.firstName : 'Guest'}</Text>
                </View>
                <View style ={{flexDirection:"row",height:"100%"}}>
                    <View style ={{height:"100%"}}>
                        <SideBar value={tab} setValue ={setTab}/>
                    </View>
                    <View style={styles.content}>
                        {/* <TransactionEntry props={{date:"01.12.2022",amount:123.3,description:"money"}}/> */}
                        {tab === "home" && <HomeTab/>}
                        {/* {tab === "calendar" && <CalendarTab/>} */}
                        {tab === "calendar" && <Text>Coming soon</Text>}
                        {tab === "profile" && <ProfileTab/>}
                        {tab === "settings" && <Text>Coming soon</Text>}
                        {tab === "transactions" && <TransactionTab/>}
                        {tab === "goals" && <GoalTab/>}
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
        backgroundColor:styleSetting.color.white,
    },
    forexpense:{
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
        
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
        shadowColor: styleSetting.color.black,
        shadowOpacity:0.5,
        shadowOffset:{width:0,height:3},
        shadowRadius:5,
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
