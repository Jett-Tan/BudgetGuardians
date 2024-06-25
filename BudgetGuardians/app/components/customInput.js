import { Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

import styleSetting from '../setting/setting';
import Errors from '../setting/errors';


export default function CustomInput({
    type="default", // "password", "email", "confirm
    password = false,
    placeholder = "",
    onChange1 = (e) => {console.log("changed")},
    onChange2 = (e) => {console.log("changed")}, /* only for type === confirm */
    values = "",
    values2 = "",
    errorExist = true,
    hiddenEye = false,
    containerStyle = {},
    inputContainerStyle = {},
    inputStyle = {},
    errorHandle = (e,type,props = {}) => {return Errors.errorGetter(Errors.handleError(e,type,props))},
}) {
    const[error1, setError1] = useState('');
    const[showPassword1, setShowPassword1] = useState(false);

    /* Only for type === confirm*/
    const[error2, setError2] = useState('');
    const[showPassword2, setShowPassword2] = useState(false);

    
    
    const delay = async (ms) => {
        return new Promise((resolve) => 
            setTimeout(resolve, ms));
    }

    async function handleValueChange(value, inputNo = 0) {
        if (type === "confirm") {
            if (inputNo === 1) {
                onChange1(value); // Ensure the correct value is passed to onChange1
                await delay(1);
                setError1(errorHandle(value, "password"));
                setError2(errorHandle(values2, "confirm", { password: value, confirmPassword: values2 }));
            } else if (inputNo === 2) {
                onChange2(value); // Ensure the correct value is passed to onChange2
                await delay(1);
                setError1(errorHandle(values, "password"));
                setError2(errorHandle(value, "confirm", { password: values, confirmPassword: value }));
            }
        } else if (type === "password") {
            onChange1(value); // Ensure the correct value is passed to onChange1
            await delay(1);
            setError1(errorHandle(value, type));
        } else if (type === "email") {
            onChange1(value); // Ensure the correct value is passed to onChange1
            await delay(1);
            setError1(errorHandle(value, type));
        } else {
            onChange1(value); // Ensure the correct value is passed to onChange1
            setError1(errorHandle(value, type));
        }
    }
    
    const errorMargin = errorExist ? styles.existError:{};
    const ok1 = !error1 && values ? styles.ok:{};
    const ok2 = !error2 && values2 ? styles.ok:{};
    const notok1 = error1 && values ? styles.notok:{};
    const notok2 = error2 && values2 ? styles.notok:{};

    return (
        <>
            <View style= {[styles.container,errorMargin,containerStyle]}>
                <View style ={[styles.inputContainer,ok1,notok1,inputContainerStyle]}>
                    <TextInput
                        value={values}
                        placeholder={placeholder}
                        secureTextEntry={password && !showPassword1}
                        style={[styles.input,inputStyle]}
                        autoCapitalize="none"
                        
                        onChangeText={(value) => handleValueChange(value, 1)}
                    />
                    {!hiddenEye ? null : 
                        <Pressable 
                            onPress={() => setShowPassword1(!showPassword1)}
                            style={styles.icon}>
                            {true ? (
                                <Entypo name="eye" size={24} color="black" />
                            ) : (
                                <Entypo name="eye-with-line" size={24} color="black" />
                            )}
                        </Pressable>
                    }
                </View>
                {errorExist && (
                    <View key={error1} style={styles.errorsBox}>
                        <Text style={styles.errors}>{error1}</Text>
                    </View>
                )}
            </View>
            {
                type === "confirm" &&
                <View style= {[styles.container,errorMargin,containerStyle]}>
                    <View style ={[styles.inputContainer,ok2,notok2,inputContainerStyle]}>
                        <TextInput
                            value={values2}
                            placeholder={placeholder}
                            secureTextEntry={password && !showPassword2}
                            style={[styles.input,inputStyle]}
                            autoCapitalize="none"
                            
                            onChangeText={(value) => {
                                handleValueChange(value,2)
                            }}
                        />
                        {!hiddenEye ? null : 
                            <Pressable 
                                onPress={() => setShowPassword2(!showPassword2)}
                                style={styles.icon}>
                                {true ? (
                                    <Entypo name="eye" size={24} color="black" />
                                ) : (
                                    <Entypo name="eye-with-line" size={24} color="black" />
                                )}
                            </Pressable>
                        }
                    </View>
                    <View style={styles.errorsBox}>
                        <Text style={styles.errors}>{error2}</Text>
                    </View>
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth:styleSetting.size.em300,
        maxWidth:styleSetting.size.em400,
        height: styleSetting.size.em50,
        margin: styleSetting.size.em10,
        marginTop:0,
    },
    existError:{
        marginBottom: styleSetting.size.em20,
        height: styleSetting.size.em60,
    },
    errors:{
        color:styleSetting.color.red,
        fontSize:styleSetting.size.em10,
        textAlign:"right",
    },
    ok:{
        borderColor:styleSetting.color.forestgreen,
    },
    notok:{
        borderColor:styleSetting.color.red,
    },
    errorsBox:{
        marginLeft:"auto",
        marginRight:styleSetting.size.em16,
        height:styleSetting.size.em30,
        maxWidth:styleSetting.size.em295,        
    },
    input: {
        height: styleSetting.size.em47,
        width:styleSetting.size.em250,
    },
    inputContainer: {
        minWidth:styleSetting.size.em300,
        maxWidth:styleSetting.size.em400,
        height: styleSetting.size.em47,
        margin: styleSetting.size.em03,
        borderWidth: 1,
        padding: styleSetting.size.em10,
        borderRadius:styleSetting.size.em10,

        backgroundColor:styleSetting.color.white,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
    }
});
