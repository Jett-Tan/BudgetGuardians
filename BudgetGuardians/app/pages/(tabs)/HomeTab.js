import { useEffect, useState } from "react"
import { View,Text,StyleSheet, ScrollView, } from "react-native"
import { liveUpdate, getUserDataFromFirestore } from "../../setting/fireStoreFunctions";
import TransactionEntry from "../../components/transactionEntry";
import CustomButton from "../../components/customButton";
import BudgetEntryBoxed from "../../components/budgetEntryBoxed";
import BudgetLoader from "../../components/budgetLoader";

export default function HomeTab() {
    const [currentUser, setCurrentUser] = useState();
    const [lastestTransaction5, setLastestTransaction5] = useState();
    const [budgetInfo, setBudgetInfo] = useState();
    
    liveUpdate((x) => {
        setCurrentUser(x)
        findBudgets(x);
        findTransactions(x);
    });

    const findTransactions = (x) => {
        if (x?.financialData?.transactions === undefined) {
            console.log("No transaction");
            return;
        }
        let transactions = x?.financialData?.transactions;
        Array(transactions).sort((a,b) => {a.date - b.date});
        setLastestTransaction5(transactions.slice(0,5));
        
    }
    const findBudgets = (x) => {
        if (x?.financialData?.budgetInfo === undefined) {
            console.log("No budget");
            return;
        }
        const budgets = x?.financialData?.budgetInfo?.budgets || [];
        const transactions = x?.financialData?.transactions || [];
        budgets.map((budget) => {
            const totalSpent = transactions
                .filter((transaction) => budget.budgetCategory === transaction.category)
                .reduce((acc, transaction) => acc + transaction.amount, 0);
            const addedIncome = transactions
                .filter((transaction) => transaction.category === budget.budgetCategory && transaction.amount > 0)
                .reduce((acc, transaction) => acc + transaction.amount, 0);
            budget.spent = totalSpent;
            budget.totalIncome = addedIncome;
          });
        const temp = x?.financialData?.budgetInfo;
        temp.budgets = budgets;
        setBudgetInfo(temp);
    }

    // useEffect(() => {
    //     (async () => {
    //         await getUserDataFromFirestore()
    //         .then((data) => {
    //             setCurrentUser(data);
    //             findGoals(data);
    //             findTransactions(data);
    //         })
    //         .catch((err) => {
    //             alert(err);
    //         });
    //     })();
    // },[])

    // const loadData = setInterval(async () => {
    //     await getUserDataFromFirestore()
    //     .then((data) => {
    //         setCurrentUser(data);
    //         findGoals(data);
    //         findTransactions(data);
    //     })
    //     .catch((err) => {
    //         alert(err);
    //     });
    // }, 100);
    // setTimeout(()=>{clearInterval(loadData)} ,1000);
    


    return (
        <>
            <View style={{width:'100%',height:'90%',justifyContent:"space-around",alignItems:"center",flexDirection:"row"}}>
                <View style={{borderRadius:15,width:"40%",height:"80%", padding:25,alignItems:"center", justifyContent:"flex-start",shadowOpacity:0.5,shadowColor:"black",shadowRadius:15}}> 
                    <Text style={{fontWeight:"bold", textDecorationLine: 'underline'}}>Recent Transactions</Text>
                    {Array.isArray(lastestTransaction5) && lastestTransaction5.length <= 0 && <Text>No Transaction</Text>}
                    
                    <ScrollView style={{height:"90%",width:"100%"}}>
                         <View style={{width:"100%",height:"100%",justifyContent:"space-around",flexWrap:"wrap",flexDirection:"row"}}>
                            {lastestTransaction5 && lastestTransaction5.map((transaction,index) => {
                                return(
                                    <View key={index} style={{width:'90%',marginVertical:10, borderRadius:10,shadowColor:"black",shadowOpacity:0.5,shadowRadius:5}}>
                                        <TransactionEntry showbutton={false}props={{date:transaction.date, category:transaction.category, amount:transaction.amount}} />
                                    </View>
                                )
                            })}
                        
                        </View>
                    </ScrollView>
                </View>

                <View style={{borderRadius:15,width:"40%",height:"80%", padding:25,alignItems:"center", justifyContent:"flex-start",shadowOpacity:0.5,shadowColor:"black",shadowRadius:15}}> 
                    <Text style={{fontWeight:"bold", textDecorationLine: 'underline'}}>Current Budget</Text>
                    {!budgetInfo?.budgets || budgetInfo?.budget?.size < 0  && (
                        <Text>No Budget</Text>
                    )}
                    <ScrollView style={{height:"90%",width:"100%"}}>
                        <View style={{width:"100%",height:"100%",justifyContent:"space-around",flexWrap:"wrap",flexDirection:"row"}}>
                            <BudgetLoader background={false}/>
                                {/* {budgetInfo && budgetInfo?.budgets.map((x,index) => {
                                    return(
                                        <BudgetEntryBoxed 
                                            key={index}
                                            deleteBudget={() => deleteBudget(index)} 
                                            editBudget={() => editBudget(index)} 
                                            props={{ amount: x?.budgetAmount, category: x?.budgetCategory,amountSpent: x?.spent}} 
                                        />
                                    )
                                })} */}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
        
})