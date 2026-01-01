import Main from "@/components/layout/Main";
import TitleHeading from "@/components/ui/TitleHeading";
import BrandName from "@/components/ui/BrandName";
import Container from "@/components/layout/Container";
import Title from "@/components/ui/Title";

export default function Page() {
  return (
    <Main>
      <TitleHeading
        title="Terms & Conditions"
        description="Please read these terms carefully before using our website."
      />

      <Container className="space-y-6">

        <p>
          These Terms & Conditions govern your access to and use of the{" "}
          <BrandName /> website and services. By using our website, you agree to
          be bound by these terms.
        </p>

        {/* Use of Website */}
        <div>
          <Title
            mt="6"
            title="Use of Website"
            description="Acceptable use and user responsibilities."
          />
          <p>
            You agree to use the website only for lawful purposes and in a way
            that does not infringe upon the rights of others or restrict their
            use of the site.
          </p>
        </div>

        {/* Product Information */}
        <div>
          <Title
            mt="6"
            title="Product Information"
            description="Accuracy and availability of product details."
          />
          <p>
            <BrandName /> makes every effort to display accurate product
            information; however, we do not guarantee that descriptions,
            pricing, or images are free from errors.
          </p>
        </div>

        {/* Pricing & Payments */}
        <div>
          <Title
            mt="6"
            title="Pricing and Payments"
            description="Payment terms and pricing policies."
          />
          <p>
            All prices are subject to change without prior notice. Payments must
            be completed using the available payment methods at checkout.
          </p>
        </div>

        {/* Limitation of Liability */}
        <div>
          <Title
            mt="6"
            title="Limitation of Liability"
            description="Extent of our responsibility and liability."
          />
          <p>
            <BrandName /> shall not be liable for any indirect, incidental, or
            consequential damages arising from the use of our products or
            services.
          </p>
        </div>

      </Container>
    </Main>
  );
}
