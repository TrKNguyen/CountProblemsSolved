import './globals.css';
import type { ReactNode } from 'react';
import Head from 'next/head';
type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <Head>
          <link rel="icon" href="favicon.ico" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default Layout;
