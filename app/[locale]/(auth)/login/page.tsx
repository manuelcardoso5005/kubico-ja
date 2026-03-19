'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginModal from './LoginModal';

export default function Page() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  
  const handleClose = () => {
    setOpen(false); 
    router.push('/');
  };

  return (
    <LoginModal
      open={open}
      onClose={handleClose}
    />
  );
}