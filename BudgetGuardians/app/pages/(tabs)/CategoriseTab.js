import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getTransactionsAndCategorize, liveUpdate } from '../../setting/fireStoreFunctions'; // Adjust the path accordingly

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
        <AntDesign color="black" name="delete" size={17} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={{ fontSize: 16, marginLeft: 10 }}
          selectedTextStyle={{ fontSize: 16, marginLeft: 10 }}
          inputSearchStyle={{ fontSize: 16, justifyContent: "center", height: 50 }}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Select Category"
          value={selected}
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
          <Text>Sort by: </Text>
          <TouchableOpacity onPress={() => setSortCriteria('none')}>
            <Text style={[styles.sortButton, sortCriteria === 'none' && styles.activeSort]}>None</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortCriteria('amount')}>
            <Text style={[styles.sortButton, sortCriteria === 'amount' && styles.activeSort]}>Amount</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortCriteria('date')}>
            <Text style={[styles.sortButton, sortCriteria === 'date' && styles.activeSort]}>Date</Text>
          </TouchableOpacity>
          <Text>Order: </Text>
          <TouchableOpacity onPress={() => setSortOrder('asc')}>
            <Text style={[styles.sortButton, sortOrder === 'asc' && styles.activeSort]}>Ascending</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortOrder('desc')}>
            <Text style={[styles.sortButton, sortOrder === 'desc' && styles.activeSort]}>Descending</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsContainer}>
          {filteredTransactions.length === 0 && (
            <Text>No transactions found for the selected category.</Text>
          )}
          {filteredTransactions.map((transaction, index) => (
            <View key={index} style={styles.transactionItem}>
              <View>
                <Text style={styles.underline}>Category: </Text>
                <Text>{transaction.category}</Text>
              </View>

              <View>
                <Text style={styles.underline}>Date: </Text>
                <Text>{transaction.date}</Text>
              </View> 

              <View>
                <Text style={styles.underline}>Description: </Text>
                <Text>{transaction.description}</Text>
              </View> 

              <View>
                <Text style={styles.underline}>Amount: </Text>
                <Text>${transaction.amount}</Text>
              </View> 
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CategoriseTransaction;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    width: "95%",
    height: "95%",
    margin: "2.5%",
    alignItems: "center",
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
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
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
    backgroundColor: '#f0f0f0',
  },
  activeSort: {
    backgroundColor: '#d0d0d0',
  },
  transactionsContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
