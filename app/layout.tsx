import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ROSE Agency | TikTok LIVE Creator Network',
  description:
    'ROSE Agency helps TikTok LIVE creators grow with strategy, coaching, community, and creator development.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
