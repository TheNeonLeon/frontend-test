import db from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import Router from 'next/router'

export const getUsers = async (db: any) => {
  try {
    const userCollection = collection(db, "users");
    const snapshot = await getDocs(userCollection);
    const list = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return list;
  } catch (error) {
    console.error("Error getting user data", error);
  }
};

export const deleteUserDataCompany = async (id:string, isActive:boolean, db:any) => {
  try {
    const newField = {
    companyInfo: 
    {
      isActive: !isActive
    }
  }
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, newField);
    Router.reload();
    console.log("Updated user:", userDoc);
  } catch (error) {
    console.log(error);
    
  }
};


export const addUser = async (
  firstName: string,
  lastName: string,
  email: string,
  country: string,
  streetAdress: string,
  city: string,
  postalCode: number
) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      userInfo: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        country: country,
        streetAdress: streetAdress,
        city: city,
        postalCode: postalCode,
      },
      companyInfo: {
        companyName: "",
        isActive: false,
      },
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getCompanies = async (db: any) => {
  try {
    const companyCollection = collection(db, "companies");
    const snapshot = await getDocs(companyCollection);
    const list = snapshot.docs.map((doc) => doc.data()).map((e) => e);
    return list;
  } catch (error) {
    console.error(error);
  }
};

export const createCompany = async (companyName: string) => {
  try {
    const companyCollection = collection(db, "companies");
    const snapshot = await getDocs(companyCollection);
    const list = snapshot.docs.map((doc) => doc.data());

    const docRef = await addDoc(collection(db, "companies"), {
      companyName: companyName,
    });
    console.log("Document written with ID: ", docRef.id);
    getCompanies(db);
    if (list) {
      console.log("list:", list);
    } else {
      console.log("Document does not exist");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};