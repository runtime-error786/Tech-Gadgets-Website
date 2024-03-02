import { Play } from "next/font/google";
const inter = Play({ subsets: ["latin"],weight:"400" });
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Nav from "./nav/nav";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className={inter.className}>
        <Nav></Nav>
        {children}
        </body>
    </html>
  );
}
