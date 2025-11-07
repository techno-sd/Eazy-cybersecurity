# Sample Consultations Data (بيانات الاستشارات النموذجية)

This directory contains sample consultation data for testing and demonstrating the admin panel functionality.

## Files

- **[database/sample-consultations.sql](database/sample-consultations.sql)** - SQL file with 12 sample consultation records
- **[insert-sample-consultations.js](insert-sample-consultations.js)** - Node.js script to insert the sample data

## Sample Data Overview

### Total Records: 12 consultations

### Status Distribution:
- **New (جديد)**: 7 consultations
- **In Progress (قيد التنفيذ)**: 2 consultations
- **Completed (مكتمل)**: 2 consultations
- **Cancelled (ملغي)**: 1 consultation

### Priority Distribution:
- **Urgent (عاجل)**: 2 consultations
- **High (عالي)**: 3 consultations
- **Medium (متوسط)**: 5 consultations
- **Low (منخفض)**: 2 consultations

### Service Types Covered:
1. **استشارات الأمن السيبراني** - Cybersecurity Consultations
2. **استشارات الذكاء الاصطناعي** - AI Consultations
3. **التحول الرقمي والحوسبة السحابية** - Digital Transformation & Cloud Computing
4. **مبادرات رؤية 2030** - Vision 2030 Initiatives
5. **تحليل البيانات والذكاء الاصطناعي** - Data Analytics & AI
6. **أنظمة المؤسسات وERP** - Enterprise Systems & ERP
7. **التدريب والتوعية الأمنية** - Security Training & Awareness
8. **E-commerce & Digital Marketing** - التجارة الإلكترونية والتسويق الرقمي

## Sample Consultation Examples

### Example 1: High Priority Cybersecurity (Urgent)
```
Name: أحمد محمد السعيد
Company: شركة التقنية المتقدمة
Service: استشارات الأمن السيبراني
Priority: Urgent
Status: New
Message: نحتاج إلى استشارة عاجلة بخصوص تعزيز الأمن السيبراني لشبكتنا المؤسسية...
```

### Example 2: AI Integration Consultation
```
Name: فاطمة عبدالله القحطاني
Company: مؤسسة الابتكار الرقمي
Service: استشارات الذكاء الاصطناعي
Priority: Medium
Status: New
Message: نرغب في الحصول على استشارة حول دمج تقنيات الذكاء الاصطناعي...
```

### Example 3: Vision 2030 Government Project
```
Name: محمد عبدالعزيز النمر
Company: هيئة حكومية
Service: مبادرات رؤية 2030
Priority: High
Status: New
Message: نحن جهة حكومية نعمل على مشروع كبير ضمن مبادرات رؤية 2030...
```

## Installation & Usage

### Method 1: Using Node.js Script (Recommended)

```bash
# Install dependencies if not already installed
npm install mysql2

# Run the insertion script
node insert-sample-consultations.js
```

### Method 2: Using MySQL Client

```bash
# Connect to your MySQL database
mysql -h mysql-31dd36a-eazy-db.i.aivencloud.com -P 14507 -u avnadmin -p eazyDb

# Run the SQL file
source database/sample-consultations.sql;
```

### Method 3: Direct SQL Import

```sql
-- Copy and paste the contents of database/sample-consultations.sql
-- into your MySQL client or phpMyAdmin
```

## Features Demonstrated

### 1. Bilingual Support
- Arabic names, companies, and messages
- English names and messages
- Mixed Arabic/English content

### 2. Realistic Scenarios
- Government projects (Vision 2030)
- Healthcare institutions
- Financial services
- Retail and e-commerce
- Educational institutions
- Industrial companies
- Startups

### 3. Complete Workflow
- New consultation requests
- In-progress consultations with ongoing work
- Completed consultations with positive feedback
- Cancelled consultations for various reasons

### 4. Time-based Data
- Consultations from different times (2 hours to 10 days ago)
- Shows realistic progression of consultation lifecycle

## Viewing the Data

After inserting the sample data, you can view it in:

1. **Admin Panel Dashboard**
   ```
   http://localhost:3000/admin
   ```

2. **Consultations List**
   ```
   http://localhost:3000/admin/consultations
   ```

3. **API Endpoint**
   ```bash
   curl http://localhost:3000/api/admin/consultations
   ```

## Testing Scenarios

Use these sample consultations to test:

1. **Filtering**
   - Filter by status (new, in_progress, completed, cancelled)
   - Filter by priority (low, medium, high, urgent)

2. **Search Functionality**
   - Search by name (e.g., "أحمد", "فاطمة")
   - Search by company (e.g., "شركة التقنية")
   - Search by email or phone

3. **Sorting**
   - Sort by date (newest/oldest)
   - Sort by priority level
   - Sort by status

4. **Statistics**
   - View total consultations count
   - Count by status
   - Count by priority

5. **Bilingual Display**
   - Toggle between Arabic and English in admin panel
   - Check proper RTL/LTR text direction
   - Verify font rendering (Cairo font for Arabic)

## Data Characteristics

### Contact Information
- Saudi phone numbers format: +966XXXXXXXXX
- Saudi email domains: .sa TLD
- Professional company emails

### Messages
- Detailed consultation requests
- Specific technical requirements
- Business context and company size
- Timeline expectations
- Budget considerations

### Arabic Text Quality
- Professional business Arabic
- Technical terminology in Arabic
- Natural conversation style
- Proper grammar and spelling

## Cleanup

To remove the sample data:

```sql
-- Delete all sample consultations
DELETE FROM consultations WHERE created_at >= DATE_SUB(NOW(), INTERVAL 11 DAY);

-- Or delete specific ones by ID
DELETE FROM consultations WHERE id BETWEEN 1 AND 12;

-- Or truncate the entire table (use with caution)
TRUNCATE TABLE consultations;
```

## Notes

- The sample data uses `DATE_SUB(NOW(), ...)` to create realistic timestamps relative to the current time
- Some consultations are marked as "in_progress" or "completed" to show different workflow stages
- Phone numbers and emails are fictional and for demonstration only
- Company names are generic and don't refer to real companies

## Support

If you encounter any issues:
1. Ensure the `consultations` table exists (run `migrate-admin-tables.js` first)
2. Check database connection settings
3. Verify you have INSERT permissions on the database
4. Check for character encoding issues (should be utf8mb4)

## License

Sample data for development and testing purposes only.
