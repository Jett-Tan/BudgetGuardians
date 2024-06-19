import { View,Text } from "react-native";
import { useEffect, useState } from "react";

import { updateUserDataToFirestore, liveUpdate } from "../../setting/fireStoreFunctions";
import CustomInput from "../../components/customInput";
import CustomButton from "../../components/customButton";

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

    console.log(age);
    async function updateUser(){
        await updateUserDataToFirestore({name:{firstName:firstName,lastName:lastName},age:Number.parseInt(age)})
        .then(() => {
            console.log("User Updated")
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <View style={{width:"95%",height:"95%",justifyContent:"center",alignItems:"center"}}>
                <View >
                    <Text style={{marginLeft:20}}>First Name</Text>
                    <CustomInput
                        type="default"
                        placeholder={firstName}
                        values={firstName}
                        onChange1={(e) => setFirstName(e)}
                    />
                </View>
                <View >
                    <Text style={{marginLeft:20}}>Last Name</Text>
                    <CustomInput
                        type="default"
                        placeholder={lastName}
                        values={lastName}
                        onChange1={(e) => setLastName(e)}
                        />
                </View>
                <View >
                    <Text style={{marginLeft:20}}>Age</Text>
                    <CustomInput
                        type="default"
                        placeholder={age}
                        values={age}
                        onChange1={(e) => setAge(e)}
                        />
                </View>
                <CustomButton
                type="signup"
                text="Update"
                    onPress={updateUser}
                />
            </View>
        </>
    )
}