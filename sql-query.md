-- Ecommerce Tables(Only For Single Country) --
- Users Table : 
     - id, full_name, email, phone_no, is_email_verified, is_phone_verified, account_status(disabled, enabled), created_at, updated_at
- Users Address :
    - user_id, address_line,  state, city, pincode, country, address_type, is_default, created_at, updated_at
- When User Create the Order with Login
    - Order data will be static...




orders : CREATE TABLE `orders` (
 `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
 `order_number` varchar(50) NOT NULL,
 `user_id` bigint(20) unsigned NOT NULL,
 `order_status` varchar(50) NOT NULL,
 `coupon_discount_percentage` varchar(50) NOT NULL,
 `discount_amount_percentage` varchar(50) NOT NULL,
 `product_amount` decimal(10,2) NOT NULL COMMENT 'GST inclusive product total [new price]',
 `shipping_amount` decimal(10,2) DEFAULT 0.00,
 `coupon_discount_amount` decimal(10,2) DEFAULT 0.00,
 `grand_total_amount` decimal(10,2) NOT NULL COMMENT 'product_amount+shipping_amount-(coupon_discount_amount)',
 `created_at` timestamp NULL DEFAULT current_timestamp(),
 `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
 PRIMARY KEY (`id`),
 UNIQUE KEY `order_number` (`order_number`),
 KEY `idx_orders_user_id` (`user_id`),
 KEY `idx_orders_status` (`order_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
order_addresses	CREATE TABLE `order_addresses` (
 `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
 `order_id` bigint(20) unsigned NOT NULL,
 `full_name` varchar(150) NOT NULL,
 `phone_no` varchar(20) NOT NULL,
 `email` varchar(150) DEFAULT NULL,
 `full_address` text NOT NULL,
 `pincode` varchar(10) NOT NULL,
 `country` varchar(100) DEFAULT 'India',
 `created_at` timestamp NULL DEFAULT current_timestamp(),
 `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
 PRIMARY KEY (`id`),
 KEY `idx_order_addresses_order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
order_items	CREATE TABLE `order_items` (
 `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
 `order_id` bigint(20) unsigned NOT NULL,
 `product_id` bigint(20) unsigned NOT NULL,
 `product_name` varchar(255) NOT NULL,
 `product_title` varchar(255) DEFAULT NULL,
 `product_size` varchar(50) DEFAULT NULL,
 `product_image` varchar(255) DEFAULT NULL,
 `coupon_amount` decimal(10,2) NOT NULL,
 `coupon_percentage` varchar(50) DEFAULT NULL,
 `unit_price` decimal(10,2) NOT NULL COMMENT 'GST included unit price',
 `quantity` int(11) NOT NULL DEFAULT 1,
 `line_total_amount` decimal(10,2) NOT NULL COMMENT '(unit_price * quantity) ',
 `created_at` timestamp NULL DEFAULT current_timestamp(),
 `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
 PRIMARY KEY (`id`),
 KEY `idx_order_items_order_id` (`order_id`),
 KEY `idx_order_items_product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
order_logs	CREATE TABLE `order_logs` (
 `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
 `order_id` bigint(20) unsigned NOT NULL,
 `status` varchar(50) NOT NULL,
 `message` text DEFAULT NULL,
 `created_at` timestamp NULL DEFAULT current_timestamp(),
 PRIMARY KEY (`id`),
 KEY `idx_order_logs_order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
order_payments	CREATE TABLE `order_payments` (
 `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
 `order_id` bigint(20) unsigned NOT NULL,
 `transaction_id` varchar(100) DEFAULT NULL,
 `payment_method` varchar(50) NOT NULL COMMENT 'upi, card, cod, wallet',
 `payment_status` enum('pending','paid','failed','refunded') DEFAULT 'pending',
 `paid_amount` decimal(10,2) NOT NULL,
 `currency` varchar(10) DEFAULT 'INR',
 `gateway_response` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gateway_response`)),
 `created_at` timestamp NULL DEFAULT current_timestamp(),
 `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
 PRIMARY KEY (`id`),
 KEY `idx_order_payments_order_id` (`order_id`),
 KEY `idx_order_payments_transaction_id` (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
order_tracking	CREATE TABLE `order_tracking` (
 `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
 `order_id` bigint(20) unsigned NOT NULL,
 `status` varchar(50) NOT NULL,
 `location` varchar(255) DEFAULT NULL,
 `remark` text DEFAULT NULL,
 `datetime` datetime NOT NULL,
 `created_at` timestamp NULL DEFAULT current_timestamp(),
 PRIMARY KEY (`id`),
 KEY `idx_order_tracking_order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci