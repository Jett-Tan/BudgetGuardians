import { View, TouchableOpacity,Text } from "react-native";

export default function Switch({
    toggle = () => {},
    color = {
        x:"green",
        y:"red"
    },
    text = {
        x:"x",
        y:"y"
    },
    state = {
        x:true,
        y:false
    },
    style = {
        container:{},
        button:{},
        text:{}
    }
}) {
    return (
        <View style={[{width:"100%",height:60,borderRadius:10,borderColor:"white",borderWidth:3,flexDirection:"row",justifyContent:"center"},style.container]}>
            <TouchableOpacity style={[{justifyContent:"center",alignItems:"center",width:"49%",marginVertical:3,borderRadius:5},{backgroundColor:state.x ? color.x : ""},style.button]} onPress={toggle}>
                <Text style={[{color:"white"},style.text]}>{text.x}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{justifyContent:"center",alignItems:"center",width:"49%",marginVertical:3,borderRadius:5},{backgroundColor:state.y ? color.y : ""},style.button]} onPress={toggle}>
                <Text style={[{color:"white"},style.text]}>{text.y}</Text>
            </TouchableOpacity>
        </View>
    )
}