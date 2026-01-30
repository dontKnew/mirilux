"use client";
import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import Container from "../layout/Container";
import { Faqs } from "@/data/faqs";
import Title from "../ui/Title";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <Container>
      <Title title="Frequently Asked Questions" description="Everything you need to know about <BrandName /> perfumes, delivery, payments, and returns." />

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`rounded border transition ${isOpen
                  ? "border-[var(--primary)] shadow-md"
                  : "border-gray-200 dark:border-gray-700"
                } bg-[#fafafa] dark:bg-[#020617]`}
            >
              {/* Question */}
              <button
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="w-full flex items-center justify-between gap-4 p-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="md:block hidden text-[var(--primary)]">
                    {item.icon}
                  </div>
                  <span className="font-medium">
                    {item.question}
                  </span>
                </div>

                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${isOpen
                      ? "rotate-180 text-[var(--primary)]"
                      : "text-gray-500"
                    }`}
                />
              </button>

              {/* Answer */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0" }`}>
                <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#fafafa] dark:bg-[#020617] border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <p className="text-gray-700 dark:text-gray-200 font-medium">
          Still have questions? We're here to help.
        </p>

        <a
          href="https://wa.me/919876543210"
          target="_blank"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-[var(--primary)] text-white px-5 py-2.5 rounded-md transition"
        >
          <MessageCircle size={18} />
          Chat on WhatsApp
        </a>
      </div>
    </Container>
  );
}
