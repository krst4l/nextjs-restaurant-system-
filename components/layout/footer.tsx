'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { UtensilsCrossed, Phone, MessageSquare, Mail, Send, ArrowUp, Heart, Settings, Star, Award, Shield, Zap } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export default function Footer() {
  const t = useTranslations();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: '核心功能',
      icon: Zap,
      links: [
        { name: '智能订单处理', href: '/orders' },
        { name: '菜品智能推荐', href: '/menu' },
        { name: '桌台智能分配', href: '/tables' },
        { name: '员工绩效管理', href: '/staff' },
      ],
    },
    {
      title: '特色服务',
      icon: Star,
      links: [
        { name: 'AI智能分析', href: '#' },
        { name: '实时数据监控', href: '#' },
        { name: '自动化报表', href: '#' },
        { name: '移动端管理', href: '#' },
      ],
    },
    {
      title: '安全保障',
      icon: Shield,
      links: [
        { name: '数据加密存储', href: '#' },
        { name: '权限精细控制', href: '#' },
        { name: '操作日志记录', href: '#' },
        { name: '备份恢复机制', href: '#' },
      ],
    },
    {
      title: '品质保证',
      icon: Award,
      links: [
        { name: '7×24小时支持', href: '#' },
        { name: '专业培训服务', href: '#' },
        { name: '定期功能更新', href: '#' },
        { name: '客户成功案例', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { name: '电话咨询', icon: Phone, href: 'tel:400-888-8888', color: 'hover:text-green-500' },
    { name: '在线客服', icon: MessageSquare, href: '#', color: 'hover:text-blue-500' },
    { name: '邮件联系', icon: Mail, href: 'mailto:service@restaurant.com', color: 'hover:text-purple-500' },
    { name: '系统设置', icon: Settings, href: '#', color: 'hover:text-gray-900 dark:hover:text-white' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* 品牌和订阅区域 */}
          <div className="space-y-6 lg:col-span-5">
            {/* 品牌区域 */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                  <UtensilsCrossed className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{t('layout.title')}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">智能化餐厅运营管理平台，为餐饮行业提供全方位的数字化解决方案。</p>
            </div>

            {/* 订阅区域 */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">获取更新</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">订阅系统更新和功能通知</p>
              </div>

              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <Input type="email" placeholder="输入您的邮箱" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1" required />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubscribed}>
                  {isSubscribed ? <Heart className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>

              {isSubscribed && <p className="text-sm text-green-600 dark:text-green-400">✨ 订阅成功！感谢您的关注</p>}
            </div>
          </div>

          {/* 链接区域 */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <section.icon className="h-5 w-5 text-blue-600" />
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{section.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        {link.href === '#' ? (
                          <span className="text-sm text-gray-600 dark:text-gray-400">{link.name}</span>
                        ) : (
                          <Link href={link.href} className="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                            {link.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="my-8 border-t border-gray-200 dark:border-gray-700" />

        {/* 底部区域 */}
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          {/* 版权信息 */}
          <div className="flex flex-col items-center space-y-2 text-sm text-gray-600 md:flex-row md:space-y-0 md:space-x-6 dark:text-gray-400">
            <p>© 2024 餐饮管理系统 版权所有</p>
            <div className="hidden h-1 w-1 rounded-full bg-gray-400 md:block" />
            <p className="flex items-center space-x-1">
              <span>为餐饮行业数字化赋能</span>
              <Heart className="h-3 w-3 text-red-500" />
            </p>
          </div>

          {/* 社交链接和回到顶部 */}
          <div className="flex items-center space-x-4">
            {/* 社交媒体 */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`rounded-lg bg-white p-2 text-gray-600 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-800 dark:text-gray-400 ${social.color}`}
                  {...(social.href.startsWith('tel:') || social.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>

            {/* 回到顶部按钮 */}
            <Button
              onClick={scrollToTop}
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-lg bg-white shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-800">
              <ArrowUp className="h-4 w-4" />
              <span className="sr-only">回到顶部</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
