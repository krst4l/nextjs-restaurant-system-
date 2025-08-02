'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useTranslations } from 'next-intl';
import PageLayout from '~/components/layout/pageLayout';
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, UserCheck, UserX, Phone, Mail, Calendar } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Badge } from '~/components/ui/badge';
import AddStaffModal from '~/components/modals/AddStaffModal';

interface Staff {
  id: string;
  name: string;
  position: 'manager' | 'waiter' | 'chef' | 'cashier';
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'onLeave';
  hireDate: string;
  salary: number;
  avatar?: string;
}

export default function StaffPage() {
  const t = useTranslations('staff');
  const commonT = useTranslations('common');

  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: 'STAFF-001',
      name: '李小明',
      position: 'waiter',
      phone: '13800138001',
      email: 'lixiaoming@restaurant.com',
      status: 'active',
      hireDate: '2023-03-15',
      salary: 4500,
    },
    {
      id: 'STAFF-002',
      name: '张小丽',
      position: 'waiter',
      phone: '13800138002',
      email: 'zhangxiaoli@restaurant.com',
      status: 'active',
      hireDate: '2023-05-20',
      salary: 4200,
    },
    {
      id: 'STAFF-003',
      name: '王大厨',
      position: 'chef',
      phone: '13800138003',
      email: 'wangdachu@restaurant.com',
      status: 'active',
      hireDate: '2022-08-10',
      salary: 8000,
    },
    {
      id: 'STAFF-004',
      name: '陈经理',
      position: 'manager',
      phone: '13800138004',
      email: 'chenjingli@restaurant.com',
      status: 'active',
      hireDate: '2021-12-01',
      salary: 12000,
    },
    {
      id: 'STAFF-005',
      name: '刘收银',
      position: 'cashier',
      phone: '13800138005',
      email: 'liushouyin@restaurant.com',
      status: 'active',
      hireDate: '2023-01-08',
      salary: 5000,
    },
    {
      id: 'STAFF-006',
      name: '赵小厨',
      position: 'chef',
      phone: '13800138006',
      email: 'zhaoxiaochu@restaurant.com',
      status: 'onLeave',
      hireDate: '2022-11-15',
      salary: 7500,
    },
  ]);

  const handleAddStaff = (staffData: Omit<Staff, 'id'>) => {
    const newStaff: Staff = {
      ...staffData,
      id: `STAFF-${(staff.length + 1).toString().padStart(3, '0')}`,
    };
    setStaff([...staff, newStaff]);
  };

  const handleEditStaff = (staffData: Staff) => {
    setStaff(staff.map((member) => (member.id === staffData.id ? { ...member, ...staffData } : member)));
    setEditingStaff(null);
  };

  const handleDeleteStaff = (staffId: string) => {
    setStaff(staff.filter((member) => member.id !== staffId));
  };

  const updateStaffStatus = (staffId: string, newStatus: Staff['status']) => {
    setStaff(staff.map((member) => (member.id === staffId ? { ...member, status: newStatus } : member)));
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'manager':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'chef':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'waiter':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'cashier':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'onLeave':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <UserCheck className="h-4 w-4" />;
      case 'inactive':
        return <UserX className="h-4 w-4" />;
      case 'onLeave':
        return <Calendar className="h-4 w-4" />;
      default:
        return <UserCheck className="h-4 w-4" />;
    }
  };

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.email.toLowerCase().includes(searchTerm.toLowerCase()) || member.phone.includes(searchTerm);
    const matchesPosition = positionFilter === 'all' || member.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  const positionCounts = {
    all: staff.length,
    manager: staff.filter((s) => s.position === 'manager').length,
    chef: staff.filter((s) => s.position === 'chef').length,
    waiter: staff.filter((s) => s.position === 'waiter').length,
    cashier: staff.filter((s) => s.position === 'cashier').length,
  };

  const statusCounts = {
    active: staff.filter((s) => s.status === 'active').length,
    inactive: staff.filter((s) => s.status === 'inactive').length,
    onLeave: staff.filter((s) => s.status === 'onLeave').length,
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">管理餐厅员工信息和工作安排</p>
          </div>
          <Button className="liquid-glass-button-primary" onClick={() => setIsAddStaffModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('addStaff')}
          </Button>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{staff.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">总员工数</div>
          </div>
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts.active}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">在职员工</div>
          </div>
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.onLeave}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">请假员工</div>
          </div>
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{positionCounts.manager}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">管理人员</div>
          </div>
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{positionCounts.chef}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">厨师</div>
          </div>
          <div className="liquid-glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{positionCounts.waiter}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">服务员</div>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="liquid-glass-card rounded-2xl p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input placeholder="搜索员工姓名、电话或邮箱..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    筛选职位
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setPositionFilter('all')}>全部员工 ({positionCounts.all})</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPositionFilter('manager')}>
                    {t('positions.manager')} ({positionCounts.manager})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPositionFilter('chef')}>
                    {t('positions.chef')} ({positionCounts.chef})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPositionFilter('waiter')}>
                    {t('positions.waiter')} ({positionCounts.waiter})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPositionFilter('cashier')}>
                    {t('positions.cashier')} ({positionCounts.cashier})
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* 员工列表 */}
        <div className="liquid-glass-card overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('name')}</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('position')}</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">联系方式</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('status')}</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">入职时间</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">薪资</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredStaff.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-semibold text-white">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{member.name}</div>
                          <div className="text-sm text-gray-500">ID: {member.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`${getPositionColor(member.position)}`}>{t(`positions.${member.position}`)}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-900 dark:text-white">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{member.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{member.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`inline-flex items-center space-x-1 ${getStatusColor(member.status)}`}>
                        {getStatusIcon(member.status)}
                        <span>{member.status === 'active' ? '在职' : member.status === 'inactive' ? '离职' : '请假'}</span>
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">{member.hireDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">¥{member.salary.toLocaleString()}</div>
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
                              setEditingStaff(member);
                              setIsAddStaffModalOpen(true);
                            }}>
                            <Edit className="mr-2 h-4 w-4" />
                            编辑信息
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            查看排班
                          </DropdownMenuItem>
                          {member.status === 'active' && (
                            <DropdownMenuItem onClick={() => updateStaffStatus(member.id, 'onLeave')}>
                              <Calendar className="mr-2 h-4 w-4" />
                              申请请假
                            </DropdownMenuItem>
                          )}
                          {member.status === 'onLeave' && (
                            <DropdownMenuItem onClick={() => updateStaffStatus(member.id, 'active')}>
                              <UserCheck className="mr-2 h-4 w-4" />
                              恢复上班
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <UserCheck className="mr-2 h-4 w-4" />
                            考勤记录
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteStaff(member.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            删除员工
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStaff.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-gray-500 dark:text-gray-400">{commonT('noData')}</div>
            </div>
          )}
        </div>
      </div>

      <AddStaffModal
        isOpen={isAddStaffModalOpen}
        onClose={() => {
          setIsAddStaffModalOpen(false);
          setEditingStaff(null);
        }}
        onSubmit={editingStaff ? handleEditStaff : handleAddStaff}
        editStaff={editingStaff}
      />
    </PageLayout>
  );
}
