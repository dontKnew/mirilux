import { baseTemplate } from "./baseTemplate";

export function orderDetailsTemplate({ order }) {
  console.warn("Generating order details email for order:", order);
  const address = order.order_address;
  const items = order.order_items || [];
  
  const paymentBadge = `<span style="background:#dcfce7;color:#166534;">${order.payment_method}</span>`

  return baseTemplate({
    title: "New Order Placed 🎉",
    content: `
      <p style="font-size:16px;">
        Thank you for new order! Order has been placed successfully.
      </p>

      <!-- Order Summary -->
      <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:24px 0;background:#f9fafb;">
        <h3 style="margin:0 0 12px;color:#0a356a;">🧾 Order Summary</h3>
        <table width="100%" style="font-size:14px;">
          <tr>
            <td><strong>Order ID:</strong></td>
            <td>${order.order_number}</td>
          </tr>
          <tr>
            <td><strong>Status:</strong></td>
            <td style="font-weight:600;">${order.order_status}</td>
          </tr>
          <tr>
            <td><strong>Total Amount:</strong></td>
            <td>₹${order.total_amount}</td>
          </tr>
          <tr>
            <td><strong>Payment:</strong></td>
            <td>
              ${paymentBadge}
            </td>
          </tr>
          <tr>
            <td><strong>Order Date:</strong></td>
            <td>${order.order_date}</td>
          </tr>
        </table>
      </div>

      <!-- Delivery Address -->
      <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-bottom:24px;">
        <h3 style="margin:0 0 12px;color:#0a356a;">📦 Delivery To</h3>
        <p style="margin:0;line-height:1.6;">
          <strong>${address.full_name}</strong><br />
          ${address.phone_no}<br />
          ${address.email}<br />
          ${address.address_line}<br />
          ${address.city}, ${address.state} - ${address.pincode}<br />
          ${address.country}
        </p>
      </div>

      <!-- Product Details -->
      <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-bottom:24px;">
        <h3 style="margin:0 0 12px;color:#0a356a;">
          🛍️ Product Details (${items.length} Item${items.length > 1 ? "s" : ""})
        </h3>

        <table width="100%" cellpadding="8" style="border-collapse:collapse;font-size:14px;">
          <thead>
            <tr style="background:#f3f4f6;text-align:left;">
              <th>Product</th>
              <th>Size</th>
              <th>Qty</th>
              <th align="right">Price</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item) => `
              <tr style="border-top:1px solid #e5e7eb;">
                <td>${item.product_name}</td>
                <td>${item.product_size}</td>
                <td>${item.qty}</td>
                <td align="right">₹${item.product_amount}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div style="text-align:right;margin-top:12px;font-size:15px;font-weight:600;">
          Total: ₹${order.total_amount}
        </div>
      </div>

      <!-- Track Order -->
      <div style="text-align:center;margin-top:32px;">
        <a href="${process.env.APP_URL}/track-order"
          style="display:inline-block;padding:12px 28px;background:#0a356a;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;">
          Track Order Status
        </a>
      </div>

      <p style="margin-top:32px;font-size:13px;color:#6b7280;">
        If you have any questions regarding your order, please contact support.
      </p>
    `,
  });
}
