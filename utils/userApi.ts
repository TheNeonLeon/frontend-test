import db from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const getUsers = async (db:any) => {
  const userCollection = collection(db, "users");
  const snapshot = await getDocs(userCollection);
  const list = snapshot.docs.map((doc) => doc.data());
  return list;
};

export const addUser = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
     userInfo: {
      firstName: "Billy",
      lastName: "Bob",
      email: "bob@mail.com",
      country: "Sweden",
      streetAdress: "pepparkaksgatan 2",
      city: "Gothenburg",
      postalCode: 43345,
      company: {
        companyName: "Telia",
        isActive: true
      }
     }
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
