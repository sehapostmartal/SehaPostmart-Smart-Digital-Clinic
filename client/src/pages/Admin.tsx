
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Users, Package, FileText, BarChart3, Settings } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Product, Article } from "@shared/schema";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  
  const queryClient = useQueryClient();

  // Fetch data
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    }
  });

  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
    queryFn: async () => {
      const response = await fetch('/api/articles');
      if (!response.ok) throw new Error('Failed to fetch articles');
      return response.json();
    }
  });

  // Product mutations
  const createProductMutation = useMutation({
    mutationFn: async (product: Omit<Product, 'id' | 'createdAt'>) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (!response.ok) throw new Error('Failed to create product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsProductDialogOpen(false);
      setEditingProduct(null);
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, ...product }: Product) => {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (!response.ok) throw new Error('Failed to update product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsProductDialogOpen(false);
      setEditingProduct(null);
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    }
  });

  // Article mutations
  const createArticleMutation = useMutation({
    mutationFn: async (article: Omit<Article, 'id' | 'createdAt'>) => {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      });
      if (!response.ok) throw new Error('Failed to create article');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
      setIsArticleDialogOpen(false);
      setEditingArticle(null);
    }
  });

  const updateArticleMutation = useMutation({
    mutationFn: async ({ id, ...article }: Article) => {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      });
      if (!response.ok) throw new Error('Failed to update article');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
      setIsArticleDialogOpen(false);
      setEditingArticle(null);
    }
  });

  const deleteArticleMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete article');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
    }
  });

  const handleProductSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: formData.get('price') as string,
      category: formData.get('category') as string,
      imageUrl: formData.get('imageUrl') as string,
      benefits: formData.get('benefits') as string,
      usage: formData.get('usage') as string,
      ingredients: formData.get('ingredients') as string,
    };

    if (editingProduct) {
      updateProductMutation.mutate({ ...editingProduct, ...productData });
    } else {
      createProductMutation.mutate(productData);
    }
  };

  const handleArticleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const articleData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      excerpt: formData.get('excerpt') as string,
      category: formData.get('category') as string,
      imageUrl: formData.get('imageUrl') as string,
    };

    if (editingArticle) {
      updateArticleMutation.mutate({ ...editingArticle, ...articleData });
    } else {
      createArticleMutation.mutate(articleData);
    }
  };

  const openProductDialog = (product?: Product) => {
    setEditingProduct(product || null);
    setIsProductDialogOpen(true);
  };

  const openArticleDialog = (article?: Article) => {
    setEditingArticle(article || null);
    setIsArticleDialogOpen(true);
  };

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        {/* Admin Header */}
        <section className="bg-gradient-to-r from-secondary-600 to-secondary-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">لوحة التحكم الإدارية</h1>
              <p className="text-xl text-secondary-100">إدارة المنتجات والمقالات والمحتوى</p>
            </div>
          </div>
        </section>

        {/* Admin Dashboard */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  نظرة عامة
                </TabsTrigger>
                <TabsTrigger value="products" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  المنتجات
                </TabsTrigger>
                <TabsTrigger value="articles" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  المقالات
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  الإعدادات
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{products.length}</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">إجمالي المقالات</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{articles.length}</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">فئات المنتجات</CardTitle>
                      <Badge className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {new Set(products.map(p => p.category)).size}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">فئات المقالات</CardTitle>
                      <Badge className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {new Set(articles.map(a => a.category)).size}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>أحدث المنتجات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {products.slice(0, 5).map((product) => (
                          <div key={product.id} className="flex items-center space-x-4">
                            <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                              <p className="text-sm text-gray-500">{product.category}</p>
                            </div>
                            <div className="text-sm font-medium">${product.price}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>أحدث المقالات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {articles.slice(0, 5).map((article) => (
                          <div key={article.id} className="flex items-center space-x-4">
                            <img src={article.imageUrl} alt={article.title} className="w-12 h-12 rounded object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{article.title}</p>
                              <p className="text-sm text-gray-500">{article.category}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Products Tab */}
              <TabsContent value="products" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">إدارة المنتجات</h2>
                  <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => openProductDialog()}>
                        <Plus className="w-4 h-4 ml-2" />
                        إضافة منتج جديد
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {editingProduct ? 'تحرير المنتج' : 'إضافة منتج جديد'}
                        </DialogTitle>
                        <DialogDescription>
                          املأ النموذج أدناه لإضافة أو تحرير منتج
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleProductSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">اسم المنتج</Label>
                            <Input
                              id="name"
                              name="name"
                              defaultValue={editingProduct?.name || ''}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="price">السعر</Label>
                            <Input
                              id="price"
                              name="price"
                              type="number"
                              step="0.01"
                              defaultValue={editingProduct?.price || ''}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="category">الفئة</Label>
                          <Select name="category" defaultValue={editingProduct?.category || ''}>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الفئة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="مكملات غذائية">مكملات غذائية</SelectItem>
                              <SelectItem value="مشروبات صحية">مشروبات صحية</SelectItem>
                              <SelectItem value="العناية الشخصية">العناية الشخصية</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="imageUrl">رابط الصورة</Label>
                          <Input
                            id="imageUrl"
                            name="imageUrl"
                            type="url"
                            defaultValue={editingProduct?.imageUrl || ''}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">الوصف</Label>
                          <Textarea
                            id="description"
                            name="description"
                            defaultValue={editingProduct?.description || ''}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="benefits">الفوائد</Label>
                          <Textarea
                            id="benefits"
                            name="benefits"
                            defaultValue={editingProduct?.benefits || ''}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="usage">طريقة الاستخدام</Label>
                          <Textarea
                            id="usage"
                            name="usage"
                            defaultValue={editingProduct?.usage || ''}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="ingredients">المكونات</Label>
                          <Textarea
                            id="ingredients"
                            name="ingredients"
                            defaultValue={editingProduct?.ingredients || ''}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          {editingProduct ? 'حفظ التغييرات' : 'إضافة المنتج'}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الصورة</TableHead>
                        <TableHead>الاسم</TableHead>
                        <TableHead>الفئة</TableHead>
                        <TableHead>السعر</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded object-cover" />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{product.category}</Badge>
                          </TableCell>
                          <TableCell>${product.price}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openProductDialog(product)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteProductMutation.mutate(product.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              {/* Articles Tab */}
              <TabsContent value="articles" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">إدارة المقالات</h2>
                  <Dialog open={isArticleDialogOpen} onOpenChange={setIsArticleDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => openArticleDialog()}>
                        <Plus className="w-4 h-4 ml-2" />
                        إضافة مقال جديد
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {editingArticle ? 'تحرير المقال' : 'إضافة مقال جديد'}
                        </DialogTitle>
                        <DialogDescription>
                          املأ النموذج أدناه لإضافة أو تحرير مقال
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleArticleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="title">عنوان المقال</Label>
                          <Input
                            id="title"
                            name="title"
                            defaultValue={editingArticle?.title || ''}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">الفئة</Label>
                          <Select name="category" defaultValue={editingArticle?.category || ''}>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الفئة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="المناعة">المناعة</SelectItem>
                              <SelectItem value="التغذية">التغذية</SelectItem>
                              <SelectItem value="الصحة النفسية">الصحة النفسية</SelectItem>
                              <SelectItem value="اللياقة البدنية">اللياقة البدنية</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="imageUrl">رابط الصورة</Label>
                          <Input
                            id="imageUrl"
                            name="imageUrl"
                            type="url"
                            defaultValue={editingArticle?.imageUrl || ''}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="excerpt">المقتطف</Label>
                          <Textarea
                            id="excerpt"
                            name="excerpt"
                            defaultValue={editingArticle?.excerpt || ''}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="content">المحتوى</Label>
                          <Textarea
                            id="content"
                            name="content"
                            rows={10}
                            defaultValue={editingArticle?.content || ''}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          {editingArticle ? 'حفظ التغييرات' : 'إضافة المقال'}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الصورة</TableHead>
                        <TableHead>العنوان</TableHead>
                        <TableHead>الفئة</TableHead>
                        <TableHead>تاريخ الإنشاء</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {articles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell>
                            <img src={article.imageUrl} alt={article.title} className="w-12 h-12 rounded object-cover" />
                          </TableCell>
                          <TableCell className="font-medium">{article.title}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{article.category}</Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(article.createdAt).toLocaleDateString('ar-SA')}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openArticleDialog(article)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteArticleMutation.mutate(article.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات النظام</CardTitle>
                    <CardDescription>إدارة إعدادات التطبيق العامة</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>اسم المنصة</Label>
                        <Input defaultValue="العيادة الرقمية الذكية" />
                      </div>
                      <div>
                        <Label>رقم الواتساب</Label>
                        <Input defaultValue="963951902860" />
                      </div>
                      <div>
                        <Label>معرف العضوية</Label>
                        <Input defaultValue="819026838" />
                      </div>
                      <Button>حفظ الإعدادات</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
