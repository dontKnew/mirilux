import Main from "@/components/layout/Main";
import TitleHeading from "@/components/ui/TitleHeading";

export default async function Page({ params }) {
  const { id } = await params;
  const name = (id || "").replace(/-/g, " ").toUpperCase();
  return (
    <Main>
      <TitleHeading title={`Product - ${name}`} description={`Explore our premium ${name} perfumes, crafted with care and designed to last all day.`} />
    </Main>
  );
}
