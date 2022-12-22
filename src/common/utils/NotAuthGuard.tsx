import Loading from "../../components/Loading";
import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const NotAuthGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
    return null;
  }

  if (status === "unauthenticated") {
    return <>{children}</>;
  }

  return <Loading />;
};

export default NotAuthGuard;
