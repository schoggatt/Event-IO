"use client";

import Link from "next/link";
import React from "react";
import BannerText from "./banner-text";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth.slice";

export default function NavigationHeader() {
  const email = useAppSelector((state) => state.authReducer.value.email);
  const dispatch = useDispatch<AppDispatch>();

  function handleLogout() {
    dispatch(logout());
  }

  function handleUserStatus() {
    if (email.length > 0) {
      return (
        <>
          <h1 className="text-white mr-5">{email}</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 text-black"
          >
            Logout
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </>
      );
    } else {
      return (
        <Link href="/login">
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 text-black">
            Login
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </Link>
      );
    }
  }

  return (
    <header className="text-white body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          <Link className="mr-5 hover:text-gray-100" href="/">
            Home
          </Link>
          <Link className="mr-5 hover:text-gray-600" href="/events">
            Events
          </Link>
          <Link className="mr-5 hover:text-gray-600" href="/myevents">
            My Events
          </Link>
          <Link className="hover:text-gray-600" href="/contactme">
            Contact
          </Link>
        </nav>
        <Link
          className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-white lg:items-center lg:justify-center"
          href="/"
        >
          <BannerText size="text-5xl" />
        </Link>
        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0 lg:items-center lg:justify-right">
          {handleUserStatus()}
        </div>
      </div>
    </header>
  );
}
