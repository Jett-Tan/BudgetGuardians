import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import styleSetting from '../setting/setting';
import Icon from './icon';
import FaIcon from './FaIcon';
import { auth } from '../auth/firebaseConfig';

export default function SideBar({   setValue}){

    const router = useRouter();
    return (
        <>
            <View style={styles.sideBar}>
                <TouchableOpacity style={styles.sideBarContent} onPress={() => setValue("home")}>
                    <FaIcon name="house" size={styleSetting.size.em24} color={styleSetting.color.white}/>
                    <Text style={styles.sideBarText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sideBarContent} onPress={() => setValue("calendar")}>
                    <FaIcon name="calendar-days" size={styleSetting.size.em24} color={styleSetting.color.white}/>
                    <Text style={styles.sideBarText}>Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sideBarContent} onPress={() => setValue("transactions")}>
                    <FaIcon name="calendar-days" size={styleSetting.size.em24} color={styleSetting.color.white}/>
                    <Text style={styles.sideBarText}>Add Transactions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sideBarContent} onPress={() => setValue("goals")}>
                    <FaIcon name="calendar-days" size={styleSetting.size.em24} color={styleSetting.color.white}/>
                    <Text style={styles.sideBarText}>Add Goals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sideBarContent} onPress={() => setValue("profile")}>
                    <FaIcon name="circle-user" size={styleSetting.size.em24} color={styleSetting.color.white}/>
                    <Text style={styles.sideBarText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sideBarContent} onPress={() => setValue("settings")}>
                    <FaIcon name="gears" size={styleSetting.size.em24} color={styleSetting.color.white}/>
                    <Text style={styles.sideBarText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sideBarContent} onPress={() => {auth.signOut();router.push('/')}}>
                    <FaIcon name="right-from-bracket" size={styleSetting.size.em24} color={styleSetting.color.white}/>
                    <Text style={styles.sideBarText}>Logout</Text>
                </TouchableOpacity>
            </View>
    </>
    );
}

const styles = StyleSheet.create({
    sideBar: {
        height:"100%",
        width:200,
        backgroundColor: styleSetting.color.mildblue,
        shadowColor: styleSetting.color.black,
        shadowOpacity:0.25,
        shadowOffset:{width:3,height:0},
    },
    sideBarContent: {
        marginVertical:5,
        shadowColor: styleSetting.color.black,
        shadowOpacity:0.25,
        height:50,
        justifyContent:"flex-start",
        backgroundColor:styleSetting.color.blue,
        shadowOffset:{width:0,height:3},
        paddingHorizontal:20,
        flexDirection:"row",
        alignItems:"center",
    },
    
    sideBarText: {
        fontSize: styleSetting.size.em15,
        color: styleSetting.color.white,
        marginLeft:20,
        flexWrap:"wrap",
    }
});