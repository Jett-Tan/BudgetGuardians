import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native"
import { sendEmailVerification } from "firebase/auth"
import { auth } from "../auth/firebaseConfig"
import { useState } from "react"

import CustomButton from "./customButton"
import styleSetting from "../setting/setting"
import Errors from "../setting/errors"

export default function Overlay({visible}) {
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [modalVisible, setModalVisible] = useState(true)

    handleEmailVerification = () => {
        sendEmailVerification(auth.currentUser)
        .then(() => {
            setSuccess("Email sent! Check email for verification instructions.")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.code)
            setError(Errors.errorGetter(error.code))
        });
    }
    checkVerify = () => {
        console.log("checkVerify")
        auth.currentUser.reload()
        .then(() => {
            if(auth.currentUser.emailVerified) {
                setSuccess("Email verified!")
                setModalVisible(false)
                setError('')
            } else {
                setSuccess('')
                setError("Email not verified!")
            }
        })
    }
    return (
        <>
            <Modal 
                visible = {visible && modalVisible}
                transparent={true}
            >
                <TouchableOpacity style={styles.overlay} onPress={e => checkVerify()}>
                </TouchableOpacity>
                <View style={styles.card}>
                    <CustomButton
                    type={"danger"}
                    text = "Verify your email"
                    onPress={e => handleEmailVerification()}
                    containerStyle={{backgroundColor:styleSetting.color.cadmiumRed,paddingHorizontal:10}}
                    textStyle={{color:styleSetting.color.white,fontSize:24,fontWeight:"bold"}}
                    />
                    {success ? <Text style={styles.success}>{success}</Text> : <Text></Text>}
                    {error ? <Text style={styles.error}>{error}</Text> : <Text></Text>}
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        zIndex:-1,
        alignItems: "center",
        justifyContent: "center",
        verticalAlign: "center",
        width:"100%",
        height:"100%",
        backgroundColor: "gray",
        opacity: 0.6,
    },
    error:{
        color:styleSetting.color.red,
    },
    success:{
        color:styleSetting.color.forestgreen,
    },
    card:{
        backgroundColor:"#fff",
        opacity: 1,
        padding:20,
        borderRadius:10,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5,
        width:300,
        height:150,
        margin:"auto",
        justifyContent:"center",
        alignItems:"center",
    }
})