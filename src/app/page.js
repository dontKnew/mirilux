import BannerSlider from "@/components/home/BannerSlider";
import ProductSection from "@/components/product/ProductSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Main from "@/components/layout/Main";
import FAQs from "@/components/home/FAQs";

export default function Page() {
  return (
    <>
      <Main>
        <BannerSlider/>
        <ProductSection title="Special Perfums 2026" />
        <WhyChooseUs />
        <ProductSection title="Winter Perfums" reverse={true} />
        <ProductSection title="Most Popular Perfums" />
        <FAQs />
      </Main>
    </>
  );
}
