/* 
********************** PRODUCT PRICE STRUCTURE  **********************
=> Input By Admin : Base Product Price & Discount Input 
-- Product Price Understanding --

Base Product Price        = 200   
GST @18% on 200           = 36
--------------------------------
Product Price (Incl. GST) = 236   ← actual selling price
Old Price (Strike)        = 286   (236 + 50)  ← UI only Discount

Coupon Discount           = ₹10(236*%10) // applicable to  product price gst inclusive even for percentage
Shipping Amount           = 30
--------------------------------
Final Payable             = 236 + 30 − 10
                          = ₹256 ✅

--- User Display Price Info ---
Base Price        ₹200
GST @18%          ₹36
----------------------
Product Price     ₹236
Coupon Discount   ₹10(236*%10) // applicable to  product price gst inclusive even for percentage

Shipping          ₹30
----------------------
Final Amount      ₹256

********************** END  **********************

-- Table Products --
status : published, draft, private,
categories:[3, 4, 5, 6]
price:[mrp-discount]
discount_type:amount|percentage   
discount_amount:
discount_percentage:
user_id : 20,
seo_title:
seo_description:
seo_keywords:
*/
const Products = [
  {
    id: 1,
    name: "Into Waves Men",
    title: "Into the Waves For Men - 100 ml",
    description: "Premium & Long Lasting Fragrance",
    size: "100ml",
    rating: 5,
    reviews: 55,
    price: 450,
    mrp: 899,
    discount: 50,
    image: "p1.png",
    badge: "New",
  },
  {
    id: 2,
    name: "Into Valley Women",
    title: "Into the Valley For Women - 100 ml",
    description: "Premium & Long Lasting Fragrance",
    size: "100ml",
    rating: 5,
    reviews: 61,
    price: 450,
    mrp: 899,
    discount: 50,
    image: "p2.png",
    badge: "New",
  },
  {
    id: 3,
    name: "Into Sunset",
    title: "Into the Sunset For Women - 100 ml",
    description: "Premium & Long Lasting Fragrance",
    size: "100ml",
    rating: 5,
    reviews: 84,
    price: 450,
    mrp: 899,
    discount: 50,
    image: "p3.png",
    badge: "New",
  },
  {
    id: 4,
    name: "Vanilla Bliss",
    title: "Vanilla Bliss For Women - 100 ml",
    description: "Premium & Long Lasting Fragrance",
    size: "100ml",
    rating: 5,
    reviews: 33,
    price: 450,
    mrp: 899,
    discount: 50,
    image: "p4.png",
    badge: "New",
  },

  /* ➕ MORE PRODUCTS */
  {
    id: 5,
    name: "Oud Royale",
    title: "Oud Royale in India - 100 ml",
    description: "Luxury Oud Fragrance",
    size: "100ml",
    rating: 4.8,
    reviews: 92,
    price: 699,
    mrp: 1299,
    discount: 46,
    image: "p5.png",
    badge: "New",
  },
  {
    id: 6,
    name: "Amber Nights",
    title: "Amber Nights - 100 ml",
    description: "Warm & Sensual Notes",
    size: "100ml",
    rating: 4.9,
    reviews: 76,
    price: 649,
    mrp: 1199,
    discount: 45,
    image: "p6.png",
    badge: "New",
  },
  {
    id: 7,
    name: "Citrus Bloom",
    title: "Fresh Citrus Bloom - 100 ml",
    description: "Fresh Daily Wear",
    size: "100ml",
    rating: 4.7,
    reviews: 48,
    price: 399,
    mrp: 799,
    discount: 50,
    image: "p7.png",
    badge: "New",
  },
  {
    id: 8,
    name: "Midnight Musk",
    title: "Midnight Musk - 100 ml",
    description: "Bold & Intense Fragrance",
    size: "100ml",
    rating: 4.9,
    reviews: 68,
    price: 549,
    mrp: 999,
    discount: 45,
    image: "p8.png",
    badge: "New",
  },
];

export { Products };      