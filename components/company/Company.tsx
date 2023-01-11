import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import db from "../../firebase/firebaseConfig";
import { addUser, createCompany, getCompanies, getUserDataByCompany, getUsers } from "../../utils/userApi";
import { FormDataProps } from "../form/type";
import { CompanyProps } from "./type";
export default function CompanyForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompanyProps>();
  const [users, setUsers] = useState([]);
  const [company, setCompany] = useState([]);

  const onSubmit = async (data: CompanyProps, e: any) => {
    getCompanies(db);
    const company: any = createCompany(data.companyName);
    console.log(company);
  };

  const test = async (id:string, company:any) => {
    
    
  }

  useEffect(() => {
    const getCompanyData = async () => {
      const data: Promise<any> = getCompanies(db);
      setCompany(await data);
    };
    const getUserData = async () => {
      const fetchUserData: Promise<any> = getUsers(db);
      setUsers(await fetchUserData);
      
    };
    getUserData();
    getCompanyData();
  }, []);
  console.log(users);

  return (
    <div className="form-container">
      <div className="mt-5 md:col-span-2 md:mt-0">
        <h1 className="text-4xl font-extrabold dark:text-white">
          Select company:
        </h1>
        {company.map((companyData: CompanyProps) => {
          return(
            <>
            <p>{companyData.companyName}</p>
            </>
          )
        })}
        {users.map((userData:FormDataProps) => {
        return(
            <>
            <div>
              <button onClick={() => getUserDataByCompany(userData.companyInfo.companyName,db)}>click</button>
            </div>
            </>
          );
        
      })}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Company name
            </label>
            <input
              type="text"
              {...register("companyName")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add company
          </button>
        </form>
      </div>
    </div>
  );
}
