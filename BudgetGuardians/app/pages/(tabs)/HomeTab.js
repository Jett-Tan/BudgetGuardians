import { useEffect, useState } from "react"
import { View,Text,StyleSheet, } from "react-native"
import { liveUpdate, getUserDataFromFirestore } from "../../setting/fireStoreFunctions";
import TransactionEntry from "../../components/transactionEntry";
import CustomButton from "../../components/customButton";


export default function HomeTab() {
    const [currentUser, setCurrentUser] = useState();
    const [lastestTransaction5, setLastestTransaction5] = useState();
    const [lastestGoal, setLastestGoal] = useState();
    
    liveUpdate((x) => {
        setCurrentUser(x)
        findGoals(x);
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
    const findGoals = (x) => {
        if (x?.financialData?.budgetInfo === undefined) {
            console.log("No budget");
            return;
        }
        let budgetInfo = x?.financialData?.budgetInfo;
        // Array(goals).sort((a,b) => {a.date - b.date});
        // let lastestGoal = goals[0];
        // setLastestGoal(lastestGoal);
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
                    <Text style={{fontWeight:"bold"}}>Recent Transactions</Text>
                    {Array.isArray(lastestTransaction5) && lastestTransaction5.length <= 0 && <Text>No Transaction</Text>}
                    {lastestTransaction5 && lastestTransaction5.map((transaction,index) => {
                        return(
                            <View key={index} style={{width:'100%',marginVertical:10, borderRadius:10,shadowColor:"black",shadowOpacity:0.5,shadowRadius:5}}>
                                <TransactionEntry showbutton={false}props={{date:transaction.date, category:transaction.category, amount:transaction.amount}} />
                            </View>
                        )
                    })}
                </View>

                <View style={{borderRadius:15,width:"40%",height:"80%", padding:25,alignItems:"center", justifyContent:"flex-start",shadowOpacity:0.5,shadowColor:"black",shadowRadius:15}}> 
                    <Text style={{fontWeight:"bold"}}>Current Budget</Text>
                    {!lastestGoal  && (
                        <Text>No Budget</Text>
                    )}
                    {/* {lastestGoal && } */}
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
        
})