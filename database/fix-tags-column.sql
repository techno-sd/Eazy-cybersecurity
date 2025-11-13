-- ============================================================================
-- Fix blog_posts tags column type mismatch
-- ============================================================================
-- This migration changes the tags column from VARCHAR(500) to JSON
-- to match the Prisma schema definition
-- ============================================================================

-- Step 1: Add a temporary column for JSON data
ALTER TABLE `blog_posts`
ADD COLUMN `tags_json` JSON NULL AFTER `tags`;

-- Step 2: Copy valid JSON data from tags to tags_json
-- MySQL will validate the JSON during this operation
UPDATE `blog_posts`
SET `tags_json` = CASE
  WHEN `tags` IS NULL THEN NULL
  WHEN `tags` = '' THEN NULL
  ELSE `tags`
END
WHERE `tags` IS NOT NULL;

-- Step 3: Drop the old VARCHAR column
ALTER TABLE `blog_posts`
DROP COLUMN `tags`;

-- Step 4: Rename the new JSON column to tags
ALTER TABLE `blog_posts`
CHANGE COLUMN `tags_json` `tags` JSON NULL;

-- Step 5: Verify the change
DESCRIBE `blog_posts`;

-- ============================================================================
-- To apply this migration:
-- mysql -h HOST -u USER -p DATABASE < fix-tags-column.sql
-- ============================================================================
