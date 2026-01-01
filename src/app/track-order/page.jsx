import Container from "@/components/layout/Container";
import Main from "@/components/layout/Main";
import TitleHeading from "@/components/ui/TitleHeading";
import { PackageCheck, Truck, MapPin, CheckCircle, Search, HelpCircle} from "lucide-react";

export default function Page() {
  return (
    <Main>
      <TitleHeading title="Track Your Order" description="Enter your Order ID or Phone Number to check delivery status" />
      <Container>
        <div className="text-center">
          <div className="bg-[var(--primary)] rounded-xl p-2 shadow-sm w-full max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                id="tracking-number"
                placeholder="Enter Your Tracking Number "
                className="flex-1 bg-white border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-[var(--primary)]"
              />

              <button className="flex items-center border-2 justify-center gap-2 bg-[var(--secondary)] hover:bg-[var(--primary)] text-white font-semibold px-6 py-2 rounded-md transition"
              >
                <Search size={18} />
                Track Order
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white border border-gray-300 rounded-xl p-6 hidden">
          <h3 className="font-semibold text-lg mb-6">
            Order Status
          </h3>

          <div className="space-y-6">

            <StatusItem
              icon={<CheckCircle />}
              title="Order Confirmed"
              desc="Your order has been placed successfully"
              active
            />

            <StatusItem
              icon={<PackageCheck />}
              title="Packed"
              desc="Your perfume is packed and ready to ship"
              active
            />

            <StatusItem
              icon={<Truck />}
              title="Out for Delivery"
              desc="Courier partner is delivering your order"
            />

            <StatusItem
              icon={<MapPin />}
              title="Delivered"
              desc="Expected delivery in 1–2 days"
            />

          </div>
        </div>

        {/* HELP */}
        <div className="mt-8 flex items-center justify-between flex-wrap gap-4
                        bg-[var(--primary)]/5 border border-[var(--primary)]/20
                        rounded-xl p-5">
          <div>
            <p className="font-semibold text-gray-900">
              Need help with your order?
            </p>
            <p className="text-sm text-gray-600">
              Our support team is available 24/7
            </p>
          </div>

          <button
            className="flex items-center gap-2
                       bg-[var(--primary)] text-white
                       px-5 py-2 rounded-md
                       hover:bg-[var(--secondary)] transition"
          >
            <HelpCircle size={18} />
            Contact Support
          </button>
        </div>

      </Container>
    </Main>
  );
}

/* ---------------- STATUS ITEM ---------------- */

function StatusItem({ icon, title, desc, active }) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`h-10 w-10 rounded-full flex items-center justify-center
          ${active
            ? "bg-[var(--primary)] text-white"
            : "bg-gray-200 text-gray-500"
          }`}
      >
        {icon}
      </div>

      <div>
        <p className={`font-medium ${active ? "text-gray-900" : "text-gray-500"}`}>
          {title}
        </p>
        <p className="text-sm text-gray-500">
          {desc}
        </p>
      </div>
    </div>
  );
}
