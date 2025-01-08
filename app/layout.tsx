import { AppSidebar } from '@/components/shared/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { StoreProvider } from '@/store/StoreProvider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${geistSans.variable}  antialiased `}>
          <SidebarProvider>
            <div className="flex gap-4 px-4 mt-4 w-full">
              <AppSidebar />
              <div className="h-full w-full p-6 rounded-md border">
                {children}
              </div>
            </div>
          </SidebarProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
