'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '~/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Badge } from '~/components/ui/badge';
import { useTranslations } from 'next-intl';
import { ChevronDown, Plus, Minus, X } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orderData: { tableNumber: string; customerName: string; items: { name: string }[]; total: number }) => void;
}

export default function AddOrderModal({ isOpen, onClose, onSubmit }: AddOrderModalProps) {
  const t = useTranslations('orders');
  const [customerName, setCustomerName] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // 模拟菜品数据
  const dishes = [
    { id: 'DISH-001', name: '宫保鸡丁', price: 38 },
    { id: 'DISH-002', name: '红烧肉', price: 48 },
    { id: 'DISH-003', name: '麻婆豆腐', price: 28 },
    { id: 'DISH-004', name: '紫菜蛋花汤', price: 18 },
    { id: 'DISH-005', name: '可乐', price: 8 },
  ];

  // 模拟桌台数据
  const availableTables = [
    { id: 'TABLE-001', number: '桌号1', seats: 4 },
    { id: 'TABLE-002', number: '桌号2', seats: 2 },
    { id: 'TABLE-006', number: '桌号6', seats: 2 },
    { id: 'TABLE-008', number: '桌号8', seats: 6 },
  ];

  const addDishToOrder = (dish: (typeof dishes)[0]) => {
    const existingItem = orderItems.find((item) => item.id === dish.id);
    if (existingItem) {
      setOrderItems(orderItems.map((item) => (item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setOrderItems([
        ...orderItems,
        {
          id: dish.id,
          name: dish.name,
          price: dish.price,
          quantity: 1,
        },
      ]);
    }
  };

  const updateItemQuantity = (id: string, change: number) => {
    setOrderItems(
      orderItems
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const getTotalAmount = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = () => {
    if (!customerName || !selectedTable || orderItems.length === 0) {
      alert('请填写完整信息');
      return;
    }

    const orderData = {
      customerName,
      tableNumber: availableTables.find((t) => t.id === selectedTable)?.number,
      items: orderItems,
      total: getTotalAmount(),
      status: 'pending',
      time: new Date().toLocaleString('zh-CN'),
    };

    onSubmit(orderData);
    handleClose();
  };

  const handleClose = () => {
    setCustomerName('');
    setSelectedTable('');
    setOrderItems([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{t('newOrder')}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 基本信息 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">客户姓名</label>
              <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="请输入客户姓名" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">选择餐桌</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedTable ? availableTables.find((t) => t.id === selectedTable)?.number : '选择餐桌'}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {availableTables.map((table) => (
                    <DropdownMenuItem key={table.id} onClick={() => setSelectedTable(table.id)}>
                      {table.number} ({table.seats}人桌)
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* 菜品选择 */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">选择菜品</label>
            <div className="grid grid-cols-2 gap-2">
              {dishes.map((dish) => (
                <Button key={dish.id} variant="outline" className="h-auto justify-between p-3" onClick={() => addDishToOrder(dish)}>
                  <div className="text-left">
                    <div className="font-medium">{dish.name}</div>
                    <div className="text-sm text-gray-500">¥{dish.price}</div>
                  </div>
                  <Plus className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* 已选菜品 */}
          {orderItems.length > 0 && (
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">订单详情</label>
              <div className="max-h-48 space-y-3 overflow-y-auto rounded-lg border p-3">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">¥{item.price}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => updateItemQuantity(item.id, -1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Badge variant="secondary">{item.quantity}</Badge>
                      <Button size="sm" variant="outline" onClick={() => updateItemQuantity(item.id, 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-700">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 总计 */}
              <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                <div className="flex items-center justify-between">
                  <span className="font-medium">订单总额:</span>
                  <span className="text-xl font-bold text-blue-600">¥{getTotalAmount()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={!customerName || !selectedTable || orderItems.length === 0} className="liquid-glass-button-primary">
            创建订单
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
