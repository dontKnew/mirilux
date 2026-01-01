import ProductSection from "@/components/product/ProductSection";
import Main from "@/components/layout/Main";
import Title from "@/components/ui/Title";
import TitleHeading from "@/components/ui/TitleHeading";
export default function Page() {
  return (
    <>
      <Main>
        <TitleHeading title={`Shop the Best Categorized Perfumes`} description={`Explore our premium categorized perfumes, crafted with care and designed to last all day.`} />
        <ProductSection title="Shop the Best Categorized Perfumes" />
        <ProductSection title="Special Perfums 2026" reverse={true} />
        <ProductSection title="Popular Perfums in Last Six Months" />
        <ProductSection title="Winter Perfums" reverse={true} />
        <ProductSection title="Most Popular Perfums" />
      </Main>
    </>
  );
}
