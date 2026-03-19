'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus } from 'lucide-react';
import AuthButton from './_components/AuthButton';
import LoginModal from '@/app/[locale]/(auth)/login/LoginModal';

export default function AuthPanel() {
  const t = useTranslations('header');
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const openRegister = () => router.push('/auth/register');

  return (
    <div className="flex items-center gap-2">
      <AuthButton
        label={t('auth.login')}
        icon={<LogIn size={14} strokeWidth={2} />}
        onClick={openLogin}
        variant="login"
      />
      <AuthButton
        label={t('auth.register')}
        icon={<UserPlus size={14} strokeWidth={2} />}
        onClick={openRegister}
        variant="register"
      />
      {isLoginOpen && <LoginModal  open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
    </div>
  );
}