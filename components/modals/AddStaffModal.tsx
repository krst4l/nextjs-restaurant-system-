'use client';

import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '~/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

interface Staff {
  id?: string;
  name: string;
  position: 'manager' | 'chef' | 'waiter' | 'cashier';
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'onLeave';
  hireDate: string;
  salary: number;
}

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (staffData: Staff) => void;
  editStaff?: Staff | null;
}

export default function AddStaffModal({ isOpen, onClose, onSubmit, editStaff }: AddStaffModalProps) {
  const t = useTranslations('staff');
  const [name, setName] = useState('');
  const [position, setPosition] = useState<Staff['position']>('waiter');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Staff['status']>('active');
  const [hireDate, setHireDate] = useState('');
  const [salary, setSalary] = useState('');

  const positions = [
    { value: 'manager', label: t('positions.manager') },
    { value: 'chef', label: t('positions.chef') },
    { value: 'waiter', label: t('positions.waiter') },
    { value: 'cashier', label: t('positions.cashier') },
  ];

  const statuses = [
    { value: 'active', label: '在职' },
    { value: 'inactive', label: '离职' },
    { value: 'onLeave', label: '请假' },
  ];

  useEffect(() => {
    if (editStaff) {
      setName(editStaff.name);
      setPosition(editStaff.position);
      setPhone(editStaff.phone);
      setEmail(editStaff.email);
      setStatus(editStaff.status);
      setHireDate(editStaff.hireDate);
      setSalary(editStaff.salary.toString());
    } else {
      // 清空表单
      setName('');
      setPosition('waiter');
      setPhone('');
      setEmail('');
      setStatus('active');
      setHireDate(new Date().toISOString().split('T')[0]);
      setSalary('');
    }
  }, [editStaff, isOpen]);

  const handleSubmit = () => {
    if (!name || !phone || !email || !salary) {
      alert('请填写完整信息');
      return;
    }

    const staffData: Staff = {
      id: editStaff?.id,
      name,
      position,
      phone,
      email,
      status,
      hireDate,
      salary: parseFloat(salary),
    };

    onSubmit(staffData);
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setPosition('waiter');
    setPhone('');
    setEmail('');
    setStatus('active');
    setHireDate('');
    setSalary('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[80vh] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{editStaff ? '编辑员工' : '添加员工'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 姓名 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{t('name')}</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="请输入员工姓名" />
          </div>

          {/* 职位 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{t('position')}</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {positions.find((p) => p.value === position)?.label}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {positions.map((pos) => (
                  <DropdownMenuItem key={pos.value} onClick={() => setPosition(pos.value as Staff['position'])}>
                    {pos.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* 电话 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">联系电话</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="请输入手机号码" />
          </div>

          {/* 邮箱 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">邮箱地址</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="请输入邮箱地址" />
          </div>

          {/* 状态 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{t('status')}</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {statuses.find((s) => s.value === status)?.label}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {statuses.map((stat) => (
                  <DropdownMenuItem key={stat.value} onClick={() => setStatus(stat.value as Staff['status'])}>
                    {stat.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* 入职日期 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">入职日期</label>
            <Input type="date" value={hireDate} onChange={(e) => setHireDate(e.target.value)} />
          </div>

          {/* 薪资 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">薪资</label>
            <div className="relative">
              <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">¥</span>
              <Input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="0" className="pl-8" min="0" />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={!name || !phone || !email || !salary} className="liquid-glass-button-primary">
            {editStaff ? '更新员工' : '添加员工'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
