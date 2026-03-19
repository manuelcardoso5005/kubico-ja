'use client';

import { useState } from 'react';

interface RoleSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const roles = [
  { value: 'buyer', label: 'Comprador' },
  { value: 'seller', label: 'Vendedor' },
  { value: 'agent', label: 'Corretor / Agência' },
];

export default function RoleSelect({ value, onChange }: RoleSelectProps) {
  const [open, setOpen] = useState(false);

  const currentLabel = roles.find((r) => r.value === value)?.label || 'Escolha';

  return (
    <div className="relative w-full">
      {/* Botão que mostra a seleção atual */}
      <div
        className="flex items-center justify-between w-full px-3 py-2 border rounded-lg cursor-pointer bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{currentLabel}</span>
        <span className="ml-2 transform">{open ? '▲' : '▼'}</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
          {roles.map((role) => (
            <div
              key={role.value}
              className="px-3 py-2 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => {
                onChange(role.value);
                setOpen(false);
              }}
            >
              {role.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}