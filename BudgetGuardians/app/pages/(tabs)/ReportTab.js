import { View , Text,TouchableOpacity,Dimensions} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import {liveUpdate} from '../../setting/fireStoreFunctions'
import { useEffect, useState } from "react";
import { defaultCategory } from "../../components/defaultCategory";
import { MultiSelect } from "react-native-element-dropdown";
import FaIcon from "../../components/FaIcon"
import { set } from "firebase/database";
import { DatePickerInput } from "react-native-paper-dates";

export default function ReportTab() {
    const [userTransactions, setUserTransactions] = useState([]);
    const [userBudgets, setUserBudgets] = useState([]);
    const [userCategories, setUserCategories] = useState([]);
    
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedDateRange, setSelectedDateRange] = useState([new Date(new Date().getFullYear(), 0, 1), new Date(new Date().getFullYear(), 11, 31)]);
    const [startDateError,setStartDateError] = useState("")
    const [endDateError,setEndDateError] = useState("")
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    
    useEffect(() => {
        liveUpdate((x) => {
            const transactions = x?.financialData?.transactions?.map( t => {
                return {
                    amount: t?.amount,
                    category: t?.category,
                    date: t?.date,
                    day: t?.date?.split("/")[0],
                    month: t?.date?.split("/")[1] - 1,
                    year: t?.date?.split("/")[2],
                    formatedDate: new Date(t?.date.split("/")[2], t?.date.split("/")[1], t?.date.split("/")[0])
                }
            });
            setUserTransactions(transactions || []);
            setUserBudgets(x?.financialData?.budgetInfo?.budgets || []);
            setUserCategories(x?.financialData?.categories || defaultCategory);
        });
    }, [userTransactions, userBudgets, userCategories,selectedDateRange]);

    const generateDataByMonth = () => {
        let data = generateLabels();
        if (withinAMonth(selectedDateRange[0],selectedDateRange[1])) {
            return data.map((x, index) => {
                const isFiltered = selectedCategory?.length > 0;
                if (isFiltered) {
                    return {
                        day : x.day,
                        month : x.month,
                        year : x.year,
                        data : userBudgets.filter((budget) => {
                            return (selectedCategory.includes(budget?.budgetCategory))
                        }).reduce((acc, budget) => acc + budget?.budgetAmount, 0)
                    }
                } 
                return {
                    day : x.day,
                    month: x.month,
                    year: x.year,
                    data: userBudgets.reduce((acc, budget) => acc + budget?.budgetAmount, 0)
                }
            }).map((x,index) => {
                const isFiltered = selectedCategory?.length > 0;
                if (isFiltered) {
                    return userTransactions.filter((transaction) => {
                        return (
                            (transaction?.day == x?.day) &&
                            (transaction?.month == x?.month) &&
                            (transaction?.year == x?.year) &&
                            selectedCategory.includes(transaction?.category)
                        )
                    }).reduce((acc, transaction) => acc + transaction?.amount, x?.data)
                }
                return userTransactions.filter((transaction) => {
                    return (
                        (transaction?.day == x?.day) &&
                        (transaction?.month == x?.month) &&
                        (transaction?.year == x?.year)
                    )
                }).reduce((acc, transaction) => acc + transaction?.amount, x?.data)
            })

        } else if (withinAYear(selectedDateRange[0],selectedDateRange[1])) {            
            return data.map((x, index) => {
                const isFiltered = selectedCategory?.length > 0;
                if (isFiltered) {
                    return {
                        month: x.month,
                        year: x.year,
                        data: userBudgets.filter((budget) => {
                            return (selectedCategory.includes(budget?.budgetCategory))
                        }).reduce((acc, budget) => acc + budget?.budgetAmount, 0)
                    }
                }
                return {
                    month: x.month,
                    year: x.year,
                    data: userBudgets.reduce((acc, budget) => acc + budget?.budgetAmount, 0)
                }
            })
            .map((x,index) => {
                const isFiltered = selectedCategory?.length > 0;
                if (isFiltered) {
                    return userTransactions.filter((transaction) => {
                        return (
                            // new Date(transaction?.formatedDate) >= new Date(selectedDateRange[0]) && 
                            // new Date(transaction?.formatedDate) <= new Date(selectedDateRange[1]) && 
                            (transaction?.month == x?.month) &&
                            (transaction?.year == x?.year) &&
                            selectedCategory.includes(transaction?.category)
                        )
                    }).reduce((acc, transaction) => acc + transaction?.amount, x?.data)
                }
                return userTransactions.filter((transaction) => {
                    return (
                            // new Date(transaction?.formatedDate) >= new Date(selectedDateRange[0]) && 
                            // new Date(transaction?.formatedDate) <= new Date(selectedDateRange[1]) 
                            (transaction?.month == x?.month) &&
                            (transaction?.year == x?.year)
                        )
                }).reduce((acc, transaction) => acc + transaction?.amount, x?.data)
            })
        } else {
            return data.map((x, index) => {
                const isFiltered = selectedCategory?.length > 0;
                if (isFiltered) {
                    return {
                        year: x.year,
                        data: userBudgets.filter((budget) => {
                            return (selectedCategory.includes(budget?.budgetCategory))
                        }).reduce((acc, budget) => acc + budget?.budgetAmount, 0)
                    }
                }
                return {
                    year: x.year,
                    data: userBudgets.reduce((acc, budget) => acc + budget?.budgetAmount, 0)
                }
            })
            .map((x,index) => {
                const isFiltered = selectedCategory?.length > 0;
                if (isFiltered) {
                    return userTransactions.filter((transaction) => {
                        return (
                            (transaction?.year == x?.year) &&
                            selectedCategory.includes(transaction?.category)
                        )
                    }).reduce((acc, transaction) => acc + transaction?.amount, x?.data)
                }
                return userTransactions.filter((transaction) => {
                    return (
                            (transaction?.year == x?.year)
                        )
                }).reduce((acc, transaction) => acc + transaction?.amount, x?.data)
            })
        }
    };

    const generateLabels = () => { 
        const monthsDiff = Math.abs( 
            (new Date(selectedDateRange[1]).getFullYear() * 12 + new Date(selectedDateRange[1]).getMonth()) - 
            (new Date(selectedDateRange[0]).getFullYear() * 12 + new Date(selectedDateRange[0]).getMonth())) + 1;
        const yearsDiff = Math.abs(new Date(selectedDateRange[1]).getFullYear() - new Date(selectedDateRange[0]).getFullYear()) + 1;

        let labels = [];    
        let year = selectedDateRange[0].getFullYear();
        if (withinAMonth(selectedDateRange[0],selectedDateRange[1])) {
            let startDay = new Date(selectedDateRange[0]);
            let endDay = new Date(selectedDateRange[1]);
            while (startDay <= endDay) {
                labels.push({day:startDay.getDate(),month:startDay.getMonth(), year: startDay.getFullYear()});
                startDay.setDate(startDay.getDate()+1);
            }
        } else if (withinAYear(selectedDateRange[0],selectedDateRange[1])) {
            for (let i = 0; i < monthsDiff; i++) {
                if (selectedDateRange[0].getMonth() + i > 11) {
                    year = selectedDateRange[0].getFullYear() + 1;
                }
                    selectedDateRange[0].getMonth() + i > 11 ? 
                        labels.push({month:selectedDateRange[0].getMonth() + i - 12, year: year}) :
                    selectedDateRange[0].getMonth() + i < 0 ? 
                        labels.push({month:selectedDateRange[0].getMonth() + i + 12, year: year}) :
                        labels.push({month:selectedDateRange[0].getMonth() + i, year: year});
                }
        }else {
            for (let i = 0; i < yearsDiff; i++) {
                if (labels.filter((x) => x.year == year).length == 0) {
                    labels.push({year: year});
                    year += 1
                }
            }
        }
        return labels;
    }
    const inOrder = (date1,date2) =>{ 
        var diff = new Date(date2.getTime() - date1.getTime());
        if (diff.getUTCFullYear() - 1970 < 0) {
            setStartDateError("Start Date must be before End Date")
            setEndDateError("End Date must be after Start Date")
            return false;
        }else {
            setStartDateError("")
            setEndDateError("")
            return diff.getUTCFullYear() - 1970 >= 0
        }
    }
    
    const renderItem = item => (
        <View style={{height:30,paddingLeft:10}}>
            <Text style={{color:"white",fontSize:20}}>{item.label}</Text>
        </View>
    );
    const withinAYear = (date1,date2) => {
        var diff = new Date(date2.getTime() - date1.getTime());
        // console.log(diff.getUTCFullYear() - 1970)
        // console.log(diff)
        // return true;
        return diff.getUTCFullYear() - 1970 <= 1
    }

    const withinAMonth = (date1,date2) => {
        var diff = new Date(date2.getTime() - date1.getTime());
        console.log(diff.getUTCMonth())
        return diff.getUTCFullYear() - 1970 <= 1 && diff.getUTCMonth() < 1
    }
    const renderSelectedItem = (item, unSelect) => (
        <TouchableOpacity onPress={() => {unSelect && unSelect(item)}}>
            <View style={{width:"auto",marginHorizontal:10,borderRadius:10,padding:5,borderColor:"white",borderWidth:3,flexDirection:"row"}}>
                <Text style={{color:"white",marginRight:10,fontWeight:"bold"}}>{item}</Text>
                <FaIcon
                    color="white"
                    name="trash-can"
                    size={20}/>
            </View>
        </TouchableOpacity>
    );
    const unSelect = (item) => {
        setSelectedCategory(selectedCategory.filter((x) => x !== item));
    }
    const graphWidth = Dimensions.get('window').width * 0.8;
    const graphHeight = Dimensions.get('window').height * 0.8;

    return (
        <View style={{margin:"2.5%",width:"95%",height:"95%"}}>
            <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
                <View style={{width:"30%"}}>
                    <MultiSelect
                        style={[{shadowColor:"black",width:"100%",height:60,shadowRadius:15,paddingHorizontal:5, borderRadius:10,shadowOpacity:0.5, borderWidth: 3,// Add this line
                        borderColor: 'white', backgroundColor:"#111111"}]}
                        containerStyle={{borderWidth: 3, marginTop:10,paddingVertical: 8,borderRadius:15, borderColor:"white", backgroundColor:"#111111"}}
                        placeholderStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap', color:"white"}}
                        selectedTextStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap',  color:"white"}}
                        inputSearchStyle={{fontSize: 16,height:54,whiteSpace: 'nowrap',  color:"white"}}
                        itemContainerStyle={{backgroundColor: "#111111"}}
                        itemTextStyle={{color:"white"}}
                        data={userCategories}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Category"
                        value={selectedCategory}
                        activeColor='#2596be'
                        search
                        searchPlaceholder="Search..."
                        onChange={item => {
                            setSelectedCategory(item);
                        }}
                        renderLeftIcon={() => (
                            <FaIcon
                            color="#7b9a6d"
                            name="money-bill"
                            size={20}
                        
                        />
                        )}
                        showsVerticalScrollIndicator={false}
                        visibleSelectedItem={false}
                        renderItem={renderItem}
                        // renderSelectedItem={renderSelectedItem}
                    />
                </View>
                <View style={{width:"30%"}}>
                    <DatePickerInput 
                        style={{width:"20%",backgroundColor:"#111111",color:"white",borderRadius:10,borderTopRightRadius:10,borderTopLeftRadius:10,height:54,alignSelf:"flex-start",padding:0,borderWidth:3,borderColor:"white"}}
                        underlineStyle={{borderWidth:0}}
                        underlineColor="white"
                        outlineStyle={{borderWidth:0}}
                        selectionColor="white"
                        iconColor="white"
                        textColor="white"
                        activeUnderlineColor="white"
                        color
                        placeholderTextColor={"white"}
                        locale="en-SG"
                        value={selectedDateRange[0]}
                        onChange={(d) => {
                            const rest = selectedDateRange[1];
                            if (inOrder(d,rest)) {
                                setSelectedDateRange([d,rest])
                            }
                        }}
                        onChangeText={(d) => {
                            const rest = selectedDateRange[1];
                            if (typeof d === Date && inOrder(d,rest)) {
                            // if (typeof d === Date ) {
                                setSelectedDateRange([d,rest])
                            }
                        }}
                        inputMode="start"
                        label="Start Date"
                        display="calendar"
                    />
                    {startDateError ? <Text style={{color:"red",fontSize:16}}>{startDateError}</Text> : <></>}
                </View>
                <View style={{width:"30%"}}>
                    <DatePickerInput 
                        style={{width:"20%",backgroundColor:"#111111",color:"white",borderRadius:10,borderTopRightRadius:10,borderTopLeftRadius:10,height:54,alignSelf:"flex-start",padding:0,borderWidth:3,borderColor:"white"}}
                        underlineStyle={{borderWidth:0}}
                        underlineColor="white"
                        outlineStyle={{borderWidth:0}}
                        selectionColor="white"
                        iconColor="white"
                        textColor="white"
                        activeUnderlineColor="white"
                        color
                        placeholderTextColor={"white"}
                        locale="en-SG"
                        value={selectedDateRange[1]}
                        onChange={(d) => {
                            const rest = selectedDateRange[0];
                            if (inOrder(rest,d)) {
                                setSelectedDateRange([rest,d]) 
                            }
                        }}
                        onChangeText={(d) => {
                            const rest = selectedDateRange[0];
                            if (typeof d === Date && inOrder(rest,d)) {
                            // if (typeof d === Date ) {
                                setSelectedDateRange([rest,d]) 
                            }
                        }}
                        inputMode="start"
                        label="End Date"
                        display="calendar"
                    />
                    {endDateError ? <Text style={{color:"red",fontSize:16}}>{endDateError}</Text> : <></>}
                </View>
            </View>
            <View style={{width:"100%",marginTop:30,flexDirection:"row",justifyContent:"center"}}>
                {selectedCategory.length > 0 ? 
                selectedCategory.map((x) => {return renderSelectedItem(x, () => unSelect(x))}) : 
                <Text style={{color:"white",fontSize:20,alignSelf:"center",fontWeight:"bold"}} >All Category Selected</Text>   }
            </View>
            <View style={{width:"100%",marginTop:30}}>
                <LineChart
                    fromZero={true}
                    
                    data={{
                        labels: generateLabels().map((x) => {
                            const day = x?.day ? x?.day + " " : "";
                            const month = monthNames[x?.month] + " " || "";
                            const dayNum = x?.day < 10 ? "0" + x?.day : x?.day;
                            const monthNum = x?.month + 1 < 10 ? "0" + (x?.month + 1) : x?.month + 1;
                            if (withinAMonth(selectedDateRange[0],selectedDateRange[1])) {
                                return dayNum +" / "+ monthNum
                            } else if (withinAYear(selectedDateRange[0],selectedDateRange[1])) {
                                return month + x.year
                            }
                            return  x.year
                        }),
                        datasets: [
                            {
                                data: generateDataByMonth()
                            }
                        ],
                    }}
                    
                    width={graphWidth} // from react-native
                    height={graphHeight}
                    xLabelsOffset={-10}
                    yAxisLabel="$"
                    yAxisSuffix=""
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            // stroke: "#ffa726"                            
                        },
                        style:{

                            borderWidth:3,
                            borderColor:"white",
                        }
                    }}
                    
                    onDataPointClick={({value, index}) => {alert(`You clicked on ${index} with value ${value}`)}}
                    transparent
                    bezier
                    style={{
                        alignItems:"center",
                        justifyContent:"center",
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    
                />
            </View>
        </View>
    )
}
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];