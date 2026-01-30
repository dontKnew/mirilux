"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {HelpCircle,Search, XCircle,} from "lucide-react";

import Container from "@/components/layout/Container";
import Main from "@/components/layout/Main";
import ButtonLoader from "@/components/ui/buttons/ButtonLoader";
import TitleHeading from "@/components/ui/TitleHeading";
import { useToast } from "@/components/ui/toast/ToastProvider";
import useApiRequest from "@/hooks/useApiRequest";
import { ORDER_STATUS, WEBSITE } from "@/data/constant";
import { RETURN_TIMELINE, BASE_TIMELINE, StatusItem } from "./trackOrder";
import { formatDateToIST } from "@/utils/array";

export default function Page() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderTrackingData, setOrderTrackingData] = useState(null);

  const { send, loading, data, error } = useApiRequest();
  const { showToast } = useToast();

  const trackOrder = () => {
    if (!trackingNumber.trim()) {
      showToast("Please enter a tracking number");
      return;
    }
    send("/order-track", { trackingNumber });
  };

  useEffect(() => {
    if (data) {
      setOrderTrackingData(data);
      showToast("Order status fetched successfully", "success");
    }
    if (error) showToast(error);
  }, [data, error]);

  /* ---------- MAP STATUS → FULL OBJECT ---------- */
  const statusMap = useMemo(() => {
    if (!orderTrackingData) return {};

    return orderTrackingData.reduce((acc, item) => {
      acc[item.status] = item; // full backend object
      return acc;
    }, {});
  }, [orderTrackingData]);

  /* ---------- CURRENT STATUS ---------- */
  const currentStatus =
    orderTrackingData?.[orderTrackingData.length - 1]?.status;

  /* ---------- RETURN FLOW ---------- */
  const showReturnFlow = [
    ORDER_STATUS.RETURN_REQUESTED,
    ORDER_STATUS.RETURN_APPROVED,
    ORDER_STATUS.RETURNED,
  ].includes(currentStatus);

  const FINAL_TIMELINE = showReturnFlow
    ? [...BASE_TIMELINE, ...RETURN_TIMELINE]
    : BASE_TIMELINE;

  /* ---------- STATUS STATE ---------- */
  const getStatusState = (stepStatus) => {
    if (!currentStatus) return "pending";

    if (currentStatus === ORDER_STATUS.CANCELLED) {
      return stepStatus === ORDER_STATUS.CANCELLED
        ? "cancelled"
        : "disabled";
    }

    const currentIndex = FINAL_TIMELINE.findIndex(
      (s) => s.status === currentStatus
    );
    const stepIndex = FINAL_TIMELINE.findIndex(
      (s) => s.status === stepStatus
    );

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "active";
    return "pending";
  };

  return (
    <Main>
      <TitleHeading
        title="Track Your Order"
        description="Enter your Order ID or Phone Number to check delivery status"
      />

      <Container py={2}>
        {/* ================= SEARCH ================= */}
        <div className="text-center">
          <div className="bg-[var(--secondary)] rounded-xl md:p-4 p-3 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-end items-center">
              <div className="flex flex-col flex-1 gap-1">
                <label className="text-start text-lg font-medium text-white">
                  Enter Your Tracking Number
                </label>
                <input
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Ex. OD-SAJI1213"
                  className="bg-white font-semibold border rounded-md px-4 py-3 outline-none focus:border-[var(--primary)]"
                />
              </div>

              <ButtonLoader
                className="!py-3 w-[150px]"
                handleClick={trackOrder}
                loading={loading}
                text="Track Order"
                textIcon={<Search size={18} />}
              />
            </div>
          </div>
        </div>

        {/* ================= STATUS ================= */}
        {orderTrackingData && (
          <div className="md:mt-10 mt-5 bg-white md:border rounded-xl md:p-4">
            <h3 className="font-semibold text-xl mb-6 text-center underline">Order Status</h3>

            <div className="space-y-6">
              {FINAL_TIMELINE.map((step) => {
                const stepData = statusMap[step.status];

                return (
                  <StatusItem
                    key={step.status}
                    icon={step.icon}
                    title={step.title}
                    desc={stepData?.message} // ✅ FROM API
                    datetime={
                      stepData?.datetime
                        ? formatDateToIST(stepData.datetime)
                        : null
                    }
                    state={getStatusState(step.status)}
                  />
                );
              })}

              {currentStatus === ORDER_STATUS.CANCELLED && (
                <StatusItem
                  icon={<XCircle />}
                  title="Order Cancelled"
                  desc={statusMap[ORDER_STATUS.CANCELLED]?.message}
                  datetime={
                    statusMap[ORDER_STATUS.CANCELLED]?.datetime
                      ? formatDateToIST(
                          statusMap[ORDER_STATUS.CANCELLED].datetime
                        )
                      : null
                  }
                  state="cancelled"
                />
              )}
            </div>
          </div>
        )}

        {/* ================= HELP ================= */}
        <div className="mt-8 flex items-center justify-between flex-wrap gap-4 bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-5">
          <div>
            <p className="font-semibold text-gray-900">
              Need help with your order?
            </p>
            <p className="text-sm text-gray-600">
              Our support team is available 24/7
            </p>
          </div>

          <Link
            href={`tel:${WEBSITE.PHONE_URL}`}
            className="flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2 rounded-md hover:bg-[var(--secondary)] transition"
          >
            <HelpCircle size={18} />
            Contact Support
          </Link>
        </div>
      </Container>
    </Main>
  );
}
