import './global.css';

export const metadata = {
  title: 'TenTwenty',
  description: 'A response web page built using React and Nextjs',
  icons: { icon: "/favicon.png" }

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" min-h-screen">
        {children}
      </body>
    </html>
  );
}

