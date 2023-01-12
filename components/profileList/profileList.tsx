import {
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import db from "../../firebase/firebaseConfig";
import { getCompanies, getUsers } from "../../utils/userApi";
import { CompanyProps } from "../company/type";
import { FormDataProps } from "../form/type";

export default function Profile() {

  const [users, setUsers] = useState<FormDataProps[]>([]);
  const [company, setCompany] = useState<CompanyProps[]>([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [status, setStatus] = useState(false);

  const { theme, setTheme } = useTheme();

  const router = useRouter();

  const updateUser = async (id: string, company: string, status: boolean) => {
    const userDoc = doc(db, "users", id);
    const newField = {
      companyInfo: {
        companyName: company,
        isActive: !status,
      },
    };
    if (companyName.length > 0) {
      setStatus(true);
      await updateDoc(userDoc, newField);
      router.reload();
    } else {
      alert("Please select a company");
    }
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
    <div className="flex h-screen items-center justify-center  profile-container">
      <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white">
            Profiles
          </h5>
          <button onClick={() => setTheme(theme == "light" ? "dark" : "light")}>
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
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {users.map((data: FormDataProps, key) => {
              return (
                <>
                  {data.companyInfo.isActive == false ? (
                    <div>
                      <div className="flex">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        ></label>
                        <div>
                          <p>
                            {data.userInfo.firstName} is not active in any
                            company
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {data.userInfo.email}
                          </p>
                        </div>
                      </div>
                      <>
                        <div className="flex">
                          <select
                            onChange={(e) => {
                              setCompanyName(e.target.value);
                            }}
                            defaultValue="Choose"
                            className="mt-1 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:text-gray-600"
                          >
                            <option value="Choose" disabled>
                              Choose company:
                            </option>
                            {company.map((companyData: CompanyProps, key) => {
                              return (
                                <option key={key}>
                                  {companyData.companyName}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <button
                          className="inline-flex justify-center mt-3 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() =>
                            updateUser(data.id, companyName, status)
                          }
                        >
                          Add to company
                        </button>
                      </>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </ul>
        </div>
        <div className="mt-7 pb-0 pt-12 px-4 py-3 text-center sm:px-6 dark:bg-gray-800">
          <button
            className="inline-flex justify-center mr-4 mb-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => router.push("/")}
          >
            Go to Home Page
          </button>
          <button
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => router.push("/company")}
          >
            Go to Company Page
          </button>
        </div>
      </div>
    </div>
  );
}
