import { ScrollView,View,Modal,Pressable,StyleSheet,Text } from "react-native"
import { useState,useEffect } from "react"
import {DatePickerInput, de} from 'react-native-paper-dates';
import TransactionEntry from "./transactionEntry"
import { liveUpdate, updateTransactionToFirestore } from "../setting/fireStoreFunctions"
import styleSetting from "../setting/setting";
import CustomInput from "./customInput";
import {Dropdown} from 'react-native-element-dropdown'
import { defaultCategory } from "./expenseInput";
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

    useEffect(() => {
        liveUpdate((data) => {
            setTransactions(data?.financialData?.transactions || []);
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
        updateTransactionToFirestore(newTransactions).then(() => {
            setModalVisible(false);
            reset();
        });
    }
    return (
        <>  
          <Modal visible={modalVisibleView} transparent={true}>
                <Pressable onPress={() => setModalVisibleView(false)} style={{width:"100%",height:"100%",backgroundColor:"black",opacity:0.5,position:"absolute",left:0,top:0}}></Pressable>
                <View style={{width:"30%",minWidth:350,height:"80%",backgroundColor:"white",margin:"auto",alignItems:"center",shadowColor:"black",shadowOpacity:0.5,shadowRadius:5,borderRadius:10}}>
                    <View style={{width:"100%",padding:10}}>
                        <Pressable onPress={() => setModalVisibleView(false)} style={{marginLeft:"auto",marginRight:5}}>
                          <FaIcon name={"x"} size={20}/>
                        </Pressable>
                    </View>
                    <View style={{width:"90%",padding:"5%",height:"90%"}}>
                        <Text style={{fontSize: 20, margin:10,fontWeight: 'bold', textAlign:"center",textDecorationLine:"underline",width:"100%"}}>View Transaction</Text>
                        <View  style={{margin:10,marginBottom:15}}>
                          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Transaction Type</Text>
                          <Text style={{fontSize: 20}}>{toViewTransactionCatergory}</Text>
                        </View>
                        <View  style={{margin:10,marginBottom:15}}>
                          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Transaction Amount</Text>
                          {toViewTransactionAmount < 0 ? 
                          <Text style={{fontSize: 20}}>-${Math.abs(toViewTransactionAmount).toFixed(2)}</Text> : 
                          <Text style={{fontSize: 20}}>+${Math.abs(toViewTransactionAmount).toFixed(2)}</Text>}
                        </View>
                        <View  style={{margin:10,marginBottom:15}}>
                          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Transaction Date</Text>
                          <Text style={{fontSize: 20}}>{toViewTransactionDate}</Text>
                        </View>
                        <View  style={{margin:10,marginBottom:15}}>
                          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Transaction Description</Text>
                          <Text style={{fontSize: 20}}>{toViewTransactionDescription}</Text>
                        </View>
                    </View>
                </View>
          </Modal>
          <Modal visible={modalVisible} transparent={true}>
              <Pressable onPress={() => {setModalVisible(false);reset();}} style={{width:"100%",height:"100%",backgroundColor:"black",opacity:0.5,position:"absolute",left:0,top:0}}></Pressable>
              <View style={{width:"30%",minWidth:350,height:"80%",backgroundColor:"#111111",margin:"auto",alignItems:"center",shadowColor:"black",shadowOpacity:0.5,shadowRadius:5,borderRadius:10}}>
                  <View style={{width:"90%",padding:"5%",height:"90%",justifyContent:"space-evenly"}}>
                      <Text style={{fontSize: 20, fontWeight: 'bold', textAlign:"center",textDecorationLine:"underline",width:"100%", color:"white"}}>Edit Transaction</Text>
                      <View  style={{}}>
                        <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10, color:"white"}}>Transaction Type</Text>
                        <Dropdown
                            data={defaultCategory}
                            style={{width: "100%",borderRadius: 10,height:50, borderColor: 'white', borderWidth: 1, padding: 5,marginTop:5}}
                            placeholderStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap', color:"white"}}
                            selectedTextStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap', color:"white"}}
                            inputSearchStyle={{fontSize: 16,justifyContent:"center",height:50, whiteSpace: 'nowrap', backgroundColor: "#111111", color:"white"}}
                            itemTextStyle={{color:"white"}}
                            itemContainerStyle={{backgroundColor: "#111111"}}
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
                            containerStyle={{width: "100%",margin:0,minWidth:100,maxWidth:'100%', justifyContent: 'center', alignItems: 'center', borderColor:"white", borderWidth:2, borderRadius: 10 }}
                            inputContainerStyle={{width: "100%",minWidth:100,maxWidth:'100%', height: 50, borderColor: 'white', borderWidth: 1, padding: 5, margin: 5, backgroundColor:"#111111"}}
                            inputStyle={{width: "90%",minWidth:90, color:"white"}}
                            errorExist={false}
                        />  
                        <Text style={{color: 'red', fontSize: 12, marginLeft: 10}}>{amountError}</Text>
                      </View>
                    <View style={{}}>
                        <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10, color:"white"}}>Transaction Date</Text>
                        <DatePickerInput 
                            style={{width:270,fontSize:13,maxHeight:50,height:50, backgroundColor:"white",borderRadius:10,borderTopRightRadius:10,borderTopLeftRadius:10,borderWidth:1,borderColor:"black"}}
                            locale="en-SG"
                            value={toEditTransactionDate}
                            onChangeText={(d) => {typeof d === Date ? setToEditTransactionDate(d) : setToEditTransactionDate("")}}
                            onChange={(d) => setToEditTransactionDate(d)}
                            inputMode="start"
                            label="Transaction Date"

                            display="calendar"
                            activeUnderlineColor="black"
                        />
                        <Text style={{color: 'red', fontSize: 12, marginLeft: 10}}>{dateError}</Text>
                    </View>
                    <View style={{}}>
                      <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10, color:"white"}}>Description</Text>
                      <CustomInput
                          placeholder="Enter Description"
                          values={toEditTransactionDescription}
                          onChange1={(x) => setToEditTransactionDescription(x)}
                          containerStyle={{width: "100%",margin:0,minWidth:100,maxWidth:'100%', justifyContent: 'center', alignItems: 'center'}}
                          inputContainerStyle={{width: "100%",minWidth:100,maxWidth:'100%', height: 50, borderColor: 'white', borderWidth: 1, padding: 5, margin: 5}}
                          inputStyle={{width: "90%",minWidth:90}}
                          errorExist={false}
                      />  
                    </View>
                    <View>
                      <CustomButton
                        onPress={() => {saveTransaction()}}
                        text={"Save"}
                        containerStyle={{width:"100%",maxWidth:"100%",marginHorizontal:0, backgroundColor:"#33CBFF"}}
                        type={"primary"}
                      />
                    </View>
                </View>
              </View>
          </Modal>
          <View style={{width:"70%",shadowColor:"black",marginVertical:20,shadowOpacity:0.5,shadowRadius:15,borderRadius:15,height:"100%",alignItems:"center"}}>
            <ScrollView style={{width:"95%"}}>
              {Array.isArray(transactions) && transactions.map((x, index) => (

                  <View key={index} style={{shadowColor:"black",shadowRadius:10,shadowOpacity:0.5,borderRadius:15,marginHorizontal:"10%",marginVertical:20}}>
                      <TransactionEntry 
                          deleteTransaction={() => deleteTransaction(index)} 
                          editTransaction={() => editTransaction(index)} 
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



