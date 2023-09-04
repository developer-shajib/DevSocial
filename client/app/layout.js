'use client';

import { Provider } from 'react-redux';
import { Inter, Gluten } from 'next/font/google';
import { store } from '@/features/store.js';
import { ToastContainer } from 'react-toastify';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const gluten = Gluten({ subsets: ['latin'], variable: '--gluten-font', weight: ['200', '300', '400', '500', '600', '700', '800'] });

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className='dark'>
      <body className={`${gluten.variable} ${inter.className} dark:bg-slate-900 duration-200  w-full`}>
        <Provider store={store}>
          {children} <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
