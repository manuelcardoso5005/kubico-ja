'use client';

import { useState } from 'react';
import LocationField from './LocationField/LocationField';
import StayField from './StayField/StayField';
import PriceField from './PriceField/PriceField';
import SearchButton from './SearchButton';
import {ActiveField} from "@/types/header"


export default function HeaderSearch() {
  const [activeField, setActiveField] = useState<ActiveField>(null);
  const [locationHover, setLocationHover] = useState(false);
  const [stayHover, setStayHover] = useState(false);
  const [priceHover, setPriceHover] = useState(false)
  const hideFirstDivider =
  locationHover ||
  stayHover ||
  activeField === 'location' ||
  activeField === 'estadia';
  const hideSecondDivider =
  stayHover ||
  priceHover ||
  activeField === 'estadia' ||
  activeField === 'preco';

  const handleField = (field: ActiveField) => {
    setActiveField(prev => (prev === field ? null : field));
  };

  return (
    <div className="flex flex-col items-center w-full gap-3">
      <div
        className={`flex items-stretch w-full max-w-xl rounded-full border transition-all overflow-visible
        ${
          activeField
            ? 'border-neutral-300 dark:border-neutral-600 shadow-lg'
            : 'border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md'
        } bg-white dark:bg-neutral-900`}
      >
        <LocationField
          active={activeField === 'location'}
          onClick={() => handleField('location')}
          onHoverChange={setLocationHover}
          onProvinceSelect={(p:any) => console.log('Província escolhida:', p)}
          onClose={() => setActiveField(null)}
        />

        {!hideFirstDivider && <Divider />}

        <StayField
          active={activeField === 'estadia'}
          onClick={() => handleField('estadia')}
          onHoverChange={setStayHover}
          onChange={(selection) => console.log('Estadia:', selection)}
          onClose={() => setActiveField(null)}
        />

        {!hideSecondDivider && <Divider />}

        <PriceField
          active={activeField === 'preco'}
          onClick={() => handleField('preco')}
          onHoverChange={setPriceHover}
        />

        <SearchButton activeField={activeField} />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="self-stretch w-px my-3 bg-neutral-200 dark:bg-neutral-700" />;
}