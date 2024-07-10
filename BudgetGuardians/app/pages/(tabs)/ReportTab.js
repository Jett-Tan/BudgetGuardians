import { View , Text,Dimensions} from "react-native";
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

export default function ReportTab() {
    const [userTransactions, setUserTransactions] = useState([]);
    const [userBudgets, setUserBudgets] = useState([]);
    const [userCategories, setUserCategories] = useState([]);
    
    useEffect(() => {
        liveUpdate((x) => {
            setUserTransactions(x?.financialData?.transactions || []);
            setUserBudgets(x?.financialData?.budgetInfo?.budgets || []);
            setUserCategories(x?.financialData?.categories || defaultCategory);
        });
        // console.log(generateDataByMonth());

    }, [userTransactions, userBudgets, userCategories]);

    const generateDataByMonth = () => {
        let year = new Date().getFullYear();
        let data = [];
        for (let i = 0; i < 12; i++) {
            data.push(userBudgets.reduce((acc, budget) => {acc += budget?.budgetAmount; return acc}, 0) || 0);
        }
        return data.map((x, index) => { 
            let p =  userTransactions.filter((transaction) => {
                return index+1 == Number.parseInt(transaction?.date?.split("/")[1])  && Number.parseInt(transaction?.date?.split("/")[2]) == year
            }).reduce((acc, transaction) => acc + transaction?.amount, x);
            return p
        })
    }

    return (
        <View style={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
            <LineChart
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                        {
                        data: generateDataByMonth()
                        }
                    ]
                }}
            width={500} // from react-native
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