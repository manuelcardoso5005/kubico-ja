'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { LogIn } from 'lucide-react';
import Overlay from '@/components/overlay/OverlayAuth';
import LoginForm from './LoginForm';
import { loginWithEmail, loginWithGoogle } from '@/utils/utils';
import { useTranslations } from 'next-intl';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LoginModal({ open, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const t = useTranslations('authorization');

  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open, onClose]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const result = await loginWithEmail(email, password);
      console.log('Login sucesso:', result);
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      console.log('Login Google sucesso:', result);
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const modal = (
    <AnimatePresence>
      {open && (
        <Overlay
          clickOutside={onClose}
          onClose={onClose}
          icon={<LogIn size={18} strokeWidth={2} className="text-neutral-500" />}
          title={t('login.login')}
          legend={t('login.login_legend')}
        >
          <div className="px-5 pb-5">
            {error && <p className="mb-2 text-sm text-red-500">{t(error)}</p>}
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleGoogleLogin={handleGoogleLogin}
            />
          </div>
        </Overlay>
      )}
    </AnimatePresence>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(modal, document.body);
}