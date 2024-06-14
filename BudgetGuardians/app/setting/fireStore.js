import { getFirestore, doc, setDoc } from "firebase/firestore";
import {auth} from "../auth/firebaseConfig";

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
export async function addFinancialDataToFirestore(financialData:financialData){
    const db = getFirestore();
    const userRef = doc(db, "users", auth.currentUser.uid, "financialData");
    await setDoc(userRef, financialData).then(()=>{
        console.log("Document written with ID: ", auth.currentUser.uid);
    }).catch((error)=>{
        console.error("Error adding document: ", error);
    });
    
}
export async function addUserDataToFirestore(userData:userData){
    const db = getFirestore();
    const userRef = doc(db, "users", auth.currentUser.uid, "userData");
    await setDoc(userRef, userData).then(()=>{
        console.log("Document written with ID: ", auth.currentUser.uid);
    }).catch((error)=>{
        console.error("Error adding document: ", error);
    });
}