"use client";

import { useState } from "react";
import {
  ChevronDown,
  Clock,
  ShieldCheck,
  Truck,
  Wallet,
  Gift,
  MessageCircle,
} from "lucide-react";

const faqs = [
  {
    icon: <Clock />,
    question: "Are MiriLux perfumes long-lasting?",
    answer:
      "Yes, MiriLux perfumes are crafted using high-quality fragrance oils designed to last all day with just one or two sprays.",
  },
  {
    icon: <ShieldCheck />,
    question: "Are MiriLux perfumes safe for skin?",
    answer:
      "Absolutely. Our perfumes are made with skin-friendly ingredients and are suitable for daily use.",
  },
  {
    icon: <Truck />,
    question: "How long does delivery take?",
    answer:
      "Orders are usually delivered within 3–5 business days across India, depending on your location.",
  },
  {
    icon: <Wallet />,
    question: "Do you offer Cash on Delivery (COD)?",
    answer:
      "Yes, we offer Cash on Delivery on most locations across India for your convenience.",
  },
  {
    icon: <ShieldCheck />,
    question: "Can I return or exchange a product?",
    answer:
      "Yes, we have an easy return policy. Please refer to our Return Policy page for detailed information.",
  },
  {
    icon: <Gift />,
    question: "Are MiriLux perfumes suitable for gifting?",
    answer:
      "Definitely. Our perfumes come in premium packaging, making them perfect gifts for any occasion.",
  },
];

export default function FAQs() {
  // 🔥 First FAQ open by default
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white dark:bg-[#0f172a] py-16">
      <div className="md:max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="mb-12">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            <span className="h-10 w-1.5 bg-[var(--primary)] rounded"></span>
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl">
            Everything you need to know about MiriLux perfumes, delivery,
            payments, and returns.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-xl border transition ${
                  isOpen
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
                    <div className="text-[var(--primary)]">
                      {item.icon}
                    </div>
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                      {item.question}
                    </span>
                  </div>

                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 text-[var(--primary)]"
                        : "text-gray-500"
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
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
            Still have questions? We’re here to help.
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

        {/* FAQ Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
