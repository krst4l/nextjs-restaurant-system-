'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { UtensilsCrossed, Phone, MessageSquare, Mail, Send, ArrowUp, Heart, Settings } from 'lucide-react';
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
      title: '系统功能',
      links: [
        { name: '订单管理', href: '/orders' },
        { name: '菜品管理', href: '/menu' },
        { name: '桌台管理', href: '/tables' },
        { name: '员工管理', href: '/staff' },
      ],
    },
    {
      title: '使用手册',
      links: [
        { name: '操作指南', href: '#' },
        { name: '功能介绍', href: '#' },
        { name: '快速入门', href: '#' },
        { name: '常见问题', href: '#' },
      ],
    },
    {
      title: '技术支持',
      links: [
        { name: '客服热线', href: '#' },
        { name: '在线咨询', href: '#' },
        { name: '培训服务', href: '#' },
        { name: '维护保障', href: '#' },
      ],
    },
    {
      title: '法律信息',
      links: [
        { name: '服务条款', href: '#' },
        { name: '隐私政策', href: '#' },
        { name: '用户协议', href: '#' },
        { name: '安全政策', href: '#' },
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
    <footer className="relative mt-20 border-t border-white/10 dark:border-white/5">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/10 dark:via-transparent dark:to-purple-950/10" />
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative bg-white/60 backdrop-blur-sm dark:bg-black/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 主要内容区域 */}
          <div className="py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* 品牌和订阅区域 */}
              <div className="space-y-8 lg:col-span-5">
                {/* 品牌区域 */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                        <UtensilsCrossed className="h-5 w-5 text-white" />
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-30 blur-lg" />
                    </div>
                    <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-gray-300">
                      {t('layout.title')}
                    </span>
                  </div>
                </div>

                {/* 订阅区域 */}
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">获取更新</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">订阅系统更新和功能通知</p>
                  </div>

                  <form onSubmit={handleSubscribe} className="flex space-x-2">
                    <div className="relative flex-1">
                      <Input
                        type="email"
                        placeholder="输入您的邮箱"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border-white/20 bg-white/50 backdrop-blur-sm transition-all duration-300 focus:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:focus:bg-white/10"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="border-0 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:shadow-blue-500/25"
                      disabled={isSubscribed}>
                      {isSubscribed ? <Heart className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </form>

                  {isSubscribed && <p className="animate-pulse text-sm text-green-600 dark:text-green-400">✨ 订阅成功！感谢您的关注</p>}
                </div>
              </div>

              {/* 链接区域 */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                  {footerSections.map((section) => (
                    <div key={section.title} className="space-y-4">
                      <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">{section.title}</h3>
                      <ul className="space-y-3">
                        {section.links.map((link) => (
                          <li key={link.name}>
                            {link.href === '#' ? (
                              <span className="cursor-default text-sm text-gray-600 dark:text-gray-400">{link.name}</span>
                            ) : (
                              <Link
                                href={link.href}
                                className="text-sm text-gray-600 transition-colors duration-200 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
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
          </div>

          {/* 分隔线 */}
          <div className="h-px border-t border-white/10 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent dark:border-white/5" />

          {/* 底部区域 */}
          <div className="py-8">
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
                      className={`rounded-lg border border-white/20 bg-white/50 p-2 text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 ${social.color} backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg`}
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
                  className="h-10 w-10 rounded-xl border border-white/20 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                  <ArrowUp className="h-4 w-4" />
                  <span className="sr-only">回到顶部</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部装饰光线 */}
      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </footer>
  );
}
