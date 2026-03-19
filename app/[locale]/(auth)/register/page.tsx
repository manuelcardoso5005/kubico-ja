'use client';

import { useState } from 'react';
import RegisterModal from './RegisterModal';

export default function Page() {
  const [open, setOpen] = useState(true);

  return (
    <RegisterModal
      open={open}
      onClose={() => setOpen(false)}
    />
  );
}