import React from "react";
import { useRouter } from "next/router";
import LoginPage from "@/Components/Login/login";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    // Redirect the user if they are logged in
    if (status === "authenticated" && session) {
      router.push("/");
    }
  }, [status, session, router]);

  return <LoginPage />;
}
