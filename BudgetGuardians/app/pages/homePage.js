import { StyleSheet, Text, View, Button,Pressable,Modal,Image } from "react-native";

import styleSetting from "../setting/setting"
import { useState } from "react";
import { auth } from "../auth/firebaseConfig";
import { Redirect } from "expo-router";

export default function Page() {
    const user = auth.currentUser;
    if (!user) {
        console.log("no user")
        return <Redirect href={"../"}></Redirect>  
    }
    const[modalVisible,setModalVisible] = useState(false)
    const toggleModalVisible = () => {setModalVisible(!modalVisible)}
    return (
        <>
                <View style={styles.navigationBar}>
                    <Pressable>
                        <Image 
                            source={require('../assets/line.png')}
                            style={
                                {   
                                    resizeMode:"stretch",
                                    width:50,
                                    height:50
                                }
                            }
                        />
                    </Pressable>
                    <Modal 
                        visible = {modalVisible}
                    ></Modal>
                </View>
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.itemContainer}>
                    <View style= { styles.itemRow}>
                        <View style={styles.item}>
                            <Pressable>
                                <View>
                                    <Image>

                                    </Image>
                                    <Text></Text>
                                </View>
                            </Pressable>
                        </View>
                        <View style={styles.item}>
                            <Pressable>
                                <View>
                                    <Image>

                                    </Image>
                                    <Text></Text>
                                </View>
                            </Pressable>
                        </View>
                        <View style={styles.item}>
                            <Pressable>
                                <View>
                                    <Image>

                                    </Image>
                                    <Text></Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                    <View style= { styles.itemRow}>
                        <View style={styles.item}>
                            <Pressable>
                                <View>
                                    <Image>

                                    </Image>
                                    <Text></Text>
                                </View>
                            </Pressable>
                        </View>
                        <View style={styles.item}>
                            <Pressable>
                                <View>
                                    <Image>

                                    </Image>
                                    <Text></Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.lastestTransaction}>
                    {
                        //forloop 
                    }
                </View>
            </View>
        </View>
        </>
    );
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor:styleSetting.color.lightlightblue,
    },
    main: {
        flex: 1,
        maxWidth: styleSetting.size.em960,
        marginHorizontal: "auto",
        backgroundColor:styleSetting.color.lightlightblue,
    },
    navigationBar: {
        width:"auto",
        flex:1,
        backgroundColor:styleSetting.color.lightlightblue,
        height:50,
        maxHeight:90,
        padding:20,
        flexDirection:"row-reverse",
    },
    itemContainer:{
        backgroundColor:"#123456",
        width:300,
        height:200,
        marginTop:50,
        flexDirection:"column",
    },
    itemRow:{
        flexDirection:"row",
        justifyContent:"space-evenly",
    },
    item:{
        width:40,
        height:40,
        padding:30,
        margin:20,
        backgroundColor:"#ffff00",
    },
    lastestTransaction:{
        height:400,
        backgroundColor:"#123123",
    }
});
