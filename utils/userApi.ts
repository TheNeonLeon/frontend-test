import db from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc  } from "firebase/firestore";

export const getUsers = async (db:any) => {
  const userCollection = collection(db, "users");
  const snapshot = await getDocs(userCollection);
  const list = snapshot.docs.map((doc) => doc.data());
  return list;
};

export const addUser = async (firstName: any, lastName: any, email: any, country: any, streetAdress: any, city: any, postalCode:any) => {
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

export const deleteUser = async () => {
  await deleteDoc(doc(db, "users", "MYjFRtVQIUw7al2KeHX5"));

}