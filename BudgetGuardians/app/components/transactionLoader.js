import { ScrollView,View,Modal,Pressable,StyleSheet,Text } from "react-native"
import { useState,useEffect } from "react"
import {DatePickerInput, de} from 'react-native-paper-dates';
import TransactionEntry from "./transactionEntry"
import { liveUpdate, updateTransactionToFirestore,getUserDataFromFirestore } from "../setting/fireStoreFunctions"
import styleSetting from "../setting/setting";
import CustomInput from "./customInput";
import {Dropdown} from 'react-native-element-dropdown'
import { getUserCategory,defaultCategory } from "./defaultCategory";
import FaIcon from "./FaIcon";
import CustomButton from "./customButton";
import { set } from "firebase/database";

export default function TransactionLoader() {
    
    const [transactions, setTransactions] = useState();
     
    const [toEditTransactionID, setToEditTransactionID] = useState();
    const [toEditTransactionDate, setToEditTransactionDate] = useState('');
    const [toEditTransactionAmount, setToEditTransactionAmount] = useState('');
    const [toEditTransactionCatergory, setToEditTransactionCatergory] = useState('');
    const [toEditTransactionDescription, setToEditTransactionDescription] = useState('');
     
    const [toViewTransactionID, setToViewTransactionID] = useState();
    const [toViewTransactionDate, setToViewTransactionDate] = useState('');
    const [toViewTransactionAmount, setToViewTransactionAmount] = useState('');
    const [toViewTransactionCatergory, setToViewTransactionCatergory] = useState('');
    const [toViewTransactionDescription, setToViewTransactionDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [modalVisibleView, setModalVisibleView] = useState(false);

    const [categoryError, setCategoryError] = useState("");
    const [amountError, setAmountError] = useState("");
    const [dateError, setDateError] = useState("");

    const [userCategory, setUserCategory] = useState([]);

    useEffect(() => {
        liveUpdate((data) => {
            setTransactions(data?.financialData?.transactions || []);
            setUserCategory(data?.financialData?.categories || defaultCategory);
        });
      }, []);


    const reset =() => {
        setToEditTransactionCatergory("");
        setToEditTransactionAmount("");
        setToEditTransactionDate("");
        setToEditTransactionDescription("");
        setToEditTransactionID("");
        setCategoryError("");
        setAmountError("");
        setDateError("");
    }

    const validate = () => {
        let valid = true
        if (!toEditTransactionCatergory) {
            setCategoryError("Category is required.");
            valid = valid && false;
        }
        const numericAmount = Number.parseFloat(toEditTransactionAmount);
        if (!numericAmount || numericAmount === NaN || numericAmount === 0) {
            setAmountError("Amount is required.");
            valid = valid && false;
        }
        if (!isValidDate(toEditTransactionDate)) {
            setDateError("Invalid date. Please select a valid date.");
            valid = valid && false;
        }
        return valid;
    }

    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date);
    };

    const deleteTransaction = (id) => {
        let newTransactions = []
        for (let i = 0; i < transactions.length; i++) {
            if (i !== id) {
                newTransactions.push(transactions[i]);
            }
        }
        updateTransactionToFirestore(newTransactions);
    }

    /* This fuction will enable the popup for edit*/ 
    const editTransaction = (id) =>{
        setToEditTransactionAmount(transactions[id].amount)
        setToEditTransactionCatergory(transactions[id].category)
        let newDate = transactions[id].date.split("/").reverse().join("-")
        setToEditTransactionDate(new Date(newDate))
        setToEditTransactionDescription(transactions[id].description)
        setToEditTransactionID(id)
        setModalVisible(true);
    }
    const viewTransaction = (id) =>{
        setToViewTransactionAmount(transactions[id].amount)
        setToViewTransactionCatergory(transactions[id].category)
        setToViewTransactionDate(transactions[id].date)
        setToViewTransactionDescription(transactions[id].description)
        setToViewTransactionID(id)
        setModalVisibleView(true);
    }
    /* This fucntion will save the edited details to firestore*/
    const saveTransaction = () => {
        if (!validate()) {
            return;
        }
        let newTransactions = transactions;        
        const numericAmount = Number.parseFloat(toEditTransactionAmount);
        const formatteddate = new Date(toEditTransactionDate).toLocaleDateString('en-SG')
        newTransactions[toEditTransactionID] = ({amount: numericAmount, category: toEditTransactionCatergory, date: formatteddate,description: toEditTransactionDescription});
        updateTransactionToFirestore(newTransactions).then( async() => {
            setModalVisible(false);
            await getUserDataFromFirestore().then((data) => {
                const financialData = data.financialData;
                const transactions = financialData.transactions;
                const budgetAmt = financialData.budgetInfo.budgets.find((budget) => budget.budgetCategory === toEditTransactionCatergory).budgetAmount || 0;
                const totalExpense = transactions.filter((transaction) => transaction.amount < 0 && transaction.category === toEditTransactionCatergory).reduce((acc, transaction) => acc + transaction.amount, 0);
                const totalIncome = transactions.filter((transaction) => transaction.amount > 0 && transaction.category === toEditTransactionCatergory).reduce((acc, transaction) => acc + transaction.amount, 0);
                const remainingBudget = budgetAmt + totalExpense + totalIncome;
                if (budgetAmt > 0 && remainingBudget < 0) {
                    alert(`You have exceeded your budget for ${toEditTransactionCatergory}! by $${-remainingBudget}!`);
                } else if (budgetAmt > 0 && remainingBudget < budgetAmt*0.3) {
                    alert(`You are close to exceeding your budget for ${toEditTransactionCatergory}! You have $${remainingBudget} left!`);
                } else if (budgetAmt > 0 && remainingBudget === 0) {
                    alert(`You have fully utilized your budget for ${toEditTransactionCatergory}!`);
                }
            });
            reset();
        });
    }

    
    return (
        <>  
          <Modal visible={modalVisibleView} transparent={true}>
                <Pressable onPress={() => setModalVisibleView(false)} style={{width:"100%",height:"100%",backgroundColor:"black",opacity:0.6,position:"absolute",left:0,top:0}}></Pressable>
                <View style={{width:"30%",minWidth:350,height:"80%",backgroundColor:"#111111",margin:"auto",alignItems:"center",shadowColor:"white",borderWidth:3,borderColor:"white",shadowOpacity:0.5,shadowRadius:15,borderRadius:15}}>
                    <View style={{width:"100%",padding:10}}>
                        <Pressable onPress={() => setModalVisibleView(false)} style={{marginLeft:"auto",marginRight:5}}>
                          <FaIcon name={"x"} size={20} color={'white'}/>
                        </Pressable>
                    </View>
                    <View style={{width:"90%",padding:"5%",height:"90%"}}>
                        <Text style={{fontSize:30, margin:10,fontWeight: 'bold', textAlign:"center",textDecorationLine:"underline",width:"100%",color:"white"}}>View Transaction</Text>
                        <View  style={{margin:10,marginBottom:15}}>
                          <Text style={{fontSize: 20, fontWeight: 'bold',color:"white"}}>Transaction Type</Text>
                          <Text style={{fontSize: 20,color:"white"}}>{toViewTransactionCatergory}</Text>
                        </View>
                        <View  style={{margin:10,marginBottom:15}}>
                          <Text style={{fontSize: 20, fontWeight: 'bold',color:"white"}}>Transaction Amount</Text>
                          {toViewTransactionAmount < 0 ? 
                          <Text style={{fontSize: 20,color:"white"}}>-${Math.abs(toViewTransactionAmount).toFixed(2)}</Text> : 
                          <Text style={{fontSize: 20,color:"white"}}>+${Math.abs(toViewTransactionAmount).toFixed(2)}</Text>}
                        </View>
                        <View  style={{margin:10,marginBottom:15}}>
                          <Text style={{fontSize: 20,color:"white", fontWeight: 'bold'}}>Transaction Date</Text>
                          <Text style={{fontSize: 20,color:"white"}}>{toViewTransactionDate}</Text>
                        </View>
                        <View  style={{margin:10,marginBottom:15}}>
                          <Text style={{fontSize: 20,color:"white", fontWeight: 'bold'}}>Transaction Description</Text>
                          <Text style={{fontSize: 20,color:"white"}}>{toViewTransactionDescription}</Text>
                        </View>
                    </View>
                </View>
          </Modal>
          <Modal visible={modalVisible} transparent={true}>
              <Pressable onPress={() => {setModalVisible(false);reset();}} style={{width:"100%",height:"100%",backgroundColor:"black",opacity:0.5,position:"absolute",left:0,top:0}}></Pressable>
              <View style={{width:"30%",minWidth:350,height:"80%",backgroundColor:"#111111",margin:"auto",alignItems:"center",shadowColor:"white",shadowOpacity:0.5,shadowRadius:15,borderRadius:15,borderWidth:3,borderColor:"white"}}>
                  <View style={{width:"90%",padding:"5%",height:"90%",justifyContent:"space-evenly"}}>
                      <Text style={{fontSize: 30, fontWeight: 'bold', textAlign:"center",textDecorationLine:"underline",width:"100%", color:"white"}}>Edit Transaction</Text>
                      <View  style={{}}>
                        <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10, color:"white"}}>Transaction Type</Text>
                        <Dropdown
                                data={userCategory}
                                style={{width: "100%",borderRadius: 10,height:60, borderColor: 'white', borderWidth: 3, padding: 5}}
                                iconColor="white"
                                containerStyle={{borderWidth: 3, marginTop:4,paddingVertical: 8,borderRadius:15, borderColor:"white", backgroundColor:"#111111"}}
                                placeholderStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap', color:"white"}}
                                selectedTextStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap',  color:"white"}}
                                inputSearchStyle={{fontSize: 16,height:50,whiteSpace: 'nowrap',  color:"white"}}
                                itemContainerStyle={{backgroundColor: "#111111"}}
                                itemTextStyle={{color:"white"}}
                                labelField="label"
                                valueField="value"
                                maxHeight={300}
                                activeColor='#2596be'
                                search
                                searchPlaceholder="Search..."
                                placeholder="Select Category" 
                                value={toEditTransactionCatergory}
                                onChange={(item) => setToEditTransactionCatergory(item.value)}
                                renderLeftIcon={() => (
                                    <FaIcon name="money-bill" size={20} color={"#7b9a6d"}/>
                                )}
                            />
                        <Text style={{color: 'red', fontSize: 12, marginLeft: 10}}>{categoryError}</Text>
                      </View>
                      <View style={{}}>
                        <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10, color:"white"}}>Amount</Text>
                        <CustomInput
                            placeholder="Enter Amount"
                            values={toEditTransactionAmount}
                            onChange1={(x) => setToEditTransactionAmount(x)}
                            containerStyle={{margin:0, padding:0,width:"100%",maxWidth:"auto", height:"auto"}}
                            inputContainerStyle={{height: 60,margin:0, borderColor: 'white',maxWidth:"auto", borderWidth: 3, padding: 5, borderColor:"white", backgroundColor:"#111111"}}
                            inputStyle={{width: "95%",height:50,backgroundColor:"#111111", color:"white"}}
                            errorExist={false}
                        />
                        <Text style={{color: 'red', fontSize: 12, marginLeft: 10}}>{amountError}</Text>
                      </View>
                    <View style={{}}>
                        <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10, color:"white"}}>Transaction Date</Text>
                        
                        <DatePickerInput 
                                style={{backgroundColor:"#111111",color:"white",borderRadius:10,borderTopRightRadius:10,borderTopLeftRadius:10,height:54,alignSelf:"flex-start",padding:0,borderWidth:3,borderColor:"white"}}
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
                                value={toEditTransactionDate}
                                onChangeText={(d) => {typeof d === Date ? setToEditTransactionDate(d) : setToEditTransactionDate("")}}
                                onChange={(d) => setToEditTransactionDate(d)}
                                inputMode="start"
                                label="Transaction Date"
                                display="calendar"
                            />
                        <Text style={{color: 'red', fontSize: 12, marginLeft: 10}}>{dateError}</Text>
                    </View>
                    <View style={{}}>
                      <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10, color:"white"}}>Description</Text>
                      
                      <CustomInput
                          placeholder="Enter Descriptions (Optional)"
                          values={toEditTransactionDescription}
                          onChange1={(x) => setToEditTransactionDescription(x)}
                          containerStyle={{width: "100%",minWidth:"100%",maxWidth:"auto",marginLeft:0,margin:0}}
                          inputContainerStyle={{width: "100%",minWidth:"100%",maxWidth:"auto",marginLeft:0,margin:0, height: 60, borderColor: 'black', borderWidth: 3, padding: 5,borderColor:"white", backgroundColor:"#111111"}}
                          inputStyle={{width: "100%",minWidth:"100%", borderColor:"white", backgroundColor:"#111111", color:"white"}}
                      /> 
                    </View>
                    <View>
                      <CustomButton
                        onPress={() => {saveTransaction()}}
                        text={"Save"}
                        containerStyle={{width:"100%",maxWidth:"100%",marginHorizontal:0, backgroundColor:styleSetting.color.lightblue, borderColor:"white", borderWidth:3, borderRadius:10,}}
                        type={"primary"}
                      />
                    </View>
                </View>
              </View>
          </Modal>
          <View style={{width:"100%",marginVertical:20,height:"100%",alignItems:"center"}}>
            <ScrollView style={{width:"95%"}}>
              {Array.isArray(transactions) && transactions.map((x, index) => (
                  <View key={index} style={{marginHorizontal:10,marginVertical:20}}>
                      <TransactionEntry 
                          deleteTransaction={() => deleteTransaction(index)} 
                          editTransaction={() => editTransaction(index)} 
                          titleBoxStyle={{shadowRadius:10,shadowOpacity:0.9,shadowColor:userCategory.filter((y) => y.value === x.category).map((y) => y.color)[0]}}
                          onPress={() => viewTransaction(index)}
                          props={{ amount: x?.amount, date: x?.date, category: x?.category }} 
                      />
                  </View>
                  ))}
            </ScrollView>
          </View>
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    width: '60%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  button: {
    // padding: 10,
    backgroundColor: '#89CFF0',
    // marginLeft: 10,
    // flex: 2,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    height: 50,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    // flex: 4,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontSize: 14,
    marginRight:50,
  },
  placeholderStyle: {
    fontSize: 16,
    whitespace: 'nowrap',
  },
  selectedTextStyle: {
    fontSize: 16,
    whitespace: 'nowrap',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  error: {
    color: 'red',
    
  },
});



