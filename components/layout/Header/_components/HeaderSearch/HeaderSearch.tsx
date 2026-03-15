'use client';

import { useState } from 'react';
import LocationField from './LocationField';
import StayField from './StayField';
import PriceField from './PriceField';
import SearchButton from './SearchButton';

export type ActiveField = 'location' | 'estadia' | 'preco' | null;

export default function HeaderSearch() {
  const [activeField, setActiveField] = useState<ActiveField>(null);

  const handleField = (field: ActiveField) => {
    setActiveField(prev => (prev === field ? null : field));
  };

  return (
    <div className="flex flex-col items-center w-full gap-3">
      <div
        className={`flex items-stretch w-full max-w-2xl rounded-full border transition-all overflow-hidden
        ${
          activeField
            ? 'border-neutral-300 dark:border-neutral-600 shadow-lg'
            : 'border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md'
        } bg-white dark:bg-neutral-900`}
      >
        <LocationField
          active={activeField === 'location'}
          onClick={() => handleField('location')}
        />

        <Divider />

        <StayField
          active={activeField === 'estadia'}
          onClick={() => handleField('estadia')}
        />

        <Divider />

        <PriceField
          active={activeField === 'preco'}
          onClick={() => handleField('preco')}
        />

        <SearchButton activeField={activeField} />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="self-stretch w-px my-3 bg-neutral-200 dark:bg-neutral-700" />;
}