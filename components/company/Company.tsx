import { useState } from "react";
import { useForm } from "react-hook-form";
import { addCompany, addUser } from "../../utils/userApi";
import { FormDataProps } from "../form/type";

export default function CompanyForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataProps>();
  const [company, setCompany] = useState([]);

  const onSubmit = async (data: FormDataProps, e: any) => {
    console.log(data);
    const company:any = addCompany(data.company.companyName, data.company.isActive);
    setCompany(company);
    console.log(company);
  };

  return (
    <div className="form-container">
      <div className="mt-5 md:col-span-2 md:mt-0">
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
              {...register("company.companyName")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <p>Remove from company:</p>
                        <input
              type="checkbox"
              {...register("company.isActive")}
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
        {/* <button onClick={addCompany(company.,a)}>toggle</button> */}
      </div>
    </div>
  );
}
