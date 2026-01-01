import Main from "@/components/layout/Main";
import ProductGridSection from "@/components/product/ProductGridSection";
import Title from "@/components/ui/Title";
import TitleHeading from "@/components/ui/TitleHeading";

export default async function Page({ params }) {
  const { id } = await params;
  const name = (id || "").replace(/-/g, " ").toUpperCase();

  return (
    <Main>
      <TitleHeading title={`Buy ${name} Perfumes India`} description={`Explore our premium ${name} perfumes, crafted with care and designed to last all day.`} />
      <ProductGridSection title={`${name} Perfumes`} />
    </Main>
  );
}
