import Topbar from "@/components/layout/Topbar";
import Header from "@/components/layout/Header";
import CategoryMenu from "@/components/layout/CategoryMenu";
import PaymentTrust from "@/components/PaymentTrust";
import Footer from "@/components/layout/Footer";
import Testimonials from "@/components/testimonials/Testimonials";
import PopupOffer from "@/components/PopupOffer";
import ShippingSupport from "@/components/ShippingSupport";
import StickyHeader from "@/components/ui/StickyHeader";
import MobileBottomNav from "@/components/MobileBottomNav";
import CartSidebar from "@/components/cart/CartSidebar";



export default function Main({children}) {
  return (
    <>
      <Topbar />
      <StickyHeader>
        <Header />
      </StickyHeader>
      <CategoryMenu />
        {children}
      <PaymentTrust />
      <Testimonials />
      <ShippingSupport />
      <PopupOffer />
      <MobileBottomNav />
      <CartSidebar />
      <Footer />
    </>
  );
}
