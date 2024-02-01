"use client";

import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { authenticate } from "@/redux/features/auth.slice";
import { GoogleUser } from "./api/auth/models/google-user";

export default function App({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (session?.user) {
      const name = session.user.name!.split(" ");
      const user: GoogleUser = {
        email: session.user.email!,
        firstName: name[0],
        lastName: name[1],
        image: session.user.image,
      };
      dispatch(authenticate(user));
    }
  }, [session?.user, dispatch]);

  return (
    <main className="flex flex-col items-center pr-40 pl-40 pt-4 text-center">
      {children}
    </main>
  );
}
