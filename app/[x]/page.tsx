"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../layout';
import AboutSection from '@/components/home_page/AboutSection';
import VariantsComponent from '@/components/common/VariantsComponent';
import Earth from '@/components/common/Earth';
const faviconSets = [
  {
    prefix: 'Num',
    extension: 'png',
    folder: '/faviconset1',
    count: 8,  // Number of favicons in this set (e.g., Num0.png to Num7.png)
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
  const initialX = (params.x || "0") as string;
  const [currentX, setCurrentX] = useState(initialX);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(`${currentX}`);

  // Determine the day count and select the appropriate favicon set
  const dayCount = (new Date().getDate() - 1) % faviconSets.length;
  const currentSet = faviconSets[dayCount];
  const faviconPath = `${currentSet.folder}/${currentSet.prefix}${parseInt(currentX) % currentSet.count}.${currentSet.extension}`;

  useEffect(() => {
    const link =
      (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
      document.createElement('link') as HTMLLinkElement;
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = faviconPath;
    document.getElementsByTagName('head')[0].appendChild(link);
  }, [faviconPath]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value);
    setInputValue(event.target.value);
    const numValue = parseInt(value);
    if (numValue >=0 && numValue <= 7) setCurrentX(value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  function handleKeyDown(event: React.KeyboardEvent): void {
    if (event.key === 'Enter' || event.code === 'Enter') {
      setIsEditing(false);
      const numValue = parseInt(inputValue);
      if (numValue >=0 && numValue <= 7) router.push(`/${inputValue}`);
    }
  }


  return (
    <Layout>
      <Head>
        <title>Problem Solved</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between bg-no-repeat font-light">
      <section  id="about" className="w-full flex flex-col lg:flex-row relative h-fit md:h-screen">
          <div className="w-full lg:w-1/2 h-96 md:h-full lg:-translate-x-32">
            <VariantsComponent
              direction="x"
              startDistance={-100}
              delay={0.1}
              className="w-full h-full"
            >
              <Earth />
            </VariantsComponent>
          </div>
          <div className="flex flex-col w-full lg:w-1/2 justify-center px-4 md:px-16 max-w-screen-2xl mx-auto" style={{ marginTop: '-120px' }}>
            <p style={{ fontFamily: 'Courier New, Courier, monospace'}} className="text-primary text-6xl">{"/// Salary 5kkkk"}</p>
            <div style={{ fontFamily: 'Courier New, Courier, monospace', fontSize: '14px', lineHeight: '10' }}>
              <span className="text-6xl" >{"/// goal"} </span>
              {isEditing ? (
                <span className="text-5xl">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    style={{
                      width: '28.5px', 
                      textAlign: 'center',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      border: 'none',
                      backgroundColor: 'transparent',
                      outline: 'none',
                      padding: '0',
                    }}
                  />
                  /7
                </span>
              ) : (
                <span onClick={handleClick} style={{ cursor: 'pointer' }} className="text-5xl">
                  {currentX}/7
                </span>
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default DynamicPage;
