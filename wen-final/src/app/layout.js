"use client"
import { Play } from "next/font/google";
import BootstrapClient from "./Others/Bootstrap_js";
const inter = Play({ subsets: ["latin"],weight:"400" });
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";
import { Storee } from "@/Store";
import Protect from "./Others/Protect";

export default function RootLayout({ children }) {
  return (
    <Provider store={Storee}>
    <html lang="en">
      <BootstrapClient></BootstrapClient>
      <body className={inter.className}>
        <GoogleOAuthProvider clientId='166424008698-umf0iijpbmf0he2qdg70ebpbjhv9ol4b.apps.googleusercontent.com'>
      <Protect>
          {children}
    </Protect>
        </GoogleOAuthProvider>
      </body>
    </html>
    </Provider>
  );
}
