'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterModal from './RegisterModal';

export default function Page() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setOpen(false); 
    router.push('/');
  };

  return (
    <RegisterModal
      open={open}
      onClose={handleClose}
    />
  );
}