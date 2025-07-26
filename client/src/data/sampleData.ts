import type { Product, Article } from "@shared/schema";

export const sampleProducts: Product[] = [
  {
    id: "reishi-mushroom",
    name: "فطر الريشي",
    description: "مكمل طبيعي قوي لتعزيز المناعة وتحسين جودة النوم والحد من التوتر",
    price: "29.99",
    category: "مكملات غذائية",
    imageUrl: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    benefits: "يساعد فطر الريشي في تقوية جهاز المناعة الطبيعي، يحسن جودة النوم، يقلل من مستويات التوتر والقلق، ويدعم صحة الكبد والقلب. كما يحتوي على مضادات الأكسدة القوية التي تحارب الالتهابات وتبطئ عملية الشيخوخة.",
    usage: "تناول كبسولة واحدة يومياً مع الطعام، ويفضل في المساء للاستفادة من تأثيره المهدئ. يُنصح بالاستمرار لمدة 8-12 أسبوع للحصول على أفضل النتائج.",
    ingredients: "مستخلص فطر الريشي المجفف (500 مج)، كبسولة نباتية، لا يحتوي على مواد حافظة أو ألوان صناعية.",
    createdAt: new Date("2024-01-15T10:00:00.000Z")
  },
  {
    id: "lions-mane",
    name: "فطر عرف الأسد",
    description: "يدعم صحة الدماغ ويحسن التركيز والذاكرة بشكل طبيعي وآمن",
    price: "34.99",
    category: "مكملات غذائية",
    imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxواHPhoto by-PagefHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    benefits: "يحفز نمو الخلايا العصبية، يحسن الذاكرة والتركيز، يدعم الوظائف المعرفية، ويساعد في حماية الدماغ من التدهور المرتبط بالعمر. مفيد للطلاب والمهنيين الذين يحتاجون للتركيز العالي.",
    usage: "كبسولة واحدة في الصباح و واحدة في المساء مع الوجبات. يمكن زيادة الجرعة تدريجياً حسب الحاجة واستشارة الطبيب.",
    ingredients: "مستخلص فطر عرف الأسد العضوي (600 مج)، بيتا جلوكان، كبسولة نباتية، خالي من الغلوتين ومناسب للنباتيين.",
    createdAt: new Date("2024-01-10T09:00:00.000Z")
  },
  {
    id: "spirulina",
    name: "سبيرولينا",
    description: "طحالب طبيعية غنية بالبروتين والفيتامينات لتعزيز الطاقة والصحة العامة",
    price: "24.99",
    category: "مكملات غذائية",
    imageUrl: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxواHPhoto by-PagefHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    benefits: "مصدر غني بالبروتين الكامل، يحتوي على جميع الأحماض الأمينية الأساسية، غني بالحديد وفيتامين B12، يدعم صحة الجهاز المناعي، ويساعد في زيادة مستويات الطاقة الطبيعية.",
    usage: "ملعقة صغيرة من المسحوق يومياً مع العصير أو الماء، أو 3-4 أقراص يومياً. يُفضل تناولها على معدة فارغة في الصباح لامتصاص أفضل.",
    ingredients: "سبيرولينا عضوية مجففة 100%، لا تحتوي على مواد مضافة أو مواد حافظة، معتمدة عضوياً.",
    createdAt: new Date("2024-01-08T08:00:00.000Z")
  },
  {
    id: "lingzhi-coffee",
    name: "قهوة لينغتشي",
    description: "قهوة مميزة معززة بفطر الريشي لطاقة مستدامة وفوائد صحية إضافية",
    price: "39.99",
    category: "مشروبات صحية",
    imageUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxواHPhoto by-PagefHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    benefits: "تجمع بين فوائد القهوة التقليدية وخصائص فطر الريشي المقوية للمناعة، توفر طاقة مستدامة بدون انهيار، تقلل من حموضة القهوة، وتدعم الصحة العامة والهدوء الذهني.",
    usage: "كيس واحد يومياً، يُذاب في كوب من الماء الساخن. يمكن إضافة الحليب أو المحليات الطبيعية حسب الرغبة. مناسب للشرب في أي وقت من اليوم.",
    ingredients: "قهوة عربية فاخرة، مستخلص فطر الريشي، كريمر نباتي، محلي طبيعي، نكهات طبيعية.",
    createdAt: new Date("2024-01-12T11:00:00.000Z")
  },
  {
    id: "natural-skin-cream",
    name: "كريم العناية الطبيعي",
    description: "كريم طبيعي مغذي للبشرة مصنوع من مكونات عضوية لترطيب وحماية البشرة",
    price: "19.99",
    category: "العناية الشخصية",
    imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxواHPhoto by-PagefHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    benefits: "يرطب البشرة بعمق، يحميها من العوامل البيئية الضارة، يقلل من علامات الشيخوخة، يهدئ الالتهابات والحساسية، ومناسب لجميع أنواع البشرة بما في ذلك البشرة الحساسة.",
    usage: "يُطبق طبقة رقيقة على البشرة النظيفة صباحاً ومساءً، مع التدليك بلطف حتى الامتصاص الكامل. يمكن استخدامه على الوجه والجسم.",
    ingredients: "زيت الأرغان العضوي، زبدة الشيا، الصبار، زيت جوز الهند، فيتامين E، زيوت عطرية طبيعية، خالي من البارابين والسلفات.",
    createdAt: new Date("2024-01-14T14:00:00.000Z")
  },
  {
    id: "natural-shampoo",
    name: "شامبو طبيعي",
    description: "شامبو طبيعي خالي من المواد الكيميائية الضارة لتنظيف وتغذية الشعر بلطف",
    price: "16.99",
    category: "العناية الشخصية",
    imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxواHPhoto by-PagefHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    benefits: "ينظف الشعر بلطف دون إزالة الزيوت الطبيعية، يقوي بصيلات الشعر، يقلل من تساقط الشعر، يضفي لمعاناً طبيعياً، ومناسب للاستخدام اليومي لجميع أنواع الشعر.",
    usage: "يُطبق كمية مناسبة على الشعر المبلل، يُدلك بلطف لتكوين الرغوة، ثم يُشطف جيداً بالماء الدافئ. يُستخدم حسب الحاجة أو يومياً.",
    ingredients: "مستخلصات عشبية طبيعية، زيت الأرغان، زيت اللافندر، الألوة فيرا، بروتينات نباتية، خالي من السلفات والبارابين والسيليكون.",
    createdAt: new Date("2024-01-16T16:00:00.000Z")
  },
  {
    id: "turmeric-supplement",
    name: "مكمل الكركم",
    description: "مكمل طبيعي من الكركم مع الفلفل الأسود لمضاعفة التأثير المضاد للالتهابات",
    price: "22.99",
    category: "مكملات غذائية",
    imageUrl: "https://images.unsplash.com/photo-1609501676725-7186f0b5c3a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxواHPhoto by-PagefHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    benefits: "يحارب الالتهابات المزمنة، يدعم صحة المفاصل، يحسن الهضم، يقوي المناعة، ويحتوي على مضادات أكسدة قوية لحماية الخلايا من التلف.",
    usage: "كبسولة واحدة إلى كبسولتين يومياً مع الوجبات، يُفضل مع وجبة تحتوي على دهون صحية لتحسين الامتصاص.",
    ingredients: "مستخلص الكركم المعياري (95% كوركومين)، مستخلص الفلفل الأسود (بيبيرين)، كبسولة نباتية، خالي من الغلوتين.",
    createdAt: new Date("2024-01-18T12:00:00.000Z")
  },
  {
    id: "green-tea-extract",
    name: "مستخلص الشاي الأخضر",
    description: "مستخلص طبيعي من الشاي الأخضر غني بمضادات الأكسدة لدعم عملية التمثيل الغذائي",
    price: "18.99",
    category: "مكملات غذائية",
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxواHPhoto by-PagefHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    benefits: "يسرع عملية التمثيل الغذائي، يساعد في حرق الدهون، يحتوي على مضادات أكسدة قوية، يدعم صحة القلب، ويحسن الوظائف المعرفية والتركيز.",
    usage: "كبسولة واحدة في الصباح و واحدة بعد الظهر، يُفضل تناولها بين الوجبات مع كوب من الماء.",
    ingredients: "مستخلص الشاي الأخضر المعياري (50% EGCG)، كافيين طبيعي، كبسولة نباتية، لا يحتوي على مواد حافظة.",
    createdAt: new Date("2024-01-20T09:30:00.000Z")
  }
];

export const sampleArticles: Article[] = [
  {
    id: "reishi-immunity-benefits",
    title: "فوائد فطر الريشي لتقوية المناعة",
    content: "يعتبر فطر الريشي من أقوى المكملات الطبيعية لتعزيز جهاز المناعة...",
    excerpt: "اكتشف كيف يمكن لفطر الريشي المعروف بـ 'فطر الخلود' أن يعزز نظام المناعة الطبيعي في الجسم ويحسن الصحة العامة من خلال خصائصه المضادة للأكسدة والالتهابات.",
    category: "المناعة",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxواHPhoto by-PagefHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
    readTime: "5 دقائق قراءة",
    featured: "true",
    createdAt: new Date("2024-01-15T10:00:00.000Z")
  },
  {
    id: "natural-focus-improvement",
    title: "كيفية تحسين التركيز بطرق طبيعية",
    content: "في عالم مليء بالمشتتات، أصبح الحفاظ على التركيز تحدياً حقيقياً...",
    excerpt: "تعلم الطرق الطبيعية والآمنة لتعزيز التركيز والوضوح الذهني، بما في ذلك التغذية المناسبة والمكملات الطبيعية وتقنيات التأمل والتنفس.",
    category: "التركيز",
    imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxواHPhoto by-PagefHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
    readTime: "7 دقائق قراءة",
    featured: "false",
    createdAt: new Date("2024-01-12T14:30:00.000Z")
  },
  {
    id: "antioxidants-importance",
    title: "أهمية مضادات الأكسدة في النظام الغذائي",
    content: "مضادات الأكسدة هي مركبات طبيعية تحمي الجسم من أضرار الجذور الحرة...",
    excerpt: "فهم دور مضادات الأكسدة الحيوي في حماية الجسم من الجذور الحرة والأمراض المزمنة، وأفضل المصادر الطبيعية للحصول عليها يوميًا.",
    category: "التغذية",
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxواHPhoto by-PagefHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
    readTime: "6 دقائق قراءة",
    featured: "false",
    createdAt: new Date("2024-01-10T16:15:00.000Z")
  },
  {
    id: "stress-management-naturally",
    title: "إدارة التوتر بالطرق الطبيعية",
    content: "التوتر المزمن يؤثر سلباً على جميع جوانب الصحة...",
    excerpt: "اكتشف الطرق الطبيعية الفعالة لإدارة التوتر والقلق، من خلال الأعشاب الطبيعية والتقنيات الذهنية وتغييرات نمط الحياة البسيطة.",
    category: "المناعة",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxواHPhoto by-PagefHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
    readTime: "8 دقائق قراءة",
    featured: "false",
    createdAt: new Date("2024-01-08T11:20:00.000Z")
  },
  {
    id: "healthy-sleep-habits",
    title: "عادات النوم الصحي لحياة أفضل",
    content: "النوم الجيد هو أساس الصحة والعافية...",
    excerpt: "تعرف على أهمية النوم الجيد وكيفية تطوير عادات نوم صحية تحسن من جودة حياتك وصحتك العامة، مع نصائح عملية قابلة للتطبيق.",
    category: "التركيز",
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxواHPhoto by-PagefHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
    readTime: "5 دقائق قراءة",
    featured: "false",
    createdAt: new Date("2024-01-06T09:45:00.000Z")
  },
  {
    id: "superfood-nutrition-guide",
    title: "دليل الأطعمة الخارقة والتغذية المثلى",
    content: "الأطعمة الخارقة هي أطعمة غنية بالعناصر الغذائية...",
    excerpt: "استكشف عالم الأطعمة الخارقة وتعلم كيفية دمجها في نظامك الغذائي اليومي للحصول على أقصى فائدة غذائية وتحسين صحتك العامة.",
    category: "التغذية",
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxواHPhoto by-PagefHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
    readTime: "9 دقائق قراءة",
    featured: "false",
    createdAt: new Date("2024-01-04T13:10:00.000Z")
  }
];