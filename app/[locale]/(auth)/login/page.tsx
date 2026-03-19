'use client';

import { useState } from 'react';
import LoginModal from './LoginModal';

export default function Page() {
  const [open, setOpen] = useState(true);

  return (
    <LoginModal
      open={open}
      onClose={() => setOpen(false)}
    />
  );
}