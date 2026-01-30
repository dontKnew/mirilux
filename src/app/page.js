import WhyChooseUs from "@/components/home/WhyChooseUs";
import Main from "@/components/layout/Main";
import FAQs from "@/components/home/FAQs";
import ProductDetails from "@/components/product/ProductDetails";
import BannerSlider from "@/components/home/BannerSlider";

export default function Page() {
  return (
    <>
      <Main>
        <ProductDetails slug={'dehnul-oud-alarbiya'} />
        <WhyChooseUs />
        <FAQs />
      </Main>
    </>
  );
}
