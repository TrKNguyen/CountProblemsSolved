"use client"; 
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const HomePage = () => {
  const router = useRouter();

  // useEffect(() => {
  //   router.push('/0');
  // }, [router]);
  return null; 
  return (<Link
    rel="icon"
    href="/favicons/favicon0.ico"
  />)
};

export default HomePage;
