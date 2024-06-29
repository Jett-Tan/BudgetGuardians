import { View,Text } from "react-native";
import { useEffect, useState } from "react";

import { updateUserDataToFirestore, liveUpdate } from "../../setting/fireStoreFunctions";
import CustomInput from "../../components/customInput";
import CustomButton from "../../components/customButton";
import styleSetting from "../../setting/setting";
export default function ProfileTab() {
    const [currentUser, setCurrentUser] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    
    
    useEffect(() => {
        liveUpdate((x) => {
            setCurrentUser(x)
            setFirstName(x?.userData?.name.firstName)
            setLastName(x?.userData?.name.lastName)
            setAge(x?.userData?.age)
        });
    },[])

    async function updateUser(){
        await updateUserDataToFirestore({name:{firstName:firstName,lastName:lastName},age:Number.parseInt(age)})
        .then(() => {
            // console.log("User Updated")
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <View style={{width:"95%",height:"95%",justifyContent:"center",alignItems:"center"}}>
                <View >
                    <Text style={{marginLeft:10, color:"white"}}>First Name</Text>
                    <CustomInput
                        type="default"
                        placeholder={firstName}
                        values={firstName}
                        onChange1={(e) => setFirstName(e)}
                        containerStyle={{width: "80%",marginLeft:5}}
                        inputContainerStyle={{width: "100%",minWidth:"100%",marginLeft:0,margin:0, height: 60, borderColor: 'black', borderWidth: 3, padding: 5,borderColor:"white", backgroundColor:"#111111"}}
                        inputStyle={{width: "100%",minWidth:"100%", borderColor:"white", backgroundColor:"#111111", color:"white"}}
                    />
                </View>
                <View >
                    <Text style={{marginLeft:10, color:"white"}}>Last Name</Text>
                    <CustomInput
                        type="default"
                        placeholder={lastName}
                        values={lastName}
                        onChange1={(e) => setLastName(e)}
                        containerStyle={{width: "80%",marginLeft:5}}
                        inputContainerStyle={{width: "100%",minWidth:"100%",marginLeft:0,margin:0, height: 60, borderColor: 'black', borderWidth: 3, padding: 5,borderColor:"white", backgroundColor:"#111111"}}
                        inputStyle={{width: "100%",minWidth:"100%", borderColor:"white", backgroundColor:"#111111", color:"white"}}
                        />
                </View>
                <View >
                    <Text style={{marginLeft:10,color:"white"}}>Age</Text>
                    <CustomInput
                        type="default"
                        placeholder={age}
                        values={age}
                        onChange1={(e) => setAge(e)}
                        containerStyle={{width: "80%",marginLeft:5}}
                        inputContainerStyle={{width: "100%",minWidth:"100%",marginLeft:0,margin:0, height: 60, borderColor: 'black', borderWidth: 3, padding: 5,borderColor:"white", backgroundColor:"#111111"}}
                        inputStyle={{width: "100%",minWidth:"100%", borderColor:"white", backgroundColor:"#111111", color:"white"}}
                        />
                </View>
                <CustomButton
                type="signup"
                text="Update"
                    onPress={updateUser}
                    containerStyle={{width:"100%",marginLeft:5,height:50,marginVertical:30, borderColor:"white", borderWidth:2, borderRadius:10, backgroundColor:"#33CBFF"}}
                    textStyle={{fontSize:styleSetting.size.em24}}
                />
            </View>
        </>
    )
}