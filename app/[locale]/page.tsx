import { Button } from '~/components/ui/button';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import PageLayout from '~/components/layout/pageLayout';
import { UtensilsCrossed, ShoppingCart, TrendingUp, Clock, DollarSign, AlertCircle, CheckCircle, ChefHat, Table } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'dashboard' });

  return {
    title: t('title'),
    description: '餐饮管理系统仪表板 - 实时监控餐厅运营数据',
  };
}

export default function Dashboard() {
  const t = useTranslations('dashboard');
  const homeT = useTranslations('homePage');

  // 模拟数据
  const todayStats = [
    {
      title: t('stats.todayOrders'),
      value: '58',
      change: '+12%',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: t('stats.todayRevenue'),
      value: '¥8,420',
      change: '+18%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: t('stats.activeTable'),
      value: '12/20',
      change: '60%',
      icon: Table,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: t('stats.waitingOrders'),
      value: '3',
      change: '-2',
      icon: Clock,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const recentOrders = [
    { id: '#001', table: '桌号5', items: '宫保鸡丁, 白米饭', total: '¥68', status: 'preparing', time: '10分钟前' },
    { id: '#002', table: '桌号12', items: '红烧肉, 青菜', total: '¥85', status: 'ready', time: '15分钟前' },
    { id: '#003', table: '桌号3', items: '麻婆豆腐', total: '¥45', status: 'served', time: '20分钟前' },
    { id: '#004', table: '桌号8', items: '糖醋里脊', total: '¥72', status: 'confirmed', time: '25分钟前' },
  ];

  const popularDishes = [
    { name: '宫保鸡丁', orders: 12, revenue: '¥816' },
    { name: '红烧肉', orders: 8, revenue: '¥680' },
    { name: '麻婆豆腐', orders: 15, revenue: '¥675' },
    { name: '糖醋里脊', orders: 6, revenue: '¥432' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparing':
        return <ChefHat className="h-4 w-4 text-orange-500" />;
      case 'ready':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'served':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const features = [
    {
      icon: ShoppingCart,
      title: homeT('features.orders.title'),
      description: homeT('features.orders.description'),
      gradient: 'from-blue-500 to-cyan-500',
      href: '/orders',
    },
    {
      icon: UtensilsCrossed,
      title: homeT('features.menu.title'),
      description: homeT('features.menu.description'),
      gradient: 'from-green-500 to-emerald-500',
      href: '/menu',
    },
    {
      icon: Table,
      title: homeT('features.tables.title'),
      description: homeT('features.tables.description'),
      gradient: 'from-purple-500 to-pink-500',
      href: '/tables',
    },
    {
      icon: TrendingUp,
      title: homeT('features.analytics.title'),
      description: homeT('features.analytics.description'),
      gradient: 'from-orange-500 to-red-500',
      href: '/reports',
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* 欢迎区域 */}
        <div className="liquid-glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('welcome')} 👋</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {t('todayOverview')} -{' '}
                {new Date().toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </p>
            </div>
            <div className="liquid-glass-badge inline-flex items-center space-x-2 rounded-full px-4 py-2">
              <UtensilsCrossed className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{homeT('openSource')}</span>
            </div>
          </div>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {todayStats.map((stat, index) => (
            <div key={index} className="liquid-glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-green-600">{stat.change} vs 昨日</p>
                </div>
                <div className={`rounded-xl bg-gradient-to-br p-3 ${stat.color} liquid-glow shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* 最近订单 */}
          <div className="lg:col-span-2">
            <div className="liquid-glass-card rounded-2xl p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('recentOrders')}</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/orders">查看全部</Link>
                </Button>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 dark:border-gray-800">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {order.id} - {order.table}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.items}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">{order.total}</p>
                      <p className="text-sm text-gray-500">{order.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 热门菜品 */}
          <div>
            <div className="liquid-glass-card rounded-2xl p-6">
              <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">{t('popularDishes')}</h2>

              <div className="space-y-4">
                {popularDishes.map((dish, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{dish.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{dish.orders} 份订单</p>
                    </div>
                    <p className="font-medium text-green-600">{dish.revenue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 功能模块 */}
        <div className="liquid-glass-card rounded-2xl p-8">
          <div className="mb-8 text-center">
            <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-white dark:to-gray-300">管理功能</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">一站式餐厅运营管理解决方案</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href} className="group">
                <div
                  className="liquid-glass-card float-animation relative rounded-2xl p-6 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* 背景渐变 */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />

                  <div className="relative space-y-4">
                    {/* 图标 */}
                    <div className={`inline-flex rounded-xl bg-gradient-to-br p-3 ${feature.gradient} liquid-glow shadow-lg transition-all duration-300 group-hover:shadow-xl`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>

                    {/* 内容 */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
