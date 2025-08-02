'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useTranslations } from 'next-intl';
import PageLayout from '~/components/layout/pageLayout';
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Eye, ImageIcon, Star } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Badge } from '~/components/ui/badge';
import AddDishModal from '~/components/modals/AddDishModal';

interface Dish {
  id: string;
  name: string;
  category: 'appetizer' | 'soup' | 'mainCourse' | 'dessert' | 'beverage' | 'special';
  price: number;
  description: string;
  image: string;
  available: boolean;
  rating: number;
  orderCount: number;
}

export default function MenuPage() {
  const t = useTranslations('menu');
  const commonT = useTranslations('common');

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([
    // 模拟菜品数据
    {
      id: 'DISH-001',
      name: '宫保鸡丁',
      category: 'mainCourse',
      price: 38,
      description: '经典川菜，鸡肉丁配花生米，香辣可口',
      image: '/dishes/gongbao.jpg',
      available: true,
      rating: 4.8,
      orderCount: 156,
    },
    {
      id: 'DISH-002',
      name: '红烧肉',
      category: 'mainCourse',
      price: 48,
      description: '传统名菜，肥瘦相间，入口即化',
      image: '/dishes/hongshaorou.jpg',
      available: true,
      rating: 4.9,
      orderCount: 98,
    },
    {
      id: 'DISH-003',
      name: '麻婆豆腐',
      category: 'mainCourse',
      price: 28,
      description: '经典川菜，豆腐嫩滑，麻辣鲜香',
      image: '/dishes/mapo.jpg',
      available: true,
      rating: 4.7,
      orderCount: 203,
    },
    {
      id: 'DISH-004',
      name: '紫菜蛋花汤',
      category: 'soup',
      price: 18,
      description: '清淡营养，紫菜配鸡蛋，汤鲜味美',
      image: '/dishes/soup.jpg',
      available: true,
      rating: 4.5,
      orderCount: 67,
    },
    {
      id: 'DISH-005',
      name: '凉拌黄瓜',
      category: 'appetizer',
      price: 15,
      description: '清爽开胃，黄瓜脆嫩，调味适中',
      image: '/dishes/cucumber.jpg',
      available: true,
      rating: 4.3,
      orderCount: 89,
    },
    {
      id: 'DISH-006',
      name: '红豆沙',
      category: 'dessert',
      price: 25,
      description: '传统甜品，红豆香甜，口感细腻',
      image: '/dishes/redbean.jpg',
      available: false,
      rating: 4.6,
      orderCount: 34,
    },
    {
      id: 'DISH-007',
      name: '可乐',
      category: 'beverage',
      price: 8,
      description: '经典碳酸饮料，冰爽解腻',
      image: '/dishes/cola.jpg',
      available: true,
      rating: 4.2,
      orderCount: 145,
    },
    {
      id: 'DISH-008',
      name: '特色烤鸭',
      category: 'special',
      price: 88,
      description: '招牌特色菜，皮脆肉嫩，配薄饼和蘸料',
      image: '/dishes/duck.jpg',
      available: true,
      rating: 4.9,
      orderCount: 67,
    },
  ]);

  const handleAddDish = (dishData: Omit<Dish, 'id' | 'image' | 'rating' | 'orderCount'>) => {
    const newDish: Dish = {
      ...dishData,
      id: `DISH-${(dishes.length + 1).toString().padStart(3, '0')}`,
      image: '/dishes/default.jpg',
      rating: 4.5,
      orderCount: 0,
    };
    setDishes([...dishes, newDish]);
  };

  const handleEditDish = (dishData: Dish) => {
    setDishes(dishes.map((dish) => (dish.id === dishData.id ? { ...dish, ...dishData } : dish)));
    setEditingDish(null);
  };

  const handleDeleteDish = (dishId: string) => {
    setDishes(dishes.filter((dish) => dish.id !== dishId));
  };

  const toggleDishAvailability = (dishId: string) => {
    setDishes(dishes.map((dish) => (dish.id === dishId ? { ...dish, available: !dish.available } : dish)));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'appetizer':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'soup':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'mainCourse':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'dessert':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      case 'beverage':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300';
      case 'special':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) || dish.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || dish.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categoryCounts = {
    all: dishes.length,
    appetizer: dishes.filter((d) => d.category === 'appetizer').length,
    soup: dishes.filter((d) => d.category === 'soup').length,
    mainCourse: dishes.filter((d) => d.category === 'mainCourse').length,
    dessert: dishes.filter((d) => d.category === 'dessert').length,
    beverage: dishes.filter((d) => d.category === 'beverage').length,
    special: dishes.filter((d) => d.category === 'special').length,
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">管理餐厅菜品信息，设置价格和分类</p>
          </div>
          <Button className="liquid-glass-button-primary" onClick={() => setIsAddDishModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('addDish')}
          </Button>
        </div>

        {/* 搜索和筛选 */}
        <div className="liquid-glass-card rounded-2xl p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input placeholder="搜索菜品名称或描述..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    {t('categories')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setCategoryFilter('all')}>全部菜品 ({categoryCounts.all})</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('appetizer')}>
                    {t('categoryOptions.appetizer')} ({categoryCounts.appetizer})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('soup')}>
                    {t('categoryOptions.soup')} ({categoryCounts.soup})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('mainCourse')}>
                    {t('categoryOptions.mainCourse')} ({categoryCounts.mainCourse})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('dessert')}>
                    {t('categoryOptions.dessert')} ({categoryCounts.dessert})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('beverage')}>
                    {t('categoryOptions.beverage')} ({categoryCounts.beverage})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('special')}>
                    {t('categoryOptions.special')} ({categoryCounts.special})
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* 菜品网格布局 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDishes.map((dish) => (
            <div key={dish.id} className="liquid-glass-card group overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105">
              {/* 菜品图片 */}
              <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                {dish.image ? (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                    <ImageIcon className="h-16 w-16 text-gray-400" />
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                    <ImageIcon className="h-16 w-16 text-gray-400" />
                  </div>
                )}

                {/* 可用状态标识 */}
                {!dish.available && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="font-medium text-white">暂不可用</span>
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="bg-white/90 dark:bg-gray-800/90">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        查看详情
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingDish(dish);
                          setIsAddDishModalOpen(true);
                        }}>
                        <Edit className="mr-2 h-4 w-4" />
                        编辑菜品
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteDish(dish.id)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        删除菜品
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* 菜品信息 */}
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{dish.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{dish.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={getCategoryColor(dish.category)}>{t(`categoryOptions.${dish.category}`)}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{dish.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-2 dark:border-gray-800">
                  <div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">¥{dish.price}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">已售 {dish.orderCount} 份</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" disabled={!dish.available}>
                    <Edit className="mr-2 h-4 w-4" />
                    编辑
                  </Button>
                  <Button variant={dish.available ? 'outline' : 'default'} size="sm" className="flex-1" onClick={() => toggleDishAvailability(dish.id)}>
                    {dish.available ? '下架' : '上架'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <div className="liquid-glass-card rounded-2xl p-12 text-center">
            <div className="text-gray-500 dark:text-gray-400">{commonT('noData')}</div>
          </div>
        )}
      </div>

      <AddDishModal
        isOpen={isAddDishModalOpen}
        onClose={() => {
          setIsAddDishModalOpen(false);
          setEditingDish(null);
        }}
        onSubmit={editingDish ? handleEditDish : handleAddDish}
        editDish={editingDish}
      />
    </PageLayout>
  );
}
