import { Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

import styleSetting from '../setting/setting';
import Errors from '../setting/errors';

export default function CustomInput({
    type="default", // "password", "email", "confirm
    password = false,
    placeholder = "",
    onChange = (e) => {console.log("changed")},
    values = "",
    errorExist = true,
    hiddenEye = false,
    errorHandle = (e) => {return Errors.errorGetter(Errors.handleError(e,type))},
}) {
    const[error, setError] = useState('');
    const[value, setValue] = useState(values);
    const[showPassword, setShowPassword] = useState(false);

    const errorMargin = errorExist ? styles.existError:{};
    
    return (
        <>
            <View style= {[styles.container,errorMargin]}>
                <View style ={styles.inputContainer}>
                    <TextInput
                        value={value}
                        placeholder={placeholder}
                        secureTextEntry={password && !showPassword}
                        style={styles.input}
                        autoCapitalize="none"
                        
                        onChangeText={(e) => {
                            onChange(e)
                            setValue(e)
                            setError(errorHandle(e))
                            // setError(Errors.errorGetter(Errors.handleError(e,type)))
                        }}
                    />
                    {!hiddenEye ? null : 
                        <Pressable 
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.icon}>
                            {true ? (
                                <Entypo name="eye" size={24} color="black" />
                            ) : (
                                <Entypo name="eye-with-line" size={24} color="black" />
                            )}
                        </Pressable>
                    }
                </View>
                {error &&  
                    <View style={styles.errorsBox}>
                        <Text style={styles.errors}>{error}</Text>
                    </View>
                }
            </View>
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
    errorsBox:{
        marginLeft:"auto",
        marginRight:styleSetting.size.em16,
        height:styleSetting.size.em30,
        maxWidth:styleSetting.size.em295,  
        // backgroundColor:styleSetting.color.red,       
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
