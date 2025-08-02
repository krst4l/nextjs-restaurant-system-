'use client';

import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '~/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import { ChevronDown, Upload } from 'lucide-react';

interface Dish {
  id?: string;
  name: string;
  category: 'appetizer' | 'soup' | 'mainCourse' | 'dessert' | 'beverage' | 'special';
  price: number;
  description: string;
  image?: string;
  available: boolean;
}

interface AddDishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dishData: Dish) => void;
  editDish?: Dish | null;
}

export default function AddDishModal({ isOpen, onClose, onSubmit, editDish }: AddDishModalProps) {
  const t = useTranslations('menu');
  const [dishName, setDishName] = useState('');
  const [category, setCategory] = useState<Dish['category']>('mainCourse');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [available, setAvailable] = useState(true);

  const categories = [
    { value: 'appetizer', label: t('categoryOptions.appetizer') },
    { value: 'soup', label: t('categoryOptions.soup') },
    { value: 'mainCourse', label: t('categoryOptions.mainCourse') },
    { value: 'dessert', label: t('categoryOptions.dessert') },
    { value: 'beverage', label: t('categoryOptions.beverage') },
    { value: 'special', label: t('categoryOptions.special') },
  ];

  useEffect(() => {
    if (editDish) {
      setDishName(editDish.name);
      setCategory(editDish.category);
      setPrice(editDish.price.toString());
      setDescription(editDish.description);
      setAvailable(editDish.available);
    } else {
      // 清空表单
      setDishName('');
      setCategory('mainCourse');
      setPrice('');
      setDescription('');
      setAvailable(true);
    }
  }, [editDish, isOpen]);

  const handleSubmit = () => {
    if (!dishName || !price || !description) {
      alert('请填写完整信息');
      return;
    }

    const dishData: Dish = {
      id: editDish?.id,
      name: dishName,
      category,
      price: parseFloat(price),
      description,
      available,
    };

    onSubmit(dishData);
    handleClose();
  };

  const handleClose = () => {
    setDishName('');
    setCategory('mainCourse');
    setPrice('');
    setDescription('');
    setAvailable(true);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{editDish ? '编辑菜品' : t('addDish')}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 菜品名称 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{t('dishName')}</label>
            <Input value={dishName} onChange={(e) => setDishName(e.target.value)} placeholder="请输入菜品名称" />
          </div>

          {/* 分类 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{t('category')}</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {categories.find((c) => c.value === category)?.label}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {categories.map((cat) => (
                  <DropdownMenuItem key={cat.value} onClick={() => setCategory(cat.value as Dish['category'])}>
                    {cat.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* 价格 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{t('price')}</label>
            <div className="relative">
              <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">¥</span>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" className="pl-8" step="0.01" min="0" />
            </div>
          </div>

          {/* 描述 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{t('description')}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请输入菜品描述"
              className="h-20 w-full resize-none rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* 图片上传 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">菜品图片</label>
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">点击上传图片</p>
            </div>
          </div>

          {/* 状态 */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">菜品状态</label>
            <button
              type="button"
              onClick={() => setAvailable(!available)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${available ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${available ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <p className="text-xs text-gray-500">{available ? '菜品可用' : '菜品暂停供应'}</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={!dishName || !price || !description} className="liquid-glass-button-primary">
            {editDish ? '更新菜品' : '添加菜品'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
