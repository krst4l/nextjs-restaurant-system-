'use client';

import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '~/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

interface InventoryItem {
  id?: string;
  name: string;
  category: 'meat' | 'vegetable' | 'seasoning' | 'beverage' | 'supplies';
  quantity: number;
  unit: string;
  minStock: number;
  supplier: string;
  price: number;
  expiryDate?: string;
}

interface AddInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (itemData: InventoryItem) => void;
  editItem?: InventoryItem | null;
}

export default function AddInventoryModal({ isOpen, onClose, onSubmit, editItem }: AddInventoryModalProps) {
  const t = useTranslations('inventory');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<InventoryItem['category']>('meat');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [minStock, setMinStock] = useState('');
  const [supplier, setSupplier] = useState('');
  const [price, setPrice] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const categories = [
    { value: 'meat', label: '肉类' },
    { value: 'vegetable', label: '蔬菜' },
    { value: 'seasoning', label: '调料' },
    { value: 'beverage', label: '饮料' },
    { value: 'supplies', label: '用品' },
  ];

  const units = [
    { value: 'kg', label: '公斤' },
    { value: 'g', label: '克' },
    { value: 'L', label: '升' },
    { value: 'ml', label: '毫升' },
    { value: '个', label: '个' },
    { value: '包', label: '包' },
    { value: '箱', label: '箱' },
    { value: '瓶', label: '瓶' },
  ];

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setCategory(editItem.category);
      setQuantity(editItem.quantity.toString());
      setUnit(editItem.unit);
      setMinStock(editItem.minStock.toString());
      setSupplier(editItem.supplier);
      setPrice(editItem.price.toString());
      setExpiryDate(editItem.expiryDate || '');
    } else {
      // 清空表单
      setName('');
      setCategory('meat');
      setQuantity('');
      setUnit('kg');
      setMinStock('');
      setSupplier('');
      setPrice('');
      setExpiryDate('');
    }
  }, [editItem, isOpen]);

  const handleSubmit = () => {
    if (!name || !quantity || !unit || !minStock || !supplier || !price) {
      alert('请填写完整信息');
      return;
    }

    const itemData: InventoryItem = {
      id: editItem?.id,
      name,
      category,
      quantity: parseFloat(quantity),
      unit,
      minStock: parseFloat(minStock),
      supplier,
      price: parseFloat(price),
      expiryDate: expiryDate || undefined,
    };

    onSubmit(itemData);
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setCategory('meat');
    setQuantity('');
    setUnit('kg');
    setMinStock('');
    setSupplier('');
    setPrice('');
    setExpiryDate('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[80vh] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{editItem ? '编辑库存' : '添加库存'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 物品名称 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{t('itemName')}</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="请输入物品名称" />
          </div>

          {/* 分类 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">分类</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {categories.find((c) => c.value === category)?.label}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {categories.map((cat) => (
                  <DropdownMenuItem key={cat.value} onClick={() => setCategory(cat.value as InventoryItem['category'])}>
                    {cat.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* 数量和单位 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{t('quantity')}</label>
              <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="0" min="0" step="0.1" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">单位</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {units.find((u) => u.value === unit)?.label || unit}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {units.map((u) => (
                    <DropdownMenuItem key={u.value} onClick={() => setUnit(u.value)}>
                      {u.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* 最低库存 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">最低库存</label>
            <Input type="number" value={minStock} onChange={(e) => setMinStock(e.target.value)} placeholder="0" min="0" step="0.1" />
          </div>

          {/* 供应商 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{t('supplier')}</label>
            <Input value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="请输入供应商名称" />
          </div>

          {/* 单价 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">单价</label>
            <div className="relative">
              <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">¥</span>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" className="pl-8" min="0" step="0.01" />
            </div>
          </div>

          {/* 保质期 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">保质期 (可选)</label>
            <Input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={!name || !quantity || !unit || !minStock || !supplier || !price} className="liquid-glass-button-primary">
            {editItem ? '更新库存' : '添加库存'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
