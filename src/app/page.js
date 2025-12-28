import Topbar from "@/components/layout/Topbar";
import Header from "@/components/layout/Header";
import CategoryMenu from "@/components/layout/CategoryMenu";
import BannerSlider from "@/components/home/BannerSlider";
import ProductSection from "@/components/product/ProductSection";
import PaymentTrust from "@/components/PaymentTrust";
import Footer from "@/components/layout/Footer";
import Testimonials from "@/components/testimonials/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FAQs from "@/components/home/FAQs";
import PopupOffer from "@/components/PopupOffer";
import ShippingSupport from "@/components/ShippingSupport";


export default function HomePage() {
  return (
    <>
      <Topbar />
      <Header />
       <CategoryMenu />
      <BannerSlider/>
      <ProductSection title="Special Perfums - Near Year 2026" />
      <WhyChooseUs />
      <ProductSection title="Winter Perfums" reverse={true} />
      <ProductSection title="Most Popular Perfums" />
      <FAQs />
      <PaymentTrust />
      <Testimonials />
      <ShippingSupport />
      <PopupOffer />
      <Footer />
    </>
  );
}
