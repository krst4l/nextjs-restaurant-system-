'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useTranslations } from 'next-intl';
import PageLayout from '~/components/layout/pageLayout';
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Package, AlertTriangle, CheckCircle, TrendingDown, TrendingUp, Calendar } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Badge } from '~/components/ui/badge';
import AddInventoryModal from '~/components/modals/AddInventoryModal';

interface InventoryItem {
  id: string;
  name: string;
  category: 'meat' | 'vegetable' | 'seasoning' | 'beverage' | 'supplies';
  quantity: number;
  unit: string;
  minStock: number;
  supplier: string;
  lastUpdated: string;
  price: number;
  expiryDate?: string;
}

export default function InventoryPage() {
  const t = useTranslations('inventory');
  const commonT = useTranslations('common');

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAddInventoryModalOpen, setIsAddInventoryModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([
    // 模拟库存数据
    {
      id: 'INV-001',
      name: '鸡胸肉',
      category: 'meat',
      quantity: 25,
      unit: '公斤',
      minStock: 10,
      supplier: '新鲜肉类批发',
      lastUpdated: '2024-01-15',
      price: 18.5,
      expiryDate: '2024-01-20',
    },
    {
      id: 'INV-002',
      name: '土豆',
      category: 'vegetable',
      quantity: 50,
      unit: '公斤',
      minStock: 20,
      supplier: '农产品直供',
      lastUpdated: '2024-01-14',
      price: 3.2,
    },
    {
      id: 'INV-003',
      name: '生抽',
      category: 'seasoning',
      quantity: 8,
      unit: '瓶',
      minStock: 15,
      supplier: '调料专营店',
      lastUpdated: '2024-01-13',
      price: 12.8,
    },
    {
      id: 'INV-004',
      name: '可口可乐',
      category: 'beverage',
      quantity: 120,
      unit: '瓶',
      minStock: 50,
      supplier: '饮料批发商',
      lastUpdated: '2024-01-15',
      price: 2.5,
    },
    {
      id: 'INV-005',
      name: '餐具',
      category: 'supplies',
      quantity: 200,
      unit: '套',
      minStock: 100,
      supplier: '餐具用品店',
      lastUpdated: '2024-01-10',
      price: 8.0,
    },
    {
      id: 'INV-006',
      name: '牛肉',
      category: 'meat',
      quantity: 5,
      unit: '公斤',
      minStock: 15,
      supplier: '新鲜肉类批发',
      lastUpdated: '2024-01-12',
      price: 45.0,
      expiryDate: '2024-01-18',
    },
  ]);

  const handleAddInventory = (itemData: Omit<InventoryItem, 'id' | 'lastUpdated'>) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: `INV-${(inventory.length + 1).toString().padStart(3, '0')}`,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setInventory([...inventory, newItem]);
  };

  const handleEditInventory = (itemData: InventoryItem) => {
    setInventory(inventory.map((item) => (item.id === itemData.id ? { ...item, ...itemData, lastUpdated: new Date().toISOString().split('T')[0] } : item)));
    setEditingItem(null);
  };

  const handleDeleteInventory = (itemId: string) => {
    setInventory(inventory.filter((item) => item.id !== itemId));
  };

  const updateStock = (itemId: string, quantity: number) => {
    setInventory(inventory.map((item) => (item.id === itemId ? { ...item, quantity, lastUpdated: new Date().toISOString().split('T')[0] } : item)));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meat':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'vegetable':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'seasoning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'beverage':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'supplies':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.quantity <= item.minStock * 0.5) {
      return { status: 'critical', color: 'text-red-600', icon: AlertTriangle };
    } else if (item.quantity <= item.minStock) {
      return { status: 'low', color: 'text-yellow-600', icon: TrendingDown };
    } else {
      return { status: 'good', color: 'text-green-600', icon: CheckCircle };
    }
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categoryCounts = {
    all: inventory.length,
    meat: inventory.filter((i) => i.category === 'meat').length,
    vegetable: inventory.filter((i) => i.category === 'vegetable').length,
    seasoning: inventory.filter((i) => i.category === 'seasoning').length,
    beverage: inventory.filter((i) => i.category === 'beverage').length,
    supplies: inventory.filter((i) => i.category === 'supplies').length,
  };

  const stockStats = {
    total: inventory.length,
    lowStock: inventory.filter((i) => i.quantity <= i.minStock).length,
    critical: inventory.filter((i) => i.quantity <= i.minStock * 0.5).length,
    expiringSoon: inventory.filter((i) => {
      if (!i.expiryDate) return false;
      const expiry = new Date(i.expiryDate);
      const now = new Date();
      const diffTime = expiry.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 3 && diffDays >= 0;
    }).length,
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">管理餐厅原料库存和供应商信息</p>
          </div>
          <Button className="liquid-glass-button-primary" onClick={() => setIsAddInventoryModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('addItem')}
          </Button>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stockStats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">库存物品</div>
          </div>
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stockStats.lowStock}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">库存不足</div>
          </div>
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stockStats.critical}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">严重短缺</div>
          </div>
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stockStats.expiringSoon}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">即将过期</div>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="liquid-glass-card rounded-2xl p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input placeholder="搜索库存物品或供应商..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    分类筛选
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setCategoryFilter('all')}>全部物品 ({categoryCounts.all})</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('meat')}>肉类 ({categoryCounts.meat})</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('vegetable')}>蔬菜 ({categoryCounts.vegetable})</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('seasoning')}>调料 ({categoryCounts.seasoning})</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('beverage')}>饮料 ({categoryCounts.beverage})</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('supplies')}>用品 ({categoryCounts.supplies})</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* 库存列表 */}
        <div className="liquid-glass-card overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('itemName')}</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">分类</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('quantity')}</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">库存状态</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('supplier')}</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">单价</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">保质期</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredInventory.map((item) => {
                  const stockStatus = getStockStatus(item);
                  const StatusIcon = stockStatus.icon;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                            <Package className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                            <div className="text-sm text-gray-500">ID: {item.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category === 'meat'
                            ? '肉类'
                            : item.category === 'vegetable'
                              ? '蔬菜'
                              : item.category === 'seasoning'
                                ? '调料'
                                : item.category === 'beverage'
                                  ? '饮料'
                                  : '用品'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {item.quantity} {item.unit}
                        </div>
                        <div className="text-sm text-gray-500">
                          最低库存: {item.minStock} {item.unit}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center space-x-2 ${stockStatus.color}`}>
                          <StatusIcon className="h-4 w-4" />
                          <span className="text-sm font-medium">{stockStatus.status === 'critical' ? '严重短缺' : stockStatus.status === 'low' ? '库存不足' : '库存充足'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">{item.supplier}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 dark:text-white">¥{item.price}</div>
                      </td>
                      <td className="px-6 py-4">
                        {item.expiryDate ? (
                          <div className="text-sm">
                            <div className="text-gray-900 dark:text-white">{item.expiryDate}</div>
                            {(() => {
                              const expiry = new Date(item.expiryDate);
                              const now = new Date();
                              const diffTime = expiry.getTime() - now.getTime();
                              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                              if (diffDays <= 3 && diffDays >= 0) {
                                return <div className="text-xs text-red-600">即将过期</div>;
                              }
                              return null;
                            })()}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingItem(item);
                                setIsAddInventoryModalOpen(true);
                              }}>
                              <Edit className="mr-2 h-4 w-4" />
                              编辑库存
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStock(item.id, item.quantity + 10)}>
                              <TrendingUp className="mr-2 h-4 w-4" />
                              快速入库 +10
                            </DropdownMenuItem>
                            {item.quantity > 10 && (
                              <DropdownMenuItem onClick={() => updateStock(item.id, item.quantity - 10)}>
                                <TrendingDown className="mr-2 h-4 w-4" />
                                快速出库 -10
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              查看历史
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteInventory(item.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              删除物品
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredInventory.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-gray-500 dark:text-gray-400">{commonT('noData')}</div>
            </div>
          )}
        </div>
      </div>

      <AddInventoryModal
        isOpen={isAddInventoryModalOpen}
        onClose={() => {
          setIsAddInventoryModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={editingItem ? handleEditInventory : handleAddInventory}
        editItem={editingItem}
      />
    </PageLayout>
  );
}
