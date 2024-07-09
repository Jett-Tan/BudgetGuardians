import { View,StyleSheet,Text, TouchableOpacity, FlatList } from "react-native"
import { useState, useEffect } from "react"

import { getUserDataFromFirestore, liveUpdate } from "../../setting/fireStoreFunctions"
import styleSetting from "../../setting/setting";
import FaIcon from "../../components/FaIcon";

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
    return (
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
            <View style={{borderColor:"white",borderWidth:3,height:"80%",marginTop:30,borderRadius:10,flexDirection:"column",alignItems:"center"}}>
                <FlatList
                    data={weekDayMap}
                    renderItem={({item}) => (
                        <Text style={{color:"white",marginHorizontal:"auto",fontSize:45,paddingTop:15,width:80,textAlign:"center"}}>{item}</Text>
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
                        <Item item={item} onPress={()=>alert(item.total)} textColor={"white"} />
                    )}
                    keyExtractor={item => item.day}
                    numColumns={7}
                    style={{width:"100%",height:"100%"}}
                    contentContainerStyle={{justifyContent:"space-between",width:"100%",height:"100%",padding:30}}
                    scrollEnabled={true}
                />
            </View>
        </View>
    )
}
const Item = ({item, onPress,  textColor}) => {
    const previous = !item.current ? "gray" : "white";
    const shadowColor = !item.current ? "gray" : Number.parseInt(item.total) > 0 ? "green" : 
        Number.parseInt(item.total) < 0 ? "red" : "white";
    const onClick = item.current ? onPress : () => {};
    return (
        <TouchableOpacity onPress={onClick} style={[{margin:"auto",height:80,width:80,shadowColor:shadowColor,shadowOpacity:0.5,shadowRadius:15,borderColor:shadowColor,borderWidth:3,borderRadius:50,justifyContent:"center",alignItems:"center"}]}>
            <Text style={[{color: textColor,fontSize:30}]}>{item.day}</Text>
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