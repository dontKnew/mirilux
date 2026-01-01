import Main from "@/components/layout/Main";
import TitleHeading from "@/components/ui/TitleHeading";
import BrandName from "@/components/ui/BrandName";
import Container from "@/components/layout/Container";
import Title from "@/components/ui/Title";

export default function Page() {
  return (
    <Main>
      <TitleHeading
        title="Refund Policy"
        description="Please read our refund and cancellation policy carefully."
      />

      <Container className="space-y-6">

        <p>
          At <BrandName />, customer satisfaction is our top priority. We strive
          to ensure that every product you receive meets our quality standards.
          However, if you are not completely satisfied with your purchase, please
          review our refund policy below.
        </p>

        {/* Refund Eligibility */}
        <div>
          <Title
            mt="6"
            title="Refund Eligibility"
            description="Refunds are applicable only under the following conditions."
          />
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Product received in a damaged, defective, or incorrect condition.
            </li>
            <li>
              Refund request raised within <strong>48 hours</strong> of delivery.
            </li>
            <li>
              Product must be unused, unopened, and in original packaging.
            </li>
          </ul>
        </div>

        {/* Non-Refundable Items */}
        <div>
          <Title
            mt="6"
            title="Non-Refundable Items"
            description="The following items are not eligible for refunds."
          />
          <ul className="list-disc pl-5 space-y-2">
            <li>Used or opened perfume bottles.</li>
            <li>Products damaged due to misuse or negligence.</li>
            <li>Items purchased during clearance or special sale events.</li>
          </ul>
        </div>

        {/* Refund Process */}
        <div>
          <Title
            mt="6"
            title="Refund Process"
            description={
              <>
                Once your refund request is approved, <BrandName /> will
                initiate the refund to your original method of payment.
              </>
            }
          />
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>
              Refunds are processed within{" "}
              <strong>5–7 business days</strong>.
            </li>
            <li>Shipping charges (if any) are non-refundable.</li>
          </ul>
        </div>

        {/* Order Cancellation */}
        <div>
          <Title
            mt="6"
            title="Order Cancellation"
            description="Cancellation requests are accepted only before dispatch."
          />
          <p>
            Orders can be cancelled only before they are shipped. Once an order
            has been dispatched, cancellation requests will not be accepted.
          </p>
        </div>

        {/* How to Request a Refund */}
        <div>
          <Title
            mt="6"
            title="How to Request a Refund"
            description="Follow the steps below to raise a refund request."
          />
          <p>
            Please contact our customer support team with your order ID, images
            of the product, and a brief description of the issue.
          </p>
        </div>

        {/* Contact Us */}
        <div>
          <Title
            mt="6"
            title="Contact Us"
            description="We are here to help you."
          />
          <p>
            For any questions related to refunds or cancellations, feel free to
            reach out to our support team. We are always happy to help at{" "}
            <BrandName />.
          </p>
        </div>

        {/* Closing */}
        <p className="pt-4 text-gray-600">
          This refund policy is subject to change without prior notice.{" "}
          <BrandName /> reserves the right to modify or update this policy at any
          time.
        </p>

      </Container>
    </Main>
  );
}
