import React from "react";
import google from "../../public/google.svg";
import Image from "next/image";
import { signIn } from 'next-auth/react';

const LoginPage: React.FC = () => {
  
  return (
    <div className="flex h-screen bg-black text-white">
      <div className="flex flex-col justify-center items-center w-2/5 bg-gray-900 p-10">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-500"  >
          ideaFlow.io
        </h1>
        <div className="container">
          <p className="typed-out">
            The Intelligence Amplification Company
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-3/5 p-10">
        <h2 className="text-3xl font-semibold mb-4">Login</h2>
        <p className="text-lg opacity-75">
          Welcome back! Please sign in to your account.
        </p>
        <button
          onClick={()=> signIn('google')}
          className="my-4 rounded-3xl p-2 hover:border hover:border-black hover:bg-white "
        >
          <Image src={google} alt="googleLogo" width={32}></Image>
        </button>
        {/* Add your login form here */}
      </div>
    </div>
  );
};

export default LoginPage;
