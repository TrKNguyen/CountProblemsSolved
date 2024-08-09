"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../layout';

const DynamicPage = ({ params }: { params: { x: string } }) => {
  const router = useRouter();
  const initialX = parseInt(params.x) || 0;
  const [currentX, setCurrentX] = useState(initialX);
  const faviconPath = `/favicons/favicon${currentX}.ico`;

  useEffect(() => {
    // Set the dynamic favicon
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = faviconPath;
    document.getElementsByTagName('head')[0].appendChild(link);
  }, [faviconPath]);

  const handleIncrement = () => {
    const newX = (currentX + 1) % 8;
    router.push(`/${newX}`);
  };

  const handleDecrement = () => {
    const newX = (currentX + 7) % 8;
    router.push(`/${newX}`);
  };

  return (
    <Layout>
      <Head>
        <title>Count Problem Solved - {currentX}</title>
      </Head>
      <main>
        <h1>Count Problem Solved</h1>
        <img src={`/logos/logo${currentX}.png`} alt={`Logo ${currentX}`} width="100" />
        <img src={`/avatars/avatar${currentX}.png`} alt={`Avatar ${currentX}`} width="100" />
        <div>
          <button onClick={handleDecrement}>Previous</button>
          <span>{currentX}</span>
          <button onClick={handleIncrement}>Next</button>
        </div>
      </main>
    </Layout>
  );
};

export default DynamicPage;
