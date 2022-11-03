import React from 'react';
import './globals.css';

import { Roboto } from '@next/font/google';

type LayoutProps = { children? : React.ReactNode }

const roboto = Roboto({
  weight: ["400", "700"]
});

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <title>Next.js</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-gray-900 bg-app bg-no-repeat bg-cover">{children}</body>
    </html>
  );
}