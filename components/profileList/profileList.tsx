import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import db from "../../firebase/firebaseConfig";
import { getCompanies, getUsers } from "../../utils/userApi";
import { CompanyProps } from "../company/type";
import { FormDataProps } from "../form/type";

export default function Profile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [users, setUsers] = useState<FormDataProps[]>([]);
  const [company, setCompany] = useState<CompanyProps[]>([]);
  const [companyName, setCompanyName] = useState<String>("");
  const [status, setStatus] = useState(false);

  const router = useRouter();
  const toHomePage = (e: any) => {
    e.preventDefault();
    router.push("/");
  };
  const updateUser = async (id: string, company: any, status: boolean) => {
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
  console.log(companyName);

  return (
    <div className="profile-container">
      <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white">
            Profiles
          </h5>
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
                            className="mt-1 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
      </div>
    </div>
  );
}
