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

  const onSubmit = async (data: any, e: any) => {
    console.log(data);
    const userInfo: any = await updateUserDetails(
        data?.companyName,
      data?.isActive,
    );
    console.log(userInfo);
  };

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
            {data.companyInfo.isActive == false ? 
            <form onSubmit={handleSubmit(onSubmit)}>
                  <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Name: {<li className="user-card">{data.userInfo.firstName}</li>}
            </label>

            <p>{data.userInfo.firstName} is not active in any company</p>
            
            <p>Remove from company:</p>
            <input
              type="checkbox"
              {...register("company.isActive")}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
              {company.map((companyData:any) => {
                console.log(companyData);
                
            return(
                <>
             <input
              type="checkbox"
              value={companyData.companyName}
              {...register("companyName")}
              className="shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
                <li>{companyData.companyName}</li>
                </>
            )
        })}
            <button>Add person to company</button>
            <input type="submit" />
            </form>
            : ""
            }
            </>
          );
        })}

        </>
      </ul>
      
    </div>
  );
}
