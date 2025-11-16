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

-- Roles table (Simplified RBAC with menu-based permissions)
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `menu_access` JSON DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `idx_name` (`name`),
  KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User Roles junction table
CREATE TABLE IF NOT EXISTS `user_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  `assigned_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `assigned_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_role` (`user_id`, `role_id`),
  KEY `idx_user_roles_user_id` (`user_id`),
  KEY `idx_user_roles_role_id` (`role_id`),
  CONSTRAINT `fk_user_roles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_roles_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_roles_assigned_by` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- INITIAL DATA
-- ============================================================================

-- Insert admin user (password: Admin@Eazy - bcrypt hash)
INSERT IGNORE INTO `users` 
  (`id`, `email`, `password_hash`, `full_name`, `role`, `is_active`, `created_at`) 
VALUES 
  (1, 'admin@eazycyber.sa', '$2b$10$jIIkPRZCPWjyRTejeg9bdOMx6glrnXIUDskQmMlHNBu7rmYNOGKou', 'Admin User', 'admin', 1, NOW());

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

-- Insert default roles (Simplified RBAC with menu-based permissions)
INSERT INTO `roles` (`name`, `description`, `menu_access`, `is_active`)
VALUES
  ('admin', 'Administrator - Full access to all features',
   JSON_OBJECT(
     'dashboard', true,
     'blog', true,
     'consultations', true,
     'users', true,
     'roles', true
   ),
   true),
  ('moderator', 'Content Moderator - Manage blog and consultations',
   JSON_OBJECT(
     'dashboard', true,
     'blog', true,
     'consultations', true,
     'users', false,
     'roles', false
   ),
   true)
ON DUPLICATE KEY UPDATE
  `description` = VALUES(`description`),
  `menu_access` = VALUES(`menu_access`),
  `is_active` = VALUES(`is_active`);

-- ============================================================================
-- Commit message for migrations
-- ============================================================================
-- Migration: complete-database-setup
-- Description: Initialize complete database schema with all tables and initial data
-- Author: Eazy Cybersecurity Team
-- Date: 2025-11-11
