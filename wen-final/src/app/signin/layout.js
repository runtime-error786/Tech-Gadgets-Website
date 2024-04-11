import { Play } from "next/font/google";
const inter = Play({ subsets: ["latin"],weight:"400" });
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config, icon } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

export const metadata = {
  title : "Register",
  Description:"user sign in and sign up",
  
}


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className={inter.className}>
        {children}
        </body>
    </html>
  );
}
