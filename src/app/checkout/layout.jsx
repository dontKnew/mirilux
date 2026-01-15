import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import Container from "@/components/layout/Container";
import CheckoutHeader from "./checkoutHeader";

export default function CheckoutLayout({ children }) {
  return (
    <>
    <Container py={5}>
      <CheckoutHeader />
        <main className="md:mb-0 mb-[62px] bg-white md:bg-gray-100 md:p-2">
          <CheckoutStepper />
          {children}
        </main>
    </Container>
    </>
  );
}
