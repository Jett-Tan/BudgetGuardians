import { View , Text,TouchableOpacity} from "react-native";
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

export default function ReportTab() {
    const [userTransactions, setUserTransactions] = useState([]);
    const [userBudgets, setUserBudgets] = useState([]);
    const [userCategories, setUserCategories] = useState([]);
    
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    useEffect(() => {
        liveUpdate((x) => {
            setUserTransactions(x?.financialData?.transactions || []);
            setUserBudgets(x?.financialData?.budgetInfo?.budgets || []);
            setUserCategories(x?.financialData?.categories || defaultCategory);
        });
        
    }, [userTransactions, userBudgets, userCategories,selectedYear,selectedMonth]);

    const generateDataByMonth = () => {
        let year = new Date().getFullYear();
        let data = [];
        for (let i = 0; i < 12; i++) {
            if (selectedCategory.length <= 0) {
                data.push(userBudgets.reduce((acc, budget) => {acc += budget?.budgetAmount; return acc}, 0));
                continue;
            }else {
                // console.log(selectedCategory , userBudgets.filter((budget) => selectedCategory.includes(budget?.budgetCategory)));
                data.push(userBudgets.filter((budget) => {
                    return selectedCategory.includes(budget?.budgetCategory)
                }).reduce((acc, budget) => {acc += budget?.budgetAmount; return acc}, 0));
            }
        }
        return data.map((x, index) => { 
            let p =  userTransactions.filter((transaction) => {
                return index+1 == Number.parseInt(transaction?.date?.split("/")[1])  && Number.parseInt(transaction?.date?.split("/")[2]) == year
            }).reduce((acc, transaction) => acc + transaction?.amount, x);
            return p
        })
    }
    const renderItem = item => (
        <View style={{height:30,paddingLeft:10}}>
            <Text style={{color:"white",fontSize:20}}>{item.label}</Text>
        </View>
    );

    const renderSelectedItem = (item, unSelect) => (
        <TouchableOpacity onPress={() => {unSelect && unSelect(item)}}>
            <View style={{marginHorizontal:10,borderRadius:10,padding:5,borderColor:"white",borderWidth:3,flexDirection:"row"}}>
                <Text style={{color:"white",marginRight:10,fontWeight:"bold"}}>{item.label}</Text>
                <FaIcon
                    color="white"
                    name="trash-can"
                    size={20}/>
            </View>
        </TouchableOpacity>
    );
    return (
        <View style={{margin:"2.5%",width:"95%",height:"95%"}}>
            <MultiSelect
                style={[{shadowColor:"black",shadowRadius:15,padding:10, borderRadius:10,shadowOpacity:0.5,marginVertical:10, borderWidth: 3,// Add this line
                borderColor: 'white', backgroundColor:"#111111"}]}
                containerStyle={{borderWidth: 3, marginTop:4,paddingVertical: 8,borderRadius:15, borderColor:"white", backgroundColor:"#111111"}}
                placeholderStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap', color:"white"}}
                selectedTextStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap',  color:"white"}}
                inputSearchStyle={{fontSize: 16,height:50,whiteSpace: 'nowrap',  color:"white"}}
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
                renderItem={renderItem}
                renderSelectedItem={renderSelectedItem}
            />
            <Text style={{color:"white"}}>BY 2024</Text>
            <LineChart
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                        {
                        data: generateDataByMonth()
                        }
                    ]
                }}
                
                width={400} // from react-native
                height={250}
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
                style: {
                    padding:20,
                    borderRadius: 16
                },
                
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    )
}