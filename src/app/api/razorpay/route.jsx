import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

console.warn(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  const { amount } = await request.json();

  const options = {
    amount: amount * 100, // Amount in paise (₹450 = 45000)
    currency: "INR",
    receipt: "receipt_id_" + Math.random(),
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}