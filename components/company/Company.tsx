import { useTheme } from "next-themes";
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

  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const toHomePage = (e: any) => {
    e.preventDefault();
    router.push("/");
  };

  const onSubmit = async (data: CompanyProps, e: any) => {
    getCompanies(db);
    const company: Promise<any> = createCompany(data.companyName);
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
      <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="flex justify-between mb-2">
            <h1 className="text-3xl font-extrabold dark:text-white">
              Companies
            </h1>
            <button
              onClick={() => setTheme(theme == "light" ? "dark" : "light")}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-12 rounded-full bg-black dark:bg-white text-white dark:text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </button>
          </div>
          {company.map((companyData: CompanyProps) => {
            return (
              <>
                <ul className="border-2 p-2 mb-2">
                  <li>{companyData.companyName}</li>
                </ul>
              </>
            );
          })}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5 col-span-6 sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Company name:
              </label>
              <input
                type="text"
                {...register("companyName")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:text-gray-600"
              />
            </div>
            <div className="flex space-x-3 mt-2">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create company
              </button>
            </div>
          </form>
          <div className="pt-7">
            <h2 className="text-2xl font-extrabold dark:text-white">
              Users active in companies:
            </h2>
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
                          <p className="pl-2">
                            {userData.companyInfo.companyName}
                          </p>
                        </>
                      )}
                    </ul>
                  </div>
                </>
              );
            })}
          </div>
          <div className="flex gap-5 mt-5">
            <button
              onClick={toHomePage}
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg
                className="w-5"
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
            <button
              onClick={() => router.push("/profile")}
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Go to Profile Page
              <svg
                className="w-5"
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
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
