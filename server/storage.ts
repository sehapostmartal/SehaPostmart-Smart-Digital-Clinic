import { 
  type User, 
  type InsertUser, 
  type Product, 
  type InsertProduct, 
  type Article, 
  type InsertArticle, 
  type Consultation, 
  type InsertConsultation, 
  type Membership, 
  type InsertMembership
} from "@shared/schema";

// In-memory storage for the application
let inMemoryProducts: Product[] = [];
let inMemoryArticles: Article[] = [];
let inMemoryConsultations: Consultation[] = [];
let inMemoryMemberships: Membership[] = [];
let inMemoryUsers: User[] = [];

// Initialize with sample data
const initializeSampleData = () => {
  if (inMemoryProducts.length === 0) {
    inMemoryProducts = [
      {
        id: '1',
        name: 'فطر الريشي',
        description: 'فطر الريشي الطبيعي المعروف بخصائصه المقوية للمناعة والمهدئة للأعصاب. يساعد في تحسين جودة النوم وتقليل التوتر.',
        price: '29.99',
        imageUrl: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3',
        category: 'مكملات غذائية',
        ingredients: 'فطر الريشي المجفف',
        benefits: 'تقوية المناعة، تحسين النوم، تقليل التوتر',
        usage: 'كبسولة واحدة يومياً مع الماء',
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'فطر عرف الأسد',
        description: 'فطر عرف الأسد الطبيعي المفيد لصحة الدماغ والجهاز العصبي. يساعد في تحسين الذاكرة والتركيز.',
        price: '34.99',
        imageUrl: 'https://images.unsplash.com/photo-1586281980024-9b4e7f8d4d8e?ixlib=rb-4.0.3',
        category: 'مكملات غذائية',
        ingredients: 'فطر عرف الأسد العضوي',
        benefits: 'تحسين الذاكرة، زيادة التركيز، دعم صحة الدماغ',
        usage: 'كبسولتان يومياً مع الطعام',
        createdAt: new Date()
      },
      {
        id: '3',
        name: 'سبيرولينا',
        description: 'سبيرولينا عضوية غنية بالبروتين والفيتامينات والمعادن. مصدر ممتاز للطاقة الطبيعية.',
        price: '24.99',
        imageUrl: 'https://images.unsplash.com/photo-1569896358442-5ca5c4c2e77a?ixlib=rb-4.0.3',
        category: 'مكملات غذائية',
        ingredients: 'سبيرولينا عضوية 100%',
        benefits: 'زيادة الطاقة، تحسين الهضم، مضاد للأكسدة',
        usage: 'ملعقة صغيرة يومياً مع العصير',
        createdAt: new Date()
      },
      {
        id: '4',
        name: 'شاي أخضر عضوي',
        description: 'شاي أخضر عضوي عالي الجودة غني بمضادات الأكسدة. يساعد في تحسين الأيض وحرق الدهون.',
        price: '19.99',
        imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3',
        category: 'مشروبات صحية',
        ingredients: 'أوراق الشاي الأخضر العضوية',
        benefits: 'مضاد للأكسدة، تحسين الأيض، حرق الدهون',
        usage: '2-3 أكواب يومياً',
        createdAt: new Date()
      },
      {
        id: '5',
        name: 'عسل مانوكا',
        description: 'عسل مانوكا الطبيعي من نيوزيلندا بخصائص مضادة للبكتيريا والالتهابات.',
        price: '45.99',
        imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3',
        category: 'مشروبات صحية',
        ingredients: 'عسل مانوكا 100%',
        benefits: 'مضاد للبكتيريا، مضاد للالتهابات، تقوية المناعة',
        usage: 'ملعقة صغيرة يومياً على الريق',
        createdAt: new Date()
      },
      {
        id: '6',
        name: 'زيت الأرغان',
        description: 'زيت الأرغان الطبيعي المغربي للعناية بالبشرة والشعر. غني بفيتامين E ومضادات الأكسدة.',
        price: '32.99',
        imageUrl: 'https://images.unsplash.com/photo-1571875257685-53bb9180c43b?ixlib=rb-4.0.3',
        category: 'العناية الشخصية',
        ingredients: 'زيت الأرغان البكر',
        benefits: 'ترطيب البشرة، تقوية الشعر، مضاد للشيخوخة',
        usage: 'بضع قطرات على البشرة أو الشعر',
        createdAt: new Date()
      },
      {
        id: '7',
        name: 'صابون طبيعي بالعسل',
        description: 'صابون طبيعي مصنوع بالعسل وزيت الزيتون. مناسب لجميع أنواع البشرة.',
        price: '12.99',
        imageUrl: 'https://images.unsplash.com/photo-1571875257685-53bb9180c43b?ixlib=rb-4.0.3',
        category: 'العناية الشخصية',
        ingredients: 'عسل طبيعي، زيت زيتون، زيوت عطرية',
        benefits: 'تنظيف لطيف، ترطيب طبيعي، مضاد للبكتيريا',
        usage: 'للاستخدام اليومي على الوجه والجسم',
        createdAt: new Date()
      },
      {
        id: '8',
        name: 'كركم عضوي',
        description: 'مسحوق الكركم العضوي عالي الجودة. مضاد طبيعي للالتهابات ومقوي للمناعة.',
        price: '16.99',
        imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3',
        category: 'مكملات غذائية',
        ingredients: 'كركم عضوي مطحون',
        benefits: 'مضاد للالتهابات، تقوية المناعة، مضاد للأكسدة',
        usage: 'ملعقة صغيرة مع الحليب الدافئ يومياً',
        createdAt: new Date()
      }
    ];

    inMemoryArticles = [
      {
        id: '1',
        title: 'فوائد فطر الريشي للمناعة والنوم',
        content: 'فطر الريشي، المعروف أيضاً باسم "فطر الخلود"، هو أحد أهم الفطر الطبية في الطب التقليدي الصيني. يحتوي على مركبات نشطة تسمى التريتربينات والبيتا جلوكان التي تلعب دوراً مهماً في تقوية جهاز المناعة وتحسين جودة النوم. الدراسات الحديثة أثبتت أن الاستهلاك المنتظم لفطر الريشي يمكن أن يساعد في تقليل مستويات التوتر والقلق، مما يؤدي إلى تحسن كبير في جودة النوم. كما أنه يحفز إنتاج خلايا الدم البيضاء التي تلعب دوراً أساسياً في مكافحة العدوى والأمراض.',
        excerpt: 'اكتشف كيف يمكن لفطر الريشي أن يحسن من جودة نومك ويقوي مناعتك الطبيعية',
        imageUrl: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3',
        category: 'المناعة',

        readTime: '5 دقائق',
        featured: 'true',
        createdAt: new Date()
      },
      {
        id: '2',
        title: 'دور سبيرولينا في تعزيز الطاقة الطبيعية',
        content: 'السبيرولينا هي نوع من الطحالب الخضراء المزرقة التي تعتبر من أكثر الأطعمة كثافة بالعناصر الغذائية على وجه الأرض. تحتوي على نسبة عالية من البروتين الكامل، والفيتامينات، والمعادن. البروتين في السبيرولينا يحتوي على جميع الأحماض الأمينية الأساسية، مما يجعلها مصدراً ممتازاً للطاقة المستدامة. كما أنها غنية بفيتامين B12 والحديد، وهما عنصران أساسيان لمحاربة التعب وزيادة مستويات الطاقة في الجسم.',
        excerpt: 'تعرف على كيفية استخدام السبيرولينا لزيادة طاقتك وحيويتك بشكل طبيعي',
        imageUrl: 'https://images.unsplash.com/photo-1569896358442-5ca5c4c2e77a?ixlib=rb-4.0.3',
        category: 'التغذية',

        readTime: '4 دقائق',
        featured: null,
        createdAt: new Date()
      },
      {
        id: '3',
        title: 'أهمية مضادات الأكسدة في الشاي الأخضر',
        content: 'الشاي الأخضر غني بمضادات الأكسدة القوية المسماة الكاتيكينات، وخاصة EGCG. هذه المركبات تحارب الجذور الحرة في الجسم وتساعد في الوقاية من العديد من الأمراض المزمنة. الاستهلاك المنتظم للشاي الأخضر يمكن أن يساعد في تحسين وظائف المخ، وزيادة معدل الأيض، وحماية القلب من الأمراض. كما أن مضادات الأكسدة في الشاي الأخضر تلعب دوراً مهماً في إبطاء عملية الشيخوخة ومحاربة علامات التقدم في السن.',
        excerpt: 'اكتشف العلم وراء فوائد الشاي الأخضر ودوره في محاربة الشيخوخة',
        imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3',
        category: 'المناعة',

        readTime: '6 دقائق',
        featured: null,
        createdAt: new Date()
      },
      {
        id: '4',
        title: 'فوائد عسل المانوكا المضادة للبكتيريا',
        content: 'عسل المانوكا النيوزيلندي يحتوي على مركب فريد يسمى ميثيل جليوكسال (MGO) الذي يمنحه خصائص مضادة للبكتيريا قوية. هذا العسل يختلف عن العسل العادي بقدرته على محاربة البكتيريا الضارة، بما في ذلك البكتيريا المقاومة للمضادات الحيوية. الدراسات أظهرت أن عسل المانوكا يمكن أن يساعد في علاج التهابات الحلق، وشفاء الجروح، وتحسين صحة الجهاز الهضمي. كما أنه يحفز جهاز المناعة ويساعد الجسم على مقاومة العدوى بشكل طبيعي.',
        excerpt: 'تعلم كيف يمكن لعسل المانوكا أن يساعد في علاج الالتهابات وتقوية المناعة',
        imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3',
        category: 'المناعة',

        readTime: '5 دقائق',
        featured: null,
        createdAt: new Date()
      },
      {
        id: '5',
        title: 'كيف يحسن فطر عرف الأسد من وظائف الدماغ',
        content: 'فطر عرف الأسد يحتوي على مركبات فريدة تسمى هيريسينونات وإيريناسينات التي تحفز إنتاج عامل نمو الأعصاب (NGF). هذا يساعد في نمو وإصلاح الخلايا العصبية، مما يؤدي إلى تحسن في الذاكرة والتركيز والوظائف المعرفية بشكل عام. الدراسات الحديثة أظهرت أن الاستهلاك المنتظم لفطر عرف الأسد يمكن أن يساعد في الوقاية من الأمراض التنكسية العصبية مثل الزهايمر والخرف. كما أنه يحسن من المزاج ويقلل من أعراض القلق والاكتئاب.',
        excerpt: 'اكتشف كيف يمكن لفطر عرف الأسد تحسين ذاكرتك وتركيزك بشكل طبيعي',
        imageUrl: 'https://images.unsplash.com/photo-1586281980024-9b4e7f8d4d8e?ixlib=rb-4.0.3',
        category: 'التركيز',

        readTime: '7 دقائق',
        featured: null,
        createdAt: new Date()
      },
      {
        id: '6',
        title: 'العناية الطبيعية بالبشرة باستخدام زيت الأرغان',
        content: 'زيت الأرغان المغربي غني بفيتامين E والأحماض الدهنية الأساسية التي تغذي وترطب البشرة بعمق. يساعد في محاربة علامات الشيخوخة وإصلاح الأضرار الناتجة عن العوامل البيئية. زيت الأرغان يحتوي على مضادات الأكسدة الطبيعية التي تحمي البشرة من الجذور الحرة وتحافظ على نعومتها ومرونتها. يمكن استخدامه على الوجه والجسم والشعر، ويعتبر من أفضل الزيوت الطبيعية للعناية الشاملة بالجمال.',
        excerpt: 'تعرف على أسرار الجمال المغربي وكيفية استخدام زيت الأرغان للعناية بالبشرة',
        imageUrl: 'https://images.unsplash.com/photo-1571875257685-53bb9180c43b?ixlib=rb-4.0.3',
        category: 'التغذية',

        readTime: '4 دقائق',
        featured: null,
        createdAt: new Date()
      }
    ];
  }
};

// Initialize data on startup
initializeSampleData();

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Article methods
  getArticles(): Promise<Article[]>;
  getArticle(id: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  
  // Consultation methods
  getConsultations(): Promise<Consultation[]>;
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  
  // Membership methods
  getMemberships(): Promise<Membership[]>;
  createMembership(membership: InsertMembership): Promise<Membership>;
}

export class MemoryStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return inMemoryUsers.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return inMemoryUsers.find(user => user.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...user
    };
    inMemoryUsers.push(newUser);
    return newUser;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    initializeSampleData();
    return inMemoryProducts;
  }

  async getProduct(id: string): Promise<Product | undefined> {
    initializeSampleData();
    return inMemoryProducts.find(product => product.id === id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    initializeSampleData();
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      benefits: product.benefits || null,
      usage: product.usage || null,
      ingredients: product.ingredients || null,
      ...product,
      createdAt: new Date()
    };
    inMemoryProducts.push(newProduct);
    return newProduct;
  }

  // Article methods
  async getArticles(): Promise<Article[]> {
    initializeSampleData();
    return inMemoryArticles;
  }

  async getArticle(id: string): Promise<Article | undefined> {
    initializeSampleData();
    return inMemoryArticles.find(article => article.id === id);
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    initializeSampleData();
    const newArticle: Article = {
      id: Math.random().toString(36).substr(2, 9),
      featured: article.featured || null,
      ...article,
      createdAt: new Date()
    };
    inMemoryArticles.push(newArticle);
    return newArticle;
  }

  // Consultation methods
  async getConsultations(): Promise<Consultation[]> {
    return inMemoryConsultations;
  }

  async createConsultation(consultation: InsertConsultation): Promise<Consultation> {
    const newConsultation: Consultation = {
      id: Math.random().toString(36).substr(2, 9),
      age: consultation.age || null,
      medicalHistory: consultation.medicalHistory || null,
      currentMedications: consultation.currentMedications || null,
      recommendations: null,
      ...consultation,
      createdAt: new Date()
    };
    inMemoryConsultations.push(newConsultation);
    console.log('New consultation created:', newConsultation);
    return newConsultation;
  }

  // Membership methods
  async getMemberships(): Promise<Membership[]> {
    return inMemoryMemberships;
  }

  async createMembership(membership: InsertMembership): Promise<Membership> {
    const newMembership: Membership = {
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      ...membership,
      createdAt: new Date()
    };
    inMemoryMemberships.push(newMembership);
    console.log('New membership created:', newMembership);
    return newMembership;
  }
}

export const storage = new MemoryStorage();