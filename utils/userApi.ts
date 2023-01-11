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
  try {
    const userCollection = collection(db, "users");
    const snapshot = await getDocs(userCollection);
    const list = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return list;
  } catch (error) {
    console.error("Error getting user data", error);
  }
};

export const getUserDataByCompany = async (companyName:string, db:any) => {
  try {
    const userCollection = collection(db, "users");
    const snapshot = await getDocs(userCollection);
    const list = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const test = list.filter((element, index) => element.companyInfo.companyName == companyName)
    console.log(test);
    
  } catch (error) {}
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

export const updateUserDetails = async (
  id: number,
  companyName: string,
  isActive: boolean
) => {
  let bool = true;
  const data = {
    companyInfo: {
      companyName: companyName,
      isActive: !isActive,
    },
  };

  try {
    const snapshot = await getDoc(doc(db, "users", String(id)));

    if (snapshot.exists()) {
      console.log(snapshot.data());
      console.log("snapshotID:", snapshot.id);

      await updateDoc(doc(db, "users", String(id)), data);
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
