-- Sample Consultations Data (الاستشارات)
-- Insert sample consultation requests in both Arabic and English

INSERT INTO consultations (name, email, phone, company, service_type, message, status, priority, created_at) VALUES

-- Sample 1: High priority urgent consultation (Arabic)
(
  'أحمد محمد السعيد',
  'ahmed.alsaeed@techcorp.sa',
  '+966501234567',
  'شركة التقنية المتقدمة',
  'استشارات الأمن السيبراني',
  'نحتاج إلى استشارة عاجلة بخصوص تعزيز الأمن السيبراني لشبكتنا المؤسسية. لاحظنا محاولات اختراق متكررة ونرغب في تقييم شامل للثغرات الأمنية وتطبيق حلول حماية متقدمة. لدينا أكثر من 200 جهاز متصل بالشبكة ونحتاج إلى حل شامل يشمل جدار الحماية وأنظمة كشف التسلل.',
  'new',
  'urgent',
  DATE_SUB(NOW(), INTERVAL 2 HOUR)
),

-- Sample 2: Medium priority AI consultation (Arabic)
(
  'فاطمة عبدالله القحطاني',
  'fatima.q@innovate.sa',
  '+966502345678',
  'مؤسسة الابتكار الرقمي',
  'استشارات الذكاء الاصطناعي',
  'نرغب في الحصول على استشارة حول دمج تقنيات الذكاء الاصطناعي في عملياتنا التشغيلية. نحن شركة متوسطة الحجم تعمل في قطاع التجزئة ونود استخدام الذكاء الاصطناعي لتحسين تجربة العملاء وتحليل البيانات التسويقية. هل يمكنكم تقديم استشارة حول الحلول المناسبة والتكاليف المتوقعة؟',
  'new',
  'medium',
  DATE_SUB(NOW(), INTERVAL 5 HOUR)
),

-- Sample 3: High priority cloud transformation (Arabic)
(
  'خالد سعود العتيبي',
  'khalid.otaibi@finance.sa',
  '+966503456789',
  'المجموعة المالية السعودية',
  'التحول الرقمي والحوسبة السحابية',
  'نحن بحاجة ماسة إلى استشارة متخصصة في التحول الرقمي ونقل بنيتنا التحتية إلى السحابة. لدينا أنظمة تقليدية قديمة ونرغب في التحديث مع الحفاظ على الامتثال للمعايير المصرفية والأمنية. نحتاج إلى خارطة طريق واضحة وتقدير للتكاليف والوقت اللازم للتنفيذ.',
  'in_progress',
  'high',
  DATE_SUB(NOW(), INTERVAL 1 DAY)
),

-- Sample 4: Low priority general inquiry (Arabic)
(
  'سارة إبراهيم الدوسري',
  'sarah.d@startup.sa',
  '+966504567890',
  'شركة البداية الذكية',
  'استشارات عامة',
  'نحن شركة ناشئة في مجال التجارة الإلكترونية ونود التعرف على خدماتكم بشكل عام. هل يمكنكم إرسال معلومات عن الحزم الاستشارية المتاحة للشركات الصغيرة والمتوسطة؟ نحن مهتمون بشكل خاص بحلول الأمن السيبراني وتحسين الأداء الرقمي.',
  'new',
  'low',
  DATE_SUB(NOW(), INTERVAL 2 DAY)
),

-- Sample 5: High priority Vision 2030 consultation (Arabic)
(
  'محمد عبدالعزيز النمر',
  'mohammed.alnamr@gov.sa',
  '+966505678901',
  'هيئة حكومية',
  'مبادرات رؤية 2030',
  'نحن جهة حكومية نعمل على مشروع كبير ضمن مبادرات رؤية 2030 للتحول الرقمي. نحتاج إلى استشارة شاملة حول بناء منصة رقمية متكاملة لخدمة المواطنين مع التركيز على الأمن السيبراني والامتثال للمعايير الحكومية. المشروع استراتيجي وله جدول زمني محدد.',
  'new',
  'high',
  DATE_SUB(NOW(), INTERVAL 3 HOUR)
),

-- Sample 6: Medium priority data analytics (Arabic)
(
  'نورة حمد العنزي',
  'noura.anzi@healthcare.sa',
  '+966506789012',
  'مستشفى النور الطبي',
  'تحليل البيانات والذكاء الاصطناعي',
  'نرغب في استشارة حول استخدام تحليل البيانات والذكاء الاصطناعي في القطاع الصحي. لدينا كميات كبيرة من البيانات الطبية ونرغب في استخدامها لتحسين جودة الخدمات وتقليل وقت الانتظار. نحتاج إلى حلول تتوافق مع معايير خصوصية البيانات الصحية.',
  'completed',
  'medium',
  DATE_SUB(NOW(), INTERVAL 7 DAY)
),

-- Sample 7: Urgent enterprise system (Arabic)
(
  'عبدالله راشد المطيري',
  'abdullah.m@industrial.sa',
  '+966507890123',
  'المجموعة الصناعية المتحدة',
  'أنظمة المؤسسات وERP',
  'لدينا حاجة عاجلة لتطوير نظام إدارة موارد مؤسسية (ERP) مخصص يلبي احتياجاتنا الصناعية الخاصة. نحن نعمل في قطاع التصنيع مع عدة مصانع ومستودعات. نحتاج إلى نظام يربط جميع العمليات من المشتريات إلى الإنتاج والمبيعات مع تكامل كامل مع أنظمتنا الحالية.',
  'in_progress',
  'urgent',
  DATE_SUB(NOW(), INTERVAL 4 HOUR)
),

-- Sample 8: Medium priority cybersecurity training (Arabic)
(
  'ريم سليمان الشمري',
  'reem.shamri@education.sa',
  '+966508901234',
  'جامعة المستقبل',
  'التدريب والتوعية الأمنية',
  'نود الحصول على استشارة حول برامج التدريب والتوعية في مجال الأمن السيبراني لمنسوبي الجامعة. نبحث عن برنامج تدريبي شامل يغطي أفضل الممارسات الأمنية والتعامل مع التهديدات الإلكترونية. عدد المستفيدين المتوقع حوالي 500 موظف وأستاذ جامعي.',
  'new',
  'medium',
  DATE_SUB(NOW(), INTERVAL 6 HOUR)
),

-- Sample 9: English consultation sample
(
  'John Smith',
  'john.smith@globaltech.com',
  '+966509012345',
  'Global Tech Solutions',
  'Cloud Migration & Infrastructure',
  'We are an international company operating in Saudi Arabia and need consultation on migrating our legacy systems to the cloud. We want to ensure compliance with local regulations while maintaining global standards. Our infrastructure includes multiple data centers and we need a phased migration approach with minimal downtime.',
  'new',
  'high',
  DATE_SUB(NOW(), INTERVAL 8 HOUR)
),

-- Sample 10: Mixed Arabic/English consultation
(
  'لينا أحمد الغامدي',
  'lina.alghamdi@retail.sa',
  '+966500123456',
  'سلسلة متاجر النخبة',
  'E-commerce & Digital Marketing',
  'نحتاج إلى استشارة حول تطوير منصة تجارة إلكترونية متقدمة لسلسلة متاجرنا. نرغب في دمج تقنيات الذكاء الاصطناعي للتوصيات الشخصية وتحليل سلوك العملاء. We also need integration with our existing POS systems and inventory management. نبحث عن حل شامل يدعم اللغتين العربية والإنجليزية.',
  'new',
  'medium',
  DATE_SUB(NOW(), INTERVAL 12 HOUR)
),

-- Sample 11: Cancelled consultation (Arabic)
(
  'طارق فهد الزهراني',
  'tareq.zahrani@company.sa',
  '+966501234500',
  'شركة الأعمال المتطورة',
  'استشارات تطوير البرمجيات',
  'كنا نبحث عن استشارة حول تطوير تطبيق جوال للخدمات اللوجستية، ولكن قررنا تأجيل المشروع لظروف خاصة.',
  'cancelled',
  'low',
  DATE_SUB(NOW(), INTERVAL 5 DAY)
),

-- Sample 12: Completed consultation (Arabic)
(
  'منى علي الشهري',
  'mona.shehri@tech.sa',
  '+966502345600',
  'شركة التقنية الذكية',
  'استشارات أمن المعلومات',
  'تم التواصل معنا للحصول على استشارة حول تحسين بنية الأمن السيبراني لشركتنا. تم تقديم الاستشارة بشكل ممتاز وحصلنا على خطة عمل واضحة ومفصلة. شكراً لكم على الاحترافية والخدمة المتميزة.',
  'completed',
  'high',
  DATE_SUB(NOW(), INTERVAL 10 DAY)
);

-- Update some consultations to show activity
UPDATE consultations SET updated_at = NOW() WHERE status = 'in_progress';
