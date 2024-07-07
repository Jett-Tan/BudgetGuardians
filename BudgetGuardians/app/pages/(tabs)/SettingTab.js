import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from "react-native";
import { auth } from "../../auth/firebaseConfig";
import CustomInput from "../../components/customInput";
import { getUserDataFromFirestore, liveUpdate, updateCategoriesToFirestore } from "../../setting/fireStoreFunctions";
import { Dropdown } from "react-native-element-dropdown";
import CategoryInput from "../../components/CategoryInput";
import styleSetting from "../../setting/setting";
import CustomButton from "../../components/customButton";
import FaIcon from "../../components/FaIcon";
import {defaultCategory} from "../../components/defaultCategory";

export default function SettingTab() {
    const [userCategory, setUserCategories] = useState([]);
    const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
    const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
    const [toEditCategoryIndex, setToEditCategoryIndex] = useState(0);
    const [toEditCategoryName, setToEditCategoryName] = useState("");
    const [toEditCategoryColor, setToEditCategoryColor] = useState(colorsPalette[0]);
    const [toAddCategoryName, setToAddCategoryName] = useState("");
    const [toAddCategoryColor, setToAddCategoryColor] = useState(colorsPalette[0]);

    liveUpdate((x) => {
        setUserCategories(x?.financialData?.categories || defaultCategory);
    });

    const onClickEditTab = (category) => {
        setToEditCategoryIndex(userCategory.indexOf(category));
        setToEditCategoryName(category.label);
        setToEditCategoryColor(colorsPalette.filter(x => x.hex == category.color)[0]);
        setModalVisibleEdit(true);
    }

    const onClickSave = () => {
        updateCategoriesToFirestore(userCategory.map((x,index) => index == toEditCategoryIndex ? {label:toEditCategoryName,value:toEditCategoryName,color:toEditCategoryColor.hex} : x)).then(() => {
            console.log("Updated");
        });
        // update the list of categories colors
        setModalVisibleEdit(false);
    }
    
    const onClickDelete = () => {
        const ans = prompt(`Are you sure you want to delete this category ${toEditCategoryName}? (Y/N)`)
        if(ans == "Y" || ans == "y"){
            updateCategoriesToFirestore(userCategory.filter((x,index) => index != toEditCategoryIndex)).then(() => {})
        }
        setModalVisibleEdit(false);
    }
    const onClickAddTab = () => {
        setModalVisibleAdd(true);
    }

    const onClickAddCategory = () => {
        // update the list of categories colors
        updateCategoriesToFirestore([...userCategory,{label:toAddCategoryName,value:toAddCategoryName,color:toAddCategoryColor.hex}]).then(() => {
            console.log("Updated");
        });
        setModalVisibleAdd(false);
    }

    return (
        <>
            <Modal visible={modalVisibleEdit} transparent={true} >
                <Pressable onPress={()=>setModalVisibleEdit(false)} style={{position:"absolute",width:"100%",height:"100%",backgroundColor:"#000",opacity:0.5}}/>
                <View style={{width:"auto",height:"auto",padding:30,margin:"auto",backgroundColor:styleSetting.color.lightblack,borderColor:"white",borderWidth:3,shadowColor:"white",shadowRadius:15,shadowOpacity:0.5,borderRadius:15,alignItems:"center",justifyContent:"center"}}>
                    <Text style={{fontSize:24,margin:10,color:"white"}}>Edit Category</Text>
                    <CustomInput 
                        values={toEditCategoryName} 
                        onChange1={(text) => setToEditCategoryName(text)} 
                        placeholder="Category Name" 
                        inputStyle={{color:"white",height:50}} 
                        inputContainerStyle={{background:"#111111",borderColor:"white",borderWidth:3,height:60,width:300}} 
                    />
                    <View style={{width:300,height:"auto",justifyContent:"center",borderColor:"white",marginVertical:30,borderRadius:15,borderWidth:3,padding:5}}>
                        <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",flexWrap:"wrap",width:280,height:"auto",marginVertical:5,marginHorizontal:"auto"}}>
                            {colorsPalette.map((color,index) => {
                                return (
                                    <Pressable
                                        key={index} 
                                        style={{
                                            width:30,
                                            height:30,
                                            backgroundColor:color.hex,
                                            borderWidth:3,
                                            borderColor:(color?.hex == toEditCategoryColor?.hex) ? "white": "black",
                                            shadowColor:color.hex,
                                            shadowOpacity:0.5,
                                            shadowRadius:8,
                                            borderRadius:25,
                                            margin:5}} 
                                        onPress={() => {setToEditCategoryColor(color);console.log(color);}}
                                    />
                                )
                            })}
                        </View>
                    </View>
                    <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between"}}>
                        <CustomButton text="Save" textStyle={{color:"green",padding:5}} containerStyle={{backgroundColor:"#111111",width:"40%",borderColor:"green",borderWidth:3,shadowColor:"green",shadowRadius:15,shadowOpacity:0.5}} onPress={() => onClickSave()} />
                        <CustomButton text="Delete" textStyle={{color:"red",padding:5}} containerStyle={{backgroundColor:"#111111",width:"40%",borderColor:"red",borderWidth:3,shadowColor:"red",shadowRadius:15,shadowOpacity:0.5}} onPress={() => onClickDelete()} />
                    </View>
                </View>
            </Modal>
            <Modal visible={modalVisibleAdd} transparent={true} >
                <Pressable onPress={()=>setModalVisibleAdd(false)} style={{position:"absolute",width:"100%",height:"100%",backgroundColor:"#000",opacity:0.5}}/>
                <View style={{width:"auto",height:"auto",padding:30,margin:"auto",backgroundColor:styleSetting.color.lightblack,borderColor:"white",borderWidth:3,shadowColor:"white",shadowRadius:15,shadowOpacity:0.5,borderRadius:15,alignItems:"center",justifyContent:"center"}}>
                    <Text style={{fontSize:24,margin:10,color:"white"}}>Edit Category</Text>
                    <CustomInput 
                        values={toAddCategoryName} 
                        onChange1={(text) => setToAddCategoryName(text)} 
                        placeholder="Category Name" 
                        inputStyle={{color:"white",height:50}} 
                        inputContainerStyle={{background:"#111111",borderColor:"white",borderWidth:3,height:60,width:300}} 
                    />
                    <View style={{width:300,height:"auto",justifyContent:"center",borderColor:"white",marginVertical:30,borderRadius:15,borderWidth:3,padding:5}}>
                        <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",flexWrap:"wrap",width:280,height:"auto",marginVertical:5,marginHorizontal:"auto"}}>
                            {colorsPalette.map((color,index) => {
                                return (
                                    <Pressable
                                        key={index} 
                                        style={{
                                            width:30,
                                            height:30,
                                            backgroundColor:color.hex,
                                            borderWidth:3,
                                            borderColor:(color?.hex == toAddCategoryColor?.hex) ? "white": "black",
                                            shadowColor:color.hex,
                                            shadowOpacity:0.5,
                                            shadowRadius:8,
                                            borderRadius:25,
                                            margin:5}} 
                                        onPress={() => {setToAddCategoryColor(color)}}
                                    />
                                )
                            })}
                        </View>
                    </View>
                    <CustomButton text="Add" textStyle={{color:"white",padding:5}} containerStyle={{backgroundColor:"#111111",width:"100%",borderColor:"white",borderWidth:3}} onPress={() => onClickAddCategory()} />
                </View>
            </Modal>
            <View style = {[{width:"95%",height:"90%",flexDirection:"row", margin: "2.5%", alignItems: "flex-start",justifyContent:"flex-start",flexWrap:"wrap",minWidth:250}]}>
                {userCategory.map((category,index) => {
                    return (
                        <CategoryBox key={index} category={category} onPress={() => onClickEditTab(category)}/>
                    )
                })}
                <CategoryBoxAdd onPress={()=>onClickAddTab()} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        columnGap:5,
        rowGap:5,
        gap:5,
    },
    categoryBox:{
        width:150,
        height:150,
        borderRadius:15,
        borderWidth:3,
        justifyContent:"center",
        alignItems:"center",
        borderColor:"white",
        marginHorizontal:"auto",
        margin:30,
    },

});
const CategoryBoxAdd = ({onPress}) => {
    return (
        <Pressable style={[styles.categoryBox,{shadowRadius:15,shadowOpacity:0.5,shadowColor:"white"}]} onPress={()=> onPress()}>
            <FaIcon name={"add"} color={"#fff"} size={120}/>
        </Pressable>
    )
}
const CategoryBox = ({category, onPress}) => {
    return (
        <Pressable style={[styles.categoryBox,{shadowRadius:15,shadowOpacity:0.5,shadowColor:category.color}]} onPress={()=> onPress()}>
            <Text style={{width:"100%",fontSize:24,color:"white",flexWrap: 'wrap',textAlign:"center"}}>
                {category.value}
            </Text>
        </Pressable>
    )
}

const colorsPalette = [
    {
        name:"Bright Red-Orange", 
        hex: '#FF5733' 
    }, 
    {
        name:"Bright Yellow", 
        hex: '#FFC300' 
    }, 
    {
        name:"Light Green", 
        hex: '#DAF7A6' 
    }, 
    {
        name:"Dark Red", 
        hex: '#900C3F' 
    }, 
    {
        name:"Dark Purple", 
        hex: '#581845' 
    }, 
    {
        name:"Bright Blue", 
        hex: '#3498DB' 
    }, 
    {
        name:"Bright Red", 
        hex: '#E74C3C' 
    },
    {
        name: "Crimson",
        hex: "#DC143C"
    },
    {
        name: "Coral",
        hex: "#FF7F50"
    },
    {
        name: "Gold",
        hex: "#FFD700"
    },
    {
        name: "Chartreuse",
        hex: "#7FFF00"
    },
    {
        name: "Lime",
        hex: "#00FF00"
    },
    {
        name: "Spring Green",
        hex: "#00FF7F"
    },
    {
        name: "Cyan",
        hex: "#00FFFF"
    },
    {
        name: "Deep Sky Blue",
        hex: "#00BFFF"
    },
    {
        name: "Dodger Blue",
        hex: "#1E90FF"
    },
    {
        name: "Medium Slate Blue",
        hex: "#7B68EE"
    },
    {
        name: "Magenta",
        hex: "#FF00FF"
    },
    {
        name: "Orchid",
        hex: "#DA70D6"
    },
    {
        name: "Light Coral",
        hex: "#F08080"
    },
    {
        name: "Khaki",
        hex: "#F0E68C"
    },
    {
        name: "Pale Green",
        hex: "#98FB98"
    },
    {
        name: "Aquamarine",
        hex: "#7FFFD4"
    },
    {
        name: "Turquoise",
        hex: "#40E0D0"
    },
    {
        name: "Sky Blue",
        hex: "#87CEEB"
    },
    {
        name: "Plum",
        hex: "#DDA0DD"
    },
    {
        name: "Lavender",
        hex: "#DFDFFF"
    },
    {
        name: "White",
        hex: "#ffffff"
    }
];
