import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;
