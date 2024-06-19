import { useEffect, useState } from "react"
import { View,Text,StyleSheet, } from "react-native"
import { liveUpdate } from "../../setting/fireStoreFunctions";
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
        console.log("HomeTab")
    },[])
    
    const findTransactions = (x) => {
        if (x?.financialData?.transactions === undefined) {
            console.log('undefined');
            return;
        }
        let transactions = x?.financialData?.transactions;
        Array(transactions).sort((a,b) => {a.date - b.date});
        console.log(transactions);
        setLastestTransaction5(transactions.slice(0,5));
        
    }
    const findGoals = (x) => {
        if (x?.financialData?.goals === undefined) {
            console.log('undefined');
            return;
        }
        let goals = x?.financialData?.goals;
        Array(goals).sort((a,b) => {a.date - b.date});
        console.log(goals);
        let lastestGoal = goals[0];
        setLastestGoal(lastestGoal);
    }

    return (
        <>
            <View style={{width:'100%',height:'90%',justifyContent:"space-around",alignItems:"center",flexDirection:"row"}}>
                <View style={{borderRadius:5,width:"40%",height:"80%"}}> 
                    {lastestTransaction5 && lastestTransaction5.map((transaction) => {
                        return(
                            <View style={{borderColor:"black",borderWidth:1,marginVertical:10, borderRadius:10,shadowColor:"black",shadowRadius:3,shadowOffset:{height:1,width:0}}}>
                                <TransactionEntry props={{date:transaction.date, category:transaction.category, amount:transaction.amount}} />
                            </View>
                        )
                    })}
                </View>

                <View style={{borderRadius:5,width:"40%",height:"80%",borderWidth:1,borderColor:"black"}}> 
                    {/* {lastestGoal && } */}
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
        
})