import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { Redirect } from "expo-router"


import { app, db, getFirestore, collection, addDoc, updateDoc  } from "../auth/firebaseConfig"

import { auth } from "../auth/firebaseConfig"
import CustomInput from "../components/customInput"
import CustomButton from "../components/customButton"
import Icon from "../components/icon"
import styleSetting from "../setting/setting"

export default function createProfilePage(){
    // if (auth.currentUser === null){
    //     return <Redirect href="./initPage"/>
    // }
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [gender,setGender] = useState("")
    const [age,setAge] = useState(0)

    async function addUserDataToFirestore(){
        if(firstName !== "" && lastName !=="" && age > 0 && age !== "" && gender !== ""){
            await updateDoc (collection(db,"users",auth.currentUser.uid,"userData"), {
                name:{
                    firstName: firstName,
                    lastName: lastName
                },
                age: age,
                gender:gender
            }).then(()=>{
                console.log("Document written with ID: ", auth.currentUser.uid);
            }).catch((error)=>{
                console.error("Error adding document: ", error);
            });
        }
    }

    return(
        <>
        <View style={styles.container}>
            <View style={styles.main}>
            <View style = {styles.card}>
            <Icon size = {150}/>
            <ScrollView>
                <CustomInput
                    type="default"
                    placeholder="Set your first name"
                    onChange1={e => setFirstName(e)}
                    values1={firstName}
                    errorExist={true}
                    errorHandle={ (e) => {
                        if(e === ''){
                            return "Missing Value"
                        }else{
                            return ''
                        }
                    }}
                />
                <CustomInput
                    type="default"
                    placeholder="Set your last name"
                    onChange1={e => setLastName(e)}
                    values1={lastName}
                    errorExist={true}
                    errorHandle={ (e) => {
                        if(e === '' ){
                            return "Missing Value"
                        }else{
                            return ''
                        }
                    }}
                />
                <CustomInput
                    type="default"
                    placeholder="Set your gender"
                    onChange1={e => setGender(e)}
                    values1={gender}
                    errorExist={true}
                    errorHandle={ (e) => {
                        if(e === ''){
                            return "Missing Value"
                        }else{
                            return ''
                        }
                    }}
                />
                <CustomInput
                    type="default"
                    placeholder="Set your age"
                    onChange1={e => setAge(e)}
                    values1={age}
                    errorExist={true}
                    errorHandle={ (e) => {
                        if(e === '' || e < 0){
                            return "Missing Value"
                        }else{
                            return ''
                        }
                    }}
                />
                <CustomButton
                    type="default"
                    onPress={() => {addUserDataToFirestore()}}
                    text="Continue"
                />
            </ScrollView>
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