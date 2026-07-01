-- CreateTable
CREATE TABLE `bbps_payment` (
    `payment_id` VARCHAR(191) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `actual_payment_amount` DECIMAL(18, 2) NOT NULL,
    `bbps_payment_status` ENUM('INIT', 'CANCEL', 'PAYING', 'PAID', 'PAYMENT_FAILURE') NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `version` INTEGER NOT NULL DEFAULT 0,

    INDEX `idx_order_id`(`order_id`),
    PRIMARY KEY (`payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bbps_recharge` (
    `recharge_id` VARCHAR(191) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `recharge_info` TEXT NULL,
    `bbps_recharge_status` ENUM('INIT', 'RECHARGING', 'RECHARGED_FAILURE', 'RECHARGED') NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `version` INTEGER NOT NULL DEFAULT 0,

    INDEX `idx_order_id`(`order_id`),
    PRIMARY KEY (`recharge_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bbps_refund` (
    `refund_id` VARCHAR(191) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `transaction_amount` DECIMAL(18, 2) NOT NULL,
    `refund_amount` DECIMAL(18, 2) NOT NULL,
    `bbps_refund_status` ENUM('INIT', 'PROCESSING', 'SUCCESS', 'FAILURE') NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `version` INTEGER NOT NULL DEFAULT 0,

    INDEX `idx_order_id`(`order_id`),
    PRIMARY KEY (`refund_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `idx_order_id` ON `bbps_order`(`order_id`);
