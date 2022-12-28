import db from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc  } from "firebase/firestore";

export const getUsers = async (db:any) => {
  const userCollection = collection(db, "users");
  const snapshot = await getDocs(userCollection);
  const list = snapshot.docs.map((doc) => doc.data());
  return list;
};

export const addUser = async (id: string, firstName: string, lastName: string, email: string, country: string, streetAdress: string, city: string, postalCode:any, companyName:string, isActive:boolean) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
     userInfo: {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      country: country,
      streetAdress: streetAdress,
      city: city,
      postalCode: postalCode,
      company: {
        companyName: companyName,
        isActive: isActive
      }
     }
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateUser = async () => {
  let bool = true;
  const data = {
      company: {
        companyName: "blabla",
        isActive: !bool
     }
  }
  const userCollection = collection(db, "users");
  const snapshot =  await getDocs(userCollection);
  const list = snapshot.docs.map((doc) => doc.id);
  // list.map((id) => console.log(id));
  return list;
}

export const deleteUser = async () => {
  await deleteDoc(doc(db, "users", "MYjFRtVQIUw7al2KeHX5"));

}