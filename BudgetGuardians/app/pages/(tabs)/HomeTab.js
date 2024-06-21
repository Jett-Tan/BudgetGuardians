import { useEffect, useState } from "react"
import { View,Text,StyleSheet, } from "react-native"
import { liveUpdate, getUserDataFromFirestore } from "../../setting/fireStoreFunctions";
import { set } from "firebase/database";
import TransactionEntry from "../../components/transactionEntry";


export default function HomeTab() {
    const [currentUser, setCurrentUser] = useState();
    const [lastestTransaction5, setLastestTransaction5] = useState();
    const [lastestGoal, setLastestGoal] = useState();
    
    useEffect(() => {
        liveUpdate((x) => {
            setCurrentUser(x)
            findGoals(x);
            findTransactions(x);
        });
        (async () => {
            await getUserDataFromFirestore()
            .then((data) => {
                setCurrentUser(data);
                findGoals(data);
                findTransactions(data);
            })
            .catch((err) => {
                alert(err);
            });
        })();
    },[])
    const loadData = setInterval(async () => {
        await getUserDataFromFirestore()
        .then((data) => {
            setCurrentUser(data);
            findGoals(data);
            findTransactions(data);
        })
        .catch((err) => {
            alert(err);
        });
    }, 100);
    setTimeout(()=>{clearInterval(loadData)} ,500);
    
    const findTransactions = (x) => {
        if (x?.financialData?.transactions === undefined) {
            console.log('undefined');
            return;
        }
        let transactions = x?.financialData?.transactions;
        Array(transactions).sort((a,b) => {a.date - b.date});
        setLastestTransaction5(transactions.slice(0,5));
        
    }
    const findGoals = (x) => {
        if (x?.financialData?.goals === undefined) {
            console.log('undefined');
            return;
        }
        let goals = x?.financialData?.goals;
        Array(goals).sort((a,b) => {a.date - b.date});
        let lastestGoal = goals[0];
        setLastestGoal(lastestGoal);
    }

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
                    <Text style={{fontWeight:"bold"}}>Current Goal</Text>
                    {!lastestGoal  && (
                        <View style={{margin:"auto"}}>
                            <Text>No Goal</Text>
                        </View>
                    )}
                    {/* {lastestGoal && } */}
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
        
})