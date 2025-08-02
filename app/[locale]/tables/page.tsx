'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { useTranslations } from 'next-intl';
import PageLayout from '~/components/layout/pageLayout';
import { Plus, Users, Clock, CheckCircle, Utensils, Settings, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Badge } from '~/components/ui/badge';

interface Table {
  id: string;
  number: string;
  seats: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning' | 'maintenance';
  currentOrder?: string;
  estimatedTime?: string;
  waiter?: string;
}

export default function TablesPage() {
  const t = useTranslations('tables');
  // const commonT = useTranslations('common');

  const [tables, setTables] = useState<Table[]>([
    {
      id: 'TABLE-001',
      number: '桌号1',
      seats: 4,
      status: 'occupied',
      currentOrder: 'ORD-001',
      estimatedTime: '15分钟',
      waiter: '李小明',
    },
    {
      id: 'TABLE-002',
      number: '桌号2',
      seats: 2,
      status: 'available',
    },
    {
      id: 'TABLE-003',
      number: '桌号3',
      seats: 6,
      status: 'reserved',
      estimatedTime: '30分钟',
    },
    {
      id: 'TABLE-004',
      number: '桌号4',
      seats: 4,
      status: 'cleaning',
    },
    {
      id: 'TABLE-005',
      number: '桌号5',
      seats: 8,
      status: 'occupied',
      currentOrder: 'ORD-005',
      estimatedTime: '25分钟',
      waiter: '张小丽',
    },
    {
      id: 'TABLE-006',
      number: '桌号6',
      seats: 2,
      status: 'available',
    },
    {
      id: 'TABLE-007',
      number: '桌号7',
      seats: 4,
      status: 'maintenance',
    },
    {
      id: 'TABLE-008',
      number: '桌号8',
      seats: 6,
      status: 'available',
    },
    {
      id: 'TABLE-009',
      number: '桌号9',
      seats: 2,
      status: 'occupied',
      currentOrder: 'ORD-009',
      estimatedTime: '10分钟',
      waiter: '李小明',
    },
    {
      id: 'TABLE-010',
      number: '桌号10',
      seats: 4,
      status: 'reserved',
      estimatedTime: '1小时',
    },
  ]);

  const updateTableStatus = (tableId: string, newStatus: Table['status']) => {
    setTables(tables.map((table) => (table.id === tableId ? { ...table, status: newStatus } : table)));
  };

  const assignTableOrder = (tableId: string, orderId: string) => {
    setTables(tables.map((table) => (table.id === tableId ? { ...table, status: 'occupied', currentOrder: orderId } : table)));
  };

  const clearTable = (tableId: string) => {
    setTables(tables.map((table) => (table.id === tableId ? { ...table, status: 'cleaning', currentOrder: undefined, estimatedTime: undefined } : table)));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'occupied':
        return 'bg-red-500';
      case 'reserved':
        return 'bg-blue-500';
      case 'cleaning':
        return 'bg-yellow-500';
      case 'maintenance':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'occupied':
        return <Utensils className="h-5 w-5 text-red-600" />;
      case 'reserved':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'cleaning':
        return <Settings className="h-5 w-5 text-yellow-600" />;
      case 'maintenance':
        return <Settings className="h-5 w-5 text-gray-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const statusCounts = {
    total: tables.length,
    available: tables.filter((t) => t.status === 'available').length,
    occupied: tables.filter((t) => t.status === 'occupied').length,
    reserved: tables.filter((t) => t.status === 'reserved').length,
    cleaning: tables.filter((t) => t.status === 'cleaning').length,
    maintenance: tables.filter((t) => t.status === 'maintenance').length,
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">管理餐厅桌台状态和预订信息</p>
          </div>
          <Button className="liquid-glass-button-primary">
            <Plus className="mr-2 h-4 w-4" />
            {t('addTable')}
          </Button>
        </div>

        {/* 状态统计 */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{statusCounts.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">总桌台数</div>
          </div>
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts.available}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('statusOptions.available')}</div>
          </div>
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{statusCounts.occupied}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('statusOptions.occupied')}</div>
          </div>
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.reserved}</div>{' '}
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('statusOptions.reserved')}</div>
          </div>
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.cleaning}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('statusOptions.cleaning')}</div>
          </div>
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{statusCounts.maintenance}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('statusOptions.maintenance')}</div>
          </div>
        </div>

        {/* 餐桌布局 */}
        <div className="liquid-glass-card rounded-2xl p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">餐桌布局</h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600 dark:text-gray-400">空闲</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span className="text-gray-600 dark:text-gray-400">使用中</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-600 dark:text-gray-400">已预订</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <span className="text-gray-600 dark:text-gray-400">清洁中</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {tables.map((table) => (
              <div key={table.id} className="relative">
                <div
                  className={`cursor-pointer rounded-2xl border-4 transition-all duration-300 hover:scale-105 ${getStatusColor(table.status)} border-opacity-20 ${table.status === 'available' ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : ''} ${table.status === 'occupied' ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' : ''} ${table.status === 'reserved' ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20' : ''} ${table.status === 'cleaning' ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20' : ''} ${table.status === 'maintenance' ? 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/20' : ''} `}>
                  {/* 状态指示器 */}
                  <div className={`absolute -top-2 -right-2 h-6 w-6 rounded-full ${getStatusColor(table.status)} border-2 border-white dark:border-gray-900`}></div>

                  <div className="space-y-3 p-4 text-center">
                    {/* 餐桌图标和编号 */}
                    <div className="space-y-2">
                      {getStatusIcon(table.status)}
                      <div className="font-semibold text-gray-900 dark:text-white">{table.number}</div>
                    </div>

                    {/* 座位数 */}
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>{table.seats} 人</span>
                    </div>

                    {/* 状态信息 */}
                    <div className="space-y-1">
                      <Badge
                        className={`text-xs ${
                          table.status === 'available'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : table.status === 'occupied'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                              : table.status === 'reserved'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                : table.status === 'cleaning'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                        }`}>
                        {t(`statusOptions.${table.status}`)}
                      </Badge>

                      {/* 额外信息 */}
                      {table.currentOrder && <div className="text-xs text-gray-500 dark:text-gray-400">订单: {table.currentOrder}</div>}
                      {table.estimatedTime && (
                        <div className="flex items-center justify-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3" />
                          <span>{table.estimatedTime}</span>
                        </div>
                      )}
                      {table.waiter && <div className="text-xs text-gray-500 dark:text-gray-400">服务员: {table.waiter}</div>}
                    </div>

                    {/* 操作按钮 */}
                    <div className="pt-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {table.status === 'available' && (
                            <>
                              <DropdownMenuItem onClick={() => assignTableOrder(table.id, `ORD-${Date.now()}`)}>安排就座</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateTableStatus(table.id, 'reserved')}>预订桌台</DropdownMenuItem>
                            </>
                          )}
                          {table.status === 'occupied' && (
                            <>
                              <DropdownMenuItem>查看订单</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => clearTable(table.id)}>结账</DropdownMenuItem>
                              <DropdownMenuItem>更换服务员</DropdownMenuItem>
                            </>
                          )}
                          {table.status === 'reserved' && (
                            <>
                              <DropdownMenuItem onClick={() => assignTableOrder(table.id, `ORD-${Date.now()}`)}>客人到达</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateTableStatus(table.id, 'available')}>取消预订</DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem onClick={() => updateTableStatus(table.id, 'cleaning')}>清洁桌台</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateTableStatus(table.id, 'maintenance')}>维护桌台</DropdownMenuItem>
                          {(table.status === 'cleaning' || table.status === 'maintenance') && (
                            <DropdownMenuItem onClick={() => updateTableStatus(table.id, 'available')}>恢复可用</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
