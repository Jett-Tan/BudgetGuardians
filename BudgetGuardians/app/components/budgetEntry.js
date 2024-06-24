import { Text, View, Pressable,StyleSheet } from "react-native";
import styleSetting from "../setting/setting"
import PieChart from 'react-native-pie-chart'
import FaIcon from "./FaIcon";

export default function BudgetEntry({
    onPress = (e) => {console.log(e);}, //modal
    props = {},
    deleteBudget = (e) => {console.log(e);},
    editBudget = (e) => {console.log(e);},
    showbutton = true,
}) {
    const widthAndHeight = 120
    const series = [123, 321]
    const sliceColor = ['#fbd203', '#ffb300']
    return (
        <>
            <View style={{width:150,height:"auto",shadowColor:"black",margin:15,borderRadius:15,shadowRadius:15,shadowOpacity:0.5}}>
                <View style={{width:"100%",height:20}}>
                    <Pressable style={{position:"absolute",left:0,margin:10,width:18,height:18}} onPress={deleteBudget}>
                        <FaIcon name="x" size={styleSetting.size.em16} style={{margin:0,color:"red"}}/>
                    </Pressable>
                    <Pressable style={{position:"absolute",right:0,margin:10,width:18,height:18,}} onPress={editBudget}>
                        <FaIcon name="edit" size={styleSetting.size.em16} style={{margin:0,color:"black"}}/>
                    </Pressable>
                </View>
                <Text style={{fontWeight:"bold",marginVertical:15,fontSize:20,textAlign:"center"}}>{props.category}</Text>
                <View style={{justifyContent:"center",marginBottom:15,alignItems:"center"}}>
                    <Text style={{position:"absolute",zIndex:10,margin:"auto",fontWeight:"bold"}}>${props.amount?.toFixed(2)}</Text>
                    <PieChart
                        style={{margin:"auto"}}
                        widthAndHeight={widthAndHeight}
                        series={series}
                        sliceColor={sliceColor}
                        coverRadius={0.6}
                        coverFill={'#FFF'}
                    />
                </View>
            </View>
            {/* <View style={styles.row}>
                <Pressable style={styles.transaction} onPress={onPress}>
                    <View style={styles.box}>
                        <View style={styles.miniBox}>
                            <Text style={[]}>{props.date}</Text>
                            <View style={styles.title}>
                                <Text style={styles.right}>{props.category}</Text>
                            </View>
                        </View>
                        <Text style={styles.right}>${props.amount?.toFixed(2)}</Text>
                    </View>
                    
                </Pressable>
                {showbutton && (
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                        <Pressable style={styles.deletebutton} onPress={(e)=>{deleteBudget(e)}}>
                            <Text style={{textAlign:"center"}}>Delete Budget</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={(e)=>{editBudget(e)}}>
                            <Text style={{textAlign:"center"}}>Edit Budget</Text>
                        </Pressable>
                    </View>
                )}
            </View> */}
            
        </>
    )
}

const styles = StyleSheet.create({
    transaction:{
        margin:styleSetting.size.em10,
        padding: 10,
        width: '60%',
        minWidth: 200,

    },
    miniBox:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    box: {
        width:"100%",
        padding:styleSetting.size.em10,
    },
    title:{
        borderRadius:styleSetting.size.em07,
        paddingLeft:styleSetting.size.em05,
        paddingRight:styleSetting.size.em05,
        backgroundColor:'#89CFF0',    
    },
    right:{
        textAlign:"right",
        fontSize:styleSetting.size.em16,
    },
    button:{
        backgroundColor: '#89CFF0',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 80,
        minHeight: 50,
        width:"20%",
        borderRadius:5,
        shadowColor:"black",
        shadowOpacity:0.5,
        shadowOffset:{width:2,height:2},
        margin:15,
        height:"60%",
    },
    deletebutton:{
        backgroundColor: "#ff7588",
        minWidth: 80,
        minHeight: 50,
        width:"20%",
        borderRadius:5,
        shadowColor:"black",
        shadowOpacity:0.5,
        shadowOffset:{width:2,height:2},
        margin:15,
        height:"60%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexWrap: 'wrap',
        flex:3
    },  
    amount:{
        fontSize:styleSetting.size.em20,
    },
})