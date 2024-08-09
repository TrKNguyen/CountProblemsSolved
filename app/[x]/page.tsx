"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../layout';

const faviconSets = [
  {
    prefix: 'Num',
    extension: 'png',
    folder: '/faviconset1',
    count: 8,  // Number of favicons in this set (e.g., favicon0.ico to favicon1.ico)
  },
  {
    prefix: 'Number',
    extension: 'png',
    folder: '/faviconset2',
    count: 8,  // Number of favicons in this set (e.g., Number0.png to Number7.png)
  },
  // Add more sets as needed
];

const DynamicPage = ({ params }: { params: { x: string } }) => {
  const router = useRouter();
  const initialX = parseInt(params.x) || 0;
  const [currentX, setCurrentX] = useState(initialX);

  // Determine the day count and select the appropriate favicon set
  const dayCount = (new Date().getDate() - 1) % faviconSets.length;
  // const dayCount = 0;
  const currentSet = faviconSets[dayCount];
  const faviconPath = `${currentSet.folder}/${currentSet.prefix}${currentX % currentSet.count}.${currentSet.extension}`;

  useEffect(() => {
    const link =
      (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
      document.createElement('link') as HTMLLinkElement;
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = faviconPath;
    document.getElementsByTagName('head')[0].appendChild(link);
  }, [faviconPath]);

  const handleIncrement = () => {
    const newX = (currentX + 1) % currentSet.count;
    router.push(`/${newX}`);
  };

  const handleDecrement = () => {
    const newX = (currentX + currentSet.count - 1) % currentSet.count;
    router.push(`/${newX}`);
  };

  return (
    <Layout>
      <Head>
        <title>Problem Solved</title>
      </Head>
      <main>
        <h1>Dynamic Favicon - Set {dayCount + 1}, Icon {currentX}</h1>
        <div>
          <button onClick={handleDecrement}>-</button>
          <span>{currentX}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
      </main>
    </Layout>
  );
};

export default DynamicPage;
