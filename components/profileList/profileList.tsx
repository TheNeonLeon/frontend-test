import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import db from "../../firebase/firebaseConfig";
import { updateUserDetails, getCompanies, getUsers } from "../../utils/userApi";
import { FormDataProps } from "../form/type";

export default function Profile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  const [users, setUsers] = useState([]);
  const [company, setCompany] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState(false);

  const router = useRouter();

  const updateUser = async (id:string, company:any, status:boolean) => {
    const userDoc = doc(db, "users", id);
    setStatus(true);
    const newField = {companyInfo: 
      {
        companyName: company,
        isActive: !status
      }
    }
    await updateDoc(userDoc, newField);
    router.reload();
  }

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

  return (
    <div className="profile-container">
      <h1 className="text-4xl font-extrabold dark:text-white">Profiles</h1>
      <ul>
        <>
          {users.map((data: any) => {
            return (
              <>
                {data.companyInfo.isActive == false ? (
                    <div>
                    <div className="flex border-2">
                     
                      <label
                      
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
          
                      </label>

                      <p>
                        {data.userInfo.firstName} is not active in any company
                      </p>
                      
                    </div>
                    {company.map((companyData: any) => {

                      return (
                        <>
                          <div className="flex">
                          <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company
                      </label>
                      <select
                        id="country"
                        onChange={(e) => {setCompanyName(e.target.value)}}
                        autoComplete="country-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option >choose:</option>
                        <option>{companyData.companyName}</option>
                      </select>
                          </div>
                          <button onClick={()=>updateUser(data.id,companyName,status)}>Add to company</button>

                        </>
                      );
                    })}
                 </div>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </>
      </ul>
    </div>
  );
}
