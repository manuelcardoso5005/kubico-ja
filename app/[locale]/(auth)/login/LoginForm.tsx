import { Mail, Lock, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
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
  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-3">
      <div className="relative">
        <Mail className="absolute text-neutral-400 left-3 top-3" size={16} />
        <input
          type="email"
          placeholder={t('login.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-2.5 pl-9 pr-3 text-sm border rounded-lg
                     bg-neutral-50 dark:bg-neutral-800
                     border-neutral-200 dark:border-neutral-700
                     focus:outline-none focus:ring-2 focus:ring-neutral-400"
          required
        />
      </div>

      <div className="relative">
        <Lock className="absolute text-neutral-400 left-3 top-3" size={16} />
        <input
          type="password"
          placeholder={t('login.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
                onClick={handleLogin}
                className="flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium rounded-xl
                  transition-colors bg-neutral-900 dark:bg-white
                  text-white dark:text-neutral-900
                  hover:bg-neutral-700 dark:hover:bg-neutral-200"
              >
                <LogIn size={14} strokeWidth={2} />
                {t('login.login')}
              </motion.button>

              <div className="flex items-center gap-2 px-1">
                <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                <span className="text-xs text-neutral-400">{t('login.or')}</span>
                <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleGoogleLogin}
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
                {t('login.login_with_google')}
              </motion.button>
            </div>
    </form>
  );
}