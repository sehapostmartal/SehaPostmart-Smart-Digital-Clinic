-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table  
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    ingredients TEXT[],
    benefits TEXT[],
    usage TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    author TEXT NOT NULL,
    featured TEXT DEFAULT 'false',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create consultations table
CREATE TABLE IF NOT EXISTS consultations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    age TEXT,
    symptoms TEXT NOT NULL,
    medical_history TEXT,
    current_medications TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create memberships table
CREATE TABLE IF NOT EXISTS memberships (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    membership_type TEXT NOT NULL CHECK (membership_type IN ('silver', 'gold', 'platinum')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample products
INSERT INTO products (id, name, description, price, image, category, ingredients, benefits, usage) VALUES
('1', 'فطر الريشي', 'فطر الريشي الطبيعي المعروف بخصائصه المقوية للمناعة والمهدئة للأعصاب. يساعد في تحسين جودة النوم وتقليل التوتر.', 29.99, 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3', 'مكملات غذائية', ARRAY['فطر الريشي المجفف'], ARRAY['تقوية المناعة', 'تحسين النوم', 'تقليل التوتر'], 'كبسولة واحدة يومياً مع الماء'),
('2', 'فطر عرف الأسد', 'فطر عرف الأسد الطبيعي المفيد لصحة الدماغ والجهاز العصبي. يساعد في تحسين الذاكرة والتركيز.', 34.99, 'https://images.unsplash.com/photo-1586281980024-9b4e7f8d4d8e?ixlib=rb-4.0.3', 'مكملات غذائية', ARRAY['فطر عرف الأسد العضوي'], ARRAY['تحسين الذاكرة', 'زيادة التركيز', 'دعم صحة الدماغ'], 'كبسولتان يومياً مع الطعام'),
('3', 'سبيرولينا', 'سبيرولينا عضوية غنية بالبروتين والفيتامينات والمعادن. مصدر ممتاز للطاقة الطبيعية.', 24.99, 'https://images.unsplash.com/photo-1569896358442-5ca5c4c2e77a?ixlib=rb-4.0.3', 'مكملات غذائية', ARRAY['سبيرولينا عضوية 100%'], ARRAY['زيادة الطاقة', 'تحسين الهضم', 'مضاد للأكسدة'], 'ملعقة صغيرة يومياً مع العصير'),
('4', 'شاي أخضر عضوي', 'شاي أخضر عضوي عالي الجودة غني بمضادات الأكسدة. يساعد في تحسين الأيض وحرق الدهون.', 19.99, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3', 'مشروبات صحية', ARRAY['أوراق الشاي الأخضر العضوية'], ARRAY['مضاد للأكسدة', 'تحسين الأيض', 'حرق الدهون'], '2-3 أكواب يومياً'),
('5', 'عسل مانوكا', 'عسل مانوكا الطبيعي من نيوزيلندا بخصائص مضادة للبكتيريا والالتهابات.', 45.99, 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3', 'مشروبات صحية', ARRAY['عسل مانوكا 100%'], ARRAY['مضاد للبكتيريا', 'مضاد للالتهابات', 'تقوية المناعة'], 'ملعقة صغيرة يومياً على الريق'),
('6', 'زيت الأرغان', 'زيت الأرغان الطبيعي المغربي للعناية بالبشرة والشعر. غني بفيتامين E ومضادات الأكسدة.', 32.99, 'https://images.unsplash.com/photo-1571875257685-53bb9180c43b?ixlib=rb-4.0.3', 'العناية الشخصية', ARRAY['زيت الأرغان البكر'], ARRAY['ترطيب البشرة', 'تقوية الشعر', 'مضاد للشيخوخة'], 'بضع قطرات على البشرة أو الشعر'),
('7', 'صابون طبيعي بالعسل', 'صابون طبيعي مصنوع بالعسل وزيت الزيتون. مناسب لجميع أنواع البشرة.', 12.99, 'https://images.unsplash.com/photo-1571875257685-53bb9180c43b?ixlib=rb-4.0.3', 'العناية الشخصية', ARRAY['عسل طبيعي', 'زيت زيتون', 'زيوت عطرية'], ARRAY['تنظيف لطيف', 'ترطيب طبيعي', 'مضاد للبكتيريا'], 'للاستخدام اليومي على الوجه والجسم'),
('8', 'كركم عضوي', 'مسحوق الكركم العضوي عالي الجودة. مضاد طبيعي للالتهابات ومقوي للمناعة.', 16.99, 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3', 'مكملات غذائية', ARRAY['كركم عضوي مطحون'], ARRAY['مضاد للالتهابات', 'تقوية المناعة', 'مضاد للأكسدة'], 'ملعقة صغيرة مع الحليب الدافئ يومياً');

-- Insert sample articles
INSERT INTO articles (id, title, content, excerpt, image, category, author, featured) VALUES
('1', 'فوائد فطر الريشي للمناعة والنوم', 'فطر الريشي، المعروف أيضاً باسم "فطر الخلود"، هو أحد أهم الفطر الطبية في الطب التقليدي الصيني. يحتوي على مركبات نشطة تسمى التريتربينات والبيتا جلوكان التي تلعب دوراً مهماً في تقوية جهاز المناعة...', 'اكتشف كيف يمكن لفطر الريشي أن يحسن من جودة نومك ويقوي مناعتك الطبيعية', 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3', 'المناعة', 'د. أحمد محمد', 'true'),
('2', 'دور سبيرولينا في تعزيز الطاقة الطبيعية', 'السبيرولينا هي نوع من الطحالب الخضراء المزرقة التي تعتبر من أكثر الأطعمة كثافة بالعناصر الغذائية على وجه الأرض. تحتوي على نسبة عالية من البروتين الكامل، والفيتامينات، والمعادن...', 'تعرف على كيفية استخدام السبيرولينا لزيادة طاقتك وحيويتك بشكل طبيعي', 'https://images.unsplash.com/photo-1569896358442-5ca5c4c2e77a?ixlib=rb-4.0.3', 'التغذية', 'د. فاطمة علي', 'false'),
('3', 'أهمية مضادات الأكسدة في الشاي الأخضر', 'الشاي الأخضر غني بمضادات الأكسدة القوية المسماة الكاتيكينات، وخاصة EGCG. هذه المركبات تحارب الجذور الحرة في الجسم وتساعد في الوقاية من العديد من الأمراض المزمنة...', 'اكتشف العلم وراء فوائد الشاي الأخضر ودوره في محاربة الشيخوخة', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3', 'المناعة', 'د. سارة حسن', 'false'),
('4', 'فوائد عسل المانوكا المضادة للبكتيريا', 'عسل المانوكا النيوزيلندي يحتوي على مركب فريد يسمى ميثيل جليوكسال (MGO) الذي يمنحه خصائص مضادة للبكتيريا قوية. هذا العسل يختلف عن العسل العادي بقدرته على محاربة البكتيريا الضارة...', 'تعلم كيف يمكن لعسل المانوكا أن يساعد في علاج الالتهابات وتقوية المناعة', 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3', 'المناعة', 'د. محمد الأحمد', 'false'),
('5', 'كيف يحسن فطر عرف الأسد من وظائف الدماغ', 'فطر عرف الأسد يحتوي على مركبات فريدة تسمى هيريسينونات وإيريناسينات التي تحفز إنتاج عامل نمو الأعصاب (NGF). هذا يساعد في نمو وإصلاح الخلايا العصبية...', 'اكتشف كيف يمكن لفطر عرف الأسد تحسين ذاكرتك وتركيزك بشكل طبيعي', 'https://images.unsplash.com/photo-1586281980024-9b4e7f8d4d8e?ixlib=rb-4.0.3', 'التركيز', 'د. ليلى قاسم', 'false'),
('6', 'العناية الطبيعية بالبشرة باستخدام زيت الأرغان', 'زيت الأرغان المغربي غني بفيتامين E والأحماض الدهنية الأساسية التي تغذي وترطب البشرة بعمق. يساعد في محاربة علامات الشيخوخة وإصلاح الأضرار الناتجة عن العوامل البيئية...', 'تعرف على أسرار الجمال المغربي وكيفية استخدام زيت الأرغان للعناية بالبشرة', 'https://images.unsplash.com/photo-1571875257685-53bb9180c43b?ixlib=rb-4.0.3', 'التغذية', 'د. أميرة زكي', 'false');