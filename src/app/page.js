import Topbar from "@/components/layout/Topbar";
import Header from "@/components/layout/Header";
import CategoryMenu from "@/components/layout/CategoryMenu";
import BannerSlider from "@/components/home/BannerSlider";
import ProductSection from "@/components/product/ProductSection";


export default function HomePage() {
  return (
    <>
      <Topbar />
      <Header />
      <CategoryMenu />
      <BannerSlider/>
      <ProductSection title="Special Perfums - Near Year 2026" />
      <ProductSection title="Winter Perfums" reverse={true} />
      <ProductSection title="Most Popular Perfums" />

    </>
  );
}
