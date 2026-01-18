// 1. IMPORT THE CSS FILE HERE
import './globals.css';

export const metadata = {
  title: 'SourceCraft AI',
  description: 'AI Article Generator',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 2. Add antialiased class for sharper text */}
      <body className="antialiased">{children}</body>
    </html>
  );
}