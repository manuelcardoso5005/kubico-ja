'use client';

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface FormLoginProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  handleGoogleLogin?: () => void;
}

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleGoogleLogin,
}: FormLoginProps) {
  const t = useTranslations('authorization');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        {/* Email */}
        <div className="relative">
          <Mail className="absolute text-neutral-400 dark:text-neutral-500 left-3 top-3" size={16} />
          <input
            type="email"
            placeholder={t('login.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2.5 pl-9 pr-3 text-sm rounded-lg
                       bg-white dark:bg-neutral-800
                       border border-neutral-200 dark:border-neutral-700
                       text-neutral-900 dark:text-neutral-100
                       placeholder:text-neutral-400 dark:placeholder:text-neutral-500
                       focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent
                       transition-all"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute text-neutral-400 dark:text-neutral-500 left-3 top-3" size={16} />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('login.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2.5 pl-9 pr-10 text-sm rounded-lg
                       bg-white dark:bg-neutral-800
                       border border-neutral-200 dark:border-neutral-700
                       text-neutral-900 dark:text-neutral-100
                       placeholder:text-neutral-400 dark:placeholder:text-neutral-500
                       focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent
                       transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute transition-colors right-3 top-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Login Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-2.5 mt-1 text-sm font-medium rounded-lg
                     bg-neutral-900 dark:bg-white
                     text-white dark:text-neutral-900
                     hover:bg-neutral-700 dark:hover:bg-neutral-200
                     transition-colors"
        >
          {t('login.login')}
        </motion.button>

        {/* Divider */}
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200 dark:border-neutral-700"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white dark:bg-neutral-900 text-neutral-500">
              {t('login.or')}
            </span>
          </div>
        </div>

        {/* Google Login */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 text-sm font-medium rounded-lg flex items-center justify-center gap-2
                     bg-white dark:bg-neutral-800
                     border border-neutral-200 dark:border-neutral-700
                     text-neutral-700 dark:text-neutral-300
                     hover:bg-neutral-50 dark:hover:bg-neutral-700
                     transition-colors"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-4 h-4"
          />
          {t('login.login_with_google')}
        </motion.button>
      </form>
    </div>
  );
}