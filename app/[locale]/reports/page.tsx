'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { useTranslations } from 'next-intl';
import PageLayout from '~/components/layout/pageLayout';
import { Calendar, Download, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Percent, BarChart3, PieChart, FileText } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';

export default function ReportsPage() {
  const t = useTranslations('reports');
  // const commonT = useTranslations('common');

  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  // 模拟报表数据
  const revenueData = {
    thisMonth: {
      totalRevenue: 128400,
      totalOrders: 1250,
      averageOrder: 102.72,
      growth: 12.8,
      dailyRevenue: [
        { date: '01-01', revenue: 4200 },
        { date: '01-02', revenue: 3800 },
        { date: '01-03', revenue: 4500 },
        { date: '01-04', revenue: 3900 },
        { date: '01-05', revenue: 4800 },
      ],
    },
    lastMonth: {
      totalRevenue: 114200,
      totalOrders: 1180,
      averageOrder: 96.78,
      growth: -5.2,
    },
  };

  const topDishes = [
    { name: '宫保鸡丁', orders: 180, revenue: 6840, percentage: 5.3 },
    { name: '红烧肉', orders: 156, revenue: 7488, percentage: 5.8 },
    { name: '麻婆豆腐', orders: 203, revenue: 5684, percentage: 4.4 },
    { name: '糖醋里脊', orders: 128, revenue: 9216, percentage: 7.2 },
    { name: '青椒肉丝', orders: 145, revenue: 4785, percentage: 3.7 },
  ];

  const periodOptions = [
    { value: 'today', label: '今日' },
    { value: 'thisWeek', label: '本周' },
    { value: 'thisMonth', label: '本月' },
    { value: 'lastMonth', label: '上月' },
    { value: 'thisYear', label: '今年' },
  ];

  const currentData = revenueData.thisMonth;

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">查看餐厅营收数据和经营分析</p>
          </div>
          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  {t('period')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {periodOptions.map((option) => (
                  <DropdownMenuItem key={option.value} onClick={() => setSelectedPeriod(option.value)}>
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="liquid-glass-button-primary"
              onClick={() => {
                alert(`正在导出 ${periodOptions.find((p) => p.value === selectedPeriod)?.label} 的报表数据...`);
              }}>
              <Download className="mr-2 h-4 w-4" />
              导出报表
            </Button>
          </div>
        </div>

        {/* 核心指标 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="liquid-glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('totalRevenue')}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">¥{currentData.totalRevenue.toLocaleString()}</p>
                <div className="mt-2 flex items-center space-x-2">
                  {currentData.growth > 0 ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
                  <span className={`text-sm ${currentData.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>{Math.abs(currentData.growth)}% vs 上月</span>
                </div>
              </div>
              <div className="liquid-glow rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 p-3 shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="liquid-glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('totalOrders')}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{currentData.totalOrders.toLocaleString()}</p>
                <p className="mt-2 text-sm text-gray-500">日均 {Math.round(currentData.totalOrders / 30)} 单</p>
              </div>
              <div className="liquid-glow rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-3 shadow-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="liquid-glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('averageOrder')}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">¥{currentData.averageOrder}</p>
                <p className="mt-2 text-sm text-gray-500">客单价分析</p>
              </div>
              <div className="liquid-glow rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-3 shadow-lg">
                <Percent className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="liquid-glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">活跃客户</p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">856</p>
                <p className="mt-2 text-sm text-green-600">+8.2% vs 上月</p>
              </div>
              <div className="liquid-glow rounded-xl bg-gradient-to-br from-orange-500 to-red-500 p-3 shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="liquid-glass-card rounded-2xl p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('revenueChart')}</h2>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>

            {/* 简化的图表显示 */}
            <div className="space-y-4">
              {currentData.dailyRevenue.map((day) => (
                <div key={day.date} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{day.date}</span>
                  <div className="mx-4 flex flex-1 items-center space-x-3">
                    <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" style={{ width: `${(day.revenue / 5000) * 100}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">¥{day.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="liquid-glass-card rounded-2xl p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('topDishes')}</h2>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {topDishes.map((dish, index) => (
                <div key={dish.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{dish.name}</p>
                      <p className="text-sm text-gray-500">{dish.orders} 份订单</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">¥{dish.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{dish.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 详细报告 */}
        <div className="liquid-glass-card rounded-2xl p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">经营分析报告</h2>
            <FileText className="h-5 w-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white">营收分析</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 本月营收较上月增长 12.8%</li>
                <li>• 周末营收占比 35%</li>
                <li>• 晚餐时段贡献最大营收</li>
                <li>• 客单价稳步提升</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white">菜品表现</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 川菜系列最受欢迎</li>
                <li>• 新品推广效果良好</li>
                <li>• 素食类订单增长 20%</li>
                <li>• 饮品搭配率提升</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white">运营建议</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 增加热门菜品供应</li>
                <li>• 优化菜单搭配推荐</li>
                <li>• 加强周中营销活动</li>
                <li>• 提升服务效率</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
