import { Playfair_Display, Poppins } from "next/font/google";
import localFont from "next/font/local";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});
const sfProRegular = localFont({
  src: [
    {
      path: "./sf-pro-display_regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./sf-pro-display_bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export { playfairDisplay, sfProRegular, poppins };
