
import { getUserDataFromFirestore } from "../setting/fireStoreFunctions";

export const defaultCategory = [
  { label: 'Transport', value: 'Transport', color: '#FF5733' }, // Bright Red-Orange
  { label: 'Food', value: 'Food', color: '#FFC300' }, // Bright Yellow
  { label: 'Groceries', value: 'Groceries', color: '#DAF7A6' }, // Light Green
  { label: 'Utilities', value: 'Utilities', color: '#900C3F' }, // Dark Red
  { label: 'Rent', value: 'Rent', color: '#581845' }, // Dark Purple
  { label: 'Allowance', value: 'Allowance', color: '#3498DB' }, // Bright Blue
  { label: 'Others', value: 'Others', color: '#E74C3C' } // Bright Red
];

export const getUserCategory =  async () => {
  var cat = [];
  await getUserDataFromFirestore().then((data) => {
     cat = data?.financialData?.categories;
  }).catch((error) => {console.log(error);});
  return new Promise((resolve, reject) => {
    if (cat === undefined || cat.length === 0 || cat === null ) {
      resolve(temp);
    } else {
      resolve(cat);
    }
    reject("Error in getDefaultCategory");
  });
}