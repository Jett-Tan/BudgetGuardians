import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { Redirect, useRouter } from "expo-router"



import { addUserDataToFirestore, addFinancialDataToFirestore,createUserInFirestore, getUserDataFromFirestore } from "../setting/fireStoreFunctions";

import { auth } from "../auth/firebaseConfig"
import CustomInput from "../components/customInput"
import CustomButton from "../components/customButton"
import Icon from "../components/icon"
import styleSetting from "../setting/setting"
import { set } from "firebase/database";

export default function createProfilePage(){
    // if (auth.currentUser === null){
    //     return <Redirect href="./initPage"/>
    // }
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [age,setAge] = useState("")

    const [firstNameError,setFirstNameError] = useState("")
    const [lastNameError,setLastNameError] = useState("")
    const [ageError,setAgeError] = useState("")

    const [shadowColor, setShadowColor] = useState("white")

    const router = useRouter();

    async function handleUserData(){
        console.log("clicked");
        var valid = true;
        await createUserInFirestore()
        await addUserDataToFirestore({name:{firstName:firstName,lastName:lastName},age:Number.parseInt(age)})
        .then(()=>{
            setShadowColor("green");
            valid = true;
        }).catch((error)=>{ 
            valid = false;
            console.error("Error adding document: ", error);
        });

        if(!valid){
            setShadowColor(styleSetting.color.neonRed);
            console.error("Error adding document");
        }else{
            router.replace('./homePage');
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
                    values={firstName}
                    errorExist={true}
                    errorHandle={ (e) => {
                        if(e === ''){
                            return "Missing Value"
                        }else{
                            return ''
                        }
                    }}
                    containerStyle={{width:"90%",marginLeft:15,minWidth:0,height:50,marginVertical:15, borderColor:"white", borderWidth:3, borderRadius:10, backgroundColor:"#111111"}}
                    inputContainerStyle = {{minWidth:"10%", backgroundColor:"#111111", height:40, borderColor:"transparent", borderWidth:3, borderRadius:10,paddingLeft: 10 }}
                    inputStyle = {{color:"white"}}
                />
                <CustomInput
                    type="default"
                    placeholder="Set your last name"
                    onChange1={e => setLastName(e)}
                    values={lastName}
                    errorExist={true}
                    errorHandle={ (e) => {
                        if(e === '' ){
                            return "Missing Value"
                        }else{
                            return ''
                        }
                    }}
                    containerStyle={{width:"90%",marginLeft:15,minWidth:0,height:50,marginVertical:15, borderColor:"white", borderWidth:3, borderRadius:10, backgroundColor:"#111111"}}
                    inputContainerStyle = {{minWidth:"10%", backgroundColor:"#111111", height:40, borderColor:"transparent", borderWidth:3, borderRadius:10,paddingLeft: 10 }}
                    inputStyle = {{color:"white"}}
                />
                <CustomInput
                    type="default"
                    placeholder="Set your age"
                    onChange1={e => setAge(e)}
                    values={age}
                    errorExist={true}
                    errorHandle={ (e) => {
                        if(e === '' ){
                            return "Missing Value"
                        }else if( e < 0 || Number.isNaN(Number.parseInt(e)) ){
                            return 'Enter a valid age'
                        }else {
                            return ''
                        }
                    }}
                    containerStyle={{width:"90%",marginLeft:15,minWidth:0,height:50,marginVertical:15, borderColor:"white", borderWidth:3, borderRadius:10, backgroundColor:"#111111"}}
                    inputContainerStyle = {{minWidth:"10%", backgroundColor:"#111111", height:40, borderColor:"transparent", borderWidth:3, borderRadius:10,paddingLeft: 10 }}
                    inputStyle = {{color:"white"}}
                />
                <CustomButton
                    type="signup"
                    onPress={async () => await handleUserData()}
                    text="Continue"
                    containerStyle={{width:"90%",marginLeft:15,minWidth:0,height:50,marginVertical:15, borderColor:"white", borderWidth:3, borderRadius:10, shadowColor:shadowColor,shadowRadius:5,backgroundColor:styleSetting.color.lightblue}}
                    textStyle={{fontSize:styleSetting.size.em24,fontWeight:"bold",color:"white"}}
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
        backgroundColor:styleSetting.color.lightblack,
    },
    card: {
        marginTop:"auto",
        marginBottom:"auto",
        backgroundColor:styleSetting.color.lightblack,
        maxHeight:styleSetting.size.em600,
        minHeight:styleSetting.size.em500,
        borderRadius:styleSetting.size.em24,
        flex:1,
        justifyContent: "center",
        alignItems:"center",
        minWidth:styleSetting.size.em350,
        maxWidth:styleSetting.size.em450,
        borderColor: "white",
        borderWidth: 3,
        shadowColor: "white",
        shadowRadius: 10,

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