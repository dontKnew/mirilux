import { Poppins } from 'next/font/google'
import "@/styles/globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from '@/components/ui/toast/ToastProvider';
import { createPageMetadata } from '@/data/metaData';
import ClientAuthInit from '@/lib/ClientAuthInit';

const font = Poppins({
  subsets: ['latin'],
  variable: "--font-roboto",
  weight: ['300', '400', '500', '600', '700'],
  display: "swap",
})

export const metadata = createPageMetadata({
  title: "Luxury Perfume Brand in India | Long Lasting Perfumes - MiriLux",
  description:
    "Discover luxury perfumes crafted for elegance and long-lasting fragrance at MiriLux.",
  path: "/",
  keywords: ["luxury perfumes", "perfume brand india", "long lasting perfume"]
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.variable} >
      <body>
          <ClientAuthInit />
          <CartProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </CartProvider>
        
      </body>
    </html>
  );
}
