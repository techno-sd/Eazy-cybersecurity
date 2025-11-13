-- ============================================================================
-- Eazy Cybersecurity - Complete Database Migration
-- ============================================================================
-- This file contains the complete database schema and initial data setup
-- for the Eazy Cybersecurity application.
--
-- Usage:
--   mysql -h HOST -u USER -p DATABASE < complete-migration.sql
-- ============================================================================

-- Create database if it doesn't exist
-- CREATE DATABASE IF NOT EXISTS defaultdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE defaultdb;

-- ============================================================================
-- TABLES
-- ============================================================================

-- Users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci,
  `role` enum('user','admin','moderator') COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `is_active` tinyint(1) DEFAULT 1,
  `failed_login_attempts` int DEFAULT 0,
  `last_failed_login` timestamp NULL,
  `locked_until` timestamp NULL,
  `last_login` timestamp NULL,
  `last_login_ip` varchar(45) COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Blog categories table
CREATE TABLE IF NOT EXISTS `blog_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ar` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `description_ar` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Blog posts table
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_ar` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `excerpt_ar` text COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_ar` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `featured_image` varchar(500) COLLATE utf8mb4_unicode_ci,
  `author_id` int NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci,
  `tags` JSON,
  `status` enum('draft','published','archived') COLLATE utf8mb4_unicode_ci DEFAULT 'draft',
  `views` int DEFAULT 0,
  `published_at` timestamp NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_slug` (`slug`),
  KEY `idx_status` (`status`),
  KEY `idx_author_id` (`author_id`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `fk_blog_posts_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact submissions table
CREATE TABLE IF NOT EXISTS `contact_submissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci,
  `subject` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('new','read','responded','archived') COLLATE utf8mb4_unicode_ci DEFAULT 'new',
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Consultations table
CREATE TABLE IF NOT EXISTS `consultations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_person` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_type` varchar(100) COLLATE utf8mb4_unicode_ci,
  `budget` varchar(50) COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `preferred_date` date,
  `status` enum('pending','scheduled','completed','cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Activity logs table
CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `action` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_type` varchar(50) COLLATE utf8mb4_unicode_ci,
  `entity_id` int,
  `description` text COLLATE utf8mb4_unicode_ci,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_action` (`action`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_entity` (`entity_type`, `entity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Website settings table
CREATE TABLE IF NOT EXISTS `website_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `setting_value` text COLLATE utf8mb4_unicode_ci,
  `setting_type` enum('text','textarea','boolean','number') COLLATE utf8mb4_unicode_ci DEFAULT 'text',
  `description` varchar(500) COLLATE utf8mb4_unicode_ci,
  `updated_by` int,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- INITIAL DATA
-- ============================================================================

-- Insert admin user (password: Admin@Eazy - bcrypt hash)
INSERT IGNORE INTO `users` 
  (`id`, `email`, `password_hash`, `full_name`, `role`, `is_active`, `created_at`) 
VALUES 
  (1, 'admin@eazycyber.sa', '$2b$10$MaFMBVdgHLwdAZ1d9LHOIeH7.P3YGwZ2Gv3zN2Pq0K9LmF9Z2Vq0G', 'Admin User', 'admin', 1, NOW());

-- Insert blog categories
INSERT IGNORE INTO `blog_categories` 
  (`id`, `name`, `name_ar`, `slug`, `description`, `description_ar`) 
VALUES 
  (1, 'Security', 'الأمن', 'security', 'Cybersecurity articles and tips', 'مقالات ونصائح الأمن السيبراني'),
  (2, 'Threats', 'التهديدات', 'threats', 'Information about cyber threats', 'معلومات حول التهديدات السيبرانية'),
  (3, 'Solutions', 'الحلول', 'solutions', 'Eazy solutions and services', 'حلول وخدمات Eazy'),
  (4, 'Updates', 'التحديثات', 'updates', 'Latest updates and news', 'أحدث التحديثات والأخبار');

-- Insert sample blog posts
INSERT IGNORE INTO `blog_posts` 
  (`id`, `title`, `title_ar`, `slug`, `excerpt`, `excerpt_ar`, `content`, `content_ar`, 
   `featured_image`, `author_id`, `category`, `tags`, `status`, `views`, `published_at`, `created_at`) 
VALUES 
  (1, 'Getting Started with Cybersecurity', 'البدء مع الأمن السيبراني', 'getting-started-cybersecurity',
   'Learn the fundamentals of cybersecurity and how to protect your digital assets.',
   'تعلم أساسيات الأمن السيبراني وكيفية حماية أصولك الرقمية.',
   'Cybersecurity is the practice of protecting computer systems and networks from digital attacks. In this comprehensive guide, we will explore the key concepts and best practices for securing your digital assets.',
   'الأمن السيبراني هو ممارسة حماية أنظمة وشبكات الكمبيوتر من الهجمات الرقمية. في هذا الدليل الشامل، سنستكشف المفاهيم الرئيسية وأفضل الممارسات لتأمين أصولك الرقمية.',
   '/img/blog/blog1.jpg', 1, 'Security', JSON_ARRAY('cybersecurity', 'security', 'protection'), 'published', 0, NOW(), NOW()),
  
  (2, 'Password Security Best Practices', 'أفضل ممارسات أمان كلمات المرور', 'password-security-best-practices',
   'Discover how to create and manage strong passwords to keep your accounts secure.',
   'اكتشف كيفية إنشاء وإدارة كلمات مرور قوية لإبقاء حساباتك آمنة.',
   'A strong password is your first line of defense against unauthorized access. Learn how to create memorable yet secure passwords that resist common attack methods.',
   'كلمة المرور القوية هي خط الدفاع الأول ضد الوصول غير المصرح به. تعلم كيفية إنشاء كلمات مرور يسهل تذكرها وآمنة تقاوم طرق الهجوم الشائعة.',
   '/img/blog/blog2.jpg', 1, 'Security', JSON_ARRAY('password', 'security', 'protection'), 'published', 0, NOW(), NOW()),
  
  (3, 'Understanding Phishing Attacks', 'فهم هجمات التصيد الاحتيالي', 'understanding-phishing-attacks',
   'Learn to identify and protect yourself from phishing scams.',
   'تعلم كيفية تحديد والحماية من عمليات الاحتيال بالتصيد الاحتيالي.',
   'Phishing attacks are one of the most common cyber threats. This guide will help you understand how phishing works and how to protect yourself and your organization.',
   'هجمات التصيد الاحتيالي هي واحدة من أكثر التهديدات السيبرانية شيوعًا. سيساعدك هذا الدليل على فهم كيفية عمل التصيد الاحتيالي وكيفية حماية نفسك ومنظمتك.',
   '/img/blog/blog3.jpg', 1, 'Threats', JSON_ARRAY('phishing', 'threats', 'security'), 'published', 0, NOW(), NOW());

-- Insert default website settings
INSERT IGNORE INTO `website_settings` 
  (`setting_key`, `setting_value`, `setting_type`, `description`) 
VALUES 
  ('site_name', 'Eazy Cybersecurity', 'text', 'Website name'),
  ('site_email', 'info@eazycyber.sa', 'text', 'Contact email address'),
  ('site_phone', '+966-12-345-6789', 'text', 'Contact phone number'),
  ('site_address', 'Riyadh, Saudi Arabia', 'text', 'Business address'),
  ('maintenance_mode', '0', 'boolean', 'Enable/disable maintenance mode'),
  ('blog_posts_per_page', '12', 'number', 'Number of blog posts per page');

-- ============================================================================
-- Commit message for migrations
-- ============================================================================
-- Migration: complete-database-setup
-- Description: Initialize complete database schema with all tables and initial data
-- Author: Eazy Cybersecurity Team
-- Date: 2025-11-11
