import { getFirestore, doc, setDoc, updateDoc, addDoc, getDoc, collection  } from "firebase/firestore";
import { auth } from "../auth/firebaseConfig";
import { set } from "firebase/database";
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
    valid = valid && financialData?.income
    valid = valid && financialData?.savings
    valid = valid && financialData?.expense
    valid = valid && financialData?.goals
    return valid
}

const goalDataCheck = (goalData) => {
    var valid = true;
    valid = valid && goalData?.goalAmount
    valid = valid && goalData?.goalDate
    valid = valid && goalData?.goalDescription
    valid = valid && goalData?.goalPriority
    valid = valid && goalData?.goalCategory
    valid = valid && goalData?.goalStatus
    valid = valid && goalData?.goalReminder
    return valid
}

const userDataCheck = (userData) => {
    var valid = true;
    valid = valid && userData?.age
    valid = valid && userData?.name?.firstName 
    valid = valid && userData?.name?.lastName
    return valid
}

const expenseDataCheck = (expenseData) => {
    var valid = true;
    valid = valid && expenseData?.title
    valid = valid && expenseData?.amount
    valid = valid && expenseData?.date
    valid = valid && expenseData?.description
    valid = valid && expenseData?.category
    valid = valid && expenseData?.status
    return valid
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
            gender:  "Male" ,
            name:{
                firstName: '',
                lastName: '',
            },
        },
        financialData: {
            income: 0 ,
            savings: 0,
            expense: [],
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

export async function addExpenseToFirestore(expenseData){
    if(!expenseDataCheck(expenseData)){
        console.error("Invalid userData", expenseData)
        throw new Error("Invalid userData")
    }
    const db = getFirestore();
    const docRef = doc(db, "users",auth.currentUser.uid);
    const user = await getUserDataFromFirestore();
    await addDoc(collection(db,"expenses"), expenseData).then((data) => {
        console.log("data",data.path.replace("expenses/",""))
        user?.financialData?.expense.push(data.path.replace("expenses/",""));
    }).catch((err) => {
        console.log(err)
    })
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

export const liveUpdate = (callback) => {
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    const observer = docRef.onSnapshot((doc) => {
        callback(doc.data());
    });
    return observer;
}