import './global.css';

export const metadata = {
  title: 'TenTwenty',
  description: 'A response web page built using React and Nextjs'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}

