import { Rubik as FontSans } from "next/font/google";
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
