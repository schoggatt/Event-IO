"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/features/auth.slice";
import { useRouter } from "next/navigation";

interface ILoginInput {
  email: string;
  password: string;
  isAuthenticated: boolean;
}

export default function Login() {
  const [loginInput, setLoginInput] = useState<ILoginInput>({
    email: "",
    password: "",
    isAuthenticated: false,
  });
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLoginInput({
      ...loginInput,
      [event.target.id]: event.target.value,
    });
  }

  function handleSubmit() {
    const user = loginInput;
    user.isAuthenticated = true;
    dispatch(login(user));

    router.push("/");
  }

  return (
    <div className="w-1/5">
      <form className="max-w-lg mx-auto">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="wingodingo@gmail.com"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <button
          type="button"
          className="text-black bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-300 dark:focus:ring-blue-800"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
}
