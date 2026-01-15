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
== Same Product Data == 
id: 1,
name: "Into Waves Men",
slug:"",
long_name: "Premium & Long Lasting Fragrance", 
size: "100ml",
price: 450, // random 200 to 500
discount_type:"percentage", // random percentage | amount
discount_amount:270, // if discount_type==percentage then get discount_amount by  price*60/100
discount_percentage:"60%", // if discount_type==amount then get discount_percentage by  format discount_amount & discount_price
old_price:"[price+discount_amount]",
image: "p1.png", // random p1.png to p9.png
badge: "New", // New | Popular | more 2 from your side
rating: 5, // random 3 to 5
reviews: 55, // random 30-500
page_h1: "Into the Waves For Men", // product_title
description:"", // 160 letters
seo_title: "Into the Waves For Men"
seo_description: "" //fit to 160 letters
seo_keywords: // keywords add 
user_id:1,
status:"published", 
categories:"[Men, Women, Unisex, All]" // All Sabmei ayega, & more cateogyr sample : Men, Women , Unisex, Oud, Floral, Woody, Fresh, Gift, New Arrivals, Best , Sellers, Luxury
*/

const Products = [
  {
    id: 1,
    name: "Into Waves Men",
    slug: "into-waves-men",
    long_name: "Waves inspired fresh fragrance",
    size: "100ml",
    price: 450,
    discount_type: "percentage",
    discount_amount: 270,
    discount_percentage: "60%",
    old_price: 720,
    image: "p1.png",
    badge: "New",
    rating: 5,
    reviews: 120,
    page_h1: "Into the Waves For Men",
    description:
      "Into the Waves is a refreshing and long lasting fragrance crafted for modern men with aquatic freshness.",
    seo_title: "Into the Waves For Men Perfume",
    seo_description:
      "Buy Into the Waves perfume for men. Fresh aquatic fragrance with long lasting performance.",
    seo_keywords: "men perfume, fresh fragrance, waves scent",
    user_id: 1,
    status: "published",
    categories: ["Men", "Fresh", "New Arrivals", "All"],
  },

  {
    id: 2,
    name: "Into Valley Women",
    slug: "into-valley-women",
    long_name: "Valley inspired floral fragrance",
    size: "100ml",
    price: 399,
    discount_type: "amount",
    discount_amount: 150,
    discount_percentage: "38%",
    old_price: 549,
    image: "p2.png",
    badge: "Popular",
    rating: 4,
    reviews: 210,
    page_h1: "Into the Valley For Women",
    description:
      "Into the Valley is a floral and elegant fragrance designed for women who love freshness and softness.",
    seo_title: "Into the Valley For Women Perfume",
    seo_description:
      "Shop Into the Valley floral perfume for women with long lasting fragrance.",
    seo_keywords: "women perfume, floral scent, valley fragrance",
    user_id: 1,
    status: "published",
    categories: ["Women", "Floral", "Best Sellers", "All"],
  },

  {
    id: 3,
    name: "Midnight Musk Unisex",
    slug: "midnight-musk-unisex",
    long_name: "Musk based intense fragrance",
    size: "100ml",
    price: 499,
    discount_type: "percentage",
    discount_amount: 200,
    discount_percentage: "40%",
    old_price: 699,
    image: "p3.png",
    badge: "Trending",
    rating: 5,
    reviews: 340,
    page_h1: "Midnight Musk Perfume",
    description:
      "Midnight Musk is a bold and intense musky fragrance suitable for both men and women.",
    seo_title: "Midnight Musk Unisex Perfume",
    seo_description:
      "Discover Midnight Musk perfume. Strong musky fragrance for evening wear.",
    seo_keywords: "musk perfume, unisex fragrance, night perfume",
    user_id: 1,
    status: "published",
    categories: ["Unisex", "Woody", "Luxury", "All"],
  },

  {
    id: 4,
    name: "Royal Oud Luxury",
    slug: "royal-oud-luxury",
    long_name: "Oud rich luxury fragrance",
    size: "100ml",
    price: 500,
    discount_type: "percentage",
    discount_amount: 250,
    discount_percentage: "50%",
    old_price: 750,
    image: "p4.png",
    badge: "Luxury",
    rating: 5,
    reviews: 180,
    page_h1: "Royal Oud Luxury Perfume",
    description:
      "Royal Oud is a premium luxury fragrance crafted with rich oud notes for elegance.",
    seo_title: "Royal Oud Luxury Perfume",
    seo_description:
      "Buy Royal Oud luxury perfume with deep oud fragrance and long lasting scent.",
    seo_keywords: "oud perfume, luxury fragrance, royal scent",
    user_id: 1,
    status: "published",
    categories: ["Oud", "Luxury", "Best Sellers", "All"],
  },

  {
    id: 5,
    name: "Citrus Bloom Fresh",
    slug: "citrus-bloom-fresh",
    long_name: "Bloom inspired citrus freshness",
    size: "100ml",
    price: 299,
    discount_type: "amount",
    discount_amount: 100,
    discount_percentage: "33%",
    old_price: 399,
    image: "p5.png",
    badge: "New",
    rating: 4,
    reviews: 90,
    page_h1: "Citrus Bloom Fresh Perfume",
    description:
      "Citrus Bloom is a fresh and energetic fragrance perfect for daily wear.",
    seo_title: "Citrus Bloom Fresh Perfume",
    seo_description:
      "Refresh your day with Citrus Bloom fresh citrus fragrance.",
    seo_keywords: "fresh perfume, citrus fragrance, daily wear scent",
    user_id: 1,
    status: "published",
    categories: ["Fresh", "Unisex", "New Arrivals", "All"],
  },

  {
    id: 6,
    name: "Amber Nights Men",
    slug: "amber-nights-men",
    long_name: "Nights inspired warm fragrance",
    size: "100ml",
    price: 480,
    discount_type: "percentage",
    discount_amount: 190,
    discount_percentage: "40%",
    old_price: 670,
    image: "p6.png",
    badge: "Popular",
    rating: 5,
    reviews: 260,
    page_h1: "Amber Nights For Men",
    description:
      "Amber Nights is a warm and sensual fragrance perfect for evening wear.",
    seo_title: "Amber Nights Men Perfume",
    seo_description:
      "Shop Amber Nights perfume for men with warm amber notes.",
    seo_keywords: "amber perfume, men fragrance, night scent",
    user_id: 1,
    status: "published",
    categories: ["Men", "Woody", "Best Sellers", "All"],
  },

    {
    id: 7,
    name: "Floral Whisper Women",
    slug: "floral-whisper-women",
    long_name: "Whisper inspired soft floral",
    size: "100ml",
    price: 349,
    discount_type: "percentage",
    discount_amount: 140,
    discount_percentage: "40%",
    old_price: 489,
    image: "p7.png",
    badge: "New",
    rating: 4,
    reviews: 156,
    page_h1: "Floral Whisper For Women",
    description:
      "Floral Whisper is a delicate and refreshing floral fragrance crafted for everyday elegance.",
    seo_title: "Floral Whisper Women Perfume",
    seo_description:
      "Buy Floral Whisper perfume for women. Soft floral fragrance with long lasting notes.",
    seo_keywords: "floral perfume, women fragrance, soft scent",
    user_id: 1,
    status: "published",
    categories: ["Women", "Floral", "New Arrivals", "All"],
  },

  {
    id: 8,
    name: "Woody Aura Unisex",
    slug: "woody-aura-unisex",
    long_name: "Aura inspired woody notes",
    size: "100ml",
    price: 420,
    discount_type: "amount",
    discount_amount: 170,
    discount_percentage: "40%",
    old_price: 590,
    image: "p8.png",
    badge: "Trending",
    rating: 5,
    reviews: 298,
    page_h1: "Woody Aura Unisex Perfume",
    description:
      "Woody Aura blends deep woody notes into a bold unisex fragrance with luxury appeal.",
    seo_title: "Woody Aura Unisex Perfume",
    seo_description:
      "Explore Woody Aura unisex perfume with deep woody fragrance.",
    seo_keywords: "woody perfume, unisex fragrance, luxury scent",
    user_id: 1,
    status: "published",
    categories: ["Unisex", "Woody", "Luxury", "All"],
  },

  {
    id: 9,
    name: "Fresh Spark Men",
    slug: "fresh-spark-men",
    long_name: "Spark inspired fresh energy",
    size: "100ml",
    price: 299,
    discount_type: "percentage",
    discount_amount: 120,
    discount_percentage: "40%",
    old_price: 419,
    image: "p9.png",
    badge: "Popular",
    rating: 4,
    reviews: 184,
    page_h1: "Fresh Spark For Men",
    description:
      "Fresh Spark is an energetic fragrance with crisp freshness ideal for daily wear.",
    seo_title: "Fresh Spark Men Perfume",
    seo_description:
      "Stay energetic with Fresh Spark perfume for men. Clean and fresh fragrance.",
    seo_keywords: "fresh perfume, men scent, daily fragrance",
    user_id: 1,
    status: "published",
    categories: ["Men", "Fresh", "Best Sellers", "All"],
  },

  {
    id: 10,
    name: "Golden Oud Luxury",
    slug: "golden-oud-luxury",
    long_name: "Oud infused royal fragrance",
    size: "100ml",
    price: 500,
    discount_type: "percentage",
    discount_amount: 250,
    discount_percentage: "50%",
    old_price: 750,
    image: "p1.png",
    badge: "Luxury",
    rating: 5,
    reviews: 210,
    page_h1: "Golden Oud Luxury Perfume",
    description:
      "Golden Oud delivers a rich and royal oud experience crafted for luxury lovers.",
    seo_title: "Golden Oud Luxury Perfume",
    seo_description:
      "Buy Golden Oud luxury perfume with rich oud fragrance and elegance.",
    seo_keywords: "oud perfume, luxury scent, royal fragrance",
    user_id: 1,
    status: "published",
    categories: ["Oud", "Luxury", "Best Sellers", "All"],
  },

  {
    id: 11,
    name: "Velvet Rose Women",
    slug: "velvet-rose-women",
    long_name: "Rose inspired elegant floral",
    size: "100ml",
    price: 379,
    discount_type: "amount",
    discount_amount: 130,
    discount_percentage: "34%",
    old_price: 509,
    image: "p2.png",
    badge: "New",
    rating: 4,
    reviews: 142,
    page_h1: "Velvet Rose For Women",
    description:
      "Velvet Rose is a graceful floral fragrance with soft rose notes and elegance.",
    seo_title: "Velvet Rose Women Perfume",
    seo_description:
      "Shop Velvet Rose floral perfume for women with soft rose fragrance.",
    seo_keywords: "rose perfume, floral scent, women fragrance",
    user_id: 1,
    status: "published",
    categories: ["Women", "Floral", "Gift", "All"],
  },

  {
    id: 12,
    name: "Mystic Woods Unisex",
    slug: "mystic-woods-unisex",
    long_name: "Woods inspired deep aroma",
    size: "100ml",
    price: 460,
    discount_type: "percentage",
    discount_amount: 180,
    discount_percentage: "39%",
    old_price: 640,
    image: "p3.png",
    badge: "Trending",
    rating: 5,
    reviews: 265,
    page_h1: "Mystic Woods Unisex Perfume",
    description:
      "Mystic Woods offers deep woody aromas blended into a luxurious unisex fragrance.",
    seo_title: "Mystic Woods Unisex Perfume",
    seo_description:
      "Experience Mystic Woods perfume with deep woody fragrance notes.",
    seo_keywords: "woody perfume, unisex scent, luxury fragrance",
    user_id: 1,
    status: "published",
    categories: ["Unisex", "Woody", "Luxury", "All"],
  },

  {
    id: 13,
    name: "Ocean Mist Fresh",
    slug: "ocean-mist-fresh",
    long_name: "Mist inspired aquatic freshness",
    size: "100ml",
    price: 320,
    discount_type: "percentage",
    discount_amount: 130,
    discount_percentage: "41%",
    old_price: 450,
    image: "p4.png",
    badge: "New",
    rating: 4,
    reviews: 98,
    page_h1: "Ocean Mist Fresh Perfume",
    description:
      "Ocean Mist delivers a refreshing aquatic fragrance inspired by sea breeze.",
    seo_title: "Ocean Mist Fresh Perfume",
    seo_description:
      "Feel refreshed with Ocean Mist fresh aquatic perfume.",
    seo_keywords: "fresh perfume, aquatic fragrance, ocean scent",
    user_id: 1,
    status: "published",
    categories: ["Fresh", "Unisex", "New Arrivals", "All"],
  },

  {
    id: 14,
    name: "Spice Oud Men",
    slug: "spice-oud-men",
    long_name: "Oud blended spicy notes",
    size: "100ml",
    price: 490,
    discount_type: "amount",
    discount_amount: 190,
    discount_percentage: "39%",
    old_price: 680,
    image: "p5.png",
    badge: "Popular",
    rating: 5,
    reviews: 230,
    page_h1: "Spice Oud For Men",
    description:
      "Spice Oud is a bold fragrance combining rich oud with warm spicy notes.",
    seo_title: "Spice Oud Men Perfume",
    seo_description:
      "Buy Spice Oud perfume for men with bold oud and spice blend.",
    seo_keywords: "oud perfume, spicy fragrance, men scent",
    user_id: 1,
    status: "published",
    categories: ["Men", "Oud", "Luxury", "All"],
  },

  {
    id: 15,
    name: "Pure Bloom Women",
    slug: "pure-bloom-women",
    long_name: "Bloom inspired floral purity",
    size: "100ml",
    price: 299,
    discount_type: "percentage",
    discount_amount: 120,
    discount_percentage: "40%",
    old_price: 419,
    image: "p6.png",
    badge: "Gift",
    rating: 4,
    reviews: 110,
    page_h1: "Pure Bloom For Women",
    description:
      "Pure Bloom is a light and floral fragrance perfect for gifting and daily use.",
    seo_title: "Pure Bloom Women Perfume",
    seo_description:
      "Shop Pure Bloom perfume for women. Light floral fragrance ideal for gifting.",
    seo_keywords: "floral perfume, women gift fragrance",
    user_id: 1,
    status: "published",
    categories: ["Women", "Floral", "Gift", "All"],
  },

  {
    id: 16,
    name: "Dark Amber Men",
    slug: "dark-amber-men",
    long_name: "Amber inspired intense warmth",
    size: "100ml",
    price: 470,
    discount_type: "percentage",
    discount_amount: 190,
    discount_percentage: "40%",
    old_price: 660,
    image: "p7.png",
    badge: "Best",
    rating: 5,
    reviews: 305,
    page_h1: "Dark Amber For Men",
    description:
      "Dark Amber delivers intense warmth and depth designed for confident men.",
    seo_title: "Dark Amber Men Perfume",
    seo_description:
      "Discover Dark Amber perfume for men with warm amber fragrance.",
    seo_keywords: "amber perfume, men fragrance, intense scent",
    user_id: 1,
    status: "published",
    categories: ["Men", "Woody", "Best Sellers", "All"],
  },

  {
    id: 17,
    name: "Soft Musk Unisex",
    slug: "soft-musk-unisex",
    long_name: "Musk inspired smooth comfort",
    size: "100ml",
    price: 360,
    discount_type: "amount",
    discount_amount: 140,
    discount_percentage: "39%",
    old_price: 500,
    image: "p8.png",
    badge: "New",
    rating: 4,
    reviews: 165,
    page_h1: "Soft Musk Unisex Perfume",
    description:
      "Soft Musk is a comforting fragrance with smooth musky notes for all genders.",
    seo_title: "Soft Musk Unisex Perfume",
    seo_description:
      "Experience Soft Musk unisex perfume with smooth musky fragrance.",
    seo_keywords: "musk perfume, unisex fragrance, soft scent",
    user_id: 1,
    status: "published",
    categories: ["Unisex", "Fresh", "Gift", "All"],
  },

  {
    id: 18,
    name: "White Lily Women",
    slug: "white-lily-women",
    long_name: "Lily inspired floral elegance",
    size: "100ml",
    price: 340,
    discount_type: "percentage",
    discount_amount: 135,
    discount_percentage: "40%",
    old_price: 475,
    image: "p9.png",
    badge: "Popular",
    rating: 4,
    reviews: 143,
    page_h1: "White Lily For Women",
    description:
      "White Lily is an elegant floral fragrance crafted with delicate lily notes.",
    seo_title: "White Lily Women Perfume",
    seo_description:
      "Buy White Lily perfume for women with elegant floral fragrance.",
    seo_keywords: "lily perfume, floral scent, women fragrance",
    user_id: 1,
    status: "published",
    categories: ["Women", "Floral", "Best Sellers", "All"],
  },

  {
    id: 19,
    name: "Royal Gift Set",
    slug: "royal-gift-set",
    long_name: "Gift inspired luxury fragrance",
    size: "100ml",
    price: 499,
    discount_type: "percentage",
    discount_amount: 200,
    discount_percentage: "40%",
    old_price: 699,
    image: "p1.png",
    badge: "Gift",
    rating: 5,
    reviews: 190,
    page_h1: "Royal Gift Perfume Set",
    description:
      "Royal Gift Set is a luxury fragrance option perfect for special occasions.",
    seo_title: "Royal Gift Perfume Set",
    seo_description:
      "Shop Royal Gift perfume set. Luxury fragrance ideal for gifting.",
    seo_keywords: "gift perfume, luxury fragrance, special occasion scent",
    user_id: 1,
    status: "published",
    categories: ["Gift", "Luxury", "Best Sellers", "All"],
  },

  {
    id: 20,
    name: "Elite Oud Unisex",
    slug: "elite-oud-unisex",
    long_name: "Oud inspired elite aroma",
    size: "100ml",
    price: 500,
    discount_type: "percentage",
    discount_amount: 250,
    discount_percentage: "50%",
    old_price: 750,
    image: "p2.png",
    badge: "Luxury",
    rating: 5,
    reviews: 260,
    page_h1: "Elite Oud Unisex Perfume",
    description:
      "Elite Oud is a premium unisex fragrance crafted for lovers of deep oud notes.",
    seo_title: "Elite Oud Unisex Perfume",
    seo_description:
      "Discover Elite Oud perfume. Premium unisex fragrance with rich oud aroma.",
    seo_keywords: "oud perfume, unisex luxury fragrance",
    user_id: 1,
    status: "published",
    categories: ["Oud", "Unisex", "Luxury", "All"],
  },
];

export { Products };      