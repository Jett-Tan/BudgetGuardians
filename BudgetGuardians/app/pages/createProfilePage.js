import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { Redirect, useRouter } from "expo-router"



import { addUserDataToFirestore, addFinancialDataToFirestore,createUserInFirestore } from "../setting/fireStoreFunctions";

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
    const [age,setAge] = useState(0)

    const [firstNameError,setFirstNameError] = useState("")
    const [lastNameError,setLastNameError] = useState("")
    const [ageError,setAgeError] = useState("")

    const router = useRouter();
    async function handleUserData(){
        console.log("clicked");
        var valid = true;
        await createUserInFirestore()
        await addUserDataToFirestore({name:{firstName:firstName,lastName:lastName},age:Number.parseInt(age)})
        .then(()=>{
            valid = true;
        }).catch((error)=>{ 
            valid = false;
            console.error("Error adding document: ", error);
        });
        await addFinancialDataToFirestore({transactions:[],goals:[]})
        .then(()=>{
            valid = true;
        }).catch((error)=>{
            valid = false; 
            console.error("Error adding document: ", error);
        });

        if(!valid){
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
                    onPress={async () => await handleUserData()}
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