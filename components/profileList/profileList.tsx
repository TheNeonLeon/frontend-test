import { useEffect, useState } from "react"
import db from "../../firebase/firebaseConfig";
import { getUsers } from "../../utils/userApi";

export default function Profile(){

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUserData = async () => {
            const fetchUserData: Promise<any> = getUsers(db);
            setUsers(await fetchUserData);   
        }
        
        getUserData();
    }, [])
    console.log(users);
    
    return(
        <div className="profile-container">
            <h1 className="text-4xl font-extrabold dark:text-white">Profiles</h1>
            <ul>{users.map((data:any) => {
                return(
                    <li>{data.firstName}</li>
                )
            })}</ul>
        </div>
    )
}