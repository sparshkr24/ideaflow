import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "@/styles/globals.css"; // Import your global styles here

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      {/* Wrap your components with SessionProvider */}
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
