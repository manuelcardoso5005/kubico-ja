'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import Overlay from '@/components/overlay/OverlayAuth';
import RegisterForm from './RegisterForm';
import { registerWithEmail, registerWithGoogle } from '@/utils/utils';
import { RegisterData } from "@/types/register";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RegisterModal({ open, onClose }: Props) {
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open, onClose]);

  const handleRegister = async (formData: RegisterData) => {
    setError('');
    try {
      const result = await registerWithEmail(formData);
      console.log('Cadastro sucesso:', result);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta');
    }
  };

  const handleGoogleRegister = async () => {
    setError('');
    try {
      const result = await registerWithGoogle();
      console.log('Cadastro Google sucesso:', result);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta com Google');
    }
  };

  const modal = (
    <AnimatePresence>
      {open && (
        <Overlay
          clickOutside={onClose}
          onClose={onClose}
          icon={<UserPlus size={18} strokeWidth={2} className="text-neutral-500" />}
          title="Criar conta"
          legend="Preencha os dados para continuar"
        >
          <div className="px-5 pb-5">
            {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
            <RegisterForm 
              onSubmit={handleRegister} 
              handleGoogleRegister={handleGoogleRegister} 
            />
          </div>
        </Overlay>
      )}
    </AnimatePresence>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(modal, document.body);
}