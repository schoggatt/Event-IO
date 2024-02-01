"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface IAuthProvidersProps {
  children: ReactNode;
}

export default function AuthProviders(props: IAuthProvidersProps) {
  return <SessionProvider>{props.children}</SessionProvider>;
}
