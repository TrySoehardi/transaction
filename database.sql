CREATE TABLE `account` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL, 
  `account_name` varchar(255) DEFAULT NULL,
  `account_type` int DEFAULT NULL,
  `balance` int DEFAULT NULL,
  `opening_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
)

-- ///////////
CREATE TABLE `transaction` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `account_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `service_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `transaction_type` varchar(255) NOT NULL,
  `total_amount` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) 

CREATE TABLE `payment` (
  `id` INT(10) AUTO_INCREMENT PRIMARY KEY,
  `code` varchar(10) NOT NULL,
  `description` varchar(255) DEFAULT NULL )

-- ///////


CREATE TABLE `service` (
    `id` INT(10) AUTO_INCREMENT PRIMARY KEY,
    `service_code` varchar(255) DEFAULT NULL,
    `service_name` varchar(255) DEFAULT NULL,
    `service_icon` varchar(255) DEFAULT NULL,
    `service_tariff` int DEFAULT NULL,
    `created_at` datetime NOT NULL,
  	`updated_at` datetime DEFAULT NULL
)









