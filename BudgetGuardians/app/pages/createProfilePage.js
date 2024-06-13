import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Redirect } from "expo-router"

import { auth } from "../auth/firebaseConfig"
import CustomInput from "../components/customInput"
import CustomButton from "../components/customButton"
import Icon from "../components/icon"
import styleSetting from "../setting/setting"

export default function createProfilePage(){
    if (auth.currentUser === null){
        return <Redirect href="./initPage"/>
    }
    const [gender,setGender] = useState("")
    const [age,setAge] = useState(0)
    const [income,setIncome] = useState(0)
    const [expense,setExpense] = useState(0)
    const [savings,setSavings] = useState(0)
    const [goal,setGoal] = useState("")
    const [goalAmount,setGoalAmount] = useState(0)
    const [goalDate,setGoalDate] = useState("")
    const [goalDescription,setGoalDescription] = useState("")
    const [goalPriority,setGoalPriority] = useState(0)
    const [goalCategory,setGoalCategory] = useState("")
    const [goalStatus,setGoalStatus] = useState("")
    const [goalReminder,setGoalReminder] = useState("")
    const [goalReminderDate,setGoalReminderDate] = useState("")
    const [goalReminderTime,setGoalReminderTime] = useState("")
    const [goalReminderRepeat,setGoalReminderRepeat] = useState("")
    const [goalReminderRepeatUntil,setGoalReminderRepeatUntil] = useState("")
    const [goalReminderRepeatTimes,setGoalReminderRepeatTimes] = useState(0)
    const [goalReminderRepeatFrequency,setGoalReminderRepeatFrequency] = useState("")
    const [goalReminderRepeatOn,setGoalReminderRepeatOn] = useState("")
    const [goalReminderRepeatBy,setGoalReminderRepeatBy] = useState("")
    const [goalReminderRepeatEnd,setGoalReminderRepeatEnd] = useState("")
    const [goalReminderRepeatEndTimes,setGoalReminderRepeatEndTimes] = useState(0)
    const [goalReminderRepeatEndDate,setGoalReminderRepeatEndDate] = useState("")
    const [goalReminderRepeatEndOn,setGoalReminderRepeatEndOn] = useState("")
    const [goalReminderRepeatEndBy,setGoalReminderRepeatEndBy] = useState("")
    const [goalReminderRepeatEndFrequency,setGoalReminderRepeatEndFrequency] = useState("")

    return(
        <>
        <View style={styles.container}>
            <View style={styles.main}>
            <View style = {styles.card}>
            <Icon size = {150}/>
            <CustomInput
                type="default"
                placeholder="Set your gender"
                onChange1={e => setGender(e)}
                values1={gender}
            />
            <CustomInput
                type="default"
                placeholder="Set your age"
                onChange1={e => setAge(e)}
                values1={age}
            />
            <CustomButton
                type="signup"
                onPress={{}}
                text="Signup"
            />
            <Text>{'\n'}</Text>
            </View>
            </View>
        </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: styleSetting.size.em24,
        backgroundColor:styleSetting.color.lightlightblue,
    },
    card: {
        marginTop:"auto",
        marginBottom:"auto",
        backgroundColor:styleSetting.color.white,
        maxHeight:styleSetting.size.em500,
        minHeight:styleSetting.size.em400,
        borderRadius:styleSetting.size.em24,
        flex:1,
        justifyContent: "center",
        alignItems:"center",
        minWidth:styleSetting.size.em350,
        maxWidth:styleSetting.size.em450,
    },
    header: {
        width: "100%",
        height: 100,
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        margin: 10
    }
})