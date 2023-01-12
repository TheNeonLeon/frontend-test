import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import db from "../../firebase/firebaseConfig";
import { addUser, getUsers } from "../../utils/userApi";
import { FormDataProps } from "./type";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "next-themes";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataProps>();
  const [userInfo, setUserInfo] = useState<FormDataProps[]>([]);
  const { theme, setTheme } = useTheme();

  const router = useRouter();

  const toCompanyPage = (e: any) => {
    e.preventDefault();
    router.push("/company");
  };
  const toProfilePage = (e: any) => {
    e.preventDefault();
    router.push("/profile");
  };

  const onSubmit = async (data: FormDataProps, e: any) => {
    const userInfo: any = await addUser(
      data?.userInfo.firstName,
      data?.userInfo.lastName,
      data?.userInfo.email,
      data?.userInfo.country,
      data?.userInfo.streetAdress,
      data?.userInfo.city,
      data?.userInfo.postalCode
    );
    setUserInfo(await userInfo);

    toast.success("User added 🧑", {
      bodyClassName: "black-background",
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-message",
    });
  };

  return (
    <div>
      <div className="flex h-screen items-center justify-center mt-20 sm:mt-0">
        <div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="flex justify-between">
                <h3 className="text-4xl font-extrabold dark:text-white">
                  Personal Information
                </h3>
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
              <form
                className="dark:text-gray-600"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="light:bg-white dark:bg-gray-800 px-4 py-5 sm:p-6">
                <p className="mb-2 text-base text-gray-600 dark:text-gray-400">Create a person</p>
                  <div className="grid grid-cols-6 gap-6 ">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        First name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        {...register("userInfo.firstName")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Last name <span className="text-red-600">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        {...register("userInfo.lastName")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Email address <span className="text-red-600">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        {...register("userInfo.email")}
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        {...register("userInfo.country")}
                        autoComplete="country-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>Sweden</option>
                        <option>Norway</option>
                        <option>Finland</option>
                        <option>Denmark</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Street address
                      </label>
                      <input
                        type="text"
                        {...register("userInfo.streetAdress")}
                        autoComplete="street-address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        {...register("userInfo.city")}
                        autoComplete="address-level2"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        ZIP / Postal code
                      </label>
                      <input
                        type="text"
                        {...register("userInfo.postalCode")}
                        autoComplete="postal-code"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className=" bg-gray-50 px-4 py-3 text-right sm:px-6 dark:bg-gray-800">
                  <div className="flex gap-5">
                    <div className="flex justify-end">
                      <button
                        className="inline-flex justify-center rounded-md mr-2 border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={toCompanyPage}
                      >
                        Company page
                      </button>
                      <button
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={toProfilePage}
                      >
                        Profile page
                      </button>
                    </div>
                    <div className="ml-auto">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add person
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={5000} />
    </div>
  );
}
