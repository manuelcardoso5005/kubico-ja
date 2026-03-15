'use client';

import { useState } from 'react';
import { Search, MapPin, Calendar, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = ['Casas', 'Experiências'];

type ActiveField = 'location' | 'estadia' | 'preco' | null;

export default function HeaderSearch() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeField, setActiveField] = useState<ActiveField>(null);

  const handleField = (field: ActiveField) => {
    setActiveField(prev => prev === field ? null : field);
  };

  return (
    <div className="flex flex-col items-center w-full gap-3">
      {/* Search Bar */}
      <div className={`flex items-stretch w-full max-w-2xl rounded-full border transition-all overflow-hidden
        ${activeField
          ? 'border-neutral-300 dark:border-neutral-600 shadow-lg'
          : 'border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md'
        } bg-white dark:bg-neutral-900`}
      >

        {/* Destino */}
        <button
          onClick={() => handleField('location')}
          className={`flex flex-col justify-center px-5 py-3 text-left flex-[1.4] rounded-full cursor-pointer transition-colors
            ${activeField === 'location' ? 'bg-neutral-50 dark:bg-neutral-800' : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}
        >
          <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white mb-0.5">
            <MapPin size={12} strokeWidth={2} />
            Destino
          </span>
          <span className="text-xs truncate text-neutral-400">Para onde?</span>
        </button>

        {/* Divider */}
        <div className="self-stretch w-px my-3 bg-neutral-200 dark:bg-neutral-700" />

        {/* Estadia Curta */}
        <button
          onClick={() => handleField('estadia')}
          className={`flex flex-col justify-center px-5 py-3 text-left flex-[1.4] rounded-full cursor-pointer transition-colors
            ${activeField === 'estadia' ? 'bg-neutral-50 dark:bg-neutral-800' : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}
        >
          <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white mb-0.5">
            <Calendar size={12} strokeWidth={2} />
            Estadia curta
          </span>
          <span className="text-xs truncate text-neutral-400">
            {activeField === 'estadia' ? 'Fim de semana · 1 semana · 1 mês' : 'Adicionar datas'}
          </span>

          {/* Opções inline ao expandir */}
          <AnimatePresence>
            {activeField === 'estadia' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 mt-2 overflow-hidden"
              >
                {['Fim de semana', '1 semana', '1 mês'].map((opt) => (
                  <button
                    key={opt}
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1 rounded-full text-xs border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap"
                  >
                    {opt}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Divider */}
        <div className="self-stretch w-px my-3 bg-neutral-200 dark:bg-neutral-700" />

        {/* Preço */}
        <button
          onClick={() => handleField('preco')}
          className={`flex flex-col justify-center px-5 py-3 text-left flex-1 rounded-full cursor-pointer transition-colors
            ${activeField === 'preco' ? 'bg-neutral-50 dark:bg-neutral-800' : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}
        >
          <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white mb-0.5">
            <DollarSign size={12} strokeWidth={2} />
            Preço
          </span>
          <span className="text-xs truncate text-neutral-400">
            {activeField === 'preco' ? 'Até $50 · $50–200 · $200+' : 'Qualquer preço'}
          </span>

          {/* Opções inline ao expandir */}
          <AnimatePresence>
            {activeField === 'preco' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 mt-2 overflow-hidden"
              >
                {['Até $50', '$50–200', '$200+'].map((opt) => (
                  <button
                    key={opt}
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1 rounded-full text-xs border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap"
                  >
                    {opt}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Botão pesquisar */}
        <div className="flex items-center pl-1 pr-2 shrink-0">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium cursor-pointer transition-colors"
          >
            <Search size={15} strokeWidth={2.5} />
            <AnimatePresence>
              {activeField && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  Pesquisar
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

      </div>
    </div>
  );
}