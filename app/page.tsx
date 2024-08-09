"use client"; 
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/0');  // Redirect to /0 by default
  }, [router]);

  return null; // Nothing to render since we're redirecting
};

export default HomePage;
