import { View,StyleSheet,Text, TouchableOpacity, FlatList, Modal } from "react-native"
import { useState, useEffect } from "react"

import { getUserDataFromFirestore, liveUpdate } from "../../setting/fireStoreFunctions"
import styleSetting from "../../setting/setting";
import FaIcon from "../../components/FaIcon";
import TransactionEntry from "../../components/transactionEntry";
import { set } from "firebase/database";
import { defaultCategory } from "../../components/defaultCategory";

class Day {
    constructor(day , current = true) {
        this.day = day;
        this.transactions = [];
        this.total = 0;
        this.current = current
    }
    addTransaction(transaction) {
        this.transactions.push(transaction);
        this.total += transaction?.amount;
    }
    
}

export default function CalendarTab() {
    const [userTransactions, setUserTransactions] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentCalendar, setCurrentCalendar] = useState([]);
    const [userCategory, setUserCategory] = useState([]);

    useEffect(() => {
        liveUpdate((x) => {
            // console.log(x?.financialData?.transactions);
            setUserTransactions(x?.financialData?.transactions?.map((x) => {
                return {
                    ...x,
                    day:Number.parseInt(x?.date?.split("/")[0]),
                    month:Number.parseInt(x?.date?.split("/")[1])-1,
                    year:Number.parseInt(x?.date?.split("/")[2]) 
                }
            }) || [])
            getTransactionsInThisMonth();
            setUserCategory(x?.financialData?.category || defaultCategory)
        })
    }, [currentMonth, currentYear, userTransactions, currentCalendar])

    const shiftMonth = (month) => {
        if (month < 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else if (month > 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(month);
        }
    }

    const getTransactionsInThisMonth = () => {
        let transactions = userTransactions.filter((transaction) => {
            return currentMonth == transaction?.month && currentYear == transaction?.year;
        })
        let calendar = generateCalendar()
        calendar.forEach((day) => {
            transactions.forEach((transaction) => {
                if (day.day == transaction?.day) {
                    day.addTransaction(transaction);
                }
            })
        })
        setCurrentCalendar(calendar);
    }

    const generateCalendar = () => {
        let numberOfDaysInThisMonth = daysInThisMonth(currentYear,currentMonth);
        let startDateDay = new Date(currentYear, currentMonth, 1).getDay();
        let endDateDay = new Date(currentYear, currentMonth, numberOfDaysInThisMonth).getDay();

        let addDaystoFront = Math.abs(0 - startDateDay);
        let addDaystoEnd = Math.abs(6 - endDateDay);
        
        let calendar = [];

        let previousMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1;
        let previousYear = currentMonth - 1 < 0 ? currentYear - 1 : currentYear;
        let numberOfDaysInPreviousMonth = daysInThisMonth(previousYear,previousMonth);
        for (let i = numberOfDaysInPreviousMonth - addDaystoFront + 1; i <= numberOfDaysInPreviousMonth; i++) {
            calendar.push(new Day(i, false));
        }
        for (let i = 1; i <= numberOfDaysInThisMonth; i++) {
            calendar.push(new Day(i));
        }
        for (let i = 1; i <= addDaystoEnd; i++) {
            calendar.push(new Day(i, false));
        }
        return calendar;
    }

    function daysInThisMonth(currentYear,currentMonth) {
        return new Date(currentYear, currentMonth+1, 0).getDate();
    }
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

    const onClick = (day) => {
        setModalVisible(true);
        setSelectedDay(day);
    } 
    return (
        <>
            <Modal transparent={true} visible={modalVisible}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.5)",justifyContent:"center",alignItems:"center"}}>
                    <View style={{minWidth:"50%",width:"auto",height:"80%",padding:10,backgroundColor:"#111111",borderWidth:3,shadowColor:"white",shadowRadius:10,borderColor:"white",borderRadius:10}}>
                        <Text style={{color:"white",textAlign:"center",fontSize:30,paddingVertical:30}} > {new Date(currentYear,currentMonth,selectedDay?.day).toDateString()}</Text>
                        {selectedDay?.total > 0 && <Text style={{color:"white",textAlign:"center",fontSize:20,paddingVertical:10}}>Total: +${Math.abs(selectedDay?.total).toFixed(2)}</Text>}
                        {selectedDay?.total < 0 && <Text style={{color:"white",textAlign:"center",fontSize:20,paddingVertical:10}}>Total: -${Math.abs(selectedDay?.total).toFixed(2)}</Text>}
                        {selectedDay?.transactions.length == 0 && <Text style={{color:"white",textAlign:"center",fontSize:20,paddingVertical:10}}>No transactions</Text>}
                        <FlatList
                            contentContainerStyle={{padding:10,width:"100%",height:"100%"}}
                            data={selectedDay?.transactions}
                            renderItem={({item}) => (
                                <TransactionEntry 
                                    props={{amount:item.amount,category:item.category,date:item.date}} 
                                    titleBoxStyle={{shadowRadius:10,shadowOpacity:0.9,shadowColor:userCategory.filter((y) => y.value === item.category).map((y) => y.color)[0]}}
                                    containerStyle={{width:"100%",height:100,marginVertical:10}}
                                    transactionStyle={{color:"white",width:"100%"}}
                                    showbutton={false}
                                    onPress={() => {}}
                                />
                            )}
                            scrollEnabled={true}
                            keyExtractor={(item,index) => index}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
            <View style={{width:"95%",height:"95%",margin:"2.5%"}}>
                <View style={{borderColor:"white",borderWidth:3,height:50,borderRadius:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <TouchableOpacity style={{marginLeft:15}} onPress={() => shiftMonth(currentMonth - 1)}>
                        <FaIcon name="chevron-left" size={styleSetting.size.em20} color="white"/>
                    </TouchableOpacity>
                    <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>
                        {monthMap[currentMonth]} {currentYear}
                    </Text>
                    <TouchableOpacity style={{marginRight:15}} onPress={() => shiftMonth(currentMonth + 1)}>
                        <FaIcon name="chevron-right" size={styleSetting.size.em20} color="white"/>
                    </TouchableOpacity>
                </View>
                <View style={{borderColor:"white",borderWidth:3,height:"70%",marginTop:30,borderRadius:10,flexDirection:"column",alignItems:"center"}}>
                    <FlatList
                        data={weekDayMap}
                        renderItem={({item}) => (
                            <Text style={{color:"white",marginHorizontal:"auto",fontSize:45,paddingTop:5,width:80,textAlign:"center"}}>{item}</Text>
                        )}
                        
                        style={{width:"100%",height:70}}
                        contentContainerStyle={{justifyContent:"space-between",width:"100%",height:70,paddingHorizontal:30,}}
                        keyExtractor={item => item}
                        numColumns={7}
                        scrollEnabled={false}
                    />
                    <FlatList
                        data={currentCalendar}
                        renderItem={({item}) => (
                            <Item item={item} onPress={()=>onClick(item)} />
                        )}
                        keyExtractor={item => item.day}
                        numColumns={7}
                        style={{width:"100%",height:"100%"}}
                        contentContainerStyle={{justifyContent:"space-between",width:"100%",height:"100%",padding:30}}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </>
    )
}
const Item = ({item, onPress}) => {
    const borderColor = !item.current ? styleSetting.color.grey : Number.parseInt(item.total) > 0 ? styleSetting.color.forestgreen : 
        Number.parseInt(item.total) < 0 ? styleSetting.color.cadmiumRed : "white";
    const shadowColor = !item.current ? styleSetting.color.lightgrey : Number.parseInt(item.total) > 0 ? styleSetting.color.neonGreen : 
        Number.parseInt(item.total) < 0 ? styleSetting.color.neonRed : "white";
    const textColor = !item.current ? styleSetting.color.lightgrey : "white";
    const onClick = item.current ? onPress : () => {};
    const borderWidth = !item.current ? 0 : 3;
    const opacity = !item.current ? 0.7 : 1;
    const disabled = !item.current ? true : false;
    
    return (
        <TouchableOpacity onPress={onClick} disabled={disabled}style={[{opacity:opacity,margin:"auto",marginVertical:5,height:50,width:50,shadowColor:shadowColor,shadowOpacity:0.5,shadowRadius:15,borderColor:borderColor,borderWidth:borderWidth,borderRadius:50,justifyContent:"center",alignItems:"center"}]}>
            <Text style={[{color: textColor,fontSize:20,fontWeight:"bold"}]}>{item.day}</Text>
        </TouchableOpacity>
    )
}

const weekDayMap = [
    "S",
    "M",
    "T",
    "W",
    "T",
    "F",
    "S"
]

const monthMap = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]