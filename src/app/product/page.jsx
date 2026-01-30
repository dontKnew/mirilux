import Main from "@/components/layout/Main";
import Container from "@/components/layout/Container";
import ProductDetails from "@/components/product/ProductDetails";

export default async function Page({ params }) {
  return (
    <Main>
      <Container py={2}>
        <ProductDetails slug={'dehnul-oud-alarbiya'} />
      </Container>

    </Main>
  );
}

