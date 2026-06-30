-- CreateTable
CREATE TABLE `bbps_order` (
    `order_id` VARCHAR(191) NOT NULL,
    `user_gid` VARCHAR(191) NOT NULL,
    `ref_id` VARCHAR(191) NOT NULL,
    `bill_amount` DECIMAL(18, 2) NOT NULL,
    `actual_payment_amount` DECIMAL(18, 2) NOT NULL,
    `bbps_order_status` ENUM('INIT', 'RECHARGING', 'RECHARGED_FAILURE', 'RECHARGED', 'PAYING', 'PAYMENT_FAILURE', 'PAID') NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `version` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `bbps_order_ref_id_key`(`ref_id`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
