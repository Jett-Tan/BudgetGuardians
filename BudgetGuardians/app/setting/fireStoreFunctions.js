import { getFirestore, doc, setDoc, updateDoc, addDoc, getDoc, collection ,onSnapshot, deleteField } from "firebase/firestore";
import { auth } from "../auth/firebaseConfig";

// Structure Check Functions
const financialDataCheck = (financialData) => {
    var valid = true;
    valid = valid && financialData?.transactions 
    valid = valid && financialData?.budgetInfo
    // valid = valid && financialData?.categories 
    return valid
}

const budgetsDataCheck = (budgetsData) => {
    return budgetsData
    .map((budgetData) => budgetDataCheck(budgetData))
    .reduce((a,b) => a && b, true)
}

const budgetDataCheck = (budgetData) => {
    var valid = true;
    valid = valid && budgetData?.budgetAmount
    valid = valid && budgetData?.budgetCategory
    return valid
}

const budgetInfoDataCheck = (budgetInfoData) => {
    var valid = true;
    valid = valid && budgetInfoData?.budgetAmount
    valid = valid && budgetInfoData?.budgets && budgetsDataCheck(budgetInfoData?.budgets)
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
    
    return valid
}

const transactionsDataCheck = (transactionsData) => {
    return transactionsData
    .map((transactionsData) => transactionDataCheck(transactionsData))
    .reduce((a,b) => a && b, true)
}
// User Functions
export async function addFinancialDataToFirestore(financialData){
    if(!financialDataCheck(financialData)){
        console.error("Invalid financialData")
        throw new Error("Invalid financialData")
    }
    // console.log("userData", userData)
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);

    await updateDoc(docRef, {financialData:financialData});
    return new Promise((resolve, reject) => {
        resolve("Document written");
        reject("Error adding document: ", error);
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
            budgetInfo:{
                budgetAmount: 0,
                budgets:[]
            },
        }
    }
    await setDoc(docRef, userData);
}

// Budget Functions
export async function addBudgetToFirestore(budgetData){
    if(!budgetDataCheck(budgetData)){
        console.error("Invalid budgetData")
    }
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    const user = await getUserDataFromFirestore();
    user.financialData.budgetInfo.budgets.push(budgetData);
    await updateDoc(docRef, {financialData:user.financialData});
    return new Promise((resolve, reject) => {
        resolve("Document written");
        reject("Error adding document: ", error);
    });
}

export async function updateBudgetToFirestore(budgetData){
    if(!budgetDataCheck(budgetData)){
        console.error("Invalid budgetData")
    }
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    const user = await getUserDataFromFirestore();
    const budgets = user.financialData.budgetInfo.budgets;
    budgets.map((budget) => {
        if(budgetData.budgetCategory === budget.budgetCategory){
            budget.budgetAmount = budgetData.budgetAmount;
        }    
    })
    
    user.financialData.budgetInfo.budgets = budgets;
    await updateDoc(docRef, {financialData:user.financialData});
    return new Promise((resolve, reject) => {
        resolve("Document written");
        reject("Error adding document: ", error);
    });
}

export async function updateBudgetAmountToFirestore(budgetAmount){
    if(!budgetAmount && typeof budgetAmount !== "number"){
        console.error("Invalid budgetAmount")
        throw new Error("Invalid budgetAmount")
    }
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    const user = await getUserDataFromFirestore();
    user.financialData.budgetInfo.budgetAmount = budgetAmount;
    await updateDoc(docRef, {financialData:user.financialData});
    return new Promise((resolve, reject) => {
        resolve("Document written");
        reject("Error adding document: ", error);
    });
}

export async function updateBudgetInfoToFirestore(budgetInfoData){
    if(!budgetInfoDataCheck(budgetInfoData)){
        console.error("Invalid userData")
        throw new Error("Invalid userData")
    }
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    const user = await getUserDataFromFirestore();
    user.financialData.budgetInfo = budgetInfoData;
    await updateDoc(docRef, {financialData:user.financialData});
    return new Promise((resolve, reject) => {
        resolve("Document written");
        reject("Error adding document: ", error);
    });
}

export async function getBudgetsFromFirestore(){
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    return new Promise((resolve, reject) => {
        if (docSnap.exists()) {
            resolve(docSnap.data().financialData.budgetInfo.budgets);
        } else {
            reject("No such document!");
        }
    });
}

export async function getBudgetAmountFromFirestore(){
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    return new Promise((resolve, reject) => {
        if (docSnap.exists()) {
            resolve(docSnap.data().financialData.budgetInfo.budgetAmount);
        } else {
            reject("No such document!");
        }
    });
}
// UserData Functions
export async function addUserDataToFirestore(userData) {
    if(!userDataCheck(userData)){
        console.error("Invalid userData")
        throw new Error("Invalid userData")
    }
    // console.log("userData", userData)
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    userData.email = auth.currentUser.email;

    await updateDoc(docRef, {userData:userData});
    return new Promise((resolve, reject) => {
        resolve("Document written");
        reject("Error adding document: ", error);
    });
}

export async function updateUserDataToFirestore(userData) {
    if(!userDataCheck(userData)){
        console.error("Invalid userData")
        throw new Error("Invalid userData")
    }
    // console.log("userData", userData)
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    userData.email = auth.currentUser.email;

    await updateDoc(docRef, {userData:userData});
    return new Promise((resolve, reject) => {
        resolve("Document written");
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

// Transactions Functions
export async function addTransactionToFirestore(transactionData){
    if(!transactionDataCheck(transactionData)){
        console.error("Invalid userData")
        throw new Error("Invalid userData")
    }
    const db = getFirestore();
    const docRef = doc(db, "users",auth.currentUser.uid);
    const user = await getUserDataFromFirestore();
    user?.financialData?.transactions.push(transactionData);
    await updateDoc(docRef, {financialData:user.financialData}).then((data) => {
        // console.log(data)
    }).catch((err) => {
        // console.log(err)
    })
    return new Promise((resolve, reject) => {
        resolve("Document written");
        reject("Error adding document: ", "Invalid userData");
    });
}

export async function updateTransactionToFirestore(transactionData){
    if(!transactionsDataCheck(transactionData)){
        console.error("Invalid transactionData")
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
        resolve("Document written");
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

// Live Update
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