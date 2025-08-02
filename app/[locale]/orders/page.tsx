'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useTranslations } from 'next-intl';
import PageLayout from '~/components/layout/pageLayout';
import { Search, Filter, Plus, MoreHorizontal, Clock, CheckCircle, ChefHat, AlertCircle, XCircle, Eye } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Badge } from '~/components/ui/badge';
import AddOrderModal from '~/components/modals/AddOrderModal';

interface Order {
  id: string;
  tableNumber: string;
  customerName: string;
  items: string[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';
  time: string;
  waiter: string;
}

export default function OrdersPage() {
  const t = useTranslations('orders');
  const commonT = useTranslations('common');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([
    // 模拟订单数据
    {
      id: 'ORD-001',
      tableNumber: '桌号5',
      customerName: '张先生',
      items: ['宫保鸡丁', '白米饭', '可乐'],
      total: 68,
      status: 'preparing',
      time: '10分钟前',
      waiter: '李小明',
    },
    {
      id: 'ORD-002',
      tableNumber: '桌号12',
      customerName: '王女士',
      items: ['红烧肉', '青菜', '米饭'],
      total: 85,
      status: 'ready',
      time: '15分钟前',
      waiter: '张小丽',
    },
    {
      id: 'ORD-003',
      tableNumber: '桌号3',
      customerName: '刘先生',
      items: ['麻婆豆腐', '紫菜蛋花汤'],
      total: 45,
      status: 'served',
      time: '20分钟前',
      waiter: '李小明',
    },
    {
      id: 'ORD-004',
      tableNumber: '桌号8',
      customerName: '陈女士',
      items: ['糖醋里脊', '蒸蛋'],
      total: 72,
      status: 'confirmed',
      time: '25分钟前',
      waiter: '张小丽',
    },
    {
      id: 'ORD-005',
      tableNumber: '桌号15',
      customerName: '赵先生',
      items: ['鱼香茄子', '白米饭'],
      total: 38,
      status: 'pending',
      time: '30分钟前',
      waiter: '李小明',
    },
  ]);

  const handleAddOrder = (orderData: { tableNumber: string; customerName: string; items: { name: string }[]; total: number }) => {
    const newOrder: Order = {
      id: `ORD-${(orders.length + 1).toString().padStart(3, '0')}`,
      tableNumber: orderData.tableNumber,
      customerName: orderData.customerName,
      items: orderData.items.map((item) => item.name),
      total: orderData.total,
      status: 'pending',
      time: '刚刚',
      waiter: '系统分配',
    };
    setOrders([newOrder, ...orders]);
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'preparing':
        return <ChefHat className="h-4 w-4" />;
      case 'ready':
        return <AlertCircle className="h-4 w-4" />;
      case 'served':
        return <CheckCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'preparing':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'ready':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'served':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.tableNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    confirmed: orders.filter((o) => o.status === 'confirmed').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    ready: orders.filter((o) => o.status === 'ready').length,
    served: orders.filter((o) => o.status === 'served').length,
    completed: orders.filter((o) => o.status === 'completed').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">管理餐厅所有订单，跟踪订单状态和进度</p>
          </div>
          <Button className="liquid-glass-button-primary" onClick={() => setIsAddOrderModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('newOrder')}
          </Button>
        </div>

        {/* 搜索和筛选 */}
        <div className="liquid-glass-card rounded-2xl p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input placeholder="搜索订单号、客户或桌号..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    筛选状态
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>全部订单 ({statusCounts.all})</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                    {t('statusOptions.pending')} ({statusCounts.pending})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('confirmed')}>
                    {t('statusOptions.confirmed')} ({statusCounts.confirmed})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('preparing')}>
                    {t('statusOptions.preparing')} ({statusCounts.preparing})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('ready')}>
                    {t('statusOptions.ready')} ({statusCounts.ready})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('served')}>
                    {t('statusOptions.served')} ({statusCounts.served})
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* 订单列表 */}
        <div className="liquid-glass-card overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('orderNumber')}</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('table')}</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('customer')}</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('items')}</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('total')}</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('status')}</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('time')}</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">{order.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900 dark:text-white">{order.tableNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900 dark:text-white">{order.customerName}</div>
                      <div className="text-sm text-gray-500">服务员: {order.waiter}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">{order.items.join(', ')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">¥{order.total}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`inline-flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{t(`statusOptions.${order.status}`)}</span>
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{order.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'confirmed')}>确认订单</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'preparing')}>开始制作</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'ready')}>制作完成</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'served')}>已送达</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'completed')}>订单完成</DropdownMenuItem>
                            <DropdownMenuItem>打印小票</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'cancelled')} className="text-red-600">
                              取消订单
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-gray-500 dark:text-gray-400">{commonT('noData')}</div>
            </div>
          )}
        </div>
      </div>

      <AddOrderModal isOpen={isAddOrderModalOpen} onClose={() => setIsAddOrderModalOpen(false)} onSubmit={handleAddOrder} />
    </PageLayout>
  );
}
