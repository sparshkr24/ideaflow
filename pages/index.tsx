import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import Hero from '../Components/Hero/hero'

import { useSession, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
  };
  React.useEffect(() => {
    // Redirect the user if they are logged in
    if (status !== "authenticated") {
      router.push("/login");
    }
  }, [status, session, router]);
  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-white font-semibold">ideaFlow</div>
        {session ? (
          <div className="flex items-center space-x-4">
            <div className="text-white">Hello, {session.user?.name}</div>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-500 rounded-lg px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        ) : null}
      </nav>
      <Hero/>
    </>
  );
}
