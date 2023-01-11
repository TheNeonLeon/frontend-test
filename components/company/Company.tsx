import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import db from "../../firebase/firebaseConfig";
import {
  createCompany,
  deleteUserDataCompany,
  getCompanies,
  getUsers,
} from "../../utils/userApi";
import { FormDataProps } from "../form/type";
import { CompanyProps } from "./type";
export default function CompanyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyProps>();
  const [users, setUsers] = useState([]);
  const [company, setCompany] = useState([]);

  const router = useRouter();
  const toHomePage = (e: any) => {
    e.preventDefault();
    router.push("/");
  };

  const onSubmit = async (data: CompanyProps, e: any) => {
    getCompanies(db);
    const company: any = createCompany(data.companyName);
    console.log(company);
  };

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

  return (
    <div className="form-container">
      <div className="mt-5 md:col-span-2 md:mt-0">
        <h1 className="text-4xl font-extrabold dark:text-white">
          Select company:
        </h1>
        {users.map((userData: FormDataProps) => {
          return (
            <>
              <div>
                <ul className="flex">
                  {userData.companyInfo.isActive == false ? (
                    ""
                  ) : (
                    <>
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() =>
                          deleteUserDataCompany(
                            userData.id,
                            userData.companyInfo.isActive,
                            db
                          )
                        }
                      >
                        Remove
                      </button>
                      <p> {userData.userInfo.firstName} from:</p>
                      <p className="pl-2">{userData.companyInfo.companyName}</p>
                    </>
                  )}
                </ul>
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
          <div className="flex space-x-3">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create company
          </button>
          <button
          onClick={toHomePage}
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg className="w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Go to Home Page
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
