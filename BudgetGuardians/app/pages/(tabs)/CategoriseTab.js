import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getTransactionsAndCategorize, liveUpdate } from '../../setting/fireStoreFunctions'; 

const data = [
  { label: 'Transport', value: 'Transport', icon: 'car' },
  { label: 'Food', value: 'Food', icon: 'cutlery' },
  { label: 'Groceries', value: 'Groceries', icon: 'shopping-cart' },
  { label: 'Utilities', value: 'Utilities', icon: 'lightbulb-o' },
  { label: 'Rent', value: 'Rent', icon: 'home' },
  { label: 'Allowance', value: 'Allowance', icon: 'money' },
  { label: 'Others', value: 'Others', icon: 'ellipsis-h' },
];

const CategoriseTransaction = () => {
  const [selected, setSelected] = useState([]);
  const [categorizedTransactions, setCategorizedTransactions] = useState({});
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // State to track sort order
  const [sortCriteria, setSortCriteria] = useState('none'); // State to track sort criteria

  useEffect(() => {
    const fetchAndCategorizeTransactions = async () => {
      try {
        const categorizedData = await getTransactionsAndCategorize();
        setCategorizedTransactions(categorizedData);
      } catch (error) {
        console.error("Error fetching or categorizing transactions:", error);
      }
    };
    
    fetchAndCategorizeTransactions();
  }, []);

  useEffect(() => {
    const filterTransactions = () => {
      let filtered = [];
      if (selected.length > 0) {
        filtered = selected.flatMap(category => categorizedTransactions[category] || []);
      }

      // Sort the transactions by the selected criteria
      if (sortCriteria === 'amount') {
        if (sortOrder === 'asc') {
          filtered.sort((a, b) => a.amount - b.amount);
        } else {
          filtered.sort((a, b) => b.amount - a.amount);
        }
      } else if (sortCriteria === 'date') {
        if (sortOrder === 'asc') {
          filtered.sort((a, b) => new Date(a.date.split("/").reverse().join("-")) - new Date(b.date.split("/").reverse().join("-")));
        } else {
          filtered.sort((a, b) => new Date(b.date.split("/").reverse().join("-")) - new Date(a.date.split("/").reverse().join("-")));
        }
      }

      setFilteredTransactions(filtered);
    };
    filterTransactions();
  }, [selected, categorizedTransactions, sortOrder, sortCriteria]);

  const renderItem = item => (
    <View style={styles.item}>
      <FontAwesome
        style={styles.icon}
        color="#33CBFF"
        name={item.icon}
        size={20}
      />
      <Text style={styles.selectedTextStyle}>{item.label}</Text>
    </View>
  );

  const renderSelectedItem = (item, unSelect) => (
    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
      <View style={styles.selectedStyle}>
        <FontAwesome
          style={styles.icon}
          color="#33CBFF"
          name={item.icon}
          size={20}
        />
        <Text style={styles.textSelectedStyle}>{item.label}</Text>
        <AntDesign color="white" name="delete" size={17} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {margin:"2.5%",width:"95%",height:"95%",backgroundColor: "#111111"}]}>
        <View style={[styles.container, {backgroundColor: "#111111"}]}>
          <MultiSelect
            style={[styles.dropdown,{shadowColor:"black",shadowRadius:15,padding:10, borderRadius:10,shadowOpacity:0.5,marginVertical:10, borderWidth: 3, // Add this line
            borderColor: 'white', backgroundColor:"#111111"}]}
            
            
            containerStyle={{borderWidth: 3, marginTop:4,paddingVertical: 8,borderRadius:15, borderColor:"white", backgroundColor:"#111111"}}
            placeholderStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap', color:"white"}}
            selectedTextStyle={{fontSize: 16,marginLeft:10, whiteSpace: 'nowrap',  color:"white"}}
            inputSearchStyle={{fontSize: 16,height:50,whiteSpace: 'nowrap',  color:"white"}}
            itemContainerStyle={{backgroundColor: "#111111"}}
            itemTextStyle={{color:"white"}}
            
            iconStyle={styles.iconStyle}
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Select Category"
            value={selected}
            activeColor='#2596be'
            search
            searchPlaceholder="Search..."
            onChange={item => {
              setSelected(item);
            }}
            renderLeftIcon={() => (
              <FontAwesome
                style={styles.icon}
                color="#7b9a6d"
                name="money"
                size={20}
              />
            )}
            renderItem={renderItem}
            renderSelectedItem={renderSelectedItem}
          />

          <View style={styles.sortContainer}>
            <Text style={{color: 'white'}}>Sort by: </Text>
            <TouchableOpacity onPress={() => setSortCriteria('none')} >
              <Text style={[styles.sortButton, sortCriteria === 'none' && styles.activeSort,{shadowOffset:{height:2,width:2},shadowColor:"black",shadowOpacity:0.2}]}>None</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortCriteria('amount')} >
              <Text style={[styles.sortButton, sortCriteria === 'amount' && styles.activeSort,{shadowOffset:{height:2,width:2},shadowColor:"black",shadowOpacity:0.2}]}>Amount</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortCriteria('date')} >
              <Text style={[styles.sortButton, sortCriteria === 'date' && styles.activeSort,{shadowOffset:{height:2,width:2},shadowColor:"black",shadowOpacity:0.2}]}>Date</Text>
            </TouchableOpacity>
            <Text style={{color: 'white'}}>Order: </Text>
            <TouchableOpacity onPress={() => setSortOrder('asc')} >
              <Text style={[styles.sortButton, sortOrder === 'asc' && styles.activeSort,{shadowOffset:{height:2,width:2},shadowColor:"black",shadowOpacity:0.2}]}>Ascending</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortOrder('desc')} >
              <Text style={[styles.sortButton, sortOrder === 'desc' && styles.activeSort,{shadowOffset:{height:2,width:2},shadowColor:"black",shadowOpacity:0.2}]}>Descending</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.transactionsContainer]}>
          <ScrollView style={[styles.scrollView,{padding:5}]}>
            {filteredTransactions.length === 0 && (
              <Text style={{margin:"auto", color: 'white'}}>No transactions found for the selected category.</Text>
            )}
            {filteredTransactions.length !== 0 && filteredTransactions.map((transaction, index) => (
              <View key={index} style={[styles.transactionItem, {bordercolor:'white'}]}>
                <View style={{width: "20%"}}>
                  <Text style={[styles.underline,{color: "white"}]}>Category: </Text>
                  <Text style={{color:'white'}}>{transaction.category}</Text>
                </View>

                <View style={{width: "20%"}}>
                  <Text style={[styles.underline,{color: "white"}]}>Date: </Text>
                  <Text style={{color:'white'}}>{transaction.date}</Text>
                </View> 

                <View style={{width: "20%"}}>
                  <Text style={[styles.underline,{color: "white"}]}>Description: </Text>
                  <Text style={{color:'white'}}>{transaction.description}</Text>
                </View> 

                <View style={{width: "20%", color: "white"}}>
                  <Text style={[styles.underline,{textAlign:"right", color: "white"}]}>Amount: </Text>
                  {transaction.amount < 0 && <Text style={{textAlign:"right", color:"white"}}>-${Math.abs(transaction.amount).toFixed(2)}</Text>}
                  {transaction.amount > 0 && <Text style={{textAlign:"right", color:"white"}}>${transaction.amount.toFixed(2)}</Text>}
                </View> 
              </View>
            ))}
        </ScrollView>  
          </View>
          
        </View>
    </View>
  );
};

export default CategoriseTransaction;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
    backgroundColor: "#111111",
  },
  container: {
    width: "90%",
    height: "80%",
    alignItems: "center",
  },
  dropdown: {
    height: 50,
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: "100%",
    
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 10, // Add margin to separate text from icon
    color: "white"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "white"
  },
  icon: {
    marginRight: 10, // Adjusted margin to separate icon from text
  },
  item: {
    flexDirection: 'row', // Use flex direction row for horizontal alignment
    alignItems: 'center', // Center items vertically
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#111111',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "white",
    borderWidth: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
    marginLeft: 10, // Add margin to separate text from icon
    color: "white"
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  sortButton: {
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor:'#111111',
    color: "white",
    borderColor: "white",
    borderWidth: 3,
  },
  activeSort: {
    backgroundColor: '#7fd1e6',
  },
  transactionsContainer: {
    width: '100%',
    alignItems: 'center',
    height:"90%",
    
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 'auto',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#111111',
    borderRadius: 10,
    borderWidth: 3, // Add this line
    borderColor: 'white', // Add this line
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
