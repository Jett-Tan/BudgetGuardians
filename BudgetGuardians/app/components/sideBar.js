import {View, Text, StyleSheet, TouchableOpacity, Pressable, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import styleSetting from '../setting/setting';
import Icon from './icon';
import FaIcon from './FaIcon';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { auth } from '../auth/firebaseConfig';
import { set } from 'firebase/database';

export default function SideBar({ value,  setValue}){

    const router = useRouter();
    const [minimized, setMinimized] = useState(false);
    const [selected, setSelected] = useState(value);
    useEffect(() => {

        if ( window.innerWidth < 800){
            setMinimized(true);
        }
    }, [])
    const styleSelected = {
        selected:{
            shadowColor:styleSetting.color.neonGreen,
            shadowOpacity:0.5,
            shadowRadius:10,
            borderColor:styleSetting.color.neonGreen,
            
        },
    }
    let home = selected === "home" ? styleSelected.selected : {};        
    let calendar = selected === "calendar" ? styleSelected.selected : {};        
    let transactions = selected === "transactions" ? styleSelected.selected : {};
    let categorise = selected === "categorise" ? styleSelected.selected : {};        
    let budget = selected === "budget" ? styleSelected.selected : {};        
    let reports = selected === "reports" ? styleSelected.selected : {};        
    let profile = selected === "profile" ? styleSelected.selected : {};        
    let settings = selected === "settings" ? styleSelected.selected : {};        
    let sideBar = minimized ? {width:68} : {};
    let sideBarContent = minimized ? {justifyContent:"center",alignItems:"center"} : {};

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");
    return (
        <>
            <View style={[styles.sideBar,sideBar]}>
                <Pressable style={[styles.sideBarContent,home,sideBarContent]} onPress={() => {
                    setValue("home")
                    setSelected("home")
                }}
                    onHoverIn={() => {setModalVisible(true);setModalContent("home")}}
                >
                    <FaIcon name="house" size={styleSetting.size.em24} color={styleSetting.color.lightblue}/>
                    {!minimized && <Text style={styles.sideBarText}>Home</Text>}

                </Pressable>
                <TouchableOpacity style={[styles.sideBarContent,calendar,sideBarContent]} onPress={() => {
                    setValue("calendar")
                    setSelected("calendar")
                }}>
                    <FaIcon name="calendar-days" size={styleSetting.size.em24} color={styleSetting.color.lightblue}/>
                    {!minimized && <Text style={styles.sideBarText}>Calendar</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sideBarContent,transactions,sideBarContent]} onPress={() => {
                    setValue("transactions")
                    setSelected("transactions")
                }}>
                    <FaIcon name="money-bill-transfer" size={styleSetting.size.em24} color={styleSetting.color.lightblue}/>
                    {!minimized && <Text style={styles.sideBarText}>Add Transactions</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sideBarContent,categorise,sideBarContent]} onPress={() => {
                    setValue("categorise")
                    setSelected("categorise")
                }}>
                    <FontAwesome name="sort-amount-desc" size={styleSetting.size.em24} color={styleSetting.color.lightblue}/>
                    {!minimized && <Text style={styles.sideBarText}>Categorise Transactions</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sideBarContent,budget,sideBarContent]} onPress={() => {
                    setValue("budget")
                    setSelected("budget")
                }}>
                    <FaIcon name="money-bill-trend-up" size={styleSetting.size.em24} color={styleSetting.color.lightblue}/>
                    {!minimized && <Text style={styles.sideBarText}>Manage Budget</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sideBarContent,reports,sideBarContent]} onPress={() => {
                    setValue("reports")
                    setSelected("reports")
                }}>
                    <FaIcon name="chart-pie" size={styleSetting.size.em24} color={styleSetting.color.lightblue}/>
                    {!minimized && <Text style={styles.sideBarText}>View Reports</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sideBarContent,profile,sideBarContent]} onPress={() => {
                    setValue("profile")
                    setSelected("profile")
                }}>
                    <FaIcon name="circle-user" size={styleSetting.size.em24} color={styleSetting.color.lightblue}/>
                    {!minimized && <Text style={styles.sideBarText}>Profile</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sideBarContent,settings,sideBarContent]} onPress={() => {
                    setValue("settings")
                    setSelected("settings")
                }}>
                    <FaIcon name="gears" size={styleSetting.size.em24} color={styleSetting.color.lightblue}/>
                    {!minimized && <Text style={styles.sideBarText}>Settings</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sideBarContent,sideBarContent]} onPress={() => {auth.signOut()}}>
                    <FaIcon name="right-from-bracket" size={styleSetting.size.em24} color={styleSetting.color.lightblue}/>
                    {!minimized && <Text style={styles.sideBarText}>Logout</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={[{alignItems:"flex-end",width:'90%',marginRight:15,marginBottom:15,height:50,right:0,bottom:0,position:"absolute"}]} onPress={() => setMinimized(!minimized)}>
                    {!minimized && <FaIcon name="arrow-left-long" size={styleSetting.size.em24} color={styleSetting.color.lightblue}/> }
                    {minimized && <FaIcon name="arrow-right-long" size={styleSetting.size.em24} color={styleSetting.color.lightblue}/>}
                </TouchableOpacity>
            </View>
    </>
    );
}

const styles = StyleSheet.create({
    sideBar: {
        height:"95%",
        width:200,
        zIndex:10,
        paddingTop:10,
        paddingHorizontal:8,
        backgroundColor: styleSetting.color.lightblack,
        borderRightWidth:3,
        borderColor:"white",
    },
    sideBarContent: {
        marginVertical:8,
        shadowColor: styleSetting.color.blue,
        shadowOpacity:0.75,
        shadowRadius:10,
        height:50,
        justifyContent:"flex-start",
        backgroundColor:styleSetting.color.lightblack,
        borderColor:"white",
        borderWidth: 3,
        paddingHorizontal:20,
        flexDirection:"row",
        alignItems:"center",
        borderRadius: styleSetting.size.em10,
    },
    
    sideBarText: {
        fontSize: styleSetting.size.em15,
        color: styleSetting.color.white,
        marginLeft:20,
        flexWrap:"wrap",
    }
});