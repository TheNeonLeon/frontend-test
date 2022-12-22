import  db  from '../firebase/firebaseConfig'
import { collection, doc, getDocs } from "firebase/firestore"; 

export async function getUsers(db:any) {
    const userCollection = collection(db, 'users');
    const snapshot = await getDocs(userCollection);
    const list = snapshot.docs.map(doc => doc.data());
    return list;
  }