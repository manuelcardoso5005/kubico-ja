'use client';

import { Mail, Lock, User, Phone, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import RoleSelect from "./_components/RoleSelect"

type Props = {
  onSubmit: (data: any) => void;
  handleGoogleRegister?: () => void;
};

export default function RegisterForm({ onSubmit, handleGoogleRegister }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'buyer',
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      
      {/* Nome */}
      <div className="relative">
        <User className="absolute text-neutral-400 left-3 top-3" size={16} />
        <input
          placeholder="Nome completo"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full py-2.5 pl-9 pr-3 text-sm border rounded-lg
                     bg-neutral-50 dark:bg-neutral-800
                     border-neutral-200 dark:border-neutral-700
                     focus:outline-none focus:ring-2 focus:ring-neutral-400"
          required
        />
      </div>

      {/* Email */}
      <div className="relative">
        <Mail className="absolute text-neutral-400 left-3 top-3" size={16} />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full py-2.5 pl-9 pr-3 text-sm border rounded-lg
                     bg-neutral-50 dark:bg-neutral-800
                     border-neutral-200 dark:border-neutral-700
                     focus:outline-none focus:ring-2 focus:ring-neutral-400"
          required
        />
      </div>

      {/* Senha */}
      <div className="relative">
        <Lock className="absolute text-neutral-400 left-3 top-3" size={16} />
        <input
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          className="w-full py-2.5 pl-9 pr-3 text-sm border rounded-lg
                     bg-neutral-50 dark:bg-neutral-800
                     border-neutral-200 dark:border-neutral-700
                     focus:outline-none focus:ring-2 focus:ring-neutral-400"
          required
        />
      </div>

      {/* Telefone */}
      <div className="relative">
        <Phone className="absolute text-neutral-400 left-3 top-3" size={16} />
        <input
          placeholder="Telefone"
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="w-full py-2.5 pl-9 pr-3 text-sm border rounded-lg
                     bg-neutral-50 dark:bg-neutral-800
                     border-neutral-200 dark:border-neutral-700
                     focus:outline-none focus:ring-2 focus:ring-neutral-400"
          required
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

      {/* Actions */}
      <div className="flex flex-col gap-2 p-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium rounded-xl
            transition-colors bg-neutral-900 dark:bg-white
            text-white dark:text-neutral-900
            hover:bg-neutral-700 dark:hover:bg-neutral-200"
        >
          <UserPlus size={14} strokeWidth={2} />
          Criar conta
        </motion.button>

        <div className="flex items-center gap-2 px-1">
          <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
          <span className="text-xs text-neutral-400">ou</span>
          <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={handleGoogleRegister}
          className="flex items-center justify-center w-full gap-2 py-2.5 text-sm font-medium
            border rounded-xl border-neutral-200 dark:border-neutral-700
            hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <img
            src="https://i.ibb.co/fdtTYvWf/transparent-google-logo-google-logo-in-black-circle-colorful-1710875294177.webp"
            alt="Google logo"
            width={16}
            height={16}
          />
          Criar conta com Google
        </motion.button>
      </div>
    </form>
  );
}