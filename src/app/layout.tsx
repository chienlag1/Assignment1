import Navbar from './components/Navbar';
import './globals.css';

import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <main className='p-4'>{children}</main>
      </body>
    </html>
  );
}
