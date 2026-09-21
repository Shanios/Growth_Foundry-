CREATE TABLE `admin_users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(120) NOT NULL,
  `email` VARCHAR(191) NULL,
  `passwordHash` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  UNIQUE INDEX `admin_users_username_key`(`username`),
  UNIQUE INDEX `admin_users_email_key`(`email`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `case_studies` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `body` LONGTEXT NOT NULL,
  `featuredImage` TEXT NULL,
  `sector` VARCHAR(120) NOT NULL DEFAULT 'General',
  `outcome` VARCHAR(255) NULL,
  `published` BOOLEAN NOT NULL DEFAULT false,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  UNIQUE INDEX `case_studies_slug_key`(`slug`),
  INDEX `case_studies_published_createdAt_idx`(`published`, `createdAt`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `blog_posts` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `body` LONGTEXT NOT NULL,
  `coverImage` TEXT NULL,
  `author` VARCHAR(120) NOT NULL DEFAULT 'Growth Foundry',
  `published` BOOLEAN NOT NULL DEFAULT false,
  `publishedAt` DATETIME(3) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  UNIQUE INDEX `blog_posts_slug_key`(`slug`),
  INDEX `blog_posts_published_publishedAt_idx`(`published`, `publishedAt`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `contact_inquiries` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(160) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `company` VARCHAR(191) NULL,
  `topic` VARCHAR(191) NULL,
  `message` TEXT NOT NULL,
  `status` VARCHAR(40) NOT NULL DEFAULT 'new',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX `contact_inquiries_status_createdAt_idx`(`status`, `createdAt`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
