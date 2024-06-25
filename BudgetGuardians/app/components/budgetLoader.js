import { ScrollView,View,Modal,Pressable,StyleSheet,Text } from "react-native"
import { useState,useEffect } from "react"
import {DatePickerInput, de} from 'react-native-paper-dates';
import BudgetEntry from "./budgetEntry"
import { liveUpdate, updateBudgetToFirestore } from "../setting/fireStoreFunctions"
import styleSetting from "../setting/setting";
import CustomInput from "./customInput";
import {Dropdown} from 'react-native-element-dropdown'
import { defaultCategory } from "./expenseInput";
import FaIcon from "./FaIcon";
import CustomButton from "./customButton";

export default function BudgetLoader() {
    
    const [budgets, setBudgets] = useState([]);
     
    const [toEditBudgetID, setToEditBudgetID] = useState();
    const [toEditBudgetAmount, setToEditBudgetAmount] = useState('');
    const [toEditBudgetCatergory, setToEditBudgetCatergory] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    liveUpdate((data) => {
        const budgets = data?.financialData?.budgetInfo?.budgets || [];
        const transactions = data?.financialData?.transactions || [];
        budgets.map((budget) => {
          const totalSpent = transactions
            .filter((transaction) => budget.budgetCategory === transaction.category)
            .reduce((acc, transaction) => acc + transaction.amount, 0);
          budget.spent = totalSpent;
          });
        setBudgets(budgets);
        // setBudgets(data?.financialData?.budgetInfo?.budgets || []);
    });
    console.log(budgets);
    useEffect(() => {
      
    }, []);


    const reset =() => {
        setToEditBudgetCatergory("");
        setToEditBudgetAmount("");
        setToEditBudgetID("");
    }

    const validate = () => {
        let valid = true
        if (!toEditBudgetCatergory) {
            valid = valid && false;
        }
        const numericAmount = Number.parseFloat(toEditBudgetAmount);
        if (!numericAmount || numericAmount === NaN || numericAmount === 0) {
            valid = valid && false;
        }
        return valid;
    }

    const deleteBudget = (id) => {
        let newBudgets = []
        for (let i = 0; i < budgets.length; i++) {
            if (i !== id) {
                newBudgets.push(budgets[i]);
            }
        }
        updateBudgetToFirestore(newBudgets);
    }

    /* This fuction will enable the popup for edit*/ 
    const editBudget = (id) =>{
        setToEditBudgetAmount(budgets[id].amount)
        setToEditBudgetCatergory(budgets[id].category)
        let newDate = budgets[id].date.split("/").reverse().join("-")
        setToEditBudgetDate(new Date(newDate))
        setToEditBudgetDescription(budgets[id].description)
        setToEditBudgetID(id)
        setModalVisible(true);
    }
    /* This fucntion will save the edited details to firestore*/
    const saveBudget = () => {
        if (!validate()) {
            return;
        }
        let newBudgets = budgets;        
        const numericAmount = Number.parseFloat(toEditBudgetAmount);
        const formatteddate = new Date(toEditBudgetDate).toLocaleDateString('en-SG')
        newBudgets[toEditBudgetID] = ({amount: numericAmount, category: toEditBudgetCatergory, date: formatteddate,description: toEditBudgetDescription});
        updateBudgetToFirestore(newBudgets);
        reset();
    }
    return (
        <>  
            {/* <Modal visible={modalVisible} transparent={true}>
                <Pressable onPress={() => setModalVisible(false)} style={{width:"100%",height:"100%",backgroundColor:"black",opacity:0.5,position:"absolute",left:0,top:0}}></Pressable>
                <View style={{width:"30%",minWidth:350,height:"80%",backgroundColor:"white",margin:"auto",alignItems:"center",shadowColor:"black",shadowOpacity:0.5,shadowRadius:5,borderRadius:10}}>
                    <View style={{width:"90%",padding:"5%",height:"90%",justifyContent:"space-evenly"}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign:"center",textDecorationLine:"underline",width:"100%"}}>Edit Budget</Text>
                        <View  style={{}}>
                          <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10}}>Budget Type</Text>
                          <Dropdown
                              data={defaultCategory}
                              style={{width: "100%",borderRadius: 10,height:50, borderColor: 'black', borderWidth: 1, padding: 5,marginVertical:5}}
                              placeholderStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap'}}
                              selectedTextStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap'}}
                              inputSearchStyle={{fontSize: 16,justifyContent:"center",height:50, whiteSpace: 'nowrap'}}
                              labelField="label"
                              valueField="value"
                              maxHeight={300}
                              search
                              searchPlaceholder="Search..."
                              placeholder="Select Category"
                              value={toEditBudgetCatergory}
                              onChange={(item) => setToEditBudgetCatergory(item.value)}
                              renderLeftIcon={() => (
                                  <FaIcon name="money-bill" size={20}/>
                              )}
                          />
                          <Text style={{color: 'red', fontSize: 12, marginLeft: 10}}>{categoryError}</Text>
                        </View>
                        <View style={{}}>
                          <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10}}>Amount</Text>
                          <CustomInput
                              placeholder="Enter Amount"
                              values={toEditBudgetAmount}
                              onChange1={(x) => setToEditBudgetAmount(x)}
                              containerStyle={{width: "100%",margin:0,minWidth:100,maxWidth:'100%', justifyContent: 'center', alignItems: 'center'}}
                              inputContainerStyle={{width: "100%",minWidth:100,maxWidth:'100%', height: 50, borderColor: 'black', borderWidth: 1, padding: 5, margin: 5}}
                              inputStyle={{width: "90%",minWidth:90}}
                          />  
                          <Text style={{color: 'red', fontSize: 12, marginLeft: 10}}>{amountError}</Text>
                        </View>
                      <View style={{}}>
                          <Text style={{fontSize: 13, fontWeight: 'bold', margin: 10}}>Budget Date</Text>
                          <DatePickerInput 
                              style={{width:270,fontSize:13,maxHeight:50,height:50, backgroundColor:"white",borderRadius:10,borderTopRightRadius:10,borderTopLeftRadius:10,borderWidth:1,borderColor:"black"}}
                              locale="en-SG"
                              value={toEditBudgetDate}
                              onChange={(d) => setToEditBudgetDate(d)}
                              inputMode="start"
                              label="Budget Date"

                              display="calendar"
                              activeUnderlineColor="black"
                          />
                          <Text style={{color: 'red', fontSize: 12, marginLeft: 10}}>{dateError}</Text>
                      </View>
                      <View>
                        <CustomButton
                          onPress={() => {saveBudget(); setModalVisible(false)}}
                          text={"Save"}
                          containerStyle={{width:"100%",maxWidth:"100%",marginHorizontal:0}}
                          type={"primary"}
                        />
                      </View>
                  </View>
                </View>
            </Modal> */}
            <View style={{width:"100%",shadowColor:"black",shadowOpacity:0.5,shadowRadius:15,borderRadius:15,height:"100%",alignItems:"center"}}>
              <ScrollView style={{width:"95%"}}>
                <View style={{width:"100%",marginHorizontal:"auto",flexWrap:"wrap",flexDirection:"row"}}>
                  {Array.isArray(budgets) && budgets.map((x, index) => (
                      <BudgetEntry 
                          key={index}
                          deleteBudget={() => deleteBudget(index)} 
                          editBudget={() => editBudget(index)} 
                          props={{ amount: x?.budgetAmount, category: x?.budgetCategory,amountSpent: x?.spent}} 
                      />
                      ))}
                </View>
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



