import Main from "@/components/layout/Main";
import TitleHeading from "@/components/ui/TitleHeading";
import BrandName from "@/components/ui/BrandName";
import Container from "@/components/layout/Container";
import Title from "@/components/ui/Title";

export default function Page() {
  return (
    <Main>
      <TitleHeading
        title="Cancellation Policy"
        description="Guidelines for order cancellation and related refunds."
      />

      <Container className="space-y-6">

        <p>
          <BrandName /> allows customers to cancel orders under specific
          conditions. Please review the cancellation terms outlined below.
        </p>

        {/* Order Cancellation */}
        <div>
          <Title
            mt="6"
            title="Order Cancellation"
            description="When and how an order can be cancelled."
          />
          <p>
            Orders can be cancelled only before they are shipped. Once an order
            has been dispatched, cancellation requests will not be accepted.
          </p>
        </div>

        {/* Refund After Cancellation */}
        <div>
          <Title
            mt="6"
            title="Refund After Cancellation"
            description="Refund timelines for successfully cancelled orders."
          />
          <p>
            If your order is cancelled successfully, the refund will be
            initiated to your original payment method within{" "}
            <strong>5–7 business days</strong>.
          </p>
        </div>

        {/* How to Cancel */}
        <div>
          <Title
            mt="6"
            title="How to Cancel an Order"
            description="Steps to request cancellation."
          />
          <p>
            To cancel an order, please contact our customer support team as soon
            as possible with your order details. Our team will assist you
            accordingly.
          </p>
        </div>

      </Container>
    </Main>
  );
}
