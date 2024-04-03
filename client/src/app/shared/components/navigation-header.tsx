"use client";

import Link from "next/link";
import React from "react";
import BannerText from "./banner-text";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth.slice";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function NavigationHeader() {
  const authState = useAppSelector((state) => state.authReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  function handleLogout() {
    dispatch(logout());
  }

  function handleLogin() {
    signIn();
  }

  function handleUserStatus() {
    if (authState.isAuthenticated && authState.user) {
      return (
        <>
          {authState.user.image ? (
            <Image
              className="rounded-full mr-3"
              alt="profile-picture"
              src={authState.user.image ?? ""}
              width={40}
              height={40}
            />
          ) : (
            <p className="text-white mr-5">{authState.user.email}</p>
          )}
          <Button onClick={handleLogout}>
            Logout
            <HiOutlineArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </>
      );
    } else {
      return (
        <Button onClick={handleLogin}>
          Login
          <HiOutlineArrowRight className="w-4 h-4 ml-2" />
        </Button>
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
          {authState.user && (
            <Link className="mr-5 hover:text-gray-600" href="/myevents">
              My Events
            </Link>
          )}
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
