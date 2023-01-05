import { useEffect, useState } from "react";
import db from "../../firebase/firebaseConfig";
import { getCompanies, getUsers } from "../../utils/userApi";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const fetchUserData: Promise<any> = getUsers(db);
      setUsers(await fetchUserData);
    };
    const getCompanyData = async () => {
        const data: Promise<any> = getCompanies(db);
        setCompany(await data);
      };
      getCompanyData();
    getUserData();
  }, []);
  console.log(users);
  console.log(company);

  return (
    <div className="profile-container">
      <h1 className="text-4xl font-extrabold dark:text-white">Profiles</h1>
      <ul>
        <>
        {users.map((data: any) => {
          console.log(data.userInfo);

          return (
            <>
            {data.companyInfo.isActive == false ? 
              <li className="user-card">{data.userInfo.firstName}</li>
            : ""
            }
            </>
          );
        })}
        {company.map((companyData:any) => {
            return(
                <>
                <li>{companyData.companyName}</li>
                </>
            )
        })}
        </>
      </ul>
      
    </div>
  );
}
