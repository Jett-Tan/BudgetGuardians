import { getFirestore, doc, setDoc, updateDoc, addDoc, getDoc, collection ,onSnapshot, deleteField } from "firebase/firestore";
import { auth } from "../auth/firebaseConfig";
/*
export type userData = {
    age: Number,
    gender: String | "Male" | "Female" | "Other",
    name:{
        firstName: String,
        lastName: String,
    },
}
export type expenseData = {
    expenseAmount: Number,
    expenseDate: Date,
    expenseDescription: String,
    expenseCategory: String ,
    expenseStatus: String | "Paid" | "Unpaid" | "Pending",
}

export type goalData = {
    goalAmount: Number,
    goalDate: Date,
    goalDescription: String,
    goalPriority: Number,
    goalCategory: String,
    goalStatus: String | "Completed" | "In Progress" | "Pending",
    goalReminder: {
        goalReminderDate: Date,
        goalReminderRepeat: {
            goalReminderRepeatUntil: Date,
            goalReminderRepeatTimes: Number,
            goalReminderRepeatFrequency: String | "Daily" | "Weekly" | "Monthly" | "Yearly",
            goalReminderRepeatOn: String | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday",
            goalReminderRepeatBy: String | "Day" | "Week" | "Month" | "Year",
            goalReminderEnd: {
                goalReminderEndTimes: Number,
                goalReminderEndDate: Date,
                goalReminderEndOn: String | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday",
                goalReminderEndBy: String | "Day" | "Week" | "Month" | "Year",
                goalReminderEndFrequency: String | "Daily" | "Weekly" | "Monthly" | "Yearly",
            }
        }
    }
}

export type financialData = {
    income: Number ,
    savings: Number,
    expense: expenseData[],
    goals:goalData[]
}
export type userInformation = {
    userData: userData,
    financialData: financialData
}
    */

const financialDataCheck = (financialData) => {
    var valid = true;
    valid = valid && financialData?.transactions 
    valid = valid && financialData?.goals 
    return valid
}

const goalDataCheck = (goalData) => {
    var valid = true;
    valid = valid && goalData?.goalAmount
    valid = valid && goalData?.goalDate
    valid = valid && goalData?.goalCategory
    valid = valid && goalData?.goalReminder
    return valid
}

const userDataCheck = (userData) => {
    var valid = true;
    valid = valid && userData?.age && typeof userData?.age === "number"
    valid = valid && userData?.name?.firstName && typeof userData?.name?.firstName === "string"
    valid = valid && userData?.name?.lastName && typeof userData?.name?.lastName === "string"
    return valid
}

const transactionDataCheck = (transactionData) => {
    var valid = true;
    valid = valid && transactionData?.amount && transactionData?.amount 
    valid = valid && transactionData?.date && transactionData?.date 
    valid = valid && transactionData?.category && transactionData?.category 
    valid = valid && transactionData?.description && transactionData?.description 
    return valid
}

const transactionsDataCheck = (transactionsData) => {
    return transactionsData
    .map((transactionsData) => transactionDataCheck(transactionsData))
    .reduce((a,b) => a && b, true)
}

export async function updateUserDataToFirestore(userData) {
    if(!userDataCheck(userData)){
        console.error("Invalid userData", userData)
        throw new Error("Invalid userData")
    }
    // console.log("userData", userData)
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    userData.email = auth.currentUser.email;

    await updateDoc(docRef, {userData:userData});
    return new Promise((resolve, reject) => {
        resolve("Document written with ID: ", auth.currentUser.uid);
        reject("Error adding document: ", error);
    });
}

export async function addFinancialDataToFirestore(financialData){
    if(!financialDataCheck(financialData)){
        console.error("Invalid financialData", financialData)
        throw new Error("Invalid financialData")
    }
    // console.log("userData", userData)
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);

    await updateDoc(docRef, {financialData:financialData});
    return new Promise((resolve, reject) => {
        resolve("Document written with ID: ", auth.currentUser.uid);
        reject("Error adding document: ", error);
    });
    
}


export async function getUserDataFromFirestore(){
    if (auth.currentUser === null) {
        return null;
    }
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    return new Promise((resolve, reject) => {
        if (docSnap.exists()) {
            resolve(docSnap.data());
        } else {
            reject("No such document!");
        }
    });
}

export async function createUserInFirestore(){
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    const userData = {
        userData: {
            age: 0,
            name:{
                firstName: '',
                lastName: '',
            },
        },
        financialData: {
            transactions: [],
            goals:[]
        }
    }
    await setDoc(docRef, userData);
}

export async function addUserDataToFirestore(userData) {
    if(!userDataCheck(userData)){
        console.error("Invalid userData", userData)
        throw new Error("Invalid userData")
    }
    // console.log("userData", userData)
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    userData.email = auth.currentUser.email;

    await updateDoc(docRef, {userData:userData});
    return new Promise((resolve, reject) => {
        resolve("Document written with ID: ", auth.currentUser.uid);
        reject("Error adding document: ", error);
    });
}

export async function addGoalToFirestore(goalData){
    if(!goalDataCheck(goalData)){
        console.error("Invalid userData", goalData)
        throw new Error("Invalid userData")
    }
    const db = getFirestore();
    const docRef = doc(db, "goals");
    const user = await getUserDataFromFirestore();
    user.financialData.goals.push(goalData);
    await addDoc(docRef, goalData);
    await updateDoc(docRef, {financialData:user.financialData});
    return new Promise((resolve, reject) => {
        resolve("Document written with ID: ", auth.currentUser.uid);
        reject("Error adding document: ", error);
    });
}

export async function addTransactionToFirestore(transactionData){
    if(!transactionDataCheck(transactionData)){
        console.error("Invalid userData", transactionData)
        throw new Error("Invalid userData")
    }
    const db = getFirestore();
    const docRef = doc(db, "users",auth.currentUser.uid);
    const user = await getUserDataFromFirestore();
    user?.financialData?.transactions.push(transactionData);
    await updateDoc(docRef, {financialData:user.financialData}).then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })
    return new Promise((resolve, reject) => {
        resolve("Document written with ID: ", auth.currentUser.uid);
        reject("Error adding document: ", "Invalid userData");
    });
}

export async function updateTransactionToFirestore(transactionData){
    if(!transactionsDataCheck(transactionData)){
        console.error("Invalid transactionData", transactionData)
        return new Promise((resolve, reject) => {
            reject("Invalid transactionData");
        })
    }
    // console.log("userData", userData)
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    const user = await getUserDataFromFirestore();
    user.financialData.transactions = (transactionData);
    await updateDoc(docRef, {financialData:user.financialData});
    return new Promise((resolve, reject) => {
        resolve("Document written with ID: ", auth.currentUser.uid);
        reject("Error adding document: ", error);
    });
    
}


export async function getTransactionsAndCategorize() {
    try {
      const user = await getUserDataFromFirestore();
      const transactions = user.financialData.transactions;
  
      if (!transactionsDataCheck(transactions)) {
        throw new Error("Invalid transaction data");
      }
  
      // Categorize transactions
      const categorizedTransactions = transactions.reduce((acc, transaction) => {
        const category = transaction.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(transaction);
        return acc;
      }, {});
  
      return categorizedTransactions;
    } catch (error) {
      console.error("Error fetching or categorizing transactions:", error);
      throw error;
    }
}

export const liveUpdate = (callback) => {
    const db = getFirestore();
    if (auth.currentUser === null) {
        return null;
    }
    const docRef = doc(db, "users", auth.currentUser.uid);
    const observer = onSnapshot(docRef,(doc) => {
        callback(doc.data());
    });
    return observer;
}