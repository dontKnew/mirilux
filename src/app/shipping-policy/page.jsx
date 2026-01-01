import Main from "@/components/layout/Main";
import TitleHeading from "@/components/ui/TitleHeading";
import BrandName from "@/components/ui/BrandName";
import Container from "@/components/layout/Container";
import Title from "@/components/ui/Title";

export default function Page() {
  return (
    <Main>
      <TitleHeading
        title="Shipping Policy"
        description="Information regarding order processing, shipping, and delivery."
      />

      <Container className="space-y-6">

        <p>
          At <BrandName />, we are committed to delivering your orders safely and
          in a timely manner. Please review our shipping policy below to
          understand how your order is processed and delivered.
        </p>

        {/* Order Processing */}
        <div>
          <Title
            mt="6"
            title="Order Processing"
            description="Timeline for order confirmation and dispatch."
          />
          <p>
            Orders placed with <BrandName /> are processed within{" "}
            <strong>1–3 business days</strong>, excluding weekends and public
            holidays.
          </p>
        </div>

        {/* Shipping Duration */}
        <div>
          <Title
            mt="6"
            title="Shipping Duration"
            description="Estimated delivery timelines after dispatch."
          />
          <p>
            Once dispatched, orders are typically delivered within{" "}
            <strong>3–7 business days</strong>, depending on your delivery
            location and courier partner.
          </p>
        </div>

        {/* Shipping Charges */}
        <div>
          <Title
            mt="6"
            title="Shipping Charges"
            description="Details about shipping fees and costs."
          />
          <p>
            Shipping charges, if applicable, will be clearly displayed at
            checkout before payment is completed.
          </p>
        </div>

        {/* Delayed or Lost Shipments */}
        <div>
          <Title
            mt="6"
            title="Delayed or Lost Shipments"
            description="What to do if your order is delayed or not delivered."
          />
          <p>
            While we strive for timely delivery, delays may occur due to
            unforeseen circumstances. In case of a lost or delayed shipment,
            please contact our support team and <BrandName /> will assist you in
            resolving the issue.
          </p>
        </div>

      </Container>
    </Main>
  );
}
