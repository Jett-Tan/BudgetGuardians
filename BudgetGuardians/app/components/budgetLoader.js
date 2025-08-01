import { ScrollView,View,Modal,Pressable,StyleSheet,Text } from "react-native"
import { useState,useEffect } from "react"
import {DatePickerInput, de} from 'react-native-paper-dates';

import BudgetEntry from "./budgetEntry"
import { liveUpdate, updateBudgetToFirestore } from "../setting/fireStoreFunctions"
import styleSetting from "../setting/setting";
import CustomInput from "./customInput";
import {Dropdown} from 'react-native-element-dropdown'
import { defaultCategory } from "./defaultCategory";
import FaIcon from "./FaIcon";
import CustomButton from "./customButton";
import BudgetEntryBoxed from "./budgetEntryBoxed";

export default function BudgetLoader({background = true}) {
    
    const [budgets, setBudgets] = useState([]);
     
    const [toEditBudgetID, setToEditBudgetID] = useState();
    const [toEditBudgetAmount, setToEditBudgetAmount] = useState('');
    const [toEditBudgetCatergory, setToEditBudgetCatergory] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [userCategory, setUserCategory] = useState([]);
    const [currentMonth, setCurrentMonth] = useState('');

    useEffect(() => {
      const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
      ];
      const monthIndex = new Date().getMonth();
      setCurrentMonth(monthNames[monthIndex]);
  }, []);

    liveUpdate((data) => {
        setUserCategory(data?.financialData?.userCategory || defaultCategory);
        const budgets = data?.financialData?.budgetInfo?.budgets || [];
        const transactions = data?.financialData?.transactions || [];
        budgets.map((budget) => {
            const currentMonthIndex = new Date().getMonth() + 1;
            const totalSpent = transactions
              .filter((transaction) => budget.budgetCategory === transaction.category && transaction.amount < 0)
              .filter((transaction) => {
                // console.log(Number.parseInt(transaction.date.split('/')[1]) == currentMonth);
                return Number.parseInt(transaction.date.split('/')[1]) == currentMonthIndex
              })
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            const addedIncome = transactions
              .filter((transaction) => budget.budgetCategory === transaction.category && transaction.amount > 0)
              .filter((transaction) => {
                // console.log(Number.parseInt(transaction.date.split('/')[1]) == currentMonth);
                return Number.parseInt(transaction.date.split('/')[1]) == currentMonthIndex
              })
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            
            budget.addedIncome = addedIncome;
            budget.spent = totalSpent;
            budget.color = userCategory.find((category) => category.value === budget.budgetCategory)?.color || "white";
          })
        setBudgets(budgets);
    });
    useEffect(() => {
      
    }, [budgets]);


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

    /* This function will enable the popup for edit*/ 
    const editBudget = (id) =>{
        setToEditBudgetAmount(budgets[id].amount)
        setToEditBudgetCatergory(budgets[id].category)
        let newDate = budgets[id].date.split("/").reverse().join("-")
        setToEditBudgetDate(new Date(newDate))
        setToEditBudgetDescription(budgets[id].description)
        setToEditBudgetID(id)
        setModalVisible(true);
    }
    /* This function will save the edited details to firestore*/
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
    const backgroundExist = background ? {} : {}; 
    const backgroundExist2 = background ? {} : {justifyContent:"center",alignItems:"center"}; 
    return (
        <>  
            <View style={[{width:"100%",height:"100%",alignItems:"center"},backgroundExist ]}>
              <View style={[{color:"white"}]}>Budget for the month of: {currentMonth}</View>
              <ScrollView style={{width:"95%"}} showsHorizontalScrollIndicator={false}>
                <View style={[{width:"100%",marginHorizontal:"auto",flexWrap:"wrap",flexDirection:"row"},backgroundExist2]}>
                  {Array.isArray(budgets) && budgets.map((x, index) => (
                      <BudgetEntryBoxed 
                          key={index}
                          deleteBudget={() => deleteBudget(index)} 
                          editBudget={() => editBudget(index)} 
                          props={{ amount: x?.budgetAmount, category: x?.budgetCategory,amountSpent: x?.spent, additionalIncome: x?.addedIncome, color: x?.color}} 
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



