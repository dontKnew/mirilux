import { Poppins } from 'next/font/google'
import "@/styles/globals.css";
import PageLoader from '@/components/PageLoader';

const font = Poppins({
  subsets: ['latin'],
  variable: "--font-roboto",
  weight: ['300', '400', '500', '600', '700'],
  display: "swap",
})

export const metadata = {
  title: "Best Perfume Provider in India - MiriLux ",
  description: "MiriLux is India`s Top Brand",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.variable} >
      <body>
        {children}
      </body>
    </html>
  );
}
