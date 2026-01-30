"use client";
import Script from 'next/script';

export default function CheckoutPage() {
  const amount = 450;

  const processPayment = async (methodType) => {
    const response = await fetch('/api/razorpay', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
    const order = await response.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "MiriLuxe",
      order_id: order.id,
      prefill: {
        contact: "7065221377",
        vpa: methodType === 'upi' ? "7065221377@pthdfc" : "",
      },
      handler: function (response) {
        console.warn(response, "payment success");
      },
      config: {
        display: {
          blocks: {
            banks: {
              name: "Custom UPI View",
              instruments: [
                {
                  method: methodType, 
                },
              ],
            },
          },
          sequence: ["block.banks"],
          preferences: { show_default_blocks: false },
        },
      },

      modal: {
        ondismiss: function() {
          alert("Payment popup closed");
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    // 3. FAILURE HANDLER (If payment fails inside the modal)
    paymentObject.on('payment.failed', function (response){
        alert("Payment failed");
        console.warn(response, "payment failed");
    });
    paymentObject.open();
  };

  return (
    <div className="p-10">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>
      
      <div className="space-y-4">
        {/* Custom UPI Button */}
        <button 
          onClick={() => processPayment('upi')}
          className="w-full border p-4 flex justify-between items-center rounded-lg hover:bg-gray-50"
        >
          <span>UPI (Recommended)</span>
          <span>🔒</span>
        </button>

        {/* Custom Card Button */}
        <button 
          onClick={() => processPayment('card')}
          className="w-full border p-4 flex justify-between items-center rounded-lg hover:bg-gray-50"
        >
          <span>Debit / Credit / ATM Card</span>
          <span>🔒</span>
        </button>
      </div>
    </div>
  );
}