import db from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

export const getUsers = async (db: any) => {
  const userCollection = collection(db, "users");
  const snapshot = await getDocs(userCollection);
  const list = snapshot.docs.map((doc) => doc.data());
  return list;
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
      users: {},
    });
    console.log("Document written with ID: ", docRef.id);

    if (list) {
      console.log(list);
    } else {
      console.log("Document does not exist");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addCompany = async (companyName: string, isActive: boolean) => {
  let bool = true;
  const data = {
    company: {
      companyName: companyName,
      isActive: !isActive,
    },
  };

  try {
    const snapshot = await getDoc(doc(db, "users", "SDkq3XKsyzcJh64J41Dh"));

    if (snapshot.exists()) {
      console.log(snapshot.data());
      updateDoc(snapshot.ref, data);
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async () => {
  let bool = true;
  const data = {
    company: {
      companyName: "blabla",
      isActive: !bool,
    },
  };
  const userCollection = collection(db, "users");
  const snapshot = await getDocs(userCollection);
  const list = snapshot.docs.map((doc) => doc.id);
  list.map((id) => console.log(id));
  return list;
};

export const deleteUser = async () => {
  await deleteDoc(doc(db, "users", "MYjFRtVQIUw7al2KeHX5"));
};
